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
    // reset stored answers before starting quiz
    dispatch(clearUserAnswers())

    // get new questions
    dispatch(getQuestions({ difficulty: difficulty.id }))
  }

  useEffect(() => {
    // if questions successfully loaded, navigate to quiz
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
    difficulty,
    isLoading: questionsState.loading,
    onBeginQuizPress,
    setDifficulty,
  }
}

export default useHomeHooks
