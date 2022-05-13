import React, { useState } from 'react'
import {ArticleWrapper} from '../../components/ArticleComps/articleWrapper'
import {ArticleTextSection} from '../../components/ArticleComps/articleTextSection'
import {ImageComp} from '../../components/ArticleComps/imageComp'
import {Table} from '../../components/ArticleComps/table'
import { Transition } from '../../components/transitionComps/transition'
import {Modal} from '../../components/utilComponents/modal/Modal'
import { VideoComp } from '../../components/ArticleComps/videoComp'
import { VideoPlayer} from '../../components/utilComponents/videoPlayer/videoPlayer'
import {obj} from '../../staticData/TextData'
import video2 from  '../../assets/videoWithSound .mp4'


export const Article1 = () => {
    const text:string =  "Think of the AQI as a yardstick that runs from 0 to 500. The higher the AQI value, the greater the level of air pollution and the greater the health concern. For example, an AQI value of 50 or below represents good air quality, while an AQI value over 300 represents hazardous air quality.For each pollutant an AQI value of 100 generally corresponds to an ambient air concentration that equals the level of the short-term national ambient air quality standard for protection of public health. AQI values at or below 100 are generally thought of as satisfactory. When AQI values are above 100, air quality is unhealthy: at first for certain sensitive groups of people, then for everyone as AQI values get higher.The AQI is divided into six categories. Each category corresponds to a different level of health concern. Each category also has a specific color. The color makes it easy for people to quickly determine whether air quality is reaching unhealthy levels in their communities."
    const [selectedImg , setSelectedImg] = useState<string | undefined>(undefined)
    const[selectedVideo , setSelectedVideo] = useState<string | undefined>(undefined)
    console.log(selectedVideo)
   
  return (
    <>
    <Transition>
    <ArticleWrapper title='Air Index Components'>
    {selectedImg && <Modal filters={false} selected={selectedImg} setSelectedImg={setSelectedImg}/>}
       
   
       <ArticleTextSection  text={text}></ArticleTextSection>
       <ArticleTextSection text={text}><ImageComp setSelectedImg={setSelectedImg} position='center'width='70%' alt='img' height='auto'  urls={['https://img.etimg.com/thumb/msid-68721417,width-1200,height-900,imgsize-1016106,overlay-etpanache/photo.jpg', 'https://images.theconversation.com/files/449936/original/file-20220303-4351-hi0xro.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop' , 'https://cdn.unenvironment.org/styles/article_billboard_image/s3/2022-03/externsteine-ga1650e32b_1280.jpg?itok=yL5hN4Bh']} />
       <ImageComp setSelectedImg={setSelectedImg} position='center'width='70%' alt='img' height='auto'  urls={['https://img.etimg.com/thumb/msid-68721417,width-1200,height-900,imgsize-1016106,overlay-etpanache/photo.jpg', 'https://images.theconversation.com/files/449936/original/file-20220303-4351-hi0xro.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop' ]} />
       <ImageComp setSelectedImg={setSelectedImg} position='center'width='30%' alt='img' height='auto'  urls={[ 'https://images.theconversation.com/files/449936/original/file-20220303-4351-hi0xro.jpg?ixlib=rb-1.1.0&q=45&auto=format&w=1200&h=1200.0&fit=crop' ]} />
       
     
       </ArticleTextSection>
       
       <ArticleTextSection text={text}>
           <Table obj={obj}></Table>
         {/* <VideoComp  setSelectedVideo={setSelectedVideo} videos={[video2,video2,video2]} type='galery' columns='3'/>
         <VideoComp  setSelectedVideo={setSelectedVideo} videos={[video2,video2]} type='galery' columns='2'/> */}
         <VideoComp  setSelectedVideo={setSelectedVideo} videos={[video2]} type='single' position='center' />
         {/* <VideoComp  setSelectedVideo={setSelectedVideo} videos={[video1]} type='single'position='center' />
         <VideoComp  setSelectedVideo={setSelectedVideo} videos={[video2]} type='single' position='right' /> */}
         
         {selectedVideo && <VideoPlayer selected={selectedVideo} setSelectedVideo={ setSelectedVideo} ></VideoPlayer>}
       </ArticleTextSection>
       
       </ArticleWrapper>
        
    </Transition>
    
    </>
  )
}

