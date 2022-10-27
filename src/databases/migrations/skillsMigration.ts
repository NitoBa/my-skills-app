import { createTable } from '@nozbe/watermelondb/Schema/migrations'

export const skillMigration = {
  // ⚠️ Set this to a number one larger than the current schema version
  toVersion: 2,
  steps: [
    createTable({
      name: 'skills',
      columns: [
        { name: 'title', type: 'string' },
        { name: 'type', type: 'string' },
      ],
    }),
  ],
}
