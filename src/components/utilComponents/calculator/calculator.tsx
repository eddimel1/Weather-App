import React, {useReducer, Reducer, useState} from 'react'
import classes from './calculator.module.css'
import DigitButton from './digitButton'
import OperationButton from './operatorButton'
import {Sign} from './sign'
import {NumberValue} from './numberValue'
import {Transition} from '../../transitionComps/transition'
export enum actionTypes {
  ADD_DIGIT = 'add-digit',
  CHOOSE_OPERATION = 'operation-clicked',
  CLEAR = 'clear',
  DELETE_DIGIT = 'delete-digit',
  Equals = 'equals',
}
export type actionTypesUnion =
  | 'add-digit'
  | 'operation-clicked'
  | 'clear'
  | 'delete-digit'
  | 'equals'

export type payload = 'digit' | 'operation'

export type signType =
  | '*'
  | '÷'
  | '+'
  | '-'
  | '='
  | '/'
  | '%'
  | null
  | undefined
type operation = {
  valueNumber: string | null
  sign: signType | null
}
type stateType = {
  overwrite?: boolean
  operations?: operation[]
  currentValue?: string | undefined
  result?: number
  // currentSign? : signType
  // arrayOfInputs? : Array<string>
  // initialValue? : string
}
export type action = {
  digit?: string
  sign?: signType
  type: actionTypesUnion
}

export type DigitButtonPropsType = {
  dispatch: React.Dispatch<action>
  digit: string
  styles?: React.CSSProperties
}

const calcPercentage = function (percent: number, total: number): number {
  return (percent / 100) * total
}
function equalsIsClicked(
  arrayOfOperations: operation[],
  state: stateType
): number {
  const result = arrayOfOperations.reduce<number>(
    (acc, cur, index, array): number => {
      if (cur.valueNumber) {
        const value = cur.valueNumber.includes('.')
          ? parseFloat(cur.valueNumber)
          : parseInt(cur.valueNumber, 10)
        if (!cur.sign) {
          return value
        }
        switch (cur.sign) {
          case '+':
            return acc + value
          case '-':
            return acc - value
          case '*':
            switch (array[index - 1].sign) {
              case '+':
                return (
                  acc +
                  parseInt(array[index - 1].valueNumber ?? '1', 10) * value -
                  parseInt(array[index - 1].valueNumber ?? '1', 10)
                )
              case '-':
                return (
                  acc -
                  parseInt(array[index - 1].valueNumber ?? '1', 10) * value +
                  parseInt(array[index - 1].valueNumber ?? '1', 10)
                )
              case null:
                return acc * parseInt(array[1].valueNumber ?? '1', 10)
              case '*':
                return acc * value
              case '/':
                if (array[index - 2].sign === '-') {
                  return (
                    acc +
                    parseInt(array[index - 2].valueNumber!) /
                      parseInt(array[index - 1].valueNumber!) -
                    parseInt(array[index - 2].valueNumber!) /
                      (parseInt(array[index - 1].valueNumber!) *
                        parseInt(array[index].valueNumber!))
                  )
                } else if (array[index - 2].sign === '+') {
                  return (
                    acc -
                    parseInt(array[index - 2].valueNumber!) /
                      parseInt(array[index - 1].valueNumber!) +
                    parseInt(array[index - 2].valueNumber!) /
                      (parseInt(array[index - 1].valueNumber!) *
                        parseInt(array[index].valueNumber!))
                  )
                }
                return 0
              default:
                break
            }
            return 0
          case '/':
            if (state.operations && state.operations[0].valueNumber) {
              switch (array[index - 1].sign) {
                case '+':
                  return (
                    acc +
                    parseInt(array[index - 1].valueNumber ?? '1') / value -
                    parseInt(array[index - 1].valueNumber!, 10)
                  )
                case '-':
                  return (
                    acc -
                    parseInt(array[index - 1].valueNumber ?? '1') / value +
                    parseInt(array[index - 1].valueNumber!, 10)
                  )
                case '*':
                  if (array[array.length - 3].sign === null) {
                    console.log(acc)
                    return acc / value
                  }
                  console.log(acc)
                  return (
                    acc -
                    parseInt(array[index - 2].valueNumber!) *
                      parseInt(array[index - 1].valueNumber!) +
                    value * value
                  ) // ??
                case '/': {
                  const arr2 = [] as any
                  let lastIndex: any
                  for (let i = array.length - 1; i >= 0; i--) {
                    if (
                      array[i] &&
                      array[i].sign === '/' &&
                      array[i].valueNumber
                    ) {
                      arr2.push(array[i].valueNumber)
                      lastIndex = i
                    }
                  }

                  if (array && lastIndex && array[lastIndex - 1]) {
                    return (
                      acc +
                      parseInt(array[lastIndex - 1].valueNumber!, 10) /
                        arr2[0] /
                        arr2[1] -
                      parseInt(array[lastIndex - 1].valueNumber!, 10) /
                        parseInt(array[lastIndex].valueNumber!, 10)
                    )
                  }
                  return 0
                }
                case null:
                  return (
                    parseInt(state.operations[0].valueNumber) /
                    parseInt(state.operations[1].valueNumber ?? '1', 10)
                  )

                default:
                  break
              }
            }

            return 0

          case '%':
            if (
              state.operations &&
              state.operations.length === 2 &&
              state.operations[0].valueNumber
            ) {
              const percentage = calcPercentage(
                parseInt(cur.valueNumber),
                parseInt(state.operations[0].valueNumber)
              )

              return percentage
            } else if (state.operations && state.operations.length > 2) {
              const length = state.operations.length

              switch (state.operations[length - 2].sign) {
                case '+':{
                  const percentage =
                    calcPercentage(
                      parseInt(cur.valueNumber, 10),
                      parseInt(
                        state.operations[state.operations.length - 2]
                          .valueNumber!,
                        10
                      )
                    ) -
                    parseInt(
                      state.operations[state.operations.length - 2]
                        .valueNumber!,
                      10
                    )

                  return acc + percentage
                    }
                case '-': { // ??
                  const percentage1 = calcPercentage(
                    parseInt(cur.valueNumber, 10),
                    parseInt(
                      state.operations[state.operations.length - 2]
                        .valueNumber!,
                      10
                    )
                  )

                  return (
                    acc +
                    parseInt(state.operations[length - 2].valueNumber!) -
                    percentage1
                  )
                }
                case '*':
                  return (
                    (acc /
                      parseInt(state.operations[length - 2].valueNumber!)) *
                    calcPercentage(
                      value,
                      parseInt(state.operations[length - 2].valueNumber!)
                    )
                  )

                case '/':
                  if (state.operations.length < 3) {
                    return (
                      (acc *
                        parseInt(state.operations[length - 2].valueNumber!)) /
                      calcPercentage(
                        value,
                        parseInt(state.operations[length - 2].valueNumber!)
                      )
                    )
                  }
                  return (
                    acc +
                    parseInt(state.operations[length - 2].valueNumber!) /
                      calcPercentage(
                        value,
                        parseInt(state.operations[length - 2].valueNumber!)
                      ) -
                    parseInt(state.operations[length - 3].valueNumber!) /
                      parseInt(state.operations[length - 2].valueNumber!)
                  )

                case '%': //??
                  return 0

                default:
                  return 0
              }
            }
            return 0

          default:
            return 0
        }
      }
      return 0
    },
    state.operations && state.operations[0]
      ? parseInt(state.operations[0].valueNumber!)
      : 0
  )

  return result
}

function reducer(state: stateType, action: action): stateType {
  switch (action.type) {
    case 'add-digit':
      if (state.currentValue && action.digit) {
        if (state.currentValue.includes('.') && action.digit === '.') {
          return state
        } else if (
          state.currentValue[0] === '0' &&
          action.digit === '0' &&
          state.currentValue.length < 2
        ) {
          return state
        } else if (state.operations?.length === 1) {
          return {
            ...state,
            currentValue: `${state.currentValue}${action.digit}`,
            operations: [
              (state.operations[0] = {
                valueNumber: `${state.currentValue}${action.digit}`,
                sign: null,
              }),
            ],
          }
        } else if (state.operations && state.operations?.length >= 2) {
          if (state.operations?.length >= 2 && action.digit) {
            const lastItem = state.operations.length - 1

            return {
              ...state,
              operations: [
                ...state.operations.slice(0, -1),
                {
                  valueNumber: `${state.currentValue}${action.digit}`,
                  sign: state.operations[lastItem].sign,
                },
              ],
              currentValue: `${state.currentValue}${action.digit}`,
            }
          }
        }
      } else if (!state.currentValue) {
        if (state.operations) {
          const lastItem = state.operations.length - 1

          return {
            ...state,
            currentValue: `${state.currentValue || ''}${action.digit}`,
            operations: [
              ...state.operations.slice(0, -1),
              {
                valueNumber: `${action.digit}`,
                sign: state.operations[lastItem].sign,
              },
            ],
          }
        } else if (action.digit && !state.operations) {
          const operation: operation = {valueNumber: action.digit, sign: null}
          return {...state, operations: [operation], currentValue: action.digit}
        }
      }

      return {
        ...state,
        currentValue: `${state.currentValue || ''}${action.digit}`,
      }

    case 'operation-clicked': {
        // eslint-disable-next-line no-case-declarations
      const operation: operation = {valueNumber: null, sign: null}

      if (state.operations) {
        if (
          state.operations![state.operations!.length - 1].valueNumber === null
        ) {
          return state
        }
        operation.sign = action.sign
        return {
          ...state,
          operations: [...state.operations, operation],
          currentValue: '',
        }
      }

      return state
    }
    case 'clear':
      return {}

    case 'delete-digit':
      if (state.operations) {
        const lastItem = state.operations.length - 1
        if (state.operations[lastItem].valueNumber) {
          if (state.operations[lastItem].valueNumber?.length === 1) {
            return {
              ...state,
              operations: [
                ...state.operations.slice(0, -1),
                {valueNumber: null, sign: state.operations[lastItem].sign},
              ],
            }
          } else if (state.operations[lastItem].valueNumber!.length >= 2) {
            const stringLength = state.operations[lastItem].valueNumber!.length
            const objWithSlicedValue = {
              valueNumber: state.operations[lastItem].valueNumber!.slice(
                stringLength - 1
              ),
              sign: state.operations[lastItem].sign,
            }

            return {
              ...state,
              operations: [
                ...state.operations.map((item, i) =>
                  i === lastItem ? objWithSlicedValue : item
                ),
              ],
              currentValue: '',
            }
          }
        } else if (
          !state.operations[lastItem].valueNumber &&
          state.operations[lastItem].sign
        ) {
          return {...state, operations: [...state.operations.slice(0, -1)]}
        }
      }
      return state

    case actionTypes.Equals:
      if (state.operations) {
        return {...state, result: equalsIsClicked(state.operations, state)}
      }
      return state

    default:
      throw new Error()
  }
}

export const Calculator = () => {
  const [state, dispatch] = useReducer(reducer, {} as stateType)

  console.log(state)

  return (
    <Transition>
      <div className={classes.calcWrapper}>
        <div className={classes.calcContainer}>
          <div className={classes.calcInput}>
            {state.operations?.map((operation, i) => {
              if (!operation.sign && operation.valueNumber) {
                return (
                  <NumberValue
                    value={operation.valueNumber}
                    key={Date.now() + i}
                  />
                )
              } else if (!operation.valueNumber && operation.sign) {
                return <Sign sign={operation.sign} key={Date.now() + i} />
              }

              return (
                <>
                  <Sign sign={operation.sign} key={Math.random()} />
                  <NumberValue
                    value={operation.valueNumber!}
                    key={Date.now() + i}
                  />
                </>
              )
            })}

            {` = ${state.result ?? '0'} `}
          </div>
          <button
            className={classes.funcButtons}
            onClick={() => {
              dispatch({type: actionTypes.DELETE_DIGIT})
            }}
          >
            DEL
          </button>
          <button
            className={classes.funcButtons}
            onClick={() => {
              dispatch({type: actionTypes.CLEAR})
            }}
          >
            AC
          </button>
          <DigitButton dispatch={dispatch} digit="1" />
          <DigitButton dispatch={dispatch} digit="2" />
          <DigitButton dispatch={dispatch} digit="3" />
          <OperationButton
            styles={{disabled: true}}
            dispatch={dispatch}
            sign="+"
          />
          <DigitButton dispatch={dispatch} digit="4" />
          <DigitButton dispatch={dispatch} digit="5" />
          <DigitButton dispatch={dispatch} digit="6" />
          <OperationButton
            styles={{color: 'green'}}
            dispatch={dispatch}
            sign="-"
          />
          <DigitButton dispatch={dispatch} digit="7" />
          <DigitButton dispatch={dispatch} digit="8" />
          <DigitButton dispatch={dispatch} digit="9" />
          <button
            className={classes.operationButton}
            onClick={() => {
              dispatch({type: actionTypes.CHOOSE_OPERATION, sign: '/'})
            }}
          >
            ÷
          </button>
          <button
            className={classes.operationButton}
            onClick={() => {
              dispatch({type: actionTypes.CHOOSE_OPERATION, sign: '%'})
            }}
          >
            %
          </button>
          <DigitButton dispatch={dispatch} digit="0" />
          <DigitButton dispatch={dispatch} digit="." />
          <OperationButton
            styles={{color: 'green'}}
            dispatch={dispatch}
            sign="*"
          />

          <button
            className={classes.funcButtonsEquals}
            onClick={() => {
              dispatch({type: actionTypes.Equals, sign: '='})
            }}
          >
            =
          </button>
        </div>
      </div>
    </Transition>
  )
}
