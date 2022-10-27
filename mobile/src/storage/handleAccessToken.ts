import AsyncStorage from '@react-native-async-storage/async-storage'
import { TOKEN } from './storageConfig'

export async function saveToken(accessToken: string) {
  // eslint-disable-next-line no-useless-catch
  try {
    await AsyncStorage.setItem(TOKEN, accessToken)
  } catch (error) {
    throw error
  }
}

export async function getAccessToken() {
  // eslint-disable-next-line no-useless-catch
  try {
    return await AsyncStorage.getItem(TOKEN)
  } catch (error) {
    throw error
  }
}

export async function clearAccessToken() {
  // eslint-disable-next-line no-useless-catch
  try {
    return await AsyncStorage.removeItem(TOKEN)
  } catch (error) {
    throw error
  }
}
