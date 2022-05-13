import React, { FC } from 'react'
import { CtxProvider } from '../../Context/modeContext'

export const AppContextWrapper:FC = ({children}) => {
  return (
    <CtxProvider>
        {children}
    </CtxProvider>
  )
}
