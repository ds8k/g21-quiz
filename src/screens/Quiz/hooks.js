import { useRef, useState } from 'react'
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

    // if current question is last one, we want to show results
    if (number === questions.length) {
      navigation.navigate(routes.RESULTS)
    } else {
      // animate card off screen
      Animated.timing(
        translateX.current, {
          toValue: -500,
          duration: 200,
          useNativeDriver: true,
        }
      ).start(() => {
        // update the current question
        setCurrentQuestion(questions[number])

        // "move" the card to the right side
        translateX.current.setValue(500)

        // animate back into view
        Animated.timing(
          translateX.current, {
            toValue: 0,
            duration: 200,
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
