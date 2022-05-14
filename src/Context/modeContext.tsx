import {create} from 'domain'
import React, {createContext, FC, useReducer} from 'react'
enum actions {
  'coolmode',
  'normalmode',
}
type actionUnion = 'coolmode' | 'normalmode'
type actionType = {
  type: actionUnion
}
type stateType = {
  mode: string
}
const initialState = {
  mode: 'normalmode',
}
export const Ctx = createContext<{
  state: stateType
  dispatch: React.Dispatch<any>
}>({state: {mode: 'normalmode'}, dispatch: () => null})
const modeReducer = (state: stateType, action: {type: string}) => {
  switch (action.type) {
    case 'coolmode':
      return {...state, mode: 'coolmode'}
    case 'normalmode':
      return {...state, mode: 'normalmode'}
    default:
      return state
  }
}

export const CtxProvider: FC = ({children}) => {
  const [state, dispatch] = useReducer(modeReducer, initialState)
  return (
    <Ctx.Provider value={{state: state, dispatch}}>{children}</Ctx.Provider>
  )
}
