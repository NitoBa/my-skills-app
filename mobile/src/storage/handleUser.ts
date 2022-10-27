import AsyncStorage from '@react-native-async-storage/async-storage'
import { User } from '../types/user'
import { USER } from './storageConfig'

export async function getUserFromLocalStorage(): Promise<User | null> {
  try {
    const user = await AsyncStorage.getItem(USER)

    if (!user) {
      return null
    }

    return JSON.parse(user) as User
  } catch (error) {
    return null
  }
}

export async function setUserToLocalStorage(user: User): Promise<void> {
  try {
    await AsyncStorage.setItem(USER, JSON.stringify(user))
  } catch (error) {}
}
