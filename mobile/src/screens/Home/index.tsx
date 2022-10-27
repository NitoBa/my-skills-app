import React, { useContext } from 'react'
import { Box, HStack, KeyboardAvoidingView, Text, VStack } from 'native-base'
import { Platform, TouchableOpacity } from 'react-native'

import Feather from '@expo/vector-icons/Feather'

import { InputText } from '../../components/InputText'
import { SkillFilter } from '../../components/SkillFilter'
import { SkillsList } from '../../components/SkillsList'
import { SkillContext } from '../../contexts/SkillContext'
import { Header } from '../../components/Header'

import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'

type SkillFormData = {
  title: string
}

const skillFormSchema = yup
  .object()
  .shape({
    title: yup
      .string()
      .required('Skill is required')
      .min(4, 'Skill should be at least 4 characters'),
  })
  .required()

export function Home() {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SkillFormData>({
    resolver: yupResolver(skillFormSchema),
  })
  const { handleSubmitNewSkill } = useContext(SkillContext)

  function handleCreateNewSkill(data: SkillFormData) {
    handleSubmitNewSkill(data)
    reset()
  }

  return (
    <KeyboardAvoidingView
      flex="1"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Box safeArea bgColor="dark.50" flex={1} px={4}>
        <Header title="Skill App" />
        <HStack alignItems="flex-start" space="2" my="4">
          <Box flex="1">
            <Controller
              control={control}
              name="title"
              render={({ field: { onChange, value } }) => (
                <InputText
                  placeholder="Type your skill..."
                  onChangeText={onChange}
                  errorMessage={errors.title?.message}
                  value={value}
                />
              )}
            />
          </Box>
          <TouchableOpacity onPress={handleSubmit(handleCreateNewSkill)}>
            <Box
              bgColor="dark.100"
              height={52}
              width={52}
              borderRadius="4"
              alignItems="center"
              justifyContent="center"
            >
              <Feather name="plus" color="#FFF" size={24} />
            </Box>
          </TouchableOpacity>
        </HStack>
        <SkillFilter />
        <VStack mt="8" space="3" flex="1">
          <Text color="white" fontSize="xl" fontWeight={700}>
            My skills
          </Text>
          <SkillsList />
        </VStack>
      </Box>
    </KeyboardAvoidingView>
  )
}
