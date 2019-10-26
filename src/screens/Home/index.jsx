import React from 'react'
import { SafeAreaView } from 'react-native'
import { Button, Heading, Select, Subtitle } from 'material-bread'

import { Card } from '../../common/components'

import commonStyles from '../../common/styles'
import screenStyles from './styles'
import useHomeHooks from './hooks'

const difficultyLevels = [
  { id: 'easy', name: 'Easy' },
  { id: 'medium', name: 'Medium' },
  { id: 'hard', name: 'Hard' },
]

const Home = () => {
  const {
    difficulty,
    isLoading,
    onBeginQuizPress, 
    setDifficulty,
  } = useHomeHooks()

  return (
    <SafeAreaView style={commonStyles.screen}>
      <Card>
        <Heading style={commonStyles.header} type={4} text="Welcome to the Trivia Challenge!"/>
        <Subtitle style={commonStyles.header} type={1} text="You will be presented with 10 True or False questions." />
        <Subtitle style={commonStyles.header} type={1} text="Can you score 100%?" />
        <Select
          label="Difficulty Level"
          type="outlined"
          style={screenStyles.difficultyPicker}
          menuItems={difficultyLevels}
          selectedItem={difficulty.name}
          onSelect={(value) => setDifficulty(value)}
        />
        <Button
          type="flat"
          loading={isLoading}
          text="Begin"
          onPress={onBeginQuizPress}
          style={screenStyles.beginButton}
        />
      </Card>
    </SafeAreaView>
  )
}

export default Home
