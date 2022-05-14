import React, {useEffect, useState} from 'react'
import classes from './converter1.module.css'
import {ConverterBox} from '../../components/utilComponents/converter/converterBox'
import {
  celsiusFrom,
  KelvinFrom,
  fahrenheitFrom,
  rankineFrom,
  converterArrayReturnType,
} from '../../utils/converterUtils'
import {converterKeys} from '../../utils/converterUtils'
import {FormulaComp} from '../../components/utilComponents/converter/formulaComp'
import {Calculator} from '../../components/utilComponents/calculator/calculator'
import {Transition} from '../../components/transitionComps/transition'
export const Converter1 = () => {
  const [selectedFrom, setSelectedFrom] = useState('')
  const [selectedTo, setSelectedTo] = useState('')
  const [amountFrom, setAmountFrom] = useState(1)
  const [amountTo, setAmountTo] = useState(0)
  const [isSelectedFrom, setIsSelectedFrom] = useState(false)
  const [calculatedValueFrom, setCalculatedValueFrom] = useState('')
  const [calculatedValueTo, setCalculatedValueTo] = useState('')
  const [formulas, setFormulas] = useState<Array<string>>([])
  //console.log(' inputfrom :' , amountFrom , 'inputTo : ' , amountTo , 'selectedFrOM : ' , selectedFrom, 'selectedTo : ' , selectedTo , 'result : ' , calculatedValueFrom)

  const setInputInfoFrom = function (change: number): void {
    setAmountFrom(change)
    setAmountTo(0)
  }
  const setInputInfoTo = function (change: number): void {
    setAmountTo(change)
    setAmountFrom(0)
  }

  useEffect(() => {
    setSelectedFrom('Celsius')
    setSelectedTo('Fahrenheit')
  }, [])
  const calcFrom = function (): converterArrayReturnType {
    switch (selectedFrom) {
      case converterKeys.Celsius:
        return celsiusFrom(amountFrom, selectedTo)
      case converterKeys.Kelvin:
        return KelvinFrom(amountFrom, selectedTo)
      case converterKeys.Fahrenheit:
        return fahrenheitFrom(amountFrom, selectedTo)
      case converterKeys.Rankine:
        return rankineFrom(amountFrom, selectedTo)

      default:
        return 0 || [0, '', '']
    }
  }
  const calcTo = function (): converterArrayReturnType {
    switch (selectedTo) {
      case converterKeys.Celsius:
        return celsiusFrom(amountTo, selectedFrom)
      case converterKeys.Kelvin:
        return KelvinFrom(amountTo, selectedFrom)
      case converterKeys.Fahrenheit:
        return fahrenheitFrom(amountTo, selectedFrom)
      case converterKeys.Rankine:
        return rankineFrom(amountTo, selectedFrom)

      default:
        return 0 || [0, '', '']
    }
  }

  useEffect(() => {
    if (amountFrom) {
      const [value, formula, formulaWithVal] = calcFrom()

      setCalculatedValueTo(value.toString())
      setFormulas([formula, formulaWithVal])
    } else {
      const [value, formula, formulaWithVal] = calcTo()

      setCalculatedValueFrom(value.toString())
      setFormulas([formula, formulaWithVal])
    }
  }, [selectedFrom, selectedTo, amountFrom, amountTo])
  return (
    <Transition>
      <div className={classes.converterWrapper}>
        <div className={classes.calcContainer}>
          <Calculator />
        </div>

        <div className={classes.converterContainer}>
          <ConverterBox
            setSelected={setSelectedFrom}
            selected={selectedFrom}
            setInputInfo={setInputInfoFrom}
            calculatedValue={calculatedValueFrom}
            amount={amountFrom}
            setCalculated={setCalculatedValueFrom}
          />
          <ConverterBox
            setSelected={setSelectedTo}
            selected={selectedTo}
            setInputInfo={setInputInfoTo}
            calculatedValue={calculatedValueTo}
            amount={amountTo}
            setCalculated={setCalculatedValueTo}
          />
          <FormulaComp formulas={formulas} />
        </div>
      </div>
    </Transition>
  )
}
