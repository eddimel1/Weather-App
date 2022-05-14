import {motion} from 'framer-motion'
import classes from './Modal.module.css'
import React, {useEffect, useRef, useState} from 'react'
import {FilterOptions} from '../canvasFilters/filterOptions'
import filters from '../../../svgFilters.module.css'
//conditional return {ModalImg ||ModalEditCanvas} by Edit Mode
//transform urlObject into Blob and Blob into file with png mime type
//cache createdFile
//pass this file into canvas
//switch between modes and corresponding rendrers
export const Modal = (props: {
  selected: string
  setSelectedImg: React.Dispatch<React.SetStateAction<string | undefined>>
  filters: boolean
}) => {
  const [editMode, setEditMode] = useState<boolean>(false)
  const canvas = useRef<HTMLCanvasElement>(null)
  const img = new Image(0, 0)
  img.src = props.selected
  console.log(img.naturalWidth, img.naturalHeight)
  const handleClick = (e: any) => {
    if (e.target.classList.contains(classes.backdrop)) {
      props.setSelectedImg(undefined)
    }
  }
  useEffect(() => {
    if (editMode && canvas.current) {
      const img = new Image(0, 0)
      img.src = props.selected
      const ctx = canvas.current.getContext('2d')
      canvas.current.width =
        img.naturalHeight > 1200 ? img.naturalWidth / 2 : img.naturalWidth
      canvas.current.height =
        img.naturalHeight > 1200 ? img.naturalHeight / 2 : img.naturalHeight
      ctx?.drawImage(img, 0, 0, canvas.current.width, canvas.current.height)
    }
  }, [editMode])

  if (!editMode) {
    return (
      <>
        <motion.div
          className={`${classes.backdrop} ${filters.naturalShadow}`}
          onClick={handleClick}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
        >
          <motion.img
            src={props.selected}
            alt="enlarged pic"
            initial={{y: '-100vh'}}
            animate={{y: 0}}
          />
          {props.filters && (
            <button
              className={classes.button}
              style={{
                position: 'absolute',
                top: '0',
                left: '50%',
                width: '100px',
                height: '50px',
              }}
              onClick={() => {
                setEditMode(true)
              }}
            >
              Edit
            </button>
          )}
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
        <motion.div
          className={classes.canvasWithOptionsWrapper}
          initial={{y: '-100vh'}}
          animate={{y: 0}}
        >
          <motion.div className={classes.canvasWithOptionsContainer}>
            <motion.div className={classes.mainBox}>
              <motion.canvas ref={canvas} className={classes.canvas} />
              <motion.div className={classes.optionsContainer}>
                {props.filters && (
                  <FilterOptions canvasRef={canvas} url={props.selected} />
                )}
                <button
                  className={classes.button}
                  onClick={() => {
                    setEditMode(false)
                  }}
                >
                  Back
                </button>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </>
  )
}
