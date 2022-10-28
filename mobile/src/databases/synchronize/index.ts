import { synchronize } from '@nozbe/watermelondb/sync'
import { api } from 'src/lib/axios'
import { database } from '..'

export async function mySync() {
  await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      try {
        const { data } = await api.get(`/skills/sync/pull/${lastPulledAt || 0}`)
        return { changes: data.changes, timestamp: data.timestamp }
      } catch (error) {
        throw new Error('Fail to synchronize data')
      }
    },
    pushChanges: async ({ changes }) => {
      try {
        const skills = changes.skills
        await api.post('/skills/sync/push', skills)
      } catch (error) {
        throw new Error('Fail to synchronize data')
      }
    },
    migrationsEnabledAtVersion: 1,
  })
}
