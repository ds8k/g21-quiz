export const GET_QUESTIONS_START = 'GET_QUESTIONS_START'
export const GET_QUESTIONS_SUCCESS = 'GET_QUESTIONS_SUCCESS'
export const GET_QUESTIONS_FAILED = 'GET_QUESTIONS_FAILED'

const getQuestionsStart = () => ({
  type: GET_QUESTIONS_START,
})

const getQuestionsSuccess = (questions) => ({
  type: GET_QUESTIONS_SUCCESS,
  payload: { questions },
})

const getQuestionsFailed = (error) => ({
  type: GET_QUESTIONS_FAILED,
  payload: { error },
})

export const getQuestions = (params) => async (dispatch, getState, { questions }) => {
  try {
    dispatch(getQuestionsStart())

    const { results } = await questions(params).then((response) => response.json())

    dispatch(getQuestionsSuccess(results))
  } catch (error) {
    dispatch(getQuestionsFailed(error))
  }
}
  