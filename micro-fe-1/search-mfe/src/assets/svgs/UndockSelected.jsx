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
      <g id='undocked' transform='translate(-675.000000, -426.000000)' fill='#2A2C2E' fillRule='nonzero'>
        <g id='New-Task-Copy' filter='url(#filter-1)' transform='translate(113.000000, 412.000000)'>
          <g id='Header' transform='translate(13.000000, 13.000000)'>
            <g id='Panel-Layout-Commands' transform='translate(493.000000, 0.000000)'>
              <g id='Casa/Icon/24/Expand-Column' transform='translate(56.000000, 0.000000)'>
                <g id='Clipped'>
                  <path d='M14.5371775,5 L16.6312595,7.09408194 L14,9.70713202 L15.292868,11 L17.9059181,8.36874052 L20,10.4628225 L20,5 L14.5371775,5 Z M4,10.4628225 L6.09408194,8.36874052 L8.70713202,11 L10,9.70713202 L7.36874052,7.09408194 L9.46282246,5 L4,5 L4,10.4628225 Z M9.46282246,21 L7.36874052,18.9059181 L10,16.292868 L8.70713202,15 L6.09408194,17.6312595 L4,15.5371775 L4,21 L9.46282246,21 Z M20,15.5371775 L17.9059181,17.6312595 L15.292868,15 L14,16.292868 L16.6312595,18.9059181 L14.5371775,21 L20,21 L20,15.5371775 Z' id='Shape' />
                </g>
              </g>
            </g>
          </g>
        </g>
      </g>
    </g>
  </svg>
)

const UndockSelected = (props) => {
  return React.createElement(CasaIcon, props, icon)
}

export default UndockSelected
