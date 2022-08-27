import React, {useEffect, useState} from 'react'

export const Clock = () => {
  const [clockState, setClockState] = useState<string | undefined>()
  let intervalId: number | null

  useEffect(() => {
    intervalId = window.setInterval(() => {
      const date = new Date()
      setClockState(date.toLocaleTimeString())
    }, 1000)
    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [])
  return (
    <div style={{fontSize: '4em', color: 'black'}}>
      {clockState || '00 : 00 : 00'}
    </div>
  )
}
