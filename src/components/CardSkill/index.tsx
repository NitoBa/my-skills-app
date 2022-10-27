import { Box, HStack, Text, VStack } from 'native-base'
import React, { useState } from 'react'
import { TouchableOpacity } from 'react-native'
import Feather from '@expo/vector-icons/Feather'
import { InputText } from '../InputText'
import { SkillProps } from '../../types/skill'

type Props = {
  onPressDelete: () => void
} & SkillProps

export function CardSkill({ title, type, onPressDelete }: Props) {
  const [isEditing, setIsEditing] = useState(false)

  function toggleEditSkill() {
    setIsEditing((state) => !state)
  }

  function handleEditSkill() {
    toggleEditSkill()
  }

  return (
    <Box bgColor="dark.100" borderRadius="4" width="full" p="3">
      <VStack space="3">
        <HStack alignItems="flex-start" justifyContent="space-between">
          <Text color="white" fontSize="lg" fontWeight="bold" numberOfLines={2}>
            {title}
          </Text>
          <Box bgColor="green.500" py="1" px="2" rounded="full">
            <Text color="white" fontWeight="bold">
              {type}
            </Text>
          </Box>
        </HStack>
        <HStack space="3">
          <TouchableOpacity onPress={onPressDelete}>
            <Box bgColor="dark.200" p="2" borderRadius="3">
              <Feather color="#FFF" size={20} name="trash" />
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleEditSkill}>
            <Box bgColor="dark.200" p="2" borderRadius="3">
              <Feather color="#FFF" size={20} name="edit-2" />
            </Box>
          </TouchableOpacity>
        </HStack>
        {isEditing && (
          <VStack space="3">
            <InputText
              placeholder="type to edit your skill"
              bgColor="dark.200"
            />
            <TouchableOpacity onPress={handleEditSkill}>
              <Box
                bgColor="green.500"
                p="2"
                borderRadius="4"
                alignItems="center"
                justifyContent="center"
              >
                <HStack space="2" alignItems="center">
                  <Text color="white" fontWeight="medium">
                    Edit
                  </Text>
                  <Feather color="#FFF" size={14} name="edit-2" />
                </HStack>
              </Box>
            </TouchableOpacity>
          </VStack>
        )}
      </VStack>
    </Box>
  )
}
