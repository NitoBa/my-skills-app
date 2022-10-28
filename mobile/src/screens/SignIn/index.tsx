import { Button } from '../../components/Button'
import { InputText } from '../../components/InputText'
import { AuthContext } from '../../contexts/AuthContext'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  KeyboardAvoidingView,
  Text,
  useToast,
  VStack,
} from 'native-base'
import { useContext } from 'react'
import { Platform } from 'react-native'
import { handleSignInService, SignInData } from '../../services/signInService'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { Controller, useForm } from 'react-hook-form'
import { useMutation } from '@tanstack/react-query'
import { AuthResponse } from '../../types/authResponse'

type SignInFormData = {
  email: string
  password: string
}

const signInFormSchema = yup
  .object()
  .shape({
    email: yup
      .string()
      .required('Email is required')
      .email('Enter with valid email'),
    password: yup.string().required('Password is required'),
  })
  .required()

export function SignInScreen() {
  const { handleSaveUserCredentials } = useContext(AuthContext)
  const navigation = useNavigation()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInFormData>({
    resolver: yupResolver(signInFormSchema),
  })

  const { mutate, isLoading } = useMutation<AuthResponse, any, SignInData>(
    (data) => handleSignInService(data),
  )

  const toast = useToast()

  async function handleSignIn({ email, password }: SignInFormData) {
    mutate(
      { email, password },
      {
        onSettled(result, error) {
          if (error) {
            toast.show({
              title: 'Email or password incorrect',
              bgColor: 'danger.500',
              placement: 'top',
            })
            return
          }
          if (result) {
            handleSaveUserCredentials(result.accessToken, result.user)
          }
        },
      },
    )
  }

  return (
    <KeyboardAvoidingView
      flex="1"
      px="4"
      bgColor="gray.900"
      justifyContent="center"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Center py="8">
        <Text color="white" fontSize="4xl" fontWeight="bold">
          Sign In
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
              autoCorrect={false}
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

        <VStack space="3" mt="3">
          <Button
            title="Login"
            onPress={handleSubmit(handleSignIn)}
            loading={isLoading}
          />
          <Button
            disabled={isLoading}
            title="Create Account"
            variant="secondary"
            onPress={() => navigation.navigate('signUp')}
          />
        </VStack>
      </VStack>
    </KeyboardAvoidingView>
  )
}
