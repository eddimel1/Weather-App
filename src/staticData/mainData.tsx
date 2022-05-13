import react from 'React'


 type weatherType = {
    description: string
    icon: string
    id: number
    main: string
    }
    type feelsLike = {
    day: number
    eve: number
    morn: number
    night: number
    }

type tempType = {
    day: number
    eve: number
    max: number
    min: number
    morn: number
    night: number
}
   export type currentType =  {
    clouds: number
    dew_point: number
    dt: number
    feels_like: number
    humidity: number
    pressure: number
    sunrise: number
    sunset: number
    temp: number
    uvi: number
    visibility: number
    weather: Array<weatherType>
    wind_deg: number
    wind_gust: number
    wind_speed: number
    }
    export type dailyType = {
        clouds: number
        dew_point: number
        dt: number
        feels_like: feelsLike
        day: number
        eve: number
        morn: number
        night: number
      
        humidity: number
        moon_phase: number
        moonrise: number
        moonset: number
        pop: number
        pressure: number
        sunrise: number
        sunset: number
        temp: tempType
        uvi: number
        weather: Array<weatherType>
        wind_deg: number
        wind_gust: number
        wind_speed: number
}

export type hourlyType = {
clouds: number
dew_point: number
dt: number
feels_like: number
humidity: number
pop: number
pressure: number
temp: number
uvi: number
visibility: number
weather: Array<weatherType>
wind_deg: number
wind_gust: number
wind_speed: number
}
    
export type data = {
current : currentType,
daily : Array<dailyType>,
hourly : Array<hourlyType>
}
export type partialData = Partial<data>




  
export enum Days  {
    Monday = 1 ,
    Tuesday = 2 ,
    Wednesday = 3,
    Thurdsay = 4,
    Friday = 5,
    Saturday = 6,
    Sunday = 0
}
export enum Months {
    January = 0 ,
    February = 1 ,
    March = 2,
    April = 3,
    May = 4,
    June = 5,
    July = 6,
    August = 7,
    September = 8,
    October = 9,
    November = 10,
    December = 11
}
export const monthsArray = [
    "January" ,
    "February" ,
    "March" ,
    "April" ,
    "May" ,
    "June" ,
    "July" ,
    "August" ,
    "September" ,
    "October" ,
    "November" ,
    "December" ]

    export const daysArray = [
        "Sunday",
        "Monday", 
        "Tuesday", 
        "Wednesday", 
        "Thurdsay", 
        "Friday", 
        "Saturday" 
         ]




    export type airPolutionComponentType = {
        co:number,
        nh3:number,
        no:number,
        no2:number,
        o3:number,
        pm2_5: number,
        pm10: number,
        so2: number

    }
    export type airPolutionListType = {
        components : airPolutionComponentType,
        dt:number,
        main:{aqi:number}
    }
    export type airPolutionType = {
        coord : {lon : number , lat : number},
        list : Array<airPolutionListType>
    }