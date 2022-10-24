import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { Home } from './src/screens/Home'
import { SkillProvider } from './src/contexts/SkillContext'

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NativeBaseProvider>
        <SkillProvider>
          <Home />
        </SkillProvider>
      </NativeBaseProvider>
    </>
  )
}
