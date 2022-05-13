import React, { useEffect, useReducer, useState } from 'react'
import classes from './questionScreen.module.css'
import { propType } from './welcomeScreen'
import {api} from'../../utils/utils'
import { quizzAnswerData } from '../../staticData/StaticData'
import { motion } from 'framer-motion'


export const QuestionScreen = (props:propType) => {
//Category
//Difficulty
//Question
//tags
//CorrectAnswer -1
//IncorrectAnswer - 3
//merge correctAnswer with Incorrect and shuffle
//each optionItem will render itself and check if it is correct
//Question screen will have 4 answeItems at a time , question , category , questionNumber / totalCount , nextQuestionButton
const [data,setData] = useState<quizzAnswerData[]>()
const [portionIndex ,setPortionIndex] = useState<number>(0)
const[allAnswers , setAllAnswers] = useState<string[]>([])
const [usersAnswer , setusersAnswer] = useState<string | null>(null)
const[questionAnswered , setQuestionAnswered] = useState<boolean>(false)
// console.log(data)
// console.log('allAnswers : ' , allAnswers)
const checkAnswer = (usersAnswer:string , array:quizzAnswerData) => {
    setusersAnswer(usersAnswer)
    setQuestionAnswered(true)
  if(usersAnswer === array.correctAnswer){
      props.dispatch({type:'scored'})
  }
}

const returnAnswersStyle = (usersAnswer :string , answer:string , array:quizzAnswerData) => {
    // console.log('usersAnswer : ' , usersAnswer , 'answer : ' , answer , 'array : ' , array)
    if(answer === array.correctAnswer){
        return classes.correct
    }
    else if (answer !== array.correctAnswer && answer === usersAnswer){
        return classes.answeredAndWrong
    }
    else if (answer !== array.correctAnswer){
        return classes.wrong
    }
    else return ''

}
 useEffect(()=>{
  props.state && fetch(`https://the-trivia-api.com/api/questions?categories=${props.state.category}&difficulty=${props.state.difficulty}&limit=10`).then((data)=>data.json().then((data)=>setData(data)))
 },[])
 useEffect(()=>{
     if(data && !questionAnswered){
         const incorrectAnswers =  data[portionIndex].incorrectAnswers
        const correctAnswer = data[portionIndex].correctAnswer
        const mergedArray = incorrectAnswers && incorrectAnswers.concat(correctAnswer)
        const shuffledArray = mergedArray.sort(()=> Math.random() - 0.5)
      setAllAnswers(shuffledArray)
     }
  
 },[data, questionAnswered])

  return (
    <div className={classes.questionScreenWrapper}>
        <div className={classes.questionScreenContainer}>
        <div className={classes.topContainer}>
        <div className={classes.quizzCategory}>Category : {data && data[portionIndex].category}</div>
        <div className={classes.questionCount}>{portionIndex}/10</div>
        <div className={classes.difficulty}>Difficulty : {data && data[portionIndex].difficulty}</div>
        </div>
        <div className={classes.question}>{data && data[portionIndex].question}</div>
        <div className={classes.questionContainer}>
            {allAnswers && allAnswers.map((answer,i)=>{
                return  <button 
                disabled={questionAnswered ? true : false} key={Date.now() + i} onClick={() => data && checkAnswer(answer,data[portionIndex])} className={`${classes.questionItem} ${data && usersAnswer && questionAnswered && returnAnswersStyle(usersAnswer , answer , data[portionIndex])}`}> {answer}</button>
            })}
        </div>
        <div className={classes.quizzBottom}>
            <button className={classes.nextQuestionButton} onClick={() => {setPortionIndex((prev) => (prev +1)); setQuestionAnswered(false);props.dispatch({type:'nextQuestion'})}}>Next Question</button>
            <div className={classes.tags}></div>
        </div>
        </div>
        
        
    </div>
  )
}
