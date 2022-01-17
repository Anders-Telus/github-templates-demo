import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const TicketGrey = (props) => {
  const { selected } = props
  return React.createElement(CasaIcon, props, (
    <svg width='24px' height='24px' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <title>_casa / icons / timeline / tickets</title>
      <desc>Created with Sketch.</desc>
      <defs>
        <path d='M20,24 L4,24 C1.8,24 0,22.2 0,20 L0,4 C0,1.8 1.8,0 4,0 L20,0 C22.2,0 24,1.8 24,4 L24,20 C24,22.2 22.2,24 20,24' id='ticket-grey' />
      </defs>
      <g id='Account' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
        <g id='Icons' transform='translate(-378.000000, -243.000000)'>
          <g id='_casa-/-icons-/-timeline-/-tickets' transform='translate(378.000000, 243.000000)'>
            <g id='tickets'>
              <g id='bg/icon/default'>
                <mask id='mask-2' fill='white'>
                  <use xlinkHref='#ticket-grey' />
                </mask>
                <use id='Mask' fill='#231F20' xlinkHref='#ticket-grey' />
                <g id='_TDScore/bg/icon/telus-grey' mask='url(#mask-2)' fill={selected ? '#595959' : '#979797'}>
                  <rect id='bg-icon' x='0' y='0' width='32' height='32' />
                </g>
              </g>
              <path d='M17.7024,11.5119 C17.7024,11.5119 17.6994,16.3949 17.6984,18.0329 C17.6974,19.6699 16.5644,19.5759 16.5644,19.5759 L13.5414,19.5659 C13.5424,18.4309 12.0464,18.3049 12.0464,18.3049 C12.0464,18.3049 10.5194,18.4309 10.5174,19.5649 L7.4964,19.5549 C7.4964,19.5549 6.3624,19.6489 6.36339934,18.0109 C6.3644,16.3739 6.3664,11.4899 6.3664,11.4899 C6.3664,11.4899 6.3694,6.5139 6.3704,4.8749 C6.3714,3.2379 7.5054,3.4269 7.5054,3.4269 L10.5274,3.4359 C10.5264,4.5699 12.0544,4.6979 12.0544,4.6979 C12.0544,4.6979 13.5504,4.5719 13.5514,3.4379 L16.5734,3.4479 C16.5734,3.4479 17.7064,3.2589 17.7064,4.8979 C17.7044,6.5359 17.7024,11.5119 17.7024,11.5119 Z' id='Stroke-3' stroke='#FEFEFE' strokeLinecap='round' strokeLinejoin='round' />
              <line x1='8.1093' y1='11.2659' x2='8.8633' y2='11.2659' id='Stroke-5' stroke='#FEFEFE' strokeLinejoin='round' />
              <line x1='9.9574' y1='11.2659' x2='14.5174' y2='11.2659' id='Stroke-7' stroke='#FEFEFE' strokeLinejoin='round' strokeDasharray='1.459,1.094' />
              <line x1='15.0642' y1='11.2659' x2='15.8182' y2='11.2659' id='Stroke-9' stroke='#FEFEFE' strokeLinejoin='round' />
            </g>
          </g>
        </g>
      </g>
    </svg>
  ))
}

TicketGrey.propTypes = {
  selected: PropTypes.bool.isRequired
}

export default TicketGrey
