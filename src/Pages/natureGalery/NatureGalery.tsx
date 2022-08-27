import React, {useEffect, useRef, useState} from 'react'
import {Input} from '../../components/UI/input/input'
import classes from '../natureGalery/NatureGalery.module.css'
import {Transition} from '../../components/transitionComps/transition'
import {GaleryImageComp} from '../../components/imageComp/imageComp'
import {Modal} from '../../components/utilComponents/modal/Modal'
export const NatureGalery = () => {
  const ApiKey = process.env.REACT_APP_UNSPLASH_APP_KEY
  const [data, setData] = useState<any>([])
  const [town, setTown] = useState<string>('')
  const [selected, setSelected] = useState<string | undefined>(undefined)
  const [currentPage, setCurrentPage] = useState(1)
  const [waiting, setWaiting] = useState<boolean>(false)
  const grid = useRef<HTMLDivElement>(null)
  const createPaginationNumbers = (count: number): number[] => {
    const arr: number[] = []
    for (let i = 0; i <= count; i++) {
      arr.push(i)
    }
    return arr
  }

  useEffect(() => {
    setWaiting(true)
    fetch(
      `https://api.unsplash.com/search/photos?query=${town},nature&page=${currentPage}&per_page=10&client_id=${ApiKey}`,
      {mode: 'cors', headers: {'Access-Control-Allow-Origin': '*'}}
    )
      .then((data) => data.json())
      .then((data) => setData(data))
    setTimeout(() => {
      setWaiting(false)
    }, 300)
  }, [town, currentPage])

  return (
    <>
      <Transition>
        <div className={classes.mainWrapper}>
          <Input
            setTown={setTown}
            styles={{
              width: '50%',
              position: 'relative',
              left: '30%',
              top: '3%',
              color: 'green',
              fontWeight: '700',
            }}
          />
          <div
            className={`${classes.imageGrid} ${
              waiting ? `${classes.waiting}` : ''
            }`}
            ref={grid}
          >
            {data.results &&
              data.results.map((result: any, i: number, array: any[]) => {
                if (i === 0 || i === 3 || i === 6) {
                  return (
                    <div
                      className={`${classes.column} ${
                        waiting ? `${classes.waiting}` : ''
                      }`}
                      key={Date.now() + Math.random()}
                    >
                      <GaleryImageComp
                        alt="natureImage"
                        height={array[i].height}
                        src={array[i].urls.regular}
                        width={array[i].width}
                        setSelected={setSelected}
                        index={i.toString()}
                      ></GaleryImageComp>
                      <GaleryImageComp
                        alt="natureImage"
                        height={array[i + 1].height}
                        src={array[i + 1].urls.regular}
                        width={array[i + 1].width}
                        setSelected={setSelected}
                        index={(i + 1).toString()}
                      ></GaleryImageComp>
                      <GaleryImageComp
                        alt="natureImage"
                        height={array[i + 2].height}
                        src={array[i + 2].urls.regular}
                        width={array[i + 2].width}
                        setSelected={setSelected}
                        index={(i + 2).toString()}
                      ></GaleryImageComp>
                    </div>
                  )
                } else {
                  return
                }
              })}
            {selected && (
              <Modal
                filters={true}
                selected={data.results[selected].urls.regular}
                setSelectedImg={setSelected}
              />
            )}
          </div>
          <div
            className={classes.paginationBar}
            style={{display: `${waiting ? 'none' : 'flex'}`}}
          >
            {createPaginationNumbers(10).map((number, i) => {
              return (
                <li
                  key={Date.now() + i}
                  className={classes.page}
                  onClick={() => {
                    setTimeout(() => {
                      setCurrentPage(number)
                    }, 800)

                    setTimeout(() => {
                      grid.current?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                      })
                    }, 0)
                  }}
                >
                  {number}
                </li>
              )
            })}
          </div>
        </div>
      </Transition>
    </>
  )
}
