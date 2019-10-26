import produce from 'immer'

import {
  STORE_USER_ANSWER,
  CLEAR_USER_ANSWERS,
} from '../../actions/answers'

const initialState = {
  answers: [],
}

const processAnswers = (draft, { type, payload }) => {
  switch (type) {
    case STORE_USER_ANSWER:
      draft.answers.push(payload.answer)
      break;
    case CLEAR_USER_ANSWERS:
      draft.answers = []
      break;
    default:
      break;
  }
}

export default produce((draft, { type, payload }) => {
  processAnswers(draft, { type, payload })
}, initialState)
