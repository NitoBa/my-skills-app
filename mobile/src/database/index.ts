import Realm, { FlexibleSyncConfiguration } from 'realm'
import { APP_REALM_ID } from '@env'
import { schemas } from './schemas'

export const getRealm = async () => {
  const app = new Realm.App({ id: APP_REALM_ID })
  const credentials = Realm.Credentials.anonymous()
  await app.logIn(credentials)
  const syncConfig: FlexibleSyncConfiguration = {
    user: app.currentUser,
    flexible: true,
  }

  return await Realm.open({
    path: 'SkillAppDB',
    schema: schemas,
    sync: syncConfig,
  })
}
