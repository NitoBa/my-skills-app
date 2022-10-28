import { Box, Text, FlatList } from 'native-base'
import React, { useContext } from 'react'
import LottieView from 'lottie-react-native'
import { CardSkill } from '../CardSkill'

import Animation from '../../assets/animation.json'
import { SkillContext } from '../../contexts/SkillContext'

export function SkillsList() {
  const { skills, handleDeleteSkill, handleUpdateSkill } =
    useContext(SkillContext)
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
      renderItem={({ item: { id, title, type } }) => (
        <Box mb="3">
          <CardSkill
            title={title}
            type={type}
            onPressDelete={() => handleDeleteSkill(id)}
            onHandleEditKill={(value) => handleUpdateSkill(id, value)}
          />
        </Box>
      )}
    />
  )
}
