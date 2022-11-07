import { Text, useTheme } from 'native-base'
import { useCallback, useEffect, useState } from 'react'
import { useNetInfo, addEventListener } from '@react-native-community/netinfo'
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  interpolate,
  withTiming,
  withSequence,
  withDelay,
} from 'react-native-reanimated'

export function SnackBarConnection() {
  const { colors } = useTheme()
  const { isInternetReachable, isConnected } = useNetInfo()
  const [hasConnection, setHasConnection] = useState(isConnected)
  const transform = useSharedValue(0)

  const style = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateY: interpolate(transform.value, [0, 1], [0, 60]),
        },
      ],
    }
  })

  const showConnectionFeedback = useCallback(() => {
    return addEventListener((e) => {
      setHasConnection(isConnected)
      transform.value = withSequence(
        withTiming(0, { duration: 1000 }),
        withDelay(2000, withTiming(1, { duration: 1000 })),
      )
    })
  }, [transform, isConnected])

  useEffect(() => {
    const unsubscribe = showConnectionFeedback()

    return () => {
      unsubscribe()
    }
  }, [showConnectionFeedback])

  return (
    <Animated.View
      style={[
        {
          width: '100%',
          backgroundColor: hasConnection ? colors.green[500] : colors.red[500],
          justifyContent: 'center',
          alignItems: 'center',
          position: 'absolute',
          zIndex: 4,
          bottom: 0,
          right: 0,
          height: 50,
        },
        style,
      ]}
    >
      <Text color="white" fontWeight="medium" position="absolute">
        {hasConnection ? 'Connected' : 'No Connected'}
      </Text>
    </Animated.View>
  )
}
