import React from 'react'


export const calcDuration = (duration:number) => {
    const seconds = Math.trunc(duration % 60) 
    const minutes = Math.floor(duration % 3600 / 60)
    const hours =  Math.floor(duration / 3600)
    return {
        hours: pad(hours),
        minutes : pad(minutes),
        seconds : pad(seconds),
        concatinated : `${pad(hours)}:${pad(minutes)}:${seconds < 10 ? '0'+seconds : seconds}`
    }
}
export const pad = (number : number) => {
    if(number >= 0 && number < 10){
        const parsedNumber = number.toFixed()
        return '0'+parsedNumber
    }
    return '0'
}
export const calcPersentage = (part:number , total:number) => {
    return Math.round(part / total * 100)

}