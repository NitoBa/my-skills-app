import { useContext } from 'react'
import { Box, VStack, Icon, Text } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { Header } from '../../components/Header'
import { InputText } from '../../components/InputText'
import { Button } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'

export function Profile() {
  const { user, handleLogout } = useContext(AuthContext)
  return (
    <Box flex="1" safeArea px="4">
      <Header title="Profile" />
      <VStack flex="1" alignItems="center" justifyContent="center" space="3">
        <Box rounded="full" bgColor="gray.800" p="8">
          <Icon name="user" color="white" size="6xl" as={Feather} />
        </Box>
        <Text color="white" fontSize="xl" fontWeight="bold">
          {user?.name}
        </Text>
        <InputText value={user?.email} isDisabled />
        <Button title="Logout" variant="secondary" onPress={handleLogout} />
      </VStack>
    </Box>
  )
}
