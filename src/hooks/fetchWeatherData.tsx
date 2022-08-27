import React, {useCallback, useState} from 'react'
import {getLatAndLon, api, addComaToArrayOfStrings} from '../utils/utils'
import {airPolutionType, partialData} from '../staticData/mainData'

type hookReturnType = {
  weatherData: partialData | undefined
  airPolutionData: airPolutionType | undefined
  setWeatherDataByTown: (town1: string, excludeArray?: string[]) => void
  setWeatherDataByCoords: (
    lat: number,
    lon: number,
    excludeArray?: Array<string>
  ) => void
  setAirPolutionWeatherDataByTown: (town2: string) => void
  setAirPolutionWeatherDataByCords: (lat: number, lon: number) => void
  error: unknown
  waiting: boolean
}

export const UsefetchWeatherData = (
  town?: string,
  excludeArray?: string[]
): hookReturnType => {
  const [weatherData, setWeather] = useState<partialData | undefined>(undefined)
  const [airPolutionData, setAirPolutionData] = useState<airPolutionType>(
    {} as airPolutionType
  )
  const [waiting, setWaiting] = useState<boolean>(false)
  const apiKey = process.env.REACT_APP_WEATHER_APP_KEY
  const [error, setError] = useState(null)

  const setWeatherDataByTown = useCallback(
    (town1: string, excludeArray1?: string[]): void => {
      setWaiting(true)
      getLatAndLon(town1)?.then((cordsArray) => {
        api<partialData>(
          `https://api.openweathermap.org/data/2.5/onecall?lat=${
            cordsArray[0]
          }&lon=${cordsArray[1]}&exclude=${addComaToArrayOfStrings(
            excludeArray1
          )}&appid=${apiKey}`
        )
          .then((data) => {
            setWeather(data)
            setWaiting(false)
          })
          .catch((e) => {
            setError(e)
          })
        setWaiting(false)
      })
    },
    []
  )
  const setAirPolutionWeatherDataByTown = useCallback((town2: string) => {
    setWaiting(true)
    getLatAndLon(town2)?.then((cordsArray) => {
      api<airPolutionType>(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${cordsArray[0]}&lon=${cordsArray[1]}&appid=${apiKey}`
      )
        .then((data) => {
          setAirPolutionData(data)
          setWaiting(false)
        })
        .catch((e) => {
          setWaiting(false)
          setError(e)
        })
    })
  }, [])
  const setAirPolutionWeatherDataByCords = useCallback(
    (lat: number, lon: number) => {
      setWaiting(true)
      api<airPolutionType>(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        .then((data) => {
          setAirPolutionData(data)
          setWaiting(false)
        })
        .catch((e) => {
          setWaiting(false)
          setError(e)
        })
    },
    []
  )

  const setWeatherDataByCoords = useCallback(
    (lat?: number, lon?: number, excludeArray?: Array<string>): void => {
      setWaiting(true)
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${addComaToArrayOfStrings(
          excludeArray
        )}&appid=${apiKey}`
      ).then((data) => {
        data
          .json()
          .then((data) => {
            setWeather(data)
            setWaiting(false)
          })
          .catch((e) => {
            setWaiting(false)
            setError(e)
          })
      })
    },
    []
  )

  return {
    weatherData,
    setWeatherDataByTown,
    setWeatherDataByCoords,
    setAirPolutionWeatherDataByTown,
    airPolutionData,
    setAirPolutionWeatherDataByCords,
    error,
    waiting,
  }
}
