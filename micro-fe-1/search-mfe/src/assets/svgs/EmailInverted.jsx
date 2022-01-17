import React from 'react'
import CasaIcon from './CasaIcon'

const EmailInverted = () => (
  <CasaIcon>
    <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <path
          d='M15.173 1.594l.082-.088c.39 0 .052-.397.052-.007v.856L8.52 6.293a1.04 1.04 0 01-1.037 0L.692 2.355l.095-.549c0-.39 6.8 3.91 7.191 3.91l7.195-4.122zM1.402.097C.629.097 0 .727 0 1.5v8.973c0 .774.629 1.403 1.402 1.403h13.195c.774 0 1.403-.629 1.403-1.403V1.5c0-.773-.629-1.402-1.403-1.402H1.402z'
          id='sendEmail'
          fill='#4B286D'
          fillRule='evenodd'
        />
      </defs>
      <use xlinkHref='#sendEmail' fill='#C12335' fillRule='evenodd' />
    </svg>
  </CasaIcon>
)

export default EmailInverted
