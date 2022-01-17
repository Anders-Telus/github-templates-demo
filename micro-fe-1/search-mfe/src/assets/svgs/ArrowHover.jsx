import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='26px' height='26px' viewBox='0 0 36 36' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <defs>
      <path d='M21.353125,14.853 L12.353125,23.853 C12.307125,23.899 12.251125,23.936 12.190125,23.961 C12.155125,23.976 12.119125,23.977 12.082125,23.983 C12.054125,23.988 12.029125,24 11.999125,24 C11.961125,24 11.928125,23.986 11.892125,23.978 C11.865125,23.972 11.837125,23.973 11.811125,23.962 C11.748125,23.936 11.691125,23.898 11.644125,23.851 L2.646125,14.853 C2.452125,14.658 2.452125,14.341 2.646125,14.146 C2.841125,13.951 3.159125,13.951 3.353125,14.146 L11.499125,22.293 L11.499125,0.5 C11.499125,0.224 11.724125,0 11.999125,0 C12.275125,0 12.499125,0.224 12.499125,0.5 L12.499125,22.293 L20.646125,14.146 C20.744125,14.049 20.872125,14 20.999125,14 C21.127125,14 21.255125,14.049 21.353125,14.146 C21.548125,14.341 21.548125,14.658 21.353125,14.853 Z' id='arrow-hover' />
    </defs>
    <g id='Welcome' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='Select-result-Walker---MOB' transform='translate(-3.000000, -151.000000)'>
        <g id='arrow-icon' transform='translate(3.000000, 151.000000)'>
          <g>
            <rect id='Rectangle-Copy-2' fill='#F7F7F8' x='0' y='0' width='36' height='36' />
            <g
              id='icons/ArrowDown' transform='translate(18.000000, 18.000000) rotate(-90.000000)
               translate(-18.000000, -18.000000) translate(6.000000, 6.000000)'
            >
              <mask id='mask-1' fill='white'>
                <use xlinkHref='#arrow-hover' />
              </mask>
              <use id='ArrowDown' fill='#F7F7F8' fillRule='evenodd' xlinkHref='#arrow-hover' />
              <g id='bg/icon/inverted' mask='url(#mask-1)' fill='#4b286d' fillRule='evenodd'>
                <rect id='bg-icon' x='0' y='0' width='24' height='24' />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const ArrowRight = (props) => {
  return React.createElement(CasaIcon, props, icon)
}
export default ArrowRight
