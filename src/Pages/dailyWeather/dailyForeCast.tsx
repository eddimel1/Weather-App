import React, {useContext, useEffect, useRef, useState} from 'react'
import classes from './dailyForeCast.module.css'
import {DailyForeCastItem} from '../../components/dailyForeCastItem/dailyForeCastItem'
import {Days} from '../../staticData/mainData'
import {getDatefromData, KelvinToCelcius} from '../../utils/utils'
import {UsefetchWeatherData} from '../../hooks/fetchWeatherData'
import {successCallback, failureCallback} from '../../utils/geoLocationUtils'
import {Input} from '../../components/UI/input/input'

export const DailyForeCast = () => {
  const defaultExcludeArray = ['minutely', 'current', 'alerts', 'hourly']

  const [town, setTown] = useState<string>('')
  const {
    waiting,
    weatherData,
    setWeatherDataByTown,
    setWeatherDataByCoords,
    error,
  } = UsefetchWeatherData()
  const [selected, setSelected] = useState<number>(Date.now())
  const selectedIndex = useRef<number>(0)
  const toggleAnim = useRef<boolean>(false)
  const [tg, stg] = useState<boolean>(false)
  const inputStyles: React.CSSProperties = {
    minHeight: '35px',
    border: '2px white solid',
    borderRadius: '13px',
    fontSize: '20px',
    fontWeight: '500',
    marginTop: '1rem',
    background: 'rgb(230,230,230)',
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        successCallback(pos, setWeatherDataByCoords, defaultExcludeArray)
      },
      (pos) => {
        failureCallback(pos, setWeatherDataByTown, defaultExcludeArray)
      }
    )
  }, [])
  useEffect(() => {
    setWeatherDataByTown(town, defaultExcludeArray)
  }, [town])
  useEffect(() => {
    toggleAnim.current = true
    stg((prev) => !prev)
    if (weatherData && weatherData.daily) {
      selectedIndex.current = weatherData.daily?.findIndex(
        (el) => el.dt === selected
      )
    }
    window.setTimeout(() => {
      toggleAnim.current = false
    }, 800)
  }, [selected])

  return (
    <>
      <div className={classes.pageWrapper}>
        <div className={classes.dailyTop}>
          <div
            className={`${classes.weatherData} ${
              toggleAnim.current === true ? classes.show2 : ''
            }`}
          >
            <div className={classes.weatherDataItem}>
              Humidity :{' '}
              {weatherData?.daily
                ? weatherData.daily[selectedIndex.current || 0].humidity + '%'
                : ''}
            </div>
            <div className={classes.weatherDataItem}>
              Pressure :{' '}
              {weatherData?.daily
                ? weatherData.daily[selectedIndex.current || 0].pressure +
                  ' Hpa'
                : ''}
            </div>
            <div className={classes.weatherDataItem}>
              Day :{' '}
              {weatherData?.daily
                ? KelvinToCelcius(
                    weatherData.daily[selectedIndex.current || 0].temp.day
                  )
                : ''}{' '}
              &#8451;
            </div>
            <div className={classes.weatherDataItem}>
              Night:{' '}
              {weatherData?.daily
                ? KelvinToCelcius(
                    weatherData.daily[selectedIndex.current || 0].temp.night
                  )
                : ''}{' '}
              &#8451;
            </div>
            <div className={classes.weatherDataItem}>
              Wind :{' '}
              {weatherData?.daily
                ? weatherData.daily[selectedIndex.current || 0].wind_speed +
                  'm/s'
                : ''}
            </div>
          </div>
          {weatherData && weatherData.daily && (
            <div
              className={`${classes.dateAndTimeContainer} ${
                toggleAnim.current === true ? classes.show2 : ''
              } `}
            >
              <h3 className={classes.date}>{` ${getDatefromData(
                'day',
                selected * 1000
              )} , ${getDatefromData('dayOfMonth')} ${getDatefromData(
                'month',
                selected * 1000
              )}`}</h3>
              <div className={classes.time}>
                {`${getDatefromData('hours')} : ${getDatefromData('minutes')}`}{' '}
                PM
              </div>
            </div>
          )}

          <div className={classes.inputAndTownContainer}>
            <div className={classes.dailyTopRightLocation}>
              {town ? town : 'Tallinn'}
            </div>
            <Input setTown={setTown} styles={inputStyles} />
          </div>
        </div>
        {weatherData && (
          <div
            className={`${classes.dailyBottom} ${
              !waiting ? `${classes.show}` : ''
            }`}
          >
            <div className={classes.dailyBottomContainer}>
              <div className={classes.dailyBottomCurrentForeCast}>
                <div
                  className={classes.dailyBottomCurrentForeCastContainer}
                  onClick={() => {
                    if (weatherData && weatherData.daily)
                      setSelected(weatherData.daily[0].dt)
                  }}
                >
                  <div className={classes.currentDay}>
                    {weatherData?.daily
                      ? Days[new Date(weatherData.daily[0].dt * 1000).getDay()]
                      : ''}{' '}
                  </div>
                  <div className={classes.currentWeatherIcon}>
                    <img
                      src={`http://openweathermap.org/img/wn/${
                        weatherData?.daily
                          ? weatherData.daily[0].weather[0].icon
                          : '10d'
                      }@2x.png`}
                      alt="icon"
                    />
                  </div>

                  <div className={classes.weatherTimeCurrent}>
                    Night -{' '}
                    {weatherData?.daily
                      ? KelvinToCelcius(weatherData.daily[0].temp.night)
                      : ''}{' '}
                    &#8451;{' '}
                  </div>
                  <div className={classes.weatherTimeCurrent}>
                    Day -{' '}
                    {weatherData?.daily
                      ? KelvinToCelcius(weatherData.daily[0].temp.day)
                      : ''}{' '}
                    &#8451;{' '}
                  </div>
                </div>
              </div>
              <div className={classes.dailyBottomDailyForeCast}>
                <div className={classes.dailyForeCastItem}></div>
                {weatherData?.daily?.slice(1).map((item, index, array) => {
                  if (index === array.length - 1) {
                    return
                  }

                  return (
                    <DailyForeCastItem
                      setSelected={setSelected}
                      dt={item.dt}
                      icon={item.weather[0].icon}
                      day={item.temp.day}
                      night={item.temp.night}
                      key={Date.now() + index}
                    />
                  )
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
