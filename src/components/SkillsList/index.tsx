import { Box, Text, FlatList } from 'native-base'
import React, { useContext } from 'react'
import LottieView from 'lottie-react-native'
import { CardSkill } from '../CardSkill'

import Animation from '../../assets/animation.json'
import { SkillContext } from '../../contexts/SkillContext'

export function SkillsList() {
  const { skills, handleDeleteSkill } = useContext(SkillContext)
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      data={skills}
      ListEmptyComponent={() => (
        <Box
          width="full"
          height="sm"
          justifyContent="center"
          alignItems="center"
          borderRadius="4"
        >
          <Text color="dark.500" fontSize="xl">
            No one skill
          </Text>
          <LottieView
            autoPlay
            style={{
              width: 150,
              height: 150,
            }}
            source={Animation}
          />
        </Box>
      )}
      keyExtractor={({ id }) => id}
      renderItem={({ item }) => (
        <Box mb="3">
          <CardSkill
            id={item.id}
            title={item.title}
            type={item.type}
            onPressDelete={() => handleDeleteSkill(item.id)}
          />
        </Box>
      )}
    />
  )
}
