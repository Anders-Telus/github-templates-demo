import React from 'react'
import CasaIcon from './CasaIcon'

const information = (
  <svg width='20px' height='20px' viewBox='0 0 12 12' version='1.1' xmlns='http://www.w3.org/2000/svg' xlink='http://www.w3.org/1999/xlink'>
    <defs>
      <path d='M6,0 C2.688,0 0,2.688 0,6 C0,9.312 2.688,12 6,12 C9.312,12 12,9.312 12,6 C12,2.688 9.312,0 6,0 L6,0 Z M6.6,10.2 L5.4,10.2 L5.4,9 L6.6,9 L6.6,10.2 L6.6,10.2 Z M7.302,6.102 C6.87,6.54 6.6,6.9 6.6,7.8 L5.4,7.8 L5.4,7.5 C5.4,6.84 5.67,6.24 6.102,5.802 L6.846,5.046 C7.068,4.83 7.2,4.53 7.2,4.2 C7.2,3.54 6.66,3 6,3 C5.34,3 4.8,3.54 4.8,4.2 L3.6,4.2 C3.6,2.874 4.674,1.8 6,1.8 C7.326,1.8 8.4,2.874 8.4,4.2 C8.4,4.728 8.184,5.208 7.842,5.55 L7.302,6.102 Z' id='info' />
    </defs>
    <g id='Search' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='10.1-search-by-name-typename' transform='translate(-348.000000, -582.000000)'>
        <g id='Tooltip/Icon' transform='translate(344.000000, 578.000000)'>
          <g id='Tooltip'>
            <rect id='bg-field-icon' x='0' y='0' width='20' height='20' />
            <g id='icons/question' transform='translate(4.000000, 4.000000)'>
              <mask id='mask-2' fill='white'>
                <use xlinkHref='#info' />
              </mask>
              <use id='shape' fill='#2A2C2E' fillRule='evenodd' xlinkHref='#info' />
              <g id='bg/icon/default' mask='url(#mask-2)' fill='#2A2C2E' fillRule='evenodd'>
                <rect id='bg-icon' x='0' y='0' width='12' height='12' />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const Information = (props) => {
  return React.createElement(CasaIcon, props, information)
}
export default Information
