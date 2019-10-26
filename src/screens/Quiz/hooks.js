import { useEffect, useRef, useState } from 'react'
import { Animated } from 'react-native'
import { useNavigation } from 'react-navigation-hooks'
import { useDispatch, useSelector } from 'react-redux'

import { storeUserAnswer } from '../../actions/answers'
import routes from '../../navigation/routes'

const useQuizHooks = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation()
  const translateX = useRef(new Animated.Value(0))

  const { questions } = useSelector(({ questions }) => ({
    questions: questions.questions,
  }))

  const [currentQuestion, setCurrentQuestion] = useState(questions[0])

  const onSubmitAnswerPress = (answer) => {
    const { number } = currentQuestion

    dispatch(storeUserAnswer(answer))

    if (number === questions.length) {
      navigation.navigate(routes.RESULTS)
    } else {
      Animated.timing(
        translateX.current, {
          toValue: -500,
          duration: 300,
          useNativeDriver: true,
        }
      ).start(() => {
        setCurrentQuestion(questions[number])
        translateX.current.setValue(500)
        Animated.timing(
          translateX.current, {
            toValue: 0,
            duration: 300,
            useNativeDriver: true,
          }
        ).start()
      })
    }
  }

  return {
    currentQuestion,
    onSubmitAnswerPress,
    questions,
    translateX: translateX.current,
  }
}

export default useQuizHooks
