import React, {useState} from 'react'
import classes from './configScreen.module.css'
import {propType} from './welcomeScreen'
type configType = {
  difficulty: string
  category: string
}
export const ConfigScreen = (props: propType) => {
  const [config, setConfig] = useState<configType>({
    difficulty: 'easy',
    category: 'science',
  })
  console.log(config)

  return (
    <div className={classes.configWrapper}>
      <div className={classes.configContainer}>
        <div className={classes.configText}>
          <div className={classes.configTextItem}>
            Hello , {props.state && props.state.playerName}
          </div>
          <div className={classes.configTextItem}>Please choose options</div>
        </div>
        <div className={classes.selectContainer}>
          <select
            onChange={(e) =>
              setConfig((prev) => ({...prev, difficulty: e.target.value}))
            }
            className={classes.select}
            name="Difficulty"
          >
            {' '}
            Difficulty
            <option className={classes.option} value="easy">
              Easy
            </option>
            <option className={classes.option} value="medium">
              Medium
            </option>
            <option className={classes.option} value="hard">
              Hard
            </option>
          </select>
          <select
            onChange={(e) =>
              setConfig((prev) => ({...prev, category: e.target.value}))
            }
            className={classes.select}
            name="Category"
          >
            {' '}
            category
            <option className={classes.option} value="science">
              Science
            </option>
            <option className={classes.option} value="geography">
              Geography
            </option>
            <option className={classes.option} value="general">
              General
            </option>
          </select>
        </div>

        <div className={classes.difficulty}></div>
        <button
          className={classes.startButton}
          onClick={() => {
            props.dispatch({type: 'start', payload: config})
          }}
        >
          Start The Game
        </button>
      </div>
    </div>
  )
}
