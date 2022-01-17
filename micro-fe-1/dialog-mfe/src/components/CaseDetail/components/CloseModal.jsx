import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import DecorativeIcon from '@tds/core-decorative-icon'
import Text from '@tds/core-text'

import {
  Modal,
  ModalContent,
  IconContainer,
  CloseHeader,
  SaveButton,
  CloseButton
} from '../styles'

const CloseModal = ({
  returnAndSaveHandler,
  closeHandler,
  removeCloseModalHandler,
  warningMsg,
  closeBtnVal,
  saveBtnVal
}) => {
  return (
    <Modal>
      <ModalContent>
        <Box>
          <Box>
            <CloseHeader>
              <IconContainer onClick={() => removeCloseModalHandler()} id="times-close-modal">
                <DecorativeIcon symbol="times" size={16} />
              </IconContainer>
            </CloseHeader>
          </Box>
          <Box horizontal={4}>
            <Text size="small">
              {warningMsg}
            </Text>
          </Box>
          <Box vertical={4} horizontal={4}>
            <SaveButton
              id="return-and-save-button"
              onClick={() => returnAndSaveHandler()} style={{
                fontSize: '14px',
                fontWeight: '500'
              }}
            >
              {saveBtnVal}
            </SaveButton>
            <CloseButton onClick={() => closeHandler()} id="close-anyway-button">
              {closeBtnVal}
            </CloseButton>
          </Box>
        </Box>
      </ModalContent>
    </Modal>
  )
}

CloseModal.propTypes = {

  returnAndSaveHandler: PropTypes.func.isRequired,
  closeHandler: PropTypes.func.isRequired,
  removeCloseModalHandler: PropTypes.func.isRequired,
  warningMsg: PropTypes.string.isRequired,
  closeBtnVal: PropTypes.string.isRequired,
  saveBtnVal: PropTypes.string.isRequired
}

export default CloseModal
