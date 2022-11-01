import { Database } from '@nozbe/watermelondb'
import SQLiteDatabase from '@nozbe/watermelondb/adapters/sqlite'
import { SkillModel } from './models/skillModel'
import { schemas } from './schemas'

const adapter = new SQLiteDatabase({
  schema: schemas,
})

export const database = new Database({
  adapter,
  modelClasses: [SkillModel],
  actionsEnabled: true,
})
