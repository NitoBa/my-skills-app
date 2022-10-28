import React, { useContext, useState } from 'react'
import { Box, VStack, Icon, Text, Modal } from 'native-base'
import { Feather } from '@expo/vector-icons'
import { Header } from '../../components/Header'
import { InputText } from '../../components/InputText'
import { Button } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'

export function Profile() {
  const [isOpenModal, setIsModalOpen] = useState(false)
  const { user, handleLogout } = useContext(AuthContext)

  function handleSignOut() {
    setIsModalOpen(true)
  }

  return (
    <>
      <Modal
        flex={1}
        isOpen={isOpenModal}
        onClose={() => setIsModalOpen(false)}
        bgColor="gray.850"
        avoidKeyboard
      >
        <Modal.Content bgColor="gray.900">
          <Modal.Header bgColor="gray.900" borderColor="gray.800">
            <Text color="white" fontSize="md" fontWeight="bold">
              Logout
            </Text>
          </Modal.Header>
          <Modal.Body>
            <Text color="white" fontSize="md" fontWeight="bold">
              Are you sure that want logout the app?
            </Text>
          </Modal.Body>
          <Modal.Footer bgColor="gray.900" borderColor="transparent">
            <VStack w="full" space="3">
              <Button title="Confirm" onPress={handleLogout} />
              <Button
                title="Cancel"
                variant="secondary"
                onPress={() => setIsModalOpen(false)}
              />
            </VStack>
          </Modal.Footer>
        </Modal.Content>
      </Modal>

      <Box flex="1" safeArea px="4" bgColor="gray.900">
        <Header title="Profile" />
        <VStack flex="1" alignItems="center" justifyContent="center" space="3">
          <Box rounded="full" bgColor="gray.800" p="8">
            <Icon name="user" color="white" size="6xl" as={Feather} />
          </Box>
          <Text color="white" fontSize="2xl" fontWeight="bold">
            {user?.name}
          </Text>
          <InputText value={user?.email} isDisabled />
          <Button title="Synchronize" onPress={() => {}} />
          <Button title="Logout" variant="secondary" onPress={handleSignOut} />
        </VStack>
      </Box>
    </>
  )
}
