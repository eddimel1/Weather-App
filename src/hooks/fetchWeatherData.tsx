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
  error: any
}

export const UsefetchWeatherData = (
  town?: string,
  excludeArray?: string[]
): hookReturnType => {
  const [weatherData, setWeather] = useState<partialData | undefined>(undefined)
  const [airPolutionData, setAirPolutionData] = useState<airPolutionType>(
    {} as airPolutionType
  )
  const apiKey = process.env.REACT_APP_WEATHER_APP_KEY
  const [error, setError] = useState(null)

  const setWeatherDataByTown = useCallback(
    (town1: string, excludeArray1?: string[]): void => {
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
          })
          .catch((e) => setError(e))
      })
    },
    []
  )
  const setAirPolutionWeatherDataByTown = useCallback((town2: string) => {
    getLatAndLon(town2)?.then((cordsArray) => {
      api<airPolutionType>(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${cordsArray[0]}&lon=${cordsArray[1]}&appid=${apiKey}`
      )
        .then((data) => {
          setAirPolutionData(data)
        })
        .catch((e) => setError(e))
    })
  }, [])
  const setAirPolutionWeatherDataByCords = useCallback(
    (lat: number, lon: number) => {
      api<airPolutionType>(
        `http://api.openweathermap.org/data/2.5/air_pollution/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`
      )
        .then((data) => {
          setAirPolutionData(data)
        })
        .catch((e) => setError(e))
    },
    []
  )

  const setWeatherDataByCoords = useCallback(
    (lat?: number, lon?: number, excludeArray?: Array<string>): void => {
      fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${addComaToArrayOfStrings(
          excludeArray
        )}&appid=${apiKey}`
      ).then((data) => {
        data
          .json()
          .then((data) => {
            setWeather(data)
          })
          .catch((e) => setError(e))
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
  }
}
