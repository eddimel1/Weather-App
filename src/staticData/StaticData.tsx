import  React , { ReactElement} from "react";
import { MdArrowCircleUp , MdAccessibleForward , MdAlarmAdd, MdAnnouncement , MdArticle , MdBallot

} from "react-icons/md";
import { WiDayCloudyGusts } from "react-icons/wi"


export const someData : Array<objType> =  
    [
 {
 title: 'ForeCast',
 path:'/path1', // should be array
 icon: <WiDayCloudyGusts/>,
 subDropDowns : [
    {title: 'Daily',
    path:'/daily', 
    icon: <MdArrowCircleUp/>},
    {title: 'Current',
    path:'/', 
    icon: <MdArrowCircleUp/>},
    {title: 'Graphs',
    path:'/graphs', 
    icon: <MdArrowCircleUp/>},
    {title: 'Air Polution',
    path:'/airpolution', 
    icon: <MdArrowCircleUp/>}
      ] 
},
{
    title: 'button2',
    path:'/path2',
    icon: <MdAccessibleForward/>,
    subDropDowns : [
    {title: 'button1',
    path:'/path5', 
    icon: <MdArrowCircleUp/>},
    {title: 'button2',
    path:'/path6', 
    icon: <MdArrowCircleUp/>},
    {title: 'button3',
    path:'/path7', 
    icon: <MdArrowCircleUp/>},
    {title: 'button4',
    path:'/path8', 
    icon: <MdArrowCircleUp/>}
    ]
},
{
    title: 'Articles',
    path:'path9',
    icon: <MdArticle/>,
    subDropDowns : [
    {title: 'AirPolution',
    path:'/airPolutionArticle', 
    icon: <MdArrowCircleUp/>},
    {title: 'button2',
    path:'/button2', 
    icon: <MdArrowCircleUp/>},
    {title: 'button3',
    path:'/path12', 
    icon: <MdArrowCircleUp/>},
    {title: 'button4',
    path:'/path13', 
    icon: <MdArrowCircleUp/>}    
    ]
},
{
    title: 'Features',
    path:'/calc' ,
    icon:  < MdBallot />,
    subDropDowns :[
    {title: 'NatureGalery',
    path:'/natureGalery', 
    icon: <MdArrowCircleUp/>},
    {title: 'converter',
    path:'/converter', 
    icon: <MdArrowCircleUp/>},
    {title: 'Quizz',
    path:'/quizz', 
    icon: <MdArrowCircleUp/>},
    {title: 'button4',
    path:'/path19', 
    icon: <MdArrowCircleUp/>}
    ]
},
]




export type objType = {
    
    title : string,
    path: string,
    icon : ReactElement,
    subDropDowns : Array<subDropDownsType>
    

}

export type subDropDownsType =  Omit<objType , "subDropDowns" > & {index?:number , clickHandler? : React.MouseEventHandler<HTMLDivElement> , selected? : string | undefined  } 
export type mode = 'normal' | 'shiny' | 'cool' | 'flying' | 'disco' | 'upsideDown'

export type quizzAnswerData = {
category: string
correctAnswer: string
difficulty: string
id: string
incorrectAnswers: string[]
question: string
tags: string[]
}

export const colorArray = ['linear-gradient(90deg, rgba(6,38,241,1) 0%, rgba(26,9,121,1) 50%, rgba(0,212,255,1) 100%)', ' linear-gradient(90deg, rgba(140,222,30,1) 0%, rgba(99,189,28,1) 41%, rgba(18,217,148,1) 60%, rgba(0,255,64,1) 100%)' , 'linear-gradient(90deg, rgba(222,30,30,1) 0%, rgba(217,18,45,1) 60%, rgba(255,0,0,1) 100%)' ,'linear-gradient(90deg, rgba(222,30,30,1) 0%, rgba(217,18,45,1) 60%, rgba(255,0,0,1) 100%)','linear-gradient(90deg, rgba(30,222,220,1) 0%, rgba(28,188,189,1) 41%, rgba(18,217,205,1) 60%, rgba(0,255,214,1) 100%)']





        




