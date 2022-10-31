import { synchronize } from '@nozbe/watermelondb/sync'
import { api } from '../../lib/axios'
import { database } from '..'

export async function mySync() {
  return await new Promise<void>((resolve, reject) => {
    synchronize({
      database,
      pullChanges: async ({ lastPulledAt }) => {
        try {
          const { data } = await api.get(
            `/skills/sync/pull/${lastPulledAt || 0}`,
          )
          resolve()
          return { changes: data.changes, timestamp: data.timestamp }
        } catch (error) {
          console.log('Pull error', error)
          reject(new Error('Fail to synchronize data'))
          throw new Error('Fail to synchronize data')
        }
      },
      pushChanges: async ({ changes, lastPulledAt }) => {
        try {
          const skills = changes.skills
          await api.post('/skills/sync/push', {
            skills,
            lastPulledAt,
          })
          resolve()
        } catch (error) {
          console.log('Push error', error)
          reject(new Error('Fail to synchronize data'))
          throw new Error('Fail to synchronize data')
        }
      },
      migrationsEnabledAtVersion: 1,
    })
  })
}
