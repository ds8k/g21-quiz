import produce from 'immer'
import he from 'he'

import { initialLoadState } from '../'

import {
  GET_QUESTIONS_START,
  GET_QUESTIONS_SUCCESS,
  GET_QUESTIONS_FAILED,
} from '../../actions/questions'

const initialState = {
  questions: [],
  questionsState: { ...initialLoadState },
}

const processQuestions = (draft, { type, payload }) => {
  switch (type) {
    case GET_QUESTIONS_START:
      draft.questionsState = { ...initialLoadState, loading: true }
      break;
    case GET_QUESTIONS_SUCCESS:
      draft.questionsState = { ...initialLoadState, loaded: true }
      draft.questions = payload.questions.map((question, index) => ({
          ...question,
          question: he.decode(question.question),
          category: he.decode(question.category),
          number: index + 1,
        }))
      break;
    case GET_QUESTIONS_FAILED:
      draft.questionsState = { ...initialLoadState, error: payload.error }
      break;
    default:
      break;
  }
}

export default produce((draft, { type, payload }) => {
  processQuestions(draft, { type, payload })
}, initialState)
