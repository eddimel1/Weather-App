import React, { useContext, useEffect, useState } from 'react'
import classes from './dailyForeCast.module.css'
import { DailyForeCastItem } from '../../components/dailyForeCastItem/dailyForeCastItem'
import { Days } from '../../staticData/mainData'
import { getDatefromData , KelvinToCelcius}  from '../../utils/utils'
import { UsefetchWeatherData } from '../../hooks/fetchWeatherData'
import { successCallback, failureCallback } from '../../utils/geoLocationUtils'
import { Input } from '../../components/UI/input/input'
import { Transition1 } from '../../components/transitionComps/transitionOnlyOpacity'


export const DailyForeCast = () => {
     const defaultExcludeArray = ['minutely','current','alerts','hourly']
    
    const [town , setTown] = useState<string>('')
    const {weatherData , setWeatherDataByTown , setWeatherDataByCoords , error} = UsefetchWeatherData()
    console.log(weatherData)
    console.log(error)

   const inputStyles : React.CSSProperties = { 
        marginTop : '2rem',
        alignSelf:'flex-end',
        minHeight : '35px',
        position : 'relative',
        border : '2px white solid',
        borderRadius : '13px',
        fontSize : '20px',
        fontWeight : '500',
        width : '50%',
         background:'rgb(230,230,230)'} 

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition((pos) => {successCallback(pos,  setWeatherDataByCoords , defaultExcludeArray)} , (pos) => {failureCallback(pos ,setWeatherDataByTown , defaultExcludeArray)})

    },[])
    useEffect(() => {
            
        setWeatherDataByTown(town , defaultExcludeArray)
            },[ town ])
            
  
  return (
      <>
      <Transition1>
      <div className={classes.dailyWrapper}>
        <div className={classes.dailyContainer}>
          <div className={classes.dailyTop}>
              <div className={classes.dailyTopLeft}>
              <div className={classes.dailyTopLeftContainer}>
                  <div className={classes.weatherDataContainer}>
                    <div className={classes.timeAndDataContainer}>

                  <div className={classes.time}>{`${getDatefromData('hours')} : ${getDatefromData('minutes')}`} PM</div>
                  <h3 className={classes.date}>{`${getDatefromData('day')} , ${getDatefromData('dayOfMonth')} ${getDatefromData('month')}`}</h3>
                    </div>
                  <div className={classes.weatherData}>
                      <div className={classes.weatherDataItem}>Humidity :  {weatherData?.daily ?  weatherData.daily[0].humidity + '%' : '' }</div>
                      <div className={classes.weatherDataItem}>Pressure :  {weatherData?.daily ?  weatherData.daily[0].pressure + ' Hpa' : '' }</div>
                      <div className={classes.weatherDataItem}>Day :  {weatherData?.daily ?  KelvinToCelcius(weatherData.daily[0].temp.day) : '' } &#8451;</div>
                      <div className={classes.weatherDataItem}>Night: {weatherData?.daily ?  KelvinToCelcius(weatherData.daily[0].temp.night) : '' }  &#8451;</div>
                      <div className={classes.weatherDataItem}>Wind :  {weatherData?.daily ? weatherData.daily[0].wind_speed +'m/s' : '' }</div>
                  </div>
                  </div>
              </div>
              </div>
              <div className={classes.dailyTopRight}>
                  
                  <div className={classes.dailyTopRightLocation}>{town ? town : 'Tallinn'}</div>
                  <Input setTown={setTown} styles={inputStyles} />
              </div>
          </div>
          <div className={classes.dailyBottom}>
              <div className={classes.dailyBottomContainer}>
                  <div className={classes.dailyBottomCurrentForeCast}>
                      <div className={classes.dailyBottomCurrentForeCastContainer}>
                          <div className={classes.currentDay}>{weatherData?.daily ? Days[new Date( weatherData.daily[0].dt * 1000).getDay()] : '' } </div>
                           <div className={classes.currentWeatherIcon}>
                            <img  src={`http://openweathermap.org/img/wn/${weatherData?.daily ? weatherData.daily[0].weather[0].icon : '10d' }@2x.png`} alt="icon"   />
                           </div>
                           
                           <div className={classes.weatherTimeCurrent}>Night - {weatherData?.daily ?  KelvinToCelcius(weatherData.daily[0].temp.night) : '' } &#8451; </div>
                           <div className={classes.weatherTimeCurrent}>Day - {weatherData?.daily ?  KelvinToCelcius(weatherData.daily[0].temp.day) : '' } &#8451; </div>
                      </div>

                  </div>
                  <div className={classes.dailyBottomDailyForeCast}>
                      
                      <div className={classes.dailyForeCastItem}>
                      
                          </div>
                          {weatherData?.daily?.slice(1).map((item,index,array)=>{
                              console.log(index)
                               if(index === array.length -1){
                                   console.log(index , array.length)
                                   return
                               }
                               
                             
                             return <DailyForeCastItem dt={item.dt} icon={item.weather[0].icon} day={item.temp.day} night={item.temp.night} key={Date.now() + index} />
                          })} 
                         
                  </div>
              </div>
          </div>

        </div>


    </div>
      

      </Transition1>
      


      
    
      </>
  )
}
