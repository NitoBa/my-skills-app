import { Box, HStack, Text } from 'native-base'
import React, { useContext } from 'react'
import { TouchableOpacity } from 'react-native'
import { SkillContext } from '../../contexts/SkillContext'

export function SkillFilter() {
  const { skillType, handleChangeSkillType } = useContext(SkillContext)

  return (
    <HStack alignItems="center" justifyContent="space-between" space="4">
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleChangeSkillType('hard')}
      >
        <Box
          bgColor={skillType === 'hard' ? 'green.500' : 'dark.100'}
          height={52}
          px="2"
          borderRadius="4"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontWeight={skillType === 'hard' ? 700 : 400}>
            Hard Skills
          </Text>
        </Box>
      </TouchableOpacity>
      <TouchableOpacity
        style={{ flex: 1 }}
        onPress={() => handleChangeSkillType('soft')}
      >
        <Box
          bgColor={skillType === 'soft' ? 'green.500' : 'dark.100'}
          height={52}
          px="2"
          borderRadius="4"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="white" fontWeight={skillType === 'soft' ? 700 : 400}>
            Soft Skills
          </Text>
        </Box>
      </TouchableOpacity>
    </HStack>
  )
}
