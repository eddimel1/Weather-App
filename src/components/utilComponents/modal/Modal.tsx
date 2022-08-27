import {motion} from 'framer-motion'
import classes from './Modal.module.css'
import React, {useEffect, useRef, useState} from 'react'
import {FilterOptions} from '../canvasFilters/filterOptions'
import filters from '../../../svgFilters.module.css'
export const Modal = (props: {
  selected: string
  setSelectedImg: React.Dispatch<React.SetStateAction<string | undefined>>
  filters: boolean
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const canvasContainer = useRef<HTMLDivElement | null>(null)
  const canvas = useRef<HTMLCanvasElement | null>(null)
  const img = useRef<HTMLImageElement | null>(null)
  const ctx = useRef<CanvasRenderingContext2D | null>(null)
  const initialViewport = useRef<{width: number; height: number}>({
    width: innerWidth,
    height: innerHeight,
  })
  const modalButtonRef = useRef<HTMLButtonElement | null>(null)

  const handleClick = (e: any) => {
    if (
      e.target.classList.contains(classes.backdrop) ||
      e.target.classList.contains(classes.imgAndButtonContainer)
    ) {
      props.setSelectedImg(undefined)
    }
  }

  const sizeAndResize = (mode: 'initial' | 'resize') => {
    if (canvas.current && ctx.current && img.current) {
      const iWidth = initialViewport.current.width
      const iHeight = initialViewport.current.height
      const cWidth = window.innerWidth
      const cHeight = window.innerHeight
      // if width is changing more than height , pick width changing ratio , otherwise height changing ratio
      const scalingRation =
        cWidth / iWidth < cHeight / iHeight
          ? cWidth / iWidth
          : cHeight / iHeight
      const HeightIsBiggerThanWidth =
        canvas.current.height > canvas.current.width
      if (HeightIsBiggerThanWidth) {
        canvas.current.width = img.current.naturalWidth * scalingRation * 1.2
        canvas.current.height = img.current.naturalHeight * scalingRation * 1.2
      } else {
        if (cWidth > 1400) {
          canvas.current.width = img.current.naturalWidth * scalingRation * 1.1
          canvas.current.height =
            img.current.naturalHeight * scalingRation * 1.1
        } else if (cWidth < 1400) {
          canvas.current.width = img.current.naturalWidth * scalingRation * 1.25
          canvas.current.height =
            img.current.naturalHeight * scalingRation * 1.25
        }
      }
      if (canvasContainer.current) {
        const HeightIsBiggerThanWidth1 =
          canvas.current.height > canvas.current.width
        canvasContainer.current.style.top = `${
          10 * (1 + Math.abs((iWidth - cWidth) / iWidth))
        }%`
        if (cWidth < 1400 && HeightIsBiggerThanWidth)
          canvas.current.style.maxHeight = '800px'
        if (cWidth < 1100 && HeightIsBiggerThanWidth)
          canvas.current.style.maxHeight = '750px'
        if (cWidth < 900 && HeightIsBiggerThanWidth)
          canvas.current.style.maxHeight = '600px'
        if (cWidth < 1400 && !HeightIsBiggerThanWidth)
          canvas.current.style.maxWidth = '930px'
        if (cWidth < 1100 && !HeightIsBiggerThanWidth)
          canvas.current.style.maxWidth = '730px'
        if (cWidth < 900 && !HeightIsBiggerThanWidth) {
          canvas.current.style.maxWidth = '550px'
          canvasContainer.current.style.width = '100%'
        }
        if (cWidth < 700 && !HeightIsBiggerThanWidth) {
          canvas.current.style.maxWidth = '450px'
        }
        canvasContainer.current.style.marginLeft = `${Math.abs(
          (iWidth - cWidth) / 20
        )}px`
        if (mode === 'initial' && HeightIsBiggerThanWidth1) {
          if (cWidth > 900) {
            canvasContainer.current.style.left = `calc(30% - ${
              Math.abs(cWidth - iWidth) / 10
            }px)`
          } else {
            canvasContainer.current.style.left = `5%`
          }
        } else {
          canvasContainer.current.style.left = `calc(8% - ${
            Math.abs(cWidth - iWidth) / 10
          }px)`
        }
      }
      //rescale canvas and redraw on rescaled canvas
      ctx.current.drawImage(
        img.current,
        0,
        0,
        canvas.current.width,
        canvas.current.height
      )
    }
  }
  const canvasResizeCb = () => {
    sizeAndResize('resize')
  }
  const imgOnLoadCb = (e: any) => {
    img.current = e.target
  }
  useEffect(() => {
    window.removeEventListener('resize', canvasResizeCb)
    window.addEventListener('resize', canvasResizeCb)
    if (canvas.current) {
      ctx.current = canvas.current.getContext('2d')
    }
    sizeAndResize('initial')

    return () => window.removeEventListener('resize', canvasResizeCb)
  }, [editMode, canvas.current])

  if (!editMode) {
    return (
      <>
        <motion.div
          className={`${classes.backdrop} ${filters.naturalShadow}`}
          onClick={handleClick}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
          <motion.div
            initial={{y: '-100vh'}}
            animate={{y: 0}}
            className={classes.imgAndButtonContainer}
          >
            {props.filters && (
              <motion.button
                initial={{y: '-100vh'}}
                animate={{y: 0}}
                className={`${classes.button} ${classes.button1}`}
                onClick={() => {
                  setEditMode(true)
                }}
              >
                Edit
              </motion.button>
            )}
            <motion.img
              onLoad={imgOnLoadCb}
              initial={{y: '-100vh'}}
              animate={{y: 0}}
              src={props.selected}
              alt="enlarged pic"
            />
          </motion.div>
        </motion.div>
      </>
    )
  }
  return (
    <>
      <motion.div
        className={classes.backdrop}
        onClick={handleClick}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
      >
        <div className={classes.canvasWithOptionsWrapper} ref={canvasContainer}>
          <motion.div initial={{y: '-100vh'}} animate={{y: 0}}>
            <motion.div className={classes.mainBox}>
              <motion.button
                ref={modalButtonRef}
                initial={{y: '-100vh'}}
                animate={{y: 0}}
                className={`${classes.button} ${classes.button2}`}
                onClick={() => {
                  setEditMode(false)
                }}
              >
                Back
              </motion.button>
              <motion.canvas ref={canvas} className={classes.canvas} />
              <motion.div className={classes.optionsContainer}>
                {props.filters && (
                  <FilterOptions canvasRef={canvas} url={props.selected} />
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </>
  )
}
