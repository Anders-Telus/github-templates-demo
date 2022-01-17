import React from 'react'
import PropTypes from 'prop-types'
import {
  TextAreaContainer
} from './styles'

const TextAreaComponent = ({
  children,
  rows,
  cols,
  styles,
  placeHolder,
  maxLength,
  onChange,
  onBlur,
  value
}) => {
  const myTextArea = React.createRef()

  return (
    <TextAreaContainer>
      <textarea
        ref={myTextArea}
        rows={rows}
        cols={cols}
        style={styles}
        maxLength={maxLength}
        placeHolder={placeHolder}
        onChange={onChange}
        onBlur={onBlur}
        value={value}
      >
        {children}
      </textarea>
    </TextAreaContainer>
  )
}

TextAreaComponent.defaultProps = {
  styles: {
    border: '',
    width: '',
    height: '',
    borderRadius: '',
    resize: 'none'
  },
  maxLength: '',
  children: '',
  value: ''
}


TextAreaComponent.propTypes = {
  children: PropTypes.string,
  rows: PropTypes.string.isRequired,
  cols: PropTypes.string.isRequired,
  placeHolder: PropTypes.string.isRequired,
  maxLength: PropTypes.string,
  styles: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  onBlur: PropTypes.func.isRequired,
  value: PropTypes.string
}

export default TextAreaComponent
