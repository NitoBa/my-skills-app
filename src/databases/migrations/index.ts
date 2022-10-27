import { schemaMigrations } from '@nozbe/watermelondb/Schema/migrations'
import { skillMigration } from './skillsMigration'

export const migrations = schemaMigrations({
  migrations: [skillMigration],
})
