import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { SignInScreen } from '../screens/SignIn'
import { SignUpScreen } from '../screens/SignUp'

const { Navigator, Screen } = createNativeStackNavigator()

export function AuthRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }}>
      <Screen name="signIn" component={SignInScreen} />
      <Screen name="signUp" component={SignUpScreen} />
    </Navigator>
  )
}
