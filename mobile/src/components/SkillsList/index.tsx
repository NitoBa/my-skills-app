import { Box, Text, FlatList, KeyboardAvoidingView } from 'native-base'
import React, { useContext } from 'react'
import LottieView from 'lottie-react-native'
import { CardSkill } from '../CardSkill'

import Animation from '../../assets/animation.json'
import { SkillContext } from '../../contexts/SkillContext'

export function SkillsList() {
  const { skills, handleDeleteSkill, handleUpdateSkill } =
    useContext(SkillContext)
  return (
    <KeyboardAvoidingView behavior="height" flex="1">
      <FlatList
        automaticallyAdjustKeyboardInsets
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
        keyExtractor={({ _id }) => _id}
        renderItem={({ item: { _id, title, type } }) => (
          <Box mb="3">
            <CardSkill
              title={title}
              type={type}
              onPressDelete={() => handleDeleteSkill(_id)}
              onHandleEditKill={(value) => handleUpdateSkill(_id, value)}
            />
          </Box>
        )}
      />
    </KeyboardAvoidingView>
  )
}
