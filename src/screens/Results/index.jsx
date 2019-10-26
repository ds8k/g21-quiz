import React from 'react'
import { FlatList, SafeAreaView, View } from 'react-native'
import {
  BodyText,
  Button,
  Divider,
  Heading,
  Icon,
  Subtitle,
} from 'material-bread'

import { Card } from '../../common/components'

import commonStyles from '../../common/styles'
import screenStyles from './styles'
import useResultsHooks from './hooks'

const Results = () => {
  const {
    answers,
    numberCorrect,
    onPlayAgainPress,
    questions,
  } = useResultsHooks()

  const renderItem = ({ item, index }) => {
    const isCorrect = answers[index] === item.correct_answer

    return (
      <View style={screenStyles.listItem}>
        <BodyText>
          <Icon size={16} name={isCorrect ? 'check' : 'close'} color={isCorrect ? 'green' : 'red'} />
          {`${item.number}. ${item.question}`}
        </BodyText>
        <Subtitle style={screenStyles.listItemAnswer} text={`Correct Answer: ${item.correct_answer}`} />
      </View>
    )
  }

  return (
    <SafeAreaView style={commonStyles.screen}>
      <Card style={screenStyles.card}>
        <FlatList
          ListHeaderComponent={
            <Heading style={commonStyles.header} type={5} text={`You scored ${numberCorrect} / ${questions.length}`} />
          }
          ItemSeparatorComponent={() => <Divider />}
          data={questions}
          renderItem={renderItem}
          horizontal={false}
          keyExtractor={(item) => item.number.toString()}
          showsVerticalScrollIndicator={false}
        />
      </Card>
      <Button
        type="flat"
        text="Play Again?"
        style={screenStyles.playAgainButton}
        onPress={onPlayAgainPress}
      />
    </SafeAreaView>
  )
}

export default Results
