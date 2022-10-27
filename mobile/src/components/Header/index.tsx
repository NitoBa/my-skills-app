import { useRoute, useNavigation } from '@react-navigation/native'
import { Text, Box, HStack, Icon, Center } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native'

type Props = {
  title: string
}

export function Header({ title }: Props) {
  const navigation = useNavigation()
  const { name } = useRoute()

  return (
    <HStack alignItems="center" justifyContent="space-between">
      {name === 'home' && (
        <>
          <Text color="white" fontSize="2xl" fontWeight={700}>
            {title}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('profile')}>
            <Box bgColor="gray.800" p="3" rounded="full">
              <Icon name="user" color="white" size="sm" as={Feather} />
            </Box>
          </TouchableOpacity>
        </>
      )}

      {name === 'profile' && (
        <>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" color="white" size="xl" as={Feather} />
          </TouchableOpacity>
          <Center flex="1">
            <Text color="white" fontSize="2xl" fontWeight={700} flex="1">
              {title}
            </Text>
          </Center>
        </>
      )}
    </HStack>
  )
}
