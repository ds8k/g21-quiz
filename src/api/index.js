const NUM_QUESTIONS = 10
const DIFFICULTY = 'hard'
const TYPE = 'boolean'
const BASE_URL = 'https://opentdb.com/api.php'

export const questions = ({
  numQuestions = NUM_QUESTIONS,
  difficulty = DIFFICULTY,
  type = TYPE,
} = {}) =>
  fetch(
    `${BASE_URL}?amount=${numQuestions}&difficulty=${difficulty}&type=${type}`,
  )
