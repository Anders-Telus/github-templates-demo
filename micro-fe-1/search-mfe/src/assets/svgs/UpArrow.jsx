import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg
    version='1.1' id='Layer_1' xmlns='http://www.w3.org/2000/svg' x='0px' y='0px'
    width='12px' height='12px' viewBox='0 0 512 512' xmlSpace='preserve' fill='#9FA2A5'
  >
    <path d='M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6
C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z'
    />
  </svg>
)

const UpArrow = (props) => {
  return React.createElement(CasaIcon, props, icon)
}
export default UpArrow