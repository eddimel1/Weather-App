import react from 'React'
import {geoCodingObjectType} from '../staticData/geoCodingData'
import {monthsArray, daysArray} from '../staticData/mainData'
const apiKey = '8647cf510b1463995bb4faabd47b46f5'

export function toSunrise(unix: number | undefined): any {
  if (unix) {
    const convertedDate = new Date(unix * 1000)
    return String(convertedDate).split(' ')[4]
  } else return
}

export const KelvinToCelcius = (k: number | undefined): number | undefined => {
  if (k) {
    const result = Math.round(k - 273)
    return result
  }
  return 0
}

export function hasProperty<T extends object>(
  prop: string,
  obj: T | undefined
): string | undefined {
    // eslint-disable-next-line no-prototype-builtins
  const truth = obj?.hasOwnProperty(prop)
  if (truth) {
    return prop
  }
  return
}
export async function api<T>(url: string): Promise<T> {
  try {
    const response = await fetch(
      url as RequestInfo,
      {method: 'get'} as RequestInit
    )
    return (await response.json()) as T
  } catch (e) {
    console.log(e)
    throw e
  }
}

export const getLatAndLon = (town: string): void | Promise<Array<number>> => {
    // eslint-disable-next-line no-async-promise-executor
  return new Promise(async (res, rej) => {
    try {
      const cords = await api<geoCodingObjectType>(
        `http://api.openweathermap.org/geo/1.0/direct?q=${town}&limit=1&appid=${apiKey}`
      )
      const {lat, lon} = cords[0]
      res([lat, lon] as Array<number>)
    } catch (e) {
      console.log(e)
    }
  })
}

export function getDatefromData(
  data: 'month' | 'day' | 'dayOfMonth' | 'hours' | 'minutes'
) {
  switch (data) {
    case 'month':{
        const month = new Date(Date.now()).getMonth()
        return monthsArray[month]
    }
     

    case 'day':{
        const day = new Date(Date.now()).getDay()
        return daysArray[day]
    }
      

    case 'dayOfMonth':
      return new Date(Date.now()).getDate()
    case 'hours':{
        const hours = new Date(Date.now()).getHours()
        if (hours < 10) {
          return '0' + hours
        } else {
          return hours
        }
    }
    

    case 'minutes':{
        const minutes = new Date(Date.now()).getMinutes()
        if (minutes < 10) {
          return minutes + '0'
        } else {
          return minutes
        }
    }
    

    default:
      break
  }
}

export function addComaToArrayOfStrings(
  array: Array<string> | undefined
): string | undefined {
  let stringFromArray: string | undefined = ''

  function iterateOverAnArray() {
    array?.forEach((string) => {
      stringFromArray += string + ','
    })
  }
  iterateOverAnArray()

  return stringFromArray.slice(0, stringFromArray.length - 1)
}
