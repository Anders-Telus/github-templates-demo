import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const Cases = ({ variant, size }) => {
  const getFill = () => {
    switch (variant) {
      case 'primary': return '#4B286D'
      case 'inverted': return '#FFF'
      case 'secondary': return '#F7B500'
      default: return '#4B286D'
    }
  }

  const scale = (function getScale () {
    switch (size) {
      case 'small': return 0.75
      case 'medium': return 1
      case 'large': return 1.25
      default: return 1
    }
  }())

  return (
    <CasaIcon>
      <svg
        width='24'
        height='24'
        viewBox='0 0 24 24'
        style={{ transform: `scale(${scale})` }}
        version='1.1'
        xmlns='http://www.w3.org/2000/svg'
      >
        <defs>
          <path
            d='M22.5,5 C23.327,5 24,5.673 24,6.5 L24,20.5 C24,21.327 23.327,22 22.5,22 L1.5,22 C0.673,22 0,21.327 0,20.5 L0,6.5 C0,5.673 0.673,5 1.5,5 L8,5 L8,3.5 C8,2.673 8.673,2 9.5,2 L14.5,2 C15.327,2 16,2.673 16,3.5 L16,5 L22.5,5 Z M22.5,21 C22.776,21 23,20.776 23,20.5 L23,12.147 L15.66,14.063 C14.463,14.374 13.231,14.53 12,14.53 C10.769,14.53 9.538,14.374 8.34,14.063 L1,12.147 L1,20.5 C1,20.776 1.224,21 1.5,21 L22.5,21 Z M1.5,6 C1.224,6 1,6.224 1,6.5 L1,11.114 L8.592,13.094 C10.821,13.676 13.178,13.676 15.407,13.094 L23,11.113 L23,6.5 C23,6.224 22.776,6 22.5,6 L15.5,6 L8.5,6 L1.5,6 Z M9,3.5 L9,5 L15,5 L15,3.5 C15,3.224 14.776,3 14.5,3 L9.5,3 C9.224,3 9,3.224 9,3.5 Z M12,9 C13.104,9 14,9.897 14,11 C14,12.103 13.104,13 12,13 C10.897,13 10,12.103 10,11 C10,9.897 10.897,9 12,9 Z M12,12 C12.551,12 13,11.551 13,11 C13,10.449 12.551,10 12,10 C11.449,10 11,10.449 11,11 C11,11.551 11.449,12 12,12 Z'
            id='cases'
          />
        </defs>
        <use xlinkHref='#cases' fill={getFill()} fillRule='evenodd' />
      </svg>
    </CasaIcon>
  )
}

Cases.defaultProps = {
  variant: 'default',
  size: 'medium'
}

Cases.propTypes = {
  variant: PropTypes.string,
  size: PropTypes.string
}

export default Cases
