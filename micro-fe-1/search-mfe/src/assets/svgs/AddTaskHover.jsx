import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='27' height='27' viewBox='0 0 27 27' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <g filter='url(#filter0_d)'>
      <circle cx='13.5' cy='13.5' r='12.5' fill='#EBE8EE' />
    </g>
    <mask id='mask1' mask-type='alpha' maskUnits='userSpaceOnUse' x='4' y='4' width='19' height='19'>
      <path d='M13.5 4C18.7382 4 23 8.26178 23 13.5C23 18.7382 18.7382 23 13.5 23C8.26178 23 4 18.7382 4 13.5C4 8.26178 8.26178 4 13.5 4ZM13.5 4.82609C8.71696 4.82609 4.82609 8.71696 4.82609 13.5C4.82609 18.283 8.71696 22.1739 13.5 22.1739C18.283 22.1739 22.1739 18.283 22.1739 13.5C22.1739 8.71696 18.283 4.82609 13.5 4.82609ZM13.5 8.13043C13.728 8.13043 13.913 8.31548 13.913 8.54348L13.913 13.086L18.4565 13.087C18.6845 13.087 18.8696 13.272 18.8696 13.5C18.8696 13.728 18.6845 13.913 18.4565 13.913L13.913 13.913L13.913 18.4565C13.913 18.6845 13.728 18.8696 13.5 18.8696C13.272 18.8696 13.087 18.6845 13.087 18.4565L13.086 13.913L8.54348 13.913C8.31548 13.913 8.13043 13.728 8.13043 13.5C8.13043 13.272 8.31548 13.087 8.54348 13.087L13.086 13.086L13.087 8.54348C13.087 8.31548 13.272 8.13043 13.5 8.13043Z' fill='white' />
    </mask>
    <g mask='url(#mask1)'>
      <path d='M13.5 4C18.7382 4 23 8.26178 23 13.5C23 18.7382 18.7382 23 13.5 23C8.26178 23 4 18.7382 4 13.5C4 8.26178 8.26178 4 13.5 4ZM13.5 4.82609C8.71696 4.82609 4.82609 8.71696 4.82609 13.5C4.82609 18.283 8.71696 22.1739 13.5 22.1739C18.283 22.1739 22.1739 18.283 22.1739 13.5C22.1739 8.71696 18.283 4.82609 13.5 4.82609ZM13.5 8.13043C13.728 8.13043 13.913 8.31548 13.913 8.54348L13.913 13.086L18.4565 13.087C18.6845 13.087 18.8696 13.272 18.8696 13.5C18.8696 13.728 18.6845 13.913 18.4565 13.913L13.913 13.913L13.913 18.4565C13.913 18.6845 13.728 18.8696 13.5 18.8696C13.272 18.8696 13.087 18.6845 13.087 18.4565L13.086 13.913L8.54348 13.913C8.31548 13.913 8.13043 13.728 8.13043 13.5C8.13043 13.272 8.31548 13.087 8.54348 13.087L13.086 13.086L13.087 8.54348C13.087 8.31548 13.272 8.13043 13.5 8.13043Z' fill='#4B286D' />
      <path d='M24 3H3V24H24V3Z' fill='#4B286D' />
    </g>
    <defs>
      <filter id='filter0_d' x='-3' y='-3' width='33' height='33' filterUnits='userSpaceOnUse' colorInterpolationFilters='sRGB'>
        <feFlood floodOpacity='0' result='BackgroundImageFix' />
        <feColorMatrix in='SourceAlpha' type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
        <feOffset />
        <feGaussianBlur stdDeviation='2' />
        <feColorMatrix type='matrix' values='0 0 0 0 0.695833 0 0 0 0 0.695833 0 0 0 0 0.695833 0 0 0 0.25 0' />
        <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow' />
        <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow' result='shape' />
      </filter>
    </defs>
  </svg>
)

const AddTaskHover = (props) => {
  return React.createElement(CasaIcon, props, icon)
}

export default AddTaskHover
