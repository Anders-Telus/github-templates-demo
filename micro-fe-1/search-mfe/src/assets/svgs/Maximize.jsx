import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg version='1.1' xmlns='http://www.w3.org/2000/svg' xmlnsXlink='http://www.w3.org/1999/xlink' preserveAspectRatio='xMidYMid meet' viewBox='0 0 16 16' width='16' height='16'>
    <defs>
      <path d='M0 0L16 0L16 16L0 16L0 0Z' id='b2yOIJ1m4U' />
      <path d='M1 1.94L14.33 1.94L14.33 3.63L1 3.63L1 1.94Z' id='b1N4vKyL7i' />
    </defs>
    <g>
      <g>
        <g>
          <use xlinkHref='#b2yOIJ1m4U' opacity='1' fill='#ffffff' fillOpacity='1' />
          <g>
            <use xlinkHref='#b2yOIJ1m4U' opacity='1' fillOpacity='0' stroke='#4b286d' strokeWidth='4' strokeOpacity='1' />
          </g>
        </g>
        <g>
          <use xlinkHref='#b1N4vKyL7i' opacity='1' fill='#4b286d' fillOpacity='1' />
        </g>
      </g>
    </g>
  </svg>
)

const Maximize = (props) => {
  return React.createElement(CasaIcon, props, icon)
}

export default Maximize
