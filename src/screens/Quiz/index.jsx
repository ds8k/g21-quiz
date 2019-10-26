import React from 'react'
import { SafeAreaView, View } from 'react-native'
import { Button, Heading, Subtitle } from 'material-bread'

import { Card } from '../../common/components'

import commonStyles from '../../common/styles'
import screenStyles from './styles'
import useQuizHooks from './hooks'

const Quiz = () => {
  const {
    currentQuestion,
    onSubmitAnswerPress,
    questions,
    translateX,
  } = useQuizHooks()

  const {
    category,
    number,
    question,
  } = currentQuestion

  return (
    <SafeAreaView style={commonStyles.screen}>
      <Card style={{ transform: [{ translateX }]}}>
        <Heading style={commonStyles.header} type={5} text={category} />
        <Subtitle style={commonStyles.header} type={2} text={`${number} / ${questions.length}`} />
        <Subtitle style={commonStyles.header} type={1} text={question} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            style={screenStyles.trueButton}
            color="green"
            type="flat"
            text="True"
            onPress={() => onSubmitAnswerPress('True')}
          />
          <Button
            color="red"
            type="flat"
            text="False"
            onPress={() => onSubmitAnswerPress('False')}
          />
        </View>
      </Card>
    </SafeAreaView>
  )
}

export default Quiz
