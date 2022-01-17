import React from 'react'
import CasaIcon from './CasaIcon'

const hourGlass = (
  <svg width='14px' height='14px' viewBox='0 0 14 14' version='1.1' xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink'>
    <g id='Casa/icon/hourglass' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <path d='M12.1307239,0.5 L8.37657985,6.95396212 L12.1362309,13.5 L1.86438758,13.5 L5.62944352,6.95396041 L1.86990447,0.5 L12.1307239,0.5 Z' id='Polygon' stroke='#4B286D' />
      <polygon id='Polygon' fill='#4B286D' points='7.03110089 5 9.04621514 5 7.98167235 7.98258253 7.98167235 11.0551691 11.9554307 13 2.10677103 13 6.04621514 11.0551691 6.04621514 7.98258253 5.00872942 5' />
    </g>
  </svg>
)

const HourGlass = (props) => {
  return React.createElement(CasaIcon, props, hourGlass)
}
export default HourGlass
