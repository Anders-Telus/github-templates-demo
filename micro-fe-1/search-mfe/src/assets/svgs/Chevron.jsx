import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const Chevron = ({
  disabled, direction, onClick, color
}) => {
  let fill
  if (color) {
    fill = color
  } else {
    fill = disabled ? 'rgba(43, 128, 0, 0.3)' : 'rgba(43, 128, 0, 1)'
  }
  const getPath = () => {
    const right = 'M9.18323023,17.7940812 C8.8825106,17.4424627 9.04504427,17.0896181 9.24527574,16.8868854 L13.740553,11.9968161 L9.24527573,7.11722187 C9.08145209,6.93839231 8.81996721,6.49053328 9.18323023,6.16524043 C9.54649326,5.83994757 9.91610528,6.06520964 10.0799289,6.24327169 L15.8766027,11.6348225 C16.0411324,11.8136521 16.0411324,12.1060729 15.8766027,12.2849025 C15.8758965,12.2849025 10.079929,17.7940809 10.079929,17.7940809 C9.93504267,17.9792355 9.48394985,18.1456996 9.18323023,17.7940812 Z'
    const left = 'M14.8167698,17.7940812 C14.5160501,18.1456996 14.0649573,17.9792355 13.920071,17.7940809 C13.920071,17.7940809 8.12410347,12.2849025 8.12339734,12.2849025 C7.95886755,12.1060729 7.95886755,11.8136521 8.12339734,11.6348225 L13.9200711,6.24327169 C14.0838947,6.06520964 14.4535067,5.83994757 14.8167698,6.16524043 C15.1800328,6.49053328 14.9185479,6.93839231 14.7547243,7.11722187 L10.259447,11.9968161 L14.7547243,16.8868854 C14.9549557,17.0896181 15.1174894,17.4424627 14.8167698,17.7940812 Z'
    switch (direction) {
      case 'right': return right
      case 'left': return left
      default: return right
    }
  }

  return (
    <CasaIcon>
      <svg width='24' height='24' viewBox='0 0 24 24' version='1.1' xmlns='http://www.w3.org/2000/svg' onClick={() => onClick()}>
        <defs>
          <path d={getPath()} id={`${direction}Chevron`} />
        </defs>
        <use xlinkHref={`#${direction}Chevron`} fill={fill} />
      </svg>
    </CasaIcon>
  )
}

Chevron.defaultProps = {
  color: '',
  disabled: false,
  onClick: () => {}
}

Chevron.propTypes = {
  color: PropTypes.string,
  disabled: PropTypes.bool,
  onClick: PropTypes.func,
  direction: PropTypes.string.isRequired
}

export default Chevron
