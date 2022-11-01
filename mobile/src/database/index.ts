import Realm from 'realm'
import { schemas } from './schemas'

export const getRealm = async () =>
  await Realm.open({
    path: 'my-skills-app-db',
    schema: schemas,
  })
