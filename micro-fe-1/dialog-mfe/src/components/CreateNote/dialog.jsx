import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import { useBolster } from '@mobilelive-inc/bolsterjs';

import DetailsPopup from '../DetailsPopup'
import CloseModal from '../CaseDetail/components/CloseModal'

import { PopupContainer } from '../NotesSection/styles'
import { SaveButton } from '../Task/styles'
import { SaveContainer } from './styles'
import { CasaBox } from '../Styled'
import { getCasaAppLocale } from '../../utils/locale';

const CreateNote = ({ tabUniqId, parentId, onSubmit, tabIdDetail, closeDialog, updateTabDetails, bodyContent, dialogTitle }) => {
  const { lang } = useBolster();
  const locale = getCasaAppLocale(lang);
  const [askForClosure, setAskForClosure] = useState(false);
  const [rightAlignPosition, setRightAlignPosition] = useState('1%')
  const [dragPositionState, setDragPositionState] = useState({ x: '25%', y: '32%' });
  const [relPosition, setRelPosition] = useState({x: 0, y: 0})
  const [popupContainerState, setPopupContainerState] = useState({})
  const [popupDetails, updateNotePopupDetail] = useState({
    values: {
      minimized: false,
      index: 0,
      position: {x: 0, y: 0}
    },
    id: tabUniqId,
    tabId: tabUniqId,
    type: 'CreateNote',
    parent: 'modifieable'
  });
  const popupContainerRef = useRef()
  const showMinimizeIcon = true;
  const showCloseIcon = true;
  const showBody = true;

  useEffect(() => {
    const currTab = tabIdDetail.find(d => d.tabUniqId === tabUniqId);
    setRightAlignPosition((1 + (currTab.position - 1) * 32) + '%');
  }, [tabIdDetail])
  
  // component did update block
  useEffect(() => {
    setPopupContainerState(popupContainerRef)
  }, [popupContainerState.current])

  const updateNoteDetailPopup = (item) => {
    const { rel, dragPosition } = item
    if (dragPosition) setDragPositionState(dragPosition)
    if (rel) setRelPosition(rel)
    const valuesObj = {}
    if (Object.hasOwnProperty.call(item, 'index')) {
      valuesObj.index = item.index
    }
    if (Object.hasOwnProperty.call(item, 'minimized')) {
      valuesObj.minimized = item.minimized
    }
    if (Object.hasOwnProperty.call(item, 'position')) {
      valuesObj.position = item.position
    }
    if (Object.keys(valuesObj).length) {
      const details = {
        values: valuesObj,
        id: tabUniqId,
        tabId: tabUniqId,
        type: item.type,
        parent: 'modifieable'
      }
      updateTabDetails(tabUniqId, valuesObj);
      updateNotePopupDetail(details)
    }
  }

  const headerContent = (
    <Box>
      <CasaBox weight="bold" color="#2B8000">
        {dialogTitle}
      </CasaBox>
    </Box>
  )

  const footerTemplate = (
    <CasaBox
      display="flex" flexDirection="row" alignItems="center" justifyContent="flex-end"
      mt="4px" mb="12px"
    >
      <SaveContainer>
        <SaveButton
          id="save-note"
          onClick={() => onSubmit(parentId, tabUniqId)}
          disabled={false}
        >
          {locale.app.submit}
        </SaveButton>
      </SaveContainer>
    </CasaBox>
  )
  
  return (
    <>
      <PopupContainer
        posX={dragPositionState.x || '45%'}
        style={{
          left: popupDetails.values.minimized ? 'auto' : (dragPositionState.x || '1%'),
          right: rightAlignPosition,
          top: popupDetails.values.minimized ? 'auto' : (dragPositionState.y || `${((window.innerHeight - 310))}px`),
          zIndex: 5,
          width: '56%'
        }}
        ref={popupContainerState}
        minimized={popupDetails.values.minimized}
      >
        <DetailsPopup
          isOpen={true}
          minimized={popupDetails.values.minimized}
          modifieable={{
            showMinimizeIcon,
            showCloseIcon,
            showFooter: true,
            showHeader: true,
            showBody
          }}
          bodyContent={bodyContent}
          headerContent={headerContent}
          index={5}
          type="CreateNote"
          containerRef={popupContainerState}
          rel={relPosition}
          footerContent={footerTemplate}
          coreHeaderStyles={{ width: '100%' }}
          highestZindex={5}
          closeHandler={() => closeDialog(tabUniqId)}
          updateDetail={updateNoteDetailPopup}
          isDraggable={true}
          highestPosition={0}
          headerHoverDisplay={false}
          rightAlignhandler={val => setRightAlignPosition(val)}
          tabIdDetail={tabIdDetail}
          corePopupStyles={{
            borderRadius: '5px',
            height: popupDetails.values.minimized ? '37px' : 'inherit',
            width: popupDetails.values.minimized ? '' : '703px'
          }}
          coreDividerStyles={{
            marginLeft: '2%',
            marginTop: '0.2rem'
          }}
        />
      </PopupContainer>
      {
        askForClosure && (
          <CloseModal
            returnAndSaveHandler={() => {}}
            removeCloseModalHandler={() => {}}
            closeHandler={closeHandler}
            saveBtnVal={'Save'}
            closeBtnVal={'Close'}
            warningMsg={'Warning'}
          />
        )
      }
    </>
  )
};

CreateNote.propTypes = {
  tabUniqId: PropTypes.string.isRequired
}

export default CreateNote
