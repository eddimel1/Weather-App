import React, {useEffect, useState} from 'react'
import {toSunrise} from '../../../utils/utils'

export const Clock = () => {
  const [clockState, setClockState] = useState<string | undefined>()

  useEffect(() => {
    const inerval = setInterval(() => {
      const date = new Date()
      setClockState(date.toLocaleTimeString())
    }, 1000)
  }, [])
  return <div style={{fontSize: '40px', color: 'black'}}>{clockState}</div>
}
