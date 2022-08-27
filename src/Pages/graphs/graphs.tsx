import React, {useEffect, useState} from 'react'
import classes from './graphs.module.css'
import {UsefetchWeatherData} from '../../hooks/fetchWeatherData'
import {KelvinToCelcius} from '../../utils/utils'
import {Input} from '../../components/UI/input/input'
import {OptionItem} from '../../components/optionItem/optionItem'
import {hourlyType} from '../../staticData/mainData'
import {ChartOptionItem} from '../../components/chartOptionItem/chartOptionItem'
import {Transition} from '../../components/transitionComps/transition'

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement,
  ArcElement,
} from 'chart.js'
import {Bar, Line, Doughnut, Pie} from 'react-chartjs-2'

export type optionsArray =
  | 'Temp'
  | 'Humidity'
  | 'Pressure'
  | 'Wind Speed'
  | 'Wind Gust'
  | 'Visibility'
const optionsArray = [
  'Temp',
  'Humidity',
  'Pressure',
  'Wind Speed',
  'Wind Gust',
  'Visibility',
]
const chartArray = ['Bar', 'Line']
export type arraysChartType = 'Bar' | 'Line' | 'Pie' | 'Doughnut'
export type sliceHours = 24 | 0

export const Graphs = () => {
  const {weatherData, setWeatherDataByTown} = UsefetchWeatherData()
  const [town, setTown] = useState<string>('')
  const [selected, setSelected] = useState<optionsArray>('Temp')
  const [selectedChart, setSelectedChart] = useState<arraysChartType>('Line')
  const [hours, setHours] = useState<sliceHours>(0)

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    selectedChart === 'Bar'
      ? BarElement
      : selectedChart === 'Line'
      ? LineElement
      : ArcElement,
    Tooltip,
    Title,
    Legend
  )

  const labels = weatherData?.hourly?.slice(hours).map((hour, index) => {
    return index
  })

  type data1Dataset = {
    label: optionsArray
    borderColor: string | string[]
    backgroundColor: string | string[]
    data: any
  }
  type data1Type = {
    labels: string | string[] | number[]
    datasets: data1Dataset[]
  }
  const data1 = {
    labels: labels,
    datasets: [
      {
        label: selected,
        borderColor: 'rgb(255, 255, 255)',
        backgroundColor: 'rgb(255, 255,255)',
        data: weatherData?.hourly?.slice(hours).map((hour) => {
          if (selected === 'Temp') {
            return KelvinToCelcius(hour.temp)
          }

          const lower = selected
            .toLowerCase()
            .replaceAll(/ /g, '_') as keyof hourlyType
          return hour[lower]
        }),
      },
    ],
  }
  const options1 = {
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      y: {
        max:
          selected === 'Visibility'
            ? 10500
            : selected === 'Temp'
            ? 50
            : selected === 'Pressure'
            ? 1500
            : selected === 'Humidity'
            ? 100
            : 100,
        min:
          selected === 'Visibility'
            ? 0
            : selected === 'Temp'
            ? -50
            : selected === 'Pressure'
            ? 0
            : selected === 'Humidity'
            ? 0
            : 0,
        ticks: {
          stepSize:
            selected === 'Visibility'
              ? 100
              : selected === 'Temp'
              ? 1
              : selected === 'Pressure'
              ? 100
              : selected === 'Humidity'
              ? 10
              : 1,
        },
      },
    },
    animation: {
      duration: 2000,
    },
  }

  useEffect(() => {
    setWeatherDataByTown(town ? town : 'Tallinn', [
      'alerts,minutely,current,daily',
    ])
  }, [town])

  return (
    <Transition>
      <div
        className={classes.mainWrapper}
        style={{
          display: 'flex',
          maxHeight: '70%',
          maxWidth: '70%',
          width:
            selectedChart === 'Doughnut' || selectedChart === 'Pie'
              ? '35%'
              : 'auto',
          margin: '5rem 3rem 2rem 5rem',
        }}
      >
        {selectedChart === 'Line' ? (
          <Line className={classes.chart} data={data1} options={options1} />
        ) : selectedChart === 'Bar' ? (
          <Bar className={classes.chart} data={data1} options={options1} />
        ) : selectedChart === 'Doughnut' ? (
          <Doughnut data={data1} options={options1} width="200px" />
        ) : (
          <Pie data={data1} options={options1} />
        )}
        <div className={classes.optionsWrapper}>
          <div className={classes.optionsMainContainer}>
            <div className={classes.topFlexContainer}>
              <Input
                setTown={setTown}
                styles={{
                  maxWidth: '12rem',
                  marginBottom: '2rem',
                  minHeight: '35px',
                }}
              />
              <div className={classes.town}> {town ? town : 'Tallinn'}</div>
            </div>

            <div className={classes.optionsContainer}>
              <div className={classes.optionItemContainer}>
                {optionsArray.map((option, i) => {
                  return (
                    <OptionItem
                      key={Date.now() + i}
                      index={option}
                      setSelected={setSelected}
                      selected={selected}
                    />
                  )
                })}
              </div>
              <div className={classes.chartOptionItem}>
                {chartArray.map((chart, i) => {
                  return (
                    <ChartOptionItem
                      key={Date.now() + i}
                      index={chart}
                      setChartSelected={setSelectedChart}
                      selected={selectedChart}
                    />
                  )
                })}
                <div className={classes.setHoursContainer}>
                  <div
                    style={{
                      backgroundColor: hours === 24 ? 'white' : '',
                      color: hours === 24 ? 'brown' : 'black',
                    }}
                    onClick={() => setHours(24)}
                    className={classes.setHours}
                  >
                    24H
                  </div>
                  <div
                    style={{
                      backgroundColor: hours === 0 ? 'white' : '',
                      color: hours === 0 ? 'brown' : 'black',
                    }}
                    onClick={() => setHours(0)}
                    className={classes.setHours}
                  >
                    48H
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  )
}
