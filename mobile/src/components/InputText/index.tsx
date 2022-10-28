import React, { useState } from 'react'
import { Input, IInputProps, FormControl, Icon, Pressable } from 'native-base'
import { Feather } from '@expo/vector-icons'

type InputProps = {
  leftIconName?: React.ComponentProps<typeof Feather>['name']
  errorMessage?: string | null
} & IInputProps

export function InputText({
  errorMessage = null,
  leftIconName,
  isInvalid,
  type,
  secureTextEntry,
  ...props
}: InputProps) {
  const [showPassword, setShowPassword] = useState(!secureTextEntry)
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid}>
      <Input
        color="white"
        bgColor="dark.100"
        borderColor="transparent"
        borderWidth="1"
        height={52}
        variant="unstyled"
        _focus={{
          borderColor: 'green.500',
          borderWidth: 1,
        }}
        InputLeftElement={
          leftIconName && <Icon as={Feather} name={leftIconName} ml="3" />
        }
        InputRightElement={
          secureTextEntry ? (
            <Pressable onPress={() => setShowPassword((state) => !state)}>
              <Icon
                as={Feather}
                name={showPassword ? 'eye' : 'eye-off'}
                mr="3"
              />
            </Pressable>
          ) : undefined
        }
        secureTextEntry={!showPassword}
        {...props}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
