import { DefaultTheme } from '@react-navigation/native'
import { useTheme } from 'native-base'

export function useNavigationTheme() {
  const { colors } = useTheme()
  const theme = DefaultTheme
  theme.colors.background = colors.gray[900]

  return theme
}
