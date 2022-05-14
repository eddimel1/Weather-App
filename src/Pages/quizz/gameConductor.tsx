import React, {useReducer} from 'react'
import classes from './gameConductor.module.css'
import {QuestionScreen} from './questionScreen'
import {WelcomeScreen} from './welcomeScreen'
import {ConfigScreen} from './configScreen'
import {EndGameScreen} from './endGameScreen'
import filters from '../../svgFilters.module.css'

import {quizzReducer, initialQuizzState} from './quizzReducer'
export const GameConductor = () => {
  const [state, dispatch] = useReducer(quizzReducer, initialQuizzState)
  console.log(state)
  return (
    <div className={`${classes.gameWrapper} ${filters.naturalShadow}`}>
      {state.gameState === 'waiting' ? (
        <WelcomeScreen dispatch={dispatch}></WelcomeScreen>
      ) : state.gameState === 'ready' ? (
        <ConfigScreen dispatch={dispatch} state={state}></ConfigScreen>
      ) : state.gameState === 'started' ? (
        <QuestionScreen dispatch={dispatch} state={state}></QuestionScreen>
      ) : state.gameState === 'finished' ? (
        <EndGameScreen dispatch={dispatch} state={state}></EndGameScreen>
      ) : (
        <WelcomeScreen dispatch={dispatch}></WelcomeScreen>
      )}
    </div>
  )
}
