import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <title>Shape</title>
    <desc>Created with Sketch.</desc>
    <defs>
      <filter x='-4.7%' y='-7.1%' width='109.3%' height='114.1%' filterUnits='objectBoundingBox' id='filter-1'>
        <feOffset dx='0' dy='0' in='SourceAlpha' result='shadowOffsetOuter1' />
        <feGaussianBlur stdDeviation='2' in='shadowOffsetOuter1' result='shadowBlurOuter1' />
        <feColorMatrix values='0 0 0 0 0   0 0 0 0 0   0 0 0 0 0  0 0 0 0.5 0' type='matrix' in='shadowBlurOuter1' result='shadowMatrixOuter1' />
        <feMerge>
          <feMergeNode in='shadowMatrixOuter1' />
          <feMergeNode in='SourceGraphic' />
        </feMerge>
      </filter>
    </defs>
    <g id='Case' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd' opacity='0.3'>
      <g id='undocked' transform='translate(-647.000000, -426.000000)' fill='#2A2C2E' fillRule='nonzero'>
        <g id='New-Task-Copy' filter='url(#filter-1)' transform='translate(113.000000, 412.000000)'>
          <g id='Header' transform='translate(13.000000, 13.000000)'>
            <g id='Panel-Layout-Commands' transform='translate(493.000000, 0.000000)'>
              <g id='crop_square-24px' transform='translate(28.000000, 1.000000)'>
                <path d='M18,4 L6,4 C4.9,4 4,4.9 4,6 L4,20 L20,20 L20,6 C20,4.9 19.1,4 18,4 Z M18,18 L6,18 L6,6 L18,6 L18,18 Z' id='Shape' />
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const MaximizeSelected = (props) => {
  return React.createElement(CasaIcon, props, icon)
}

export default MaximizeSelected
