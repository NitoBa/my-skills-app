import { synchronize } from '@nozbe/watermelondb/sync'
import { api } from '../../lib/axios'
import { database } from '..'

export async function mySync() {
  return await synchronize({
    database,
    pullChanges: async ({ lastPulledAt }) => {
      const {
        data: { changes, timestamp },
      } = await api.get(`/skills/sync/pull/${lastPulledAt || 0}`)
      return { changes, timestamp }
    },
    pushChanges: async ({ changes, lastPulledAt }) => {
      const skills = changes.skills
      await api.post('/skills/sync/push', {
        skills,
        lastPulledAt,
      })
    },
  })
}
