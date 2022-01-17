import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const OrderGrey = (props) => {
  const { selected } = props
  return React.createElement(CasaIcon, props, (
    <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>_casa / icons / timeline / orders</title>
      <desc>Created with Sketch.</desc>
      <defs>
        <path d='M20,24 L4,24 C1.8,24 0,22.2 0,20 L0,4 C0,1.8 1.8,0 4,0 L20,0 C22.2,0 24,1.8 24,4 L24,20 C24,22.2 22.2,24 20,24' id='order-grey' />
      </defs>
      <g id='Account' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='Icons' transform='translate(-409.000000, -243.000000)'>
          <g id='_casa-/-icons-/-timeline-/-orders' transform='translate(409.000000, 243.000000)'>
            <g id='orders'>
              <g id='bg/icon/default'>
                <mask id='mask-2' fill='white'>
                  <use xlinkHref='#order-grey' />
                </mask>
                <use id='Mask' fill='#231F20' xlinkHref='#order-grey' />
                <g id='_TDScore/bg/icon/telus-grey' mask='url(#mask-2)' fill={selected ? '#595959' : '#979797'}>
                  <rect id='bg-icon' x='0' y='0' width='32' height='32' />
                </g>
              </g>
              <path d='M19.7704,7.6203 L12.4584,3.4113 C12.2364,3.2833 11.9634,3.2843 11.7414,3.4123 L4.4834,7.6173 C4.0084,7.8923 4.0094,8.5773 4.4854,8.8513 L11.7974,13.0603 C12.0194,13.1883 12.2934,13.1873 12.5144,13.0593 L19.7724,8.8543 C20.2474,8.5793 20.2464,7.8943 19.7704,7.6203 Z' id='Stroke-3' stroke='#FEFEFE' strokeLinecap='round' />
              <path d='M5.001,14.627 L4.484,14.927 C4.009,15.202 4.01,15.887 4.485,16.161 L11.798,20.37 C12.02,20.497 12.293,20.497 12.514,20.369 L19.772,16.164 C20.247,15.888 20.246,15.204 19.77,14.93 L19.252,14.631' id='Stroke-5' stroke='#FEFEFE' strokeLinecap='round' />
              <path d='M5.001,10.9525 L4.484,11.2525 C4.009,11.5275 4.01,12.2125 4.485,12.4865 L11.798,16.6955 C12.02,16.8225 12.293,16.8225 12.514,16.6945 L19.772,12.4895 C20.247,12.2135 20.246,11.5295 19.77,11.2555 L19.252,10.9565' id='Stroke-7' stroke='#FEFEFE' strokeLinecap='round' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  ))
}

OrderGrey.propTypes = {
  selected: PropTypes.bool.isRequired
}

export default OrderGrey
