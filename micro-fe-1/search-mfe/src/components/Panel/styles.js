import styled from 'styled-components'

const PanelContainer = styled.div`
  padding: ${({ noPadding, padding }) => {
    const {
      top, right, bottom, left
    } = padding
    return noPadding ? '0' : `${top || 0} ${right} ${bottom || 0} ${left}`
  }
};
  width: 100%;
  height: 100%;
  min-height: 10em;
  overflow: hidden;
  margin-bottom: 10px;
  border-right: ${({ hasRightBorder }) => `${hasRightBorder ? '1px solid'
    : 'none'}`};
    border-top: ${({ hasTopBorder }) => `${hasTopBorder ? '1px solid'
    : 'none'}`};
    border-left: ${({ hasLeftBorder }) => `${hasLeftBorder ? '1px solid'
    : 'none'}`};
`

export default PanelContainer
