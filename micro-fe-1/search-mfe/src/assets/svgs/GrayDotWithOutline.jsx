import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='9px' height='9px' viewBox='0 0 9 9' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <title>Oval Copy 8</title>
    <g id='CASA-Search' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <g id='LOB-search-results' transform='translate(-792.000000, -400.000000)' stroke='#54595F'>
        <circle id='Oval-Copy-8' cx='796.75' cy='404.75' r='3.75' />
      </g>
    </g>
  </svg>
)

const GrayDot = (props) => {
  return React.createElement(CasaIcon, props, icon)
}
export default GrayDot
