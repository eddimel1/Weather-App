import React, {useState, useCallback, useRef, useContext} from 'react'
import classes from './navigation.module.css'
import {someData, objType} from '../../staticData/StaticData'
import {NavItem} from './navFilling/navItem'
import logo from '../../assets/logo.png'
import tree from '../../assets/tree6.png'
import tree1 from '../../assets/tree7.png'
import {mode} from '../../staticData/StaticData'
import {NavigationModeBar} from '../modeBar/navigationModeBar'

const Buttons = ({
  setMode,
  mode,
}: {
  setMode: React.Dispatch<React.SetStateAction<mode>>
  mode: string
}) => {
  const listRef = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string>()
  const [toggle, setToggle] = useState<boolean>(false)

  return (
    <>
      <div className={classes.container}>
        <div className={classes.logoContainer}>
          <img src={tree} alt="logo" style={{maxHeight: '80px'}} />
          <img
            src={logo}
            className={classes.logo}
            alt="logo"
            style={{
              borderRadius: '15px',
              border: '2px solid violet',
              maxHeight: '80px',
            }}
          />
          <img src={tree1} alt="logo" style={{maxHeight: '80px'}} />
        </div>

        <div className={classes.list} ref={listRef}>
          {someData.map((button: objType, i: number) => {
            return (
              <NavItem
                setToggle={setToggle}
                toggle={toggle}
                setSelected={setSelected}
                selected={selected}
                isSelected={Number(selected) === i}
                listRef={listRef}
                text={button.title}
                ind={i}
                key={Date.now() + i}
              >
                {' '}
                {button.icon}{' '}
              </NavItem>
            )
          })}
        </div>
        <NavigationModeBar mode={mode} setMode={setMode} />
      </div>

      <hr className={classes.bottomBorder}></hr>
    </>
  )
}

export default React.memo(Buttons)
