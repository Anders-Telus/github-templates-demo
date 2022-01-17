import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='24px' height='20px' viewBox='0 0 24 20' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <defs>
      <path d='M0,1 C0,0.44771525 0.44746922,0 1.00069463,0 L22.9993054,0 C23.5519738,0 24,0.443864822 24,1 C24,1.55228475 23.5525308,2 22.9993054,2 L1.00069463,2 C0.448026248,2 0,1.55613518 0,1 Z M0,10 C0,9.44771525 0.44746922,9 1.00069463,9 L22.9993054,9 C23.5519738,9 24,9.44386482 24,10 C24,10.5522847 23.5525308,11 22.9993054,11 L1.00069463,11 C0.448026248,11 0,10.5561352 0,10 Z M0,19 C0,18.4477153 0.44746922,18 1.00069463,18 L22.9993054,18 C23.5519738,18 24,18.4438648 24,19 C24,19.5522847 23.5525308,20 22.9993054,20 L1.00069463,20 C0.448026248,20 0,19.5561352 0,19 Z' id='hamburger' />
    </defs>
    <use xlinkHref='#hamburger' fill='white' fillRule='evenodd' />
  </svg>
)

const Hamburger = (props) => {
  return React.createElement(CasaIcon, props, icon)
}

export default Hamburger
