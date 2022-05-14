import React, {useContext, useEffect, useState} from 'react'
import Buttons from './components/navigation/navigation'
import './App.css'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {MainContainer} from './Pages/currentWeather/mainContainer'
import {Graphs} from './Pages/graphs/graphs'
import {DailyForeCast} from './Pages/dailyWeather/dailyForeCast'
import {Calculator} from './components/utilComponents/calculator/calculator'
import {Converter1} from './Pages/Converter&Calculator/converter1'
import {AirPolutionForecast} from './Pages/airPolutionForecast/airPolutionForecast'
import {NatureGalery} from './Pages/natureGalery/NatureGalery'
import {Article1} from './Pages/articles/article1'
import {Transition} from './components/transitionComps/transition'
import {AnimatePresence} from 'framer-motion'
import {AppContextWrapper} from './components/Wrappers/AppContextWrapper'
import {colorArray} from './staticData/StaticData'
import {mode} from './staticData/StaticData'
import {AppWrapper} from './components/styledComps/AppStyledWrapper'
import {GameConductor} from './Pages/quizz/gameConductor'

function App() {
  const [mode, setMode] = useState<mode>('normal')
  console.log(mode)
  const setModewithUseCallback = React.useCallback(setMode, [])
  const [randomColor, setRandomColor] = useState(
    'linear-gradient(90deg, rgba(6,38,241,1) 0%, rgba(26,9,121,1) 50%, rgba(0,212,255,1) 100%)'
  )
  useEffect(() => {
    const interval = window.setInterval(
      () => {
        setRandomColor(
          colorArray[Math.floor(Math.random() * colorArray.length)]
        )
      },
      mode === 'disco' ? 200 : 15000
    )
    return () => {
      clearInterval(interval)
    }
  }, [mode])

  return (
    <>
      <AppWrapper color={randomColor} mode={mode}>
        <AppContextWrapper>
          {/* <div className={mode==='normal' ? 'App' : 'App1'} style={{"--color" : `${randomColor}`} as  React.CSSProperties}> */}

          <AnimatePresence exitBeforeEnter>
            <Router>
              <Buttons mode={mode} setMode={setModewithUseCallback} />
              <Routes>
                <Route
                  path="/"
                  element={
                    <Transition>
                      <MainContainer />
                    </Transition>
                  }
                >
                  {' '}
                </Route>
                <Route
                  path="/graphs"
                  element={
                    <Transition>
                      <Graphs />
                    </Transition>
                  }
                >
                  {' '}
                </Route>
                <Route
                  path="daily"
                  element={
                    <Transition>
                      <DailyForeCast />
                    </Transition>
                  }
                ></Route>
                <Route
                  path="calc"
                  element={
                    <Transition>
                      <Calculator />
                    </Transition>
                  }
                ></Route>
                <Route
                  path="converter"
                  element={
                    <Transition>
                      <Converter1 />
                    </Transition>
                  }
                ></Route>
                <Route
                  path="airPolutionArticle"
                  element={
                    <Transition>
                      <Article1 />
                    </Transition>
                  }
                ></Route>
                <Route
                  path="airpolution"
                  element={
                    <Transition>
                      <AirPolutionForecast />
                    </Transition>
                  }
                ></Route>
                <Route
                  path="natureGalery"
                  element={
                    <Transition>
                      <NatureGalery />
                    </Transition>
                  }
                ></Route>
                <Route
                  path="quizz"
                  element={
                    <Transition>
                      <GameConductor />
                    </Transition>
                  }
                ></Route>
              </Routes>
            </Router>
          </AnimatePresence>

          {/* </div> */}
        </AppContextWrapper>
      </AppWrapper>
    </>
  )
}

export default App
