import { Button } from '@components/Button'
import { InputText } from '@components/InputText'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  KeyboardAvoidingView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import React, { useContext } from 'react'
import { Platform } from 'react-native'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { SignUpResponse } from '../../types/signUpResponse'
import { handleSignUpService, SignUpData } from '../../services/signUpService'
import { Loading } from '@components/Loading/Index'
import { AuthContext } from '@contexts/AuthContext'

type SignUpFormData = {
  email: string
  password: string
  confirmPassword: string
}

const signUpFormSchema = yup.object({
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

// TODO: it should be able to create a new account to the user
// TODO: it should be able to login a user on application
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

  const { mutate, isLoading } = useMutation<SignUpResponse, any, SignUpData>(
    (data) => handleSignUpService(data),
  )

  async function handleSignUp({ email, password }: SignUpFormData) {
    mutate(
      {
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
          handleSaveUserCredentials(
            data?.returnTokenVM.accessToken as string,
            email,
          )
          console.log('data', data)
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
          Sign Up Cryme
        </Text>
      </Center>
      <VStack space="4">
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
          {isLoading ? (
            <Center h="105">
              <Loading />
            </Center>
          ) : (
            <>
              <Button title="Register" onPress={handleSubmit(handleSignUp)} />
              <Button
                title="Login"
                variant="secondary"
                onPress={() => navigation.goBack()}
              />
            </>
          )}
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  )
}
