import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const CaseGrey = (props) => {
  const { selected } = props
  return React.createElement(CasaIcon, props, (
    <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>_casa / icons / timeline / cases</title>
      <desc>Created with Sketch.</desc>
      <defs>
        <path d='M20,24 L4,24 C1.8,24 0,22.2 0,20 L0,4 C0,1.8 1.8,0 4,0 L20,0 C22.2,0 24,1.8 24,4 L24,20 C24,22.2 22.2,24 20,24' id='case-grey' />
      </defs>
      <g id='Account' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='Icons' transform='translate(-346.000000, -242.000000)'>
          <g id='_casa-/-icons-/-timeline-/-cases' transform='translate(346.000000, 242.000000)'>
            <g id='cases'>
              <g id='bg/icon/default'>
                <mask id='mask-2' fill='white'>
                  <use xlinkHref='#case-grey' />
                </mask>
                <use id='Mask' fill='#231F20' xlinkHref='#case-grey' />
                <g id='_TDScore/bg/icon/telus-grey' mask='url(#mask-2)' fill={selected ? '#595959' : '#979797'}>
                  <rect id='bg-icon' x='0' y='0' width='32' height='32' />
                </g>
              </g>
              <path d='M19.6978,17.6714 C19.6978,17.8994 19.5128,18.0854 19.2838,18.0854 L4.7158,18.0854 C4.4878,18.0854 4.3018,17.8994 4.3018,17.6714 L4.3018,8.2214 C4.3018,7.9934 4.4878,7.8084 4.7158,7.8084 L19.2838,7.8084 C19.5128,7.8084 19.6978,7.9934 19.6978,8.2214 L19.6978,17.6714 Z' id='Stroke-3' stroke='#FEFEFE' />
              <line x1='14.7117' y1='11.3007' x2='19.4277' y2='11.3007' id='Stroke-5' stroke='#FEFEFE' />
              <line x1='4.3598' y1='11.3007' x2='9.2828' y2='11.3007' id='Stroke-7' stroke='#FEFEFE' />
              <path d='M14.7144,12.1797 C14.7144,12.4077 14.5294,12.5937 14.3004,12.5937 L9.6994,12.5937 C9.4704,12.5937 9.2854,12.4077 9.2854,12.1797 L9.2854,10.6807 C9.2854,10.4517 9.4704,10.2667 9.6994,10.2667 L14.3004,10.2667 C14.5294,10.2667 14.7144,10.4517 14.7144,10.6807 L14.7144,12.1797 Z' id='Stroke-9' stroke='#FEFEFE' />
              <path d='M15.3946,7.6029 L15.3946,6.3219 C15.3946,5.8029 14.9736,5.1979 14.4546,5.1979 L9.6376,5.1979 C9.1176,5.1979 8.6966,5.8029 8.6966,6.3219 L8.6966,7.6029' id='Stroke-11' stroke='#FEFEFE' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  ))
}

CaseGrey.propTypes = {
  selected: PropTypes.bool.isRequired
}

export default CaseGrey
