import React from 'react'
import styled from 'styled-components'

const StyledSVGIcon = styled.i.withConfig({
  displayName: 'SVGIcon__StyledSVGIcon',
  componentId: 'd1h3in-0'
})({
  display: 'inline-flex',
  cursor: 'pointer'
})


const CasaIcon = (props) => {
  return React.createElement(StyledSVGIcon, { ...props, 'aria-hidden': 'true' })
}

export default CasaIcon
