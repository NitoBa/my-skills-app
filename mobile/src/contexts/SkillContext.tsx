import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { useToast } from 'native-base'
import uuid from 'react-native-uuid'
import { SkillProps, SkillType } from '../types/skill'
import { getRealm } from '../database'

type SkillContextData = {
  skillType: SkillType
  skills: SkillProps[]
  handleSubmitNewSkill: (data: { title: string }) => Promise<void>
  handleChangeSkillType: (type: SkillType) => void
  handleDeleteSkill: (id: string) => void
  handleUpdateSkill: (id: string, value: string) => void
}

export const SkillContext = createContext<SkillContextData>(
  {} as SkillContextData,
)

export function SkillProvider({ children }: { children: ReactNode }) {
  const toast = useToast()
  const [skills, setSkills] = useState<SkillProps[]>([])
  const [skillType, setSkillType] = useState<SkillType>('hard')

  const getAllSkills = useCallback(async () => {
    const realm = await getRealm()
    try {
      const allSkills = realm
        .objects<SkillProps[]>('Skills')
        .filtered(`type = '${skillType}'`)
        .toJSON() as SkillProps[]

      setSkills(allSkills)
    } catch (error) {
      console.log(error)
    } finally {
      realm.close()
    }
  }, [skillType])

  const handleSubmitNewSkill = useCallback(
    async (data: { title: string }) => {
      const realm = await getRealm()
      try {
        await realm.write(async () => {
          const newSkillCreated = realm.create<SkillProps>('Skills', {
            _id: uuid.v4() as string,
            title: data.title,
            type: skillType,
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
        })
      } catch (error) {
        console.log(error)
      } finally {
        realm.close()
      }
    },
    [skillType, toast],
  )
  const handleChangeSkillType = useCallback((type: SkillType) => {
    setSkillType(type)
  }, [])

  const handleDeleteSkill = useCallback(
    async (id: string) => {
      const realm = await getRealm()
      try {
        const skill = realm.objectForPrimaryKey<SkillProps>('Skills', id)
        realm.write(() => {
          realm.delete(skill)
          setSkills((state) => {
            return state.filter((skill) => skill._id !== id)
          })
          toast.show({
            title: 'Skill deleted',
            bgColor: 'green.500',
          })
        })
      } catch (error) {
        console.log(error)
      } finally {
        realm.close()
      }
    },
    [toast],
  )

  const handleUpdateSkill = useCallback(async (id: string, value: string) => {
    const realm = await getRealm()
    try {
      const skillToUpdate = realm.objectForPrimaryKey<SkillProps>('Skills', id)
      realm.write(() => {
        skillToUpdate.title = value

        setSkills((state) => {
          return state.map((skill) => {
            if (skill._id === skillToUpdate._id) {
              skill.title = value
            }

            return skill
          })
        })
      })
    } catch (error) {
      console.log(error)
    } finally {
      realm.close()
    }
  }, [])

  useLayoutEffect(() => {
    getAllSkills()
  }, [getAllSkills])

  return (
    <SkillContext.Provider
      value={{
        handleSubmitNewSkill,
        handleChangeSkillType,
        handleDeleteSkill,
        handleUpdateSkill,
        skills,
        skillType,
      }}
    >
      {children}
    </SkillContext.Provider>
  )
}
