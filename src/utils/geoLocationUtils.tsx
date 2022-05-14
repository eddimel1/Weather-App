import React from 'react'

export const failureCallback = (
  err: any,
  byTownCallback: (town1: string, excludeArray?: string[]) => void,
  excludeArray?: Array<string>
) => {
  if (excludeArray) {
    byTownCallback('New York', excludeArray)
  }
  byTownCallback('New York')
}

export const successCallback = (
  pos: any,
  byCordsCallback: (
    lat: number,
    lon: number,
    ExcludeArray?: Array<string>
  ) => void,
  ExcludeArray?: Array<string>
) => {
  const lat = pos.coords.latitude
  const long = pos.coords.longitude
  if (ExcludeArray) {
    byCordsCallback(lat, long, ExcludeArray)
  }
  byCordsCallback(lat, long)
}
