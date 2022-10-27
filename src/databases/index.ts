import { Database } from '@nozbe/watermelondb'
import SQLiteDatabase from '@nozbe/watermelondb/adapters/sqlite'
import { SkillModel } from './models/skillModel'
import { schemas } from './schemas'
import { migrations } from './migrations'

const adapter = new SQLiteDatabase({
  schema: schemas,
  migrations,
})

export const database = new Database({
  adapter,
  modelClasses: [SkillModel],
})
