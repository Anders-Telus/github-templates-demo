import React from 'react'
import CasaIcon from './CasaIcon'

const icon = (
  <svg width='16px' height='16px' viewBox='0 0 16 16' version='1.1' xmlns='http://www.w3.org/2000/svg'>
    <g id='blue' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
      <image id='turbo_ico' x='-1' y='-1' width='18' height='18' xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABIAAAASCAIAAADZrBkAAAAABGdBTUEAALGOfPtRkwAAAW5JREFUKBVj/P//PwPpgAWipfHsh6azHwhqrzMWqDcWACpjBNrWeOZd05n3BPVAFNSZCNabCIG0MU+7TaQeiLK/WapMINbf37iQsTAzUFG9iQCEAVXGwAD2298/WG0zFuM8Fa4ElDrw6DOQYbbsNgNMJcS2PyA+KjIWYTsVpQoxbl+IktOq2z6KPFA1MNt+odlmLMF9KkYDWXBfGMiIxsMPIYJgR/75jawCyD4Vp4smAuSazTvPAFMJ8Ru6Nix65pw++/wzXBxLkNQ7KMOlIQyzWSfOPvuELAhxJMJvxlL8dajazKYdPvvsI7IeIBvFb8bSAqeybCEqmvbcaNxzHU01nItwpLGM4KlcR6ie3dcad12FK8JkgLT9B6YSEAmN9Madl4EIUymyCCi66121QfH47y9U4v8/tKhH5oIUMzAwNzQ0OKhKMDD8W3727t03nwP15R1UgNz/B28/A5JoqN5Tv97TAKgNlAOglpBCAQAw08HDnKSLyAAAAABJRU5ErkJggg==' />
    </g>
  </svg>
)

const CompassFibre = (props) => {
  return React.createElement(CasaIcon, props, icon)
}
export default CompassFibre
