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

  const numberCorrect = answers.reduce((acc, answer, index) => {
    const isCorrect = answer === questions[index].correct_answer

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
