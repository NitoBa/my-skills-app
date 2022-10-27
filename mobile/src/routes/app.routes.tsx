import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Home } from 'src/screens/Home'
import { SignInScreen } from '../screens/signIn'
import { SignUpScreen } from '../screens/signUp'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignInScreen} />
      <Screen name="signUp" component={SignUpScreen} />
      <Screen name="home" component={Home} />
    </Navigator>
  )
}
