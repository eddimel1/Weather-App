import React from 'react'
import { propType } from './welcomeScreen'
import classes from './endGameScreen.module.css'
import {scoreArray} from './endGameResultTable'
import {imgResultArray} from './endGameResultTable'

export const EndGameScreen = (props:propType) => {
  return (
    <div className={classes.endGameWrapper}>
        <div className={classes.endGameContainer}>
            <div className={classes.endGameTop}>
                <div className={classes.textContainer}>
                    <div className={classes.textItem}>
                        {props.state && scoreArray[props.state.score]} , {props.state && props.state.playerName}
                    </div>
                    <div className={classes.textItem}>
                        You have answered to {props.state?.score} questions
                    </div>
                </div>
            </div>
            <div className={classes.endGameCenter}>
                <div className={classes.imgContainer}>
                <img  className={classes.img} src={props.state && imgResultArray[props.state?.score]} width='250px'></img>
                </div>
                

            </div>
            <div className={classes.endGameBottom}>
                <button onClick={() => props.dispatch({type:'restart'})} className={classes.restartButton}> Restart</button>
            </div>
        </div>
    </div>
  )
}
