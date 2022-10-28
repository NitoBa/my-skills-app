import { Text, Box } from 'native-base'
import { TouchableOpacity, TouchableOpacityProps } from 'react-native'
import { Loading } from '../Loading'

type Props = {
  title: string
  variant?: 'primary' | 'secondary'
  loading?: boolean
} & TouchableOpacityProps

export function Button({
  title,
  variant = 'primary',
  disabled = false,
  loading = false,
  ...props
}: Props) {
  return (
    <TouchableOpacity
      style={{ width: '100%' }}
      disabled={disabled || loading}
      {...props}
    >
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
        opacity={disabled || loading ? '0.5' : '1'}
      >
        {loading ? (
          <Loading color={variant === 'primary' ? 'gray.900' : 'green.500'} />
        ) : (
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
        )}
      </Box>
    </TouchableOpacity>
  )
}
