import {
  createContext,
  ReactNode,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { useToast } from 'native-base'
import Realm from 'realm'
import uuid from 'react-native-uuid'
import { SkillProps, SkillType } from '../types/skill'
import { getRealm } from '../database'

type SkillContextData = {
  skillType: SkillType
  skills: SkillProps[]
  startSync: () => void
  handleSubmitNewSkill: (data: { title: string }) => Promise<void>
  handleChangeSkillType: (type: SkillType) => void
  handleDeleteSkill: (id: string) => void
  handleUpdateSkill: (id: string, value: string) => void
}

export const SkillContext = createContext<SkillContextData>(
  {} as SkillContextData,
)

let subscriptions: Realm.App.Sync.SubscriptionSet

export function SkillProvider({ children }: { children: ReactNode }) {
  const toast = useToast()
  const [realm, setRealm] = useState<Realm | undefined>()
  const [skills, setSkills] = useState<SkillProps[]>([])
  const [skillType, setSkillType] = useState<SkillType>('hard')

  const getAllSkills = useCallback(async () => {
    try {
      const allSkills = realm
        .objects<SkillProps[]>('Skills')
        .filtered(`type = '${skillType}'`)

      addToSubscriptions(allSkills, 'allSkillsSubscription')

      setSkills(allSkills.toJSON() as SkillProps[])
    } catch (error) {
      console.log(error)
    }
  }, [realm, skillType])

  const handleSubmitNewSkill = useCallback(
    async (data: { title: string }) => {
      let newSkillCreated: SkillProps

      try {
        await realm.write(async () => {
          newSkillCreated = realm.create<SkillProps>('Skills', {
            _id: uuid.v4() as string,
            title: data.title,
            type: skillType,
          })
        })
        setSkills((state) => [
          ...state,
          {
            _id: newSkillCreated._id,
            title: newSkillCreated.title,
            type: skillType,
          },
        ])
        toast.show({
          title: 'Skill added!',
          backgroundColor: 'green.500',
        })
      } catch (error) {
        console.log(error)
      }
    },
    [realm, skillType, toast],
  )
  const handleChangeSkillType = useCallback((type: SkillType) => {
    setSkillType(type)
  }, [])

  const handleDeleteSkill = useCallback(
    async (id: string) => {
      try {
        const skill = realm.objectForPrimaryKey<SkillProps>('Skills', id)
        realm.write(() => {
          realm.delete(skill)
        })
        setSkills((state) => {
          return state.filter((skill) => skill._id !== id)
        })
        toast.show({
          title: 'Skill deleted',
          bgColor: 'green.500',
        })
      } catch (error) {
        console.log(error)
      }
    },
    [realm, toast],
  )

  const handleUpdateSkill = useCallback(
    async (id: string, value: string) => {
      try {
        const skillToUpdate = realm.objectForPrimaryKey<SkillProps>(
          'Skills',
          id,
        )

        realm.write(() => {
          skillToUpdate.title = value
        })
        setSkills((state) => {
          return state.map((skill) => {
            if (skill._id === skillToUpdate._id) {
              skill.title = value
            }

            return skill
          })
        })
      } catch (error) {
        console.log(error)
      }
    },
    [realm],
  )

  function startSync() {
    realm.syncSession.resume()
  }

  function addToSubscriptions<T = unknown>(
    query: Realm.Results<T>,
    name: string,
  ) {
    subscriptions.update((mutableSubs) => {
      mutableSubs.add(query, { name })
    })
  }

  function removeAllSubscriptions() {
    subscriptions.update((mutableSubs) => {
      mutableSubs.removeAll()
    })
  }

  useEffect(() => {
    if (realm) {
      getAllSkills()
    }
  }, [getAllSkills, realm])

  useEffect(() => {
    const initRealm = async () => {
      const realm = await getRealm()
      subscriptions = realm.subscriptions
      setRealm(realm)
    }
    initRealm()

    return () => {
      realm.close()
      removeAllSubscriptions()
    }
  }, [])

  return (
    <SkillContext.Provider
      value={{
        handleSubmitNewSkill,
        handleChangeSkillType,
        handleDeleteSkill,
        handleUpdateSkill,
        startSync,
        skills,
        skillType,
      }}
    >
      {children}
    </SkillContext.Provider>
  )
}
