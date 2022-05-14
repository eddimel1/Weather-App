import React, {FC, useEffect, useState} from 'react'
import classes from './filterOptions.module.css'
import {FilterInput} from './filterInput'
import {option} from './filterInput'
import image from '../../../assets/Heavy_rain.svg.png'
import filters from '../../../svgFilters.module.css'

/**
 * props:{setter , arrayofOptions}
 * each option has responsibility for every input
 * each option on click will check if an array includes this option , if it does delete hardcoded value from an array , othertwise add hardcoded value to an array
 * if an array includes this option render input with correspoding hardcoded value
 * input will have a reference to the canvas and will change filter with corresponding values
 *
 *
 */
type propType = {
  canvasRef: React.RefObject<HTMLCanvasElement>
  url: string
}
export type objOfInputValuesType = {
  contrast: number
  grayscale: number
  invert: number
  saturate: number
  sepia: number
  blur: number
  huerotate: number
  brightness: number
}

export const FilterOptions: FC<propType> = (props: propType) => {
  const [activeOption, setActiveOption] = useState<string | undefined>(
    undefined
  )
  const [objOfInputValues, setObjOfInputValues] =
    useState<objOfInputValuesType>({
      contrast: 1,
      grayscale: 0,
      invert: 0,
      saturate: 1,
      sepia: 0,
      blur: 0,
      huerotate: 0,
      brightness: 1,
    })
  const canvas = props.canvasRef.current
  const [options, setOptions] = useState<string[]>([])

  const checkOptions = (array: string[], string: string) => {
    if (array.includes(string)) {
      const index = array.indexOf(string, 0)
      array.splice(index, 1)
      return array
    } else if (!array.includes(string)) {
      array.push(string)
      return array
    }
    return array
  }
  const resetAndReDraw = (img: string, ref: HTMLCanvasElement | null) => {
    const img1 = new Image(0, 0)
    img1.src = img
    setObjOfInputValues({
      contrast: 1,
      grayscale: 0,
      invert: 0,
      saturate: 1,
      sepia: 0,
      blur: 0,
      huerotate: 0,
      brightness: 1,
    })
    setOptions([])
    if (ref) {
      const ctx = ref.getContext('2d')
      if (ctx) {
        ctx.filter = 'contrast(1)'
        ctx.drawImage(img1, 0, 0, ref.width / 2, ref.height / 2)
      }
    }
  }
  const checkOption = (
    currentOption: string,
    activeOption: string | undefined,
    fc: React.Dispatch<React.SetStateAction<string | undefined>>
  ) => {
    if (currentOption === activeOption) {
      fc(undefined)
    } else if (activeOption === undefined) {
      fc(currentOption)
    }
  }
  const pushOptions = (option: string) => {
    setActiveOption(option)
    checkOption(option, activeOption, setActiveOption)
    setOptions(checkOptions(options, option))
  }
  const filterStringBuilder = (
    options: string[],
    objOfInputValues: objOfInputValuesType
  ) => {
    let finalFilterString: string = ''
    console.log(finalFilterString)
    if (options) {
      for (let i = 0; i < options.length; i++) {
        const lowercase = options[i].toLowerCase()
        if (options[i] === 'HueRotate') {
          finalFilterString += ` hue-rotate(${
            objOfInputValues[lowercase as option]
          }deg)`
        } else if (options[i] === 'Blur') {
          finalFilterString += ` blur(${
            objOfInputValues[lowercase as option]
          }px)`
        } else {
          finalFilterString += ` ${lowercase}(${
            objOfInputValues[lowercase as option]
          })`
        }
      }
      return finalFilterString
    }
  }
  useEffect(() => {
    const ctx = props.canvasRef.current?.getContext('2d')
    if (ctx && props.canvasRef.current) {
      const img = new Image(0, 0)
      img.src = props.url
      ctx.filter = 'contrast(1)'
      ctx.drawImage(
        img,
        0,
        0,
        props.canvasRef.current.width / 2,
        props.canvasRef.current.height / 2
      )
    }
  }, [])
  useEffect(() => {
    const ctx = props.canvasRef.current?.getContext('2d')
    if (ctx && props.canvasRef.current) {
      const img = new Image(0, 0)
      img.src = props.url

      console.log(filterStringBuilder(options, objOfInputValues))
      ctx.filter = filterStringBuilder(options, objOfInputValues) || ''
      ctx.drawImage(
        img,
        0,
        0,
        props.canvasRef.current.width,
        props.canvasRef.current.height
      )
    }
  }, [options, objOfInputValues, props.canvasRef, activeOption])
  return (
    <>
      <div className={`${classes.optionsContainer} ${filters.naturalShadow}`}>
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Contrast')
          }}
        >
          Contrast
        </div>
        {options && options.includes('Contrast') && (
          <FilterInput
            min="1"
            max="100"
            step="0.1"
            setValues={setObjOfInputValues}
            option="contrast"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Grayscale')
          }}
        >
          Grayscale
        </div>
        {options && options.includes('Grayscale') && (
          <FilterInput
            min="0"
            max="100"
            step="0.1"
            setValues={setObjOfInputValues}
            option="grayscale"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Invert')
          }}
        >
          Invert
        </div>
        {options && options.includes('Invert') && (
          <FilterInput
            min="0"
            max="100"
            step="0.1"
            setValues={setObjOfInputValues}
            option="invert"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Saturate')
          }}
        >
          Saturate
        </div>
        {options && options.includes('Saturate') && (
          <FilterInput
            min="0"
            max="100"
            step="0.1"
            setValues={setObjOfInputValues}
            option="saturate"
            objOfInputValues={objOfInputValues}
          />
        )}

        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Sepia')
          }}
        >
          Sepia
        </div>
        {options && options.includes('Sepia') && (
          <FilterInput
            min="0"
            max="100"
            step="0.1"
            setValues={setObjOfInputValues}
            option="sepia"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Blur')
          }}
        >
          Blur
        </div>
        {options && options.includes('Blur') && (
          <FilterInput
            min="0"
            max="100"
            step="0.1"
            setValues={setObjOfInputValues}
            option="blur"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('HueRotate')
          }}
        >
          Hue-Rotate
        </div>
        {options && options.includes('HueRotate') && (
          <FilterInput
            min="0"
            max="360"
            step="0.1"
            setValues={setObjOfInputValues}
            option="huerotate"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          className={`${classes.option} ${filters.naturalShadow}`}
          onClick={() => {
            pushOptions('Brightness')
          }}
        >
          Brightness
        </div>
        {options && options.includes('Brightness') && (
          <FilterInput
            min="1"
            max="10"
            step="0.01"
            setValues={setObjOfInputValues}
            option="brightness"
            objOfInputValues={objOfInputValues}
          />
        )}
        <div
          onClick={() => {
            resetAndReDraw(props.url, props.canvasRef.current)
          }}
          className={classes.option}
        >
          Reset Values
        </div>
        <div
          className={classes.option}
          onClick={() => {
            if (canvas) {
              console.log('downloading')
              const a = document.createElement('a')
              a.download = 'picture.png'
              a.href = canvas.toDataURL('image/jpeg', 1.0)
              a.click()
            }
          }}
        >
          Download
        </div>
      </div>
    </>
  )
}
