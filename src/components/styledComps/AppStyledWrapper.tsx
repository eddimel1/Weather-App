import React from 'react'
import styled, {css} from 'styled-components'
import background from '../../assets/338769.webp'
import {opacityAnimation, translateAnimation} from './Animations'
import {mode} from '../../staticData/StaticData'
const anim = css`
  ${opacityAnimation} 15s 2s ease infinite;
`
const anim1 = css`
  ${opacityAnimation} 15s 2s ease infinite , ${translateAnimation} 15s 2s ease infinite;
`
// transform:rotate(90deg);
// transform:scale(-1);
export const AppWrapper = styled.div<{mode: mode; color: string}>`
    overflow: hidden;
    position: relative;
    height: 100vh;
    animation : ${(props) => props.mode === 'flying' && anim1}
    transform:rotate(${(props) => props.mode === 'upsideDown' && '90deg'}) ;
    transform:scale(${(props) => props.mode === 'upsideDown' && '-1'}) ;
   
    
    &:before  {
    content : '' ;
    display : 'block';
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    z-index : -5000;
    background: url(${background}) 0 0 / cover repeat-y 
    }
    
    &::after {
    content: ' ';
    display: block;
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    transition : all 4s ease-in-out;
    background: ${(props) => props.mode !== 'normal' && props.color};
    z-index: -5000;
    background-size: 400% 400%;
    animation: ${(props) =>
      props.mode === 'normal' ? anim : props.mode === 'cool' ? anim1 : ''} 
    
    `
