import { useEffect, useState } from 'react'
import { Alert } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { getQuestions } from '../../actions/questions'
import { clearUserAnswers } from '../../actions/answers'
import routes from '../../navigation/routes'

const useHomeHooks = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()

  const { questions, questionsState } = useSelector(({ questions }) => ({
    questionsState: questions.questionsState,
    questions: questions.questions,
  }))

  const [difficulty, setDifficulty] = useState({ id: 'hard', name: 'Hard' })
  const [prevState, setPrevState] = useState(questionsState)

  const onBeginQuizPress = () => {
    dispatch(clearUserAnswers())
    dispatch(getQuestions({ difficulty: difficulty.id }))
  }

  useEffect(() => {
    if (prevState.loading && questionsState.loaded) {
      navigation.navigate(routes.QUIZ)
    }
    if (!prevState.error && !!questionsState.error) {
      Alert(
        'Error',
        'An error occurred fetching questions',
      )
    }
    setPrevState(questionsState)
  }, [prevState, questionsState, setPrevState])

  return {
    onBeginQuizPress,
    state: {
      difficulty,
      isLoading: questionsState.loading,
      setDifficulty,
    },
  }
}

export default useHomeHooks
