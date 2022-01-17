import PropTypes from 'prop-types'
import PanelContainer from './styles'

const Panel = PanelContainer

Panel.defaultProps = {
  hasRightBorder: false,
  hasTopBorder: false,
  hasLeftBorder: false,
  noPadding: false,
  scrollbarStyle: '',
  padding: {
    top: '0',
    right: '1em',
    bottom: '0',
    left: '1em'
  }
}

Panel.propTypes = {
  hasRightBorder: PropTypes.bool,
  hasTopBorder: PropTypes.bool,
  hasLeftBorder: PropTypes.bool,
  noPadding: PropTypes.bool,
  padding: PropTypes.object,
  scrollbarStyle: PropTypes.string
}

export default Panel
