import React, {useEffect, useRef, useState} from 'react'
import classes from './airPolutionForecast.module.css'
import {Input} from '../../components/UI/input/input'
import {AirPolutionRow} from '../../components/airPolutionForecast/airPolutionComp/airPolutionRow'
import {PolutionComp} from '../../components/airPolutionForecast/airPolutionComp/polutionComp'
import {Days} from '../../staticData/mainData'
import {UsefetchWeatherData} from '../../hooks/fetchWeatherData'
import {failureCallback, successCallback} from '../../utils/geoLocationUtils'
import {Transition} from '../../components/transitionComps/transition'

export const AirPolutionForecast = () => {
  const [town, sendTown] = useState('')
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const toggle = useRef<boolean>(false)
  const [tg, stg] = useState<boolean>(false)
  const {
    airPolutionData,
    waiting,
    setAirPolutionWeatherDataByTown,
    setAirPolutionWeatherDataByCords,
  } = UsefetchWeatherData()

  //get every 12th item(day&night for 5 days)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        successCallback(pos, setAirPolutionWeatherDataByCords)
      },
      (err) => {
        failureCallback(err, setAirPolutionWeatherDataByTown)
      }
    )
  }, [])

  useEffect(() => {
    setAirPolutionWeatherDataByTown(town)
  }, [town])

  useEffect(() => {
    toggle.current = true
    stg((prev) => !prev)
    setTimeout(() => {
      toggle.current = false
    }, 500)
  }, [selected])

  return (
    <>
      <Transition>
        <div
          className={`${classes.mainWrapper} ${
            !waiting ? `${classes.show}` : ''
          }`}
        >
          <div className={classes.inputandTownWrapper}>
            <h3 className={classes.town}>{town ? town : 'Tallinn'}</h3>
            <Input
              setTown={sendTown}
              styles={{maxWidth: '20rem', marginTop: '1rem'}}
            />
          </div>
          <div className={classes.polutionForecast}>
            <div className={classes.airPolutionWrapper}>
              <div className={classes.airPolutionContainer}>
                <div className={classes.airPolutionTable}>
                  {airPolutionData?.list
                    ?.filter((item, i) => {
                      if (i || i === 0) {
                        return i % 12 === 0
                      }
                      return false
                    })
                    .map((item, i, array) => {
                      if (i === 0 || i % 2 === 0) {
                        return (
                          <AirPolutionRow
                            key={Date.now() + i}
                            comps={{
                              dayofWeek:
                                Days[new Date(item.dt * 1000).getDay()],
                              day: array[i].main.aqi,
                              night: array[i + 1] && array[i + 1].main.aqi,
                            }}
                            selected={selected}
                            setSelected={setSelected}
                            index={i.toString()}
                          />
                        )
                      }
                    })}
                </div>
              </div>
            </div>

            <div
              className={`${classes.componentsWrapper} ${
                toggle.current === true ? `${classes.show2}` : ''
              }`}
            >
              <div className={classes.componentsContainer}>
                {airPolutionData &&
                airPolutionData.list &&
                airPolutionData.list[0] &&
                airPolutionData &&
                airPolutionData.list[1] &&
                selected ? (
                  <PolutionComp
                    compsNight={
                      airPolutionData.list[parseInt(selected + 1)].components
                    }
                    compsDay={
                      airPolutionData.list[parseInt(selected)].components
                    }
                    key={Date.now() + 1}
                  />
                ) : airPolutionData &&
                  airPolutionData.list &&
                  airPolutionData.list[0] &&
                  airPolutionData &&
                  airPolutionData.list[1] ? (
                  <PolutionComp
                    compsNight={airPolutionData.list[0].components}
                    compsDay={airPolutionData.list[1].components}
                    key={Date.now() + 1}
                  />
                ) : (
                  <div
                    style={{
                      minWidth: '200px',
                      minHeight: '100px',
                      fontSize: '3.5em',
                      padding: '0.5em',
                    }}
                  >
                    Currently no data available &#128532; , please try again
                    later{' '}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}
