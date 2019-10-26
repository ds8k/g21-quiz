import { useEffect, useState } from 'react'
import { useNavigation } from 'react-navigation-hooks'
import { useSelector } from 'react-redux'

import routes from '../../navigation/routes'

const useResultsHooks = () => {
  const navigation = useNavigation()

  const { answers, questions } = useSelector(({ answers, questions }) => ({
    answers: answers.answers,
    questions: questions.questions,
  }))

  const onPlayAgainPress = () => {
    navigation.navigate(routes.HOME)
  }

  const numberCorrect = answers.reduce((acc, isCorrect) => {
    if (isCorrect) return acc + 1

    return acc
  }, 0)

  return {
    answers,
    numberCorrect,
    onPlayAgainPress,
    questions,
  }
}

export default useResultsHooks
