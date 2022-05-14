import React from 'react'
import {keyframes} from 'styled-components'

export const opacityAnimation = keyframes`
0% {
    opacity : 0.8;
}
25% {
    opacity : 0.6
}
50% {
    opacity : 0.5
}
75% {
    opacity : 0.8
}
100% {
    opacity : 0.9
}
`
export const translateAnimation = keyframes`
0% {
    transform: translateX(-100%);
}
10% {
    transform: translateX(-80%);
    transform: rotate(30deg);
}
20% {
    transform: translateX(-65%);
    transform: rotate(60deg);
    transform: skew(60deg , 60deg);

   
    
}
30% {
    transform: translateX(-40%);
}
40% {
    transform: translateX(-20%);
}
50% {
    transform: translateX(0);
}
60% {
    transform: translateX(-20%);
}
75% {
    transform: translateX(-45%);
    transform: rotate(-30deg);
    
    
}
85% {
    transform: translateX(-65%);
    transform: rotate(-60deg);
    transform: skew(-60deg , -60deg);
}
95% {
    transform: translateX(-80%);
}
100% {
    transform: translateX(-100%);
}
`
