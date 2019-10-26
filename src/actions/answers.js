export const STORE_USER_ANSWER = 'STORE_USER_ANSWER'
export const CLEAR_USER_ANSWERS = 'CLEAR_USER_ANSWERS'

export const storeUserAnswer = answer => ({
  type: STORE_USER_ANSWER,
  payload: { answer },
})

export const clearUserAnswers = () => ({
  type: CLEAR_USER_ANSWERS,
})
