import { Input, IInputProps, FormControl } from 'native-base'
import React from 'react'

type InputProps = {
  errorMessage?: string | null
} & IInputProps

export function InputText({
  errorMessage = null,
  isInvalid,
  ...props
}: InputProps) {
  const invalid = !!errorMessage || isInvalid
  return (
    <FormControl isInvalid={invalid} flex="1">
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
        {...props}
      />
      <FormControl.ErrorMessage>{errorMessage}</FormControl.ErrorMessage>
    </FormControl>
  )
}
