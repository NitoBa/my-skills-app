import { Box } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { useNavigationTheme } from '../hooks/useNavigationTheme'
import { LayoutByAuthState } from '../components/LayoutByAuthState'

export function Routes() {
  const theme = useNavigationTheme()
  return (
    <Box flex="1" bgColor="gray.900">
      <NavigationContainer theme={theme}>
        <LayoutByAuthState />
      </NavigationContainer>
    </Box>
  )
}
