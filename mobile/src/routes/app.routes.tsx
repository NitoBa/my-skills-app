import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Profile } from '../screens/Profile'
import { Home } from '../screens/Home'
import { SignInScreen } from '../screens/SignIn'
import { SignUpScreen } from '../screens/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignInScreen} />
      <Screen name="signUp" component={SignUpScreen} />
      <Screen name="home" component={Home} />
      <Screen name="profile" component={Profile} />
    </Navigator>
  )
}
