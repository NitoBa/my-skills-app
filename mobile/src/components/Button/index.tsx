import { Text, Box } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = {
  title: string
  variant?: 'primary' | 'secondary'
} & TouchableOpacityProps

export function Button({ title, variant = 'primary', ...props }: Props) {
  return (
    <TouchableOpacity style={{ width: '100%' }} {...props}>
      <Box
        justifyContent="center"
        alignItems="center"
        px="4"
        py="3"
        borderRadius="4"
        borderColor="green.500"
        borderWidth="1"
        bgColor={
          variant === 'primary'
            ? 'green.500'
            : variant === 'secondary'
            ? 'transparent'
            : 'green.500'
        }
      >
        <Text
          color={
            variant === 'primary'
              ? 'white'
              : variant === 'secondary'
              ? 'green.500'
              : 'white'
          }
        >
          {title}
        </Text>
      </Box>
    </TouchableOpacity>
  )
}
