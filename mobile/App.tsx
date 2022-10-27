import React from 'react'
import { StatusBar } from 'expo-status-bar'
import { NativeBaseProvider } from 'native-base'
import { SkillProvider } from './src/contexts/SkillContext'
import { Routes } from './src/routes'
import { QueryClientProvider } from '@tanstack/react-query'
import { client } from './src/lib/react-query'
import { AuthProvider } from './src/contexts/AuthContext'

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <NativeBaseProvider>
        <QueryClientProvider client={client}>
          <AuthProvider>
            <SkillProvider>
              <Routes />
            </SkillProvider>
          </AuthProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </>
  )
}
