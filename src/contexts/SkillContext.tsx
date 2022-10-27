import { createContext, ReactNode, useCallback, useState } from 'react'
import { SkillProps, SkillType } from '../types/skill'
import { database } from '../databases'
import { SkillModel } from '../databases/models/skillModel'
import { Alert } from 'react-native'

type SkillContextData = {
  skillType: SkillType
  skills: SkillProps[]
  handleSubmitNewSkill: (data: { title: string }) => Promise<void>
  handleChangeSkillType: (type: SkillType) => void
}

export const SkillContext = createContext<SkillContextData>(
  {} as SkillContextData,
)

export function SkillProvider({ children }: { children: ReactNode }) {
  // eslint-disable-next-line no-unused-vars
  const [skills, setSkills] = useState<SkillProps[]>([])
  const [skillType, setSkillType] = useState<SkillType>('hard')

  const handleSubmitNewSkill = useCallback(
    async (data: { title: string }) => {
      await database.write(async () => {
        await database.get<SkillModel>(SkillModel.table).create((dataDB) => {
          dataDB.title = data.title
          dataDB.type = skillType
        })
      })

      Alert.alert('Skill', 'Skill created!')
    },
    [skillType],
  )
  const handleChangeSkillType = useCallback((type: SkillType) => {
    setSkillType(type)
  }, [])

  return (
    <SkillContext.Provider
      value={{ handleSubmitNewSkill, handleChangeSkillType, skills, skillType }}
    >
      {children}
    </SkillContext.Provider>
  )
}
