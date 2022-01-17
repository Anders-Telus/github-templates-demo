import React from 'react'
import PropTypes from 'prop-types'
import CasaIcon from './CasaIcon'

const Telus = ({ scale }) => (
  <CasaIcon>
    <svg
      width={`${scale * 141}px`}
      height={`${scale * 28}px`}
      viewBox="0 0 141 28"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g fill="none">
        <g>
          <g>
            <g>
              <path
                fill="#3D2557"
                d="M83.72 8.06h-6.08v2.76h5.06v2.86h-5.06v3.27h6.08v3H73.5V5.18H83.7v2.86zm18.05 8.97v2.9h-10.6V5.2h4.2v11.83h6.4zm33.78-6.22c3.26.75 4.7 2.06 4.7 4.4 0 1.1-.33 2.26-1.36 3.22-1.5 1.4-3.52 1.83-6.3 1.83-2 0-3.93-.45-5.83-1.26l.96-2.96c1.66.7 3.3 1.25 5.03 1.25 1.9 0 2.9-.48 2.85-1.6-.03-1.2-2.1-1.55-4.12-1.97-2.1-.44-4.4-1.5-4.28-4.3.1-3.1 2.73-4.67 6.63-4.67 2 0 4.06.37 5.66 1.24l-1.15 2.72c-1.57-.8-3.1-1.1-4.4-1.1-.82 0-2.22.3-2.22 1.36 0 1.12 1 1.2 3.82 1.83zm-68-2.7h-4.36v11.84H59V8.1h-4.35V5.2h12.87v2.9zm48.53-2.9h4.32v9.83c0 1.34-.02 1.66-.3 2.33-.57 1.37-2.5 2.84-6.3 2.84H113.66c-2.8 0-4.86-.68-5.9-2-.64-.8-.83-1.44-.83-2.84V5.2h4.35v9.6c0 .8.08 1.28.26 1.56.35.54 1.1.84 2.12.85 1.38 0 2.25-.52 2.38-1.42.05-.28.05-.48.05-1.22V5.2z"
              />
              <g>
                <path
                  fill="#3D2557"
                  d="M56.63 1.15L32.23 6v1.7h.1c16.1-3.93 24.3-6.28 24.37-6.3.1-.02.12-.1.1-.15 0-.07-.07-.1-.17-.1"
                />
                <path
                  fill="#6c0"
                  d="M36.16 2.5c.38-.23.5-.08.38.2-.18.43-1 3.07-7.15 8.1-1.6 1.32-2.75 2.05-5.06 3.42 3.78-5.3 9.3-10.07 11.82-11.7M36.8.68c-1.2.06-3.38 1.8-4.58 2.85-4.8 4.15-8.37 7.97-10.97 11.96-5.4 2.9-12.3 5.88-19.15 8.2l-.16.06L.62 27.3l.75-.28C5.73 25.36 13 22.24 19.6 18.78c-.4 1-.57 1.9-.57 2.73 0 .63.1 1.2.3 1.72.42 1.04 1.24 1.83 2.37 2.3 1.7.66 4 .67 6.6-.12 6.72-2.04 14.68-8.27 16.4-9.5l.08-.06c.06-.05.07-.12.04-.17-.04-.06-.12-.07-.18-.03l-.1.05c-1.85 1.1-10.88 6.46-16.75 8.03-3 .8-5.28.37-6.14-.83-.3-.4-.44-.93-.44-1.54 0-1.18.55-2.7 1.63-4.36 1-.56 1.9-1.1 2.74-1.63 5.72-3.22 12.3-9.47 12.6-13.3 0 0 0-.04 0-.07 0-.33-.15-.67-.4-.92-.26-.28-.62-.42-1-.4"
                />
                <path
                  fill="#3D2557"
                  d="M32.16 6.02L6.5 11.52l-1 2.68 26.74-6.5h.04V6l-.12.02"
                />
              </g>
            </g>
          </g>
        </g>
      </g>
    </svg>
  </CasaIcon>
)

Telus.defaultProps = { scale: 1 }

Telus.propTypes = { scale: PropTypes.number }

export default Telus
