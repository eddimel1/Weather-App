type gameStateType = 'waiting' | 'ready' | 'started' | 'finished'
export type quizzState = {
  gameState: gameStateType
  category: string | null
  tags: string[]
  playerName: string | null
  difficulty: string | null
  totalQuestions: number | null
  currentQuestionIndex: number
  chosenAnswer: string | null
  currentQuestion: string | null
  correctAnswer: string | null
  score: number
  currentPortion: string[]
  allAnswers: string[]
}
export const initialQuizzState: quizzState = {
  gameState: 'waiting',
  category: null,
  playerName: null,
  tags: [] as string[],
  difficulty: null,
  totalQuestions: null,
  currentQuestionIndex: 0,
  chosenAnswer: null,
  currentQuestion: null,
  correctAnswer: null,
  score: 0,
  currentPortion: [] as string[],
  allAnswers: [] as string[],
}
export type actionType =
  | 'prepare'
  | 'chooseAnswer'
  | 'nextQuestion'
  | 'restart'
  | 'chooseOptions'
  | 'start'
  | 'scored'
export type actions = {
  type: actionType
  payload?: any
}
export const quizzReducer = (
  state: quizzState,
  action: actions
): quizzState => {
  switch (action.type) {
    case 'prepare':
      return {...state, gameState: 'ready', playerName: action.payload}
    case 'restart':
      return {...state, score: 0, currentQuestionIndex: 0, gameState: 'waiting'}
    case 'start':
      return {
        ...state,
        gameState: 'started',
        difficulty: action.payload.difficulty,
        category: action.payload.category,
      }
    case 'scored':
      return {...state, score: state.score + 1}

    case 'chooseAnswer':
      return {...state, score: state.score + action.payload.score}
    case 'nextQuestion':
      if (state.currentQuestionIndex === 9) {
        return {...state, gameState: 'finished'}
      }
      return {...state, currentQuestionIndex: state.currentQuestionIndex + 1}
    case 'chooseOptions':
      return {
        ...state,
        category: action.payload.category,
        difficulty: action.payload.difficulty,
      }

    default:
      return state
  }
}
