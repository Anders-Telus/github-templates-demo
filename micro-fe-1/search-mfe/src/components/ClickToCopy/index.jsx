import React, { useState } from 'react'
import PropTypes from 'prop-types'
import CopyIcon from '../../assets/svgs/Copy'
import Successdone from '../../assets/svgs/Successdone'

import {
  Wrapper,
  ClipToCopyWrapper,
  TextWrapper,
  Tooltip,
  TooltipLabel
} from './styles'

const CopyClipboard = ({
  children, text, textPosition, displayBlock, isInvisible, top
}) => {
  const [show, setShow] = useState(false)
  const [copied, setCopied] = useState(false)
  const copyToClipboard = (event) => {
    event.stopPropagation()
    const textField = document.createElement('textarea')
    textField.innerText = text
    document.body.appendChild(textField)
    textField.select()
    document.execCommand('copy')
    textField.remove()
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 3000)
  }
  const onHover = () => {
    if (text) {
      setShow(true)
    }
  }
  const onLeave = () => {
    setShow(false)
  }
  return (
    <Wrapper
      onMouseOver={onHover} onMouseLeave={onLeave}
    >
      <TextWrapper displayBlock={displayBlock}>
        {children}
      </TextWrapper>
      <div style={{ display: 'inline-block', marginLeft: 10 }}>
        {show
          ? (
            <ClipToCopyWrapper onClick={copyToClipboard} isInvisible={isInvisible} top={top}>
              {copied ? (
                <Tooltip>
                  <Successdone />
                  <TooltipLabel textPosition={textPosition}>Copied!</TooltipLabel>
                </Tooltip>
              ) : <CopyIcon />}
            </ClipToCopyWrapper>
            ) : null}
      </div>
    </Wrapper>
  )
}

CopyClipboard.defaultProps = {
  textPosition: 'top',
  text: '',
  children: '',
  displayBlock: false,
  isInvisible: false,
  top: 0
}

CopyClipboard.propTypes = {
  text: PropTypes.string,
  textPosition: PropTypes.string,
  displayBlock: PropTypes.bool,
  children: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.array,
      PropTypes.object
    ]
  ),
  isInvisible: PropTypes.bool,
  top: PropTypes.number
}

export default CopyClipboard
