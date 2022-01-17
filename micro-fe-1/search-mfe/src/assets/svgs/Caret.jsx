import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const UP_CARET = 'M17.7940812,14.8167698 C17.4424627,15.1174894 17.0896181,14.9549557 16.8868854,14.7547243 L11.9968161,10.259447 L7.11722187,14.7547243 C6.93839231,14.9185479 6.49053328,15.1800328 6.16524043,14.8167698 C5.83994757,14.4535067 6.06520964,14.0838947 6.24327169,13.9200711 L11.6348225,8.12339734 C11.8136521,7.95886755 12.1060729,7.95886755 12.2849025,8.12339734 C12.2849025,8.12410347 17.7940809,13.920071 17.7940809,13.920071 C17.9792355,14.0649573 18.1456996,14.5160501 17.7940812,14.8167698 Z'
const DOWN_CARET = 'M17.7940812,9.18323023 C17.4424627,8.8825106 17.0896181,9.04504427 16.8868854,9.24527574 L11.9968161,13.740553 L7.11722187,9.24527573 C6.93839231,9.08145209 6.49053328,8.81996721 6.16524043,9.18323023 C5.83994757,9.54649326 6.06520964,9.91610528 6.24327169,10.0799289 L11.6348225,15.8766027 C11.8136521,16.0411324 12.1060729,16.0411324 12.2849025,15.8766027 C12.2849025,15.8758965 17.7940809,10.079929 17.7940809,10.079929 C17.9792355,9.93504267 18.1456996,9.48394985 17.7940812,9.18323023 Z'

const Caret = ({ dir, variant }) => {
  const id = `${dir}Caret`

  const getDrawPath = () => {
    switch (dir) {
      case 'up': return UP_CARET
      case 'down': return DOWN_CARET
      default: return UP_CARET
    }
  }

  const getFill = () => {
    if (variant === 'inverted') {
      return '#FFF'
    }
    return '#2B8000'
  }

  return (
    <CasaIcon>
      <svg width='24' height='24' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg'>
        <defs>
          <path d={getDrawPath()} id={id} />
        </defs>
        <use xlinkHref={`#${id}`} fill={getFill()} fillRule='evenodd' />
      </svg>
    </CasaIcon>
  )
}

Caret.defaultProps = {
  variant: 'default'
}

Caret.propTypes = {
  dir: PropTypes.string.isRequired,
  variant: PropTypes.string
}

export default Caret
