import react from 'react'

export enum converterKeys {
  Celsius = 'Celsius',
  Kelvin = 'Kelvin',
  Fahrenheit = 'Fahrenheit',
  Rankine = 'Rankine',
}
export enum degreeSigns {
  Celsius = '&#8451;',
}

export type converterArrayReturnType = [number, string, string]
export const celsiusFrom = function (
  amount: number,
  to: string
): converterArrayReturnType {
  switch (to) {
    case converterKeys.Kelvin: {
      const result = amount + 273.15
      return [result, ' K = ℃ + 273.15', ` ${amount} + 273 = ${result} K `]
    }

    case converterKeys.Fahrenheit: {
      const result1 = (amount * 9) / 5 + 32
      return [
        result1,
        ' ℉ = ℃ * 9/5 + 32',
        ` ${amount} * 9/5 + 32 = ${result1} K `,
      ]
    }

    case converterKeys.Rankine: {
      const result2 = (amount * 9) / 5 + 491.67
      return [
        result2,
        ' °R = ℃ * 9/5 + 491.67',
        ` ${amount} * 9/5 + 491.67 = ${result2} K `,
      ]
    }

    default:
      return [amount, '', '']
  }
}

export const fahrenheitFrom = function (
  amount: number,
  to: string
): converterArrayReturnType {
  switch (to) {
    case converterKeys.Kelvin: {
      const result = ((amount + 459.67) * 5) / 9
      return [
        result,
        ' K = ℉ * 9/5 + 32',
        ` ${amount + 459.67} * 5/9 = ${result} ℉ `,
      ]
    }

    case converterKeys.Celsius: {
      const result1 = ((amount - 32) * 5) / 9
      return [
        result1,
        ' ℃ = ℉ * 9/5 + 32',
        ` ${amount - 32} * 5/9 = ${result1} ℃ `,
      ]
    }

    case converterKeys.Rankine: {
      const result2 = amount + 459.67
      return [
        result2,
        '°R = ℉ + 459.67',
        ` ${amount} + 459.67 = ${result2} °R `,
      ]
    }

    default:
      return [amount, '', '']
  }
}

export const KelvinFrom = function (
  amount: number,
  to: string
): converterArrayReturnType {
  switch (to) {
    case converterKeys.Celsius: {
      const result = amount - 273.15
      return [result, ' ℃ = K - 273.15', ` ${amount} - 273 = ${result} ℃ `]
    }

    case converterKeys.Fahrenheit: {
      const result1 = (9 / 5) * (amount - 273) + 32
      return [
        result1,
        ' ℉ =  9/5 * (K - 273) + 32',
        ` ${amount} * 9/5 - 459.67 = ${result1} ℃ `,
      ]
    }

    case converterKeys.Rankine: {
      const result2 = (amount * 9) / 5
      return [result2, ' °R = K * 9/5 ', ` ${amount} * 9/5  = ${result2} °R`]
    }

    default:
      return [amount, '', '']
  }
}

export const rankineFrom = function (
  amount: number,
  to: string
): converterArrayReturnType {
  switch (to) {
    case converterKeys.Kelvin: {
      const result = (amount * 5) / 9
      return [result, ' K = °R * 9/5 ', ` ${amount} * 5/9 = ${result} K `]
    }

    case converterKeys.Fahrenheit: {
      const result1 = amount - 459.67
      return [
        result1,
        ' ℉ = °R - 459.67 ',
        ` ${amount} - 459.67 = ${result1} K `,
      ]
    }

    case converterKeys.Celsius: {
      const result2 = (amount * 5) / 9 - 273.15
      return [
        result2,
        ' ℃  = °R * 5/9 - 273.15',
        ` ${amount} * 5/9 - 273.15 = ${result2} K `,
      ]
    }

    default:
      return [amount, '', '']
  }
}
