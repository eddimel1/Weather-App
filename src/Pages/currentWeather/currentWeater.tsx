import React, {useEffect, useState, useContext, useRef} from 'react'
import classes from './currentWeather.module.css'
import {toSunrise, KelvinToCelcius, hasProperty} from '../../utils/utils'
import {Clock} from '../../components/utilComponents/Clock/clock'
import {Footer} from '../../components/footer/footer'
import {UsefetchWeatherData} from '../../hooks/fetchWeatherData'
import {Input} from '../../components/UI/input/input'
import {successCallback, failureCallback} from '../../utils/geoLocationUtils'
import {Transition} from '../../components/transitionComps/transition'
import filters from '../../svgFilters.module.css'
import {Ctx} from '../../Context/modeContext'

export const MainContainer = () => {
  const defaultExcludeArray = ['minutely', 'daily', 'alerts', 'hourly']

  const [town, setTown] = useState<string>('')
  const {waiting, weatherData, setWeatherDataByTown, setWeatherDataByCoords} =
    UsefetchWeatherData()
    const initialLoad = useRef<boolean>(true)
console.log(initialLoad.current)
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        successCallback(pos, setWeatherDataByCoords, defaultExcludeArray)
      },
      (err) => {
        failureCallback(err, setWeatherDataByTown, defaultExcludeArray)
      }
    )
   
  }, [])

  useEffect(() => {
    setWeatherDataByTown(town, defaultExcludeArray)
    
  }, [town])
  useEffect(()=>{
    window.setTimeout(()=>{
        initialLoad.current = false
    },500)
  },[])

  return (
    <>
      <Transition>
        <div className={classes.containerForScroll}>
          <div
            className={`${classes.mainWrapper} ${filters.naturalShadow} ${
              !waiting && !initialLoad.current ? `${classes.show}` : ''
            }`}
          >
            <div className={classes.mainContainer}>
              <div className={classes.inputContainer}>
                <span className={classes.townName}>
                  {' '}
                  {town ? town : 'Tallinn'}{' '}
                </span>
                <Clock />
                <span className={classes.tempData}>
                  {weatherData
                    ? KelvinToCelcius(weatherData?.current?.temp) + 'C '
                    : '0'}
                </span>
                <Input setTown={setTown} styles={{margin: '0'}} />
              </div>
              <div
                className={`${classes.mainDataContainer} ${filters.naturalShadow}`}
              >
                <div className={classes.dataLeft}>
                  {!waiting ? (
                    weatherData && (
                      <>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          Description :{' '}
                          {weatherData.current?.weather
                            ? weatherData.current.weather[0].description
                            : ''}{' '}
                        </div>
                        <div className={classes.weatherField}>
                          Sky :{' '}
                          {weatherData.current?.weather
                            ? weatherData.current.weather[0].main
                            : ''}{' '}
                        </div>
                        <div className={classes.weatherField}>
                          {hasProperty('sunrise', weatherData.current) + ' : '}{' '}
                          {weatherData.current?.sunrise
                            ? toSunrise(weatherData.current.sunrise)
                            : ''}
                        </div>
                        <div className={classes.weatherField}>
                          {hasProperty('sunset', weatherData.current) + ' : '}{' '}
                          {weatherData.current?.sunset
                            ? toSunrise(weatherData.current.sunset)
                            : ''}
                        </div>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          {hasProperty('feels_like', weatherData.current) +
                            ' : '}{' '}
                          {weatherData.current?.feels_like
                            ? KelvinToCelcius(weatherData.current.feels_like) +
                              ' C '
                            : ' '}
                        </div>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          {hasProperty('visibility', weatherData.current) +
                            ' : '}{' '}
                          {weatherData.current?.visibility
                            ? weatherData.current?.visibility + ' meters '
                            : ''}
                        </div>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          Radiation :{' '}
                          {weatherData.current?.uvi
                            ? weatherData.current.uvi
                            : ''}
                        </div>
                      </>
                    )
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '300px',
                      }}
                    >
                      .....Loading...{' '}
                    </div>
                  )}
                </div>
                <div className={classes.dataCenter}>
                  {!waiting ? (
                    weatherData && (
                      <>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          {hasProperty('humidity', weatherData.current) + ' : '}{' '}
                          {`${weatherData.current?.humidity}  %`}
                        </div>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          {hasProperty('pressure', weatherData.current) + ' : '}{' '}
                          {weatherData.current
                            ? weatherData.current.pressure + ' hPa '
                            : ''}{' '}
                        </div>
                        <hr></hr>
                        <div className={classes.weatherField}>
                          {' '}
                          Clouds :{' '}
                          {weatherData.current
                            ? weatherData.current.clouds + ' % '
                            : ''}
                        </div>
                        <hr></hr>
                      </>
                    )
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '300px',
                      }}
                    >
                      .....Loading...{' '}
                    </div>
                  )}
                </div>
                <div className={classes.dataRight}>
                  {!waiting && weatherData ? (
                    <>
                      <hr></hr>
                      <div className={classes.weatherField}>
                        {hasProperty('wind_deg', weatherData.current) + ' : '}{' '}
                        {weatherData.current?.wind_deg
                          ? weatherData.current.wind_deg + ' Degress'
                          : ''}
                      </div>
                      <hr></hr>
                      <div className={classes.weatherField}>
                        {hasProperty('wind_speed', weatherData.current) + ' : '}{' '}
                        {weatherData.current?.wind_speed
                          ? weatherData.current.wind_speed + ' meter/sec  '
                          : ''}
                      </div>
                      <hr></hr>
                    </>
                  ) : (
                    <div
                      style={{
                        backgroundColor: 'transparent',
                        width: '100%',
                        height: '300px',
                      }}
                    >
                      .....Loading...{' '}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      
        </Transition>             
      <Footer />
    </>
  )
}
