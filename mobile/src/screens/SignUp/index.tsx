import React, { useContext } from 'react'
import { Platform } from 'react-native'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import * as yup from 'yup'
import { AuthContext } from '../../contexts/AuthContext'
import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  KeyboardAvoidingView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { AuthResponse } from '../../types/authResponse'
import { handleSignUpService, SignUpData } from '../../services/signUpService'

type SignUpFormData = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

const signUpFormSchema = yup.object({
  name: yup
    .string()
    .required('Name is required')
    .min(4, 'Name should be at least 4 characters'),
  email: yup
    .string()
    .required('Email is required')
    .email('Enter with valid email'),
  password: yup.string().required('Password is required'),
  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password'), null], 'Passwords not match'),
})

export function SignUpScreen() {
  const { handleSaveUserCredentials } = useContext(AuthContext)
  const toast = useToast()
  const navigation = useNavigation()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpFormData>({
    resolver: yupResolver(signUpFormSchema),
  })

  const { mutate, isLoading } = useMutation<AuthResponse, any, SignUpData>(
    (data) => handleSignUpService(data),
  )

  async function handleSignUp({ name, email, password }: SignUpFormData) {
    mutate(
      {
        name,
        email,
        password,
      },
      {
        onSettled(data, error) {
          if (error) {
            toast.show({
              title: 'Error on register new user',
              placement: 'top',
              bgColor: 'danger.500',
            })
            return
          }

          if (data) {
            handleSaveUserCredentials(data.accessToken, data.user)
          }
        },
      },
    )
  }

  return (
    <KeyboardAvoidingView
      flex="1"
      bgColor="gray.900"
      px="4"
      justifyContent="center"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center>
        <Text color="white" fontSize="2xl" fontWeight="bold" py="8">
          Sign Up
        </Text>
      </Center>
      <VStack space="4">
        <Controller
          name="name"
          control={control}
          render={({ field: { onChange } }) => (
            <InputText
              placeholder="Enter with your name"
              onChangeText={onChange}
              errorMessage={errors.name?.message}
            />
          )}
        />
        <Controller
          name="email"
          control={control}
          render={({ field: { onChange } }) => (
            <InputText
              placeholder="Enter with your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={onChange}
              errorMessage={errors.email?.message}
            />
          )}
        />
        <Controller
          name="password"
          control={control}
          render={({ field: { onChange } }) => (
            <InputText
              placeholder="Enter with your password"
              type="password"
              onChangeText={onChange}
              errorMessage={errors.password?.message}
            />
          )}
        />

        <Controller
          name="confirmPassword"
          control={control}
          render={({ field: { onChange } }) => (
            <InputText
              placeholder="Confirm your password"
              type="password"
              onChangeText={onChange}
              errorMessage={errors.confirmPassword?.message}
            />
          )}
        />

        <VStack space="3" mt="3">
          <Button
            title="Register"
            onPress={handleSubmit(handleSignUp)}
            loading={isLoading}
          />
          <Button
            disabled={isLoading}
            title="Login"
            variant="secondary"
            onPress={() => navigation.goBack()}
          />
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  )
}
