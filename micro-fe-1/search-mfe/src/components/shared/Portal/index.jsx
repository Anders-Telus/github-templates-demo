import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'

class Portal extends React.PureComponent {
  constructor (props) {
    super(props)
    this.parentId = props.parentId
    this.elem = document.createElement('div')
  }

  componentDidMount () {
    if (this.parentId && document.getElementById(this.parentId)) {
      document.getElementById(this.parentId).appendChild(this.elem)
    } else {
      document.body.appendChild(this.elem)
    }
  }

  componentWillUnmount () {
    if (this.parentId && document.getElementById(this.parentId)) {
      document.getElementById(this.parentId).removeChild(this.elem)
    } else {
      document.body.removeChild(this.elem)
    }
  }

  render () {
    const { children } = this.props
    return ReactDOM.createPortal(children, this.elem)
  }
}

Portal.defaultProps = { parentId: '' }

Portal.propTypes = {
  parentId: PropTypes.string,
  children: PropTypes.object.isRequired
}

export default Portal
