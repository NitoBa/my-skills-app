import {
  createContext,
  ReactNode,
  useCallback,
  useLayoutEffect,
  useState,
} from 'react'
import { useToast } from 'native-base'
import { Q } from '@nozbe/watermelondb'
import { SkillProps, SkillType } from '../types/skill'
import { database } from '../databases'
import { SkillModel } from '../databases/models/skillModel'

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
    const allSkills = await database
      .get<SkillModel>(SkillModel.table)
      .query(Q.where('type', skillType))
      .fetch()

    setSkills(() => {
      return allSkills.map((skill) => {
        return {
          id: skill.id,
          type: skill.type as SkillType,
          title: skill.title,
        }
      })
    })
  }, [skillType])

  const handleSubmitNewSkill = useCallback(
    async (data: { title: string }) => {
      await database.write(async () => {
        const newSkillCreated = await database
          .get<SkillModel>(SkillModel.table)
          .create((dataDB) => {
            dataDB.title = data.title
            dataDB.type = skillType
          })

        setSkills((state) => [
          ...state,
          {
            id: newSkillCreated.id,
            title: newSkillCreated.title,
            type: skillType,
          },
        ])
        toast.show({
          title: 'Skill added!',
          backgroundColor: 'green.500',
        })
      })
    },
    [skillType],
  )
  const handleChangeSkillType = useCallback((type: SkillType) => {
    setSkillType(type)
  }, [])

  const handleDeleteSkill = useCallback(
    async (id: string) => {
      await database.write(async () => {
        const skill = await database.get<SkillModel>(SkillModel.table).find(id)
        await skill.markAsDeleted()
        setSkills((state) => {
          return state.filter((skill) => skill.id !== id)
        })
        toast.show({
          title: 'Skill deleted',
          bgColor: 'green.500',
        })
      })
    },
    [toast],
  )

  const handleUpdateSkill = useCallback(
    async (id: string, value: string) => {
      await database.write(async () => {
        const skillToUpdate = await database
          .get<SkillModel>(SkillModel.table)
          .find(id)
        skillToUpdate.update((skill) => {
          skill.title = value
        })
        getAllSkills()
      })
    },
    [getAllSkills],
  )

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
