import React, { useContext, useState } from 'react'
import { Box, VStack, Icon, Text, Modal, useToast } from 'native-base'
import { synchronize } from '@nozbe/watermelondb/sync'
import NetInfo from '@react-native-community/netinfo'
import { Feather } from '@expo/vector-icons'
import { Header } from '../../components/Header'
import { InputText } from '../../components/InputText'
import { Button } from '../../components/Button'
import { AuthContext } from '../../contexts/AuthContext'
import { database } from '../../databases'
import { api } from '../../lib/axios'

export function Profile() {
  const [isOpenModal, setIsModalOpen] = useState(false)
  const [loadingSync, setIsLoadingSync] = useState(false)
  const { user, handleLogout } = useContext(AuthContext)
  const toast = useToast()

  function handleSignOut() {
    setIsModalOpen(true)
  }

  async function handleSynchronizeData() {
    try {
      setIsLoadingSync(true)
      const response = await NetInfo.fetch()

      if (!response.isConnected) {
        toast.show({
          title: 'Verify your connection with internet',
          bgColor: 'danger.500',
        })
        return
      }

      await synchronize({
        database,
        pullChanges: async ({ lastPulledAt }) => {
          const {
            data: { changes, timestamp },
          } = await api.get(`/skills/sync/pull/${lastPulledAt || 0}`)
          toast.show({
            title: 'Great, your data was successfully synced',
            bgColor: 'success.500',
          })
          setIsLoadingSync(false)
          return { changes, timestamp }
        },
        pushChanges: async ({ changes, lastPulledAt }) => {
          const skills = changes.skills
          await api.post('/skills/sync/push', {
            skills,
            lastPulledAt,
          })
          toast.show({
            title: 'Great, your data was successfully synced',
            bgColor: 'success.500',
          })
          const deletedIDs = await database.adapter.getDeletedRecords('skills')
          await database.adapter.destroyDeletedRecords('skills', deletedIDs)
          setIsLoadingSync(false)
        },
      })
    } catch (error) {
      console.log(error)
      setIsLoadingSync(false)
    }
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
          <VStack w="full" space="3" mt="3">
            <Button
              title="Synchronize"
              onPress={handleSynchronizeData}
              loading={loadingSync}
            />
            <Button
              title="Logout"
              variant="secondary"
              onPress={handleSignOut}
            />
          </VStack>
        </VStack>
      </Box>
    </>
  )
}
