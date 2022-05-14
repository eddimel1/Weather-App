import React, {useState} from 'react'
import classes from './welcomeScreen.module.css'
import {actions, quizzState} from './quizzReducer'
export type propType = {
  dispatch: React.Dispatch<actions>
  state?: quizzState
}
export const WelcomeScreen = (props: propType) => {
  const [change, setChange] = useState<string>()
  console.log(change)
  return (
    <div className={classes.welcomeScreenWrapper}>
      <div className={classes.welcomeScreenContainer}>
        <div className={classes.textContainer}>
          <div className={classes.welcomeText}>Welcome to game!</div>
          <div className={classes.welcomeText1}>
            To start the game , please press start button
          </div>
        </div>
        <input
          onChange={(e) => setChange(e.target.value)}
          className={classes.userName}
          type="text"
          placeholder="Please type your name"
        ></input>

        <button
          onClick={() => {
            props.dispatch({type: 'prepare', payload: change})
          }}
          className={classes.startButton}
        >
          Start
        </button>
      </div>
    </div>
  )
}
