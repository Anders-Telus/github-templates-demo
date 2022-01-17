import React, {
  useState, useEffect, useMemo, useCallback
} from 'react'
import PropTypes from 'prop-types'
import {
  Popup
} from './styles'
import PopupHeader from './components/PopupHeader'

const DetailsPopup = ({
  isOpen, minimized, modifieable, closeHandler,
  headerContent, footerContent, bodyContent, updateDetail, highestZindex,
  isDraggable, containerRef, rel, tabIdDetail, rightAlignhandler, type,
  highestPosition, coreHeaderStyles, corePopupStyles, coreDividerStyles, index,
  updateNoifiIndex, headerHoverDisplay
}) => {
  const {
    showCloseIcon, showFooter, showHeader, showBody, showMinimizeIcon
  } = modifieable
  const closeHandlerMemoized = useCallback(() => closeHandler(), [closeHandler])
  const updateDetailMemoized = useCallback(payload => updateDetail(payload), [updateDetail])
  const header = useMemo(() => headerContent, [headerContent])
  const footer = useMemo(() => footerContent, [footerContent])
  const body = useMemo(() => bodyContent, [bodyContent])
  const updateNotificationIndex = useCallback(
    payload => updateNoifiIndex(payload), [updateNoifiIndex]
  )

  const [dragging, setDragging] = useState(false)

  const onMouseMove = (e) => {
    e.stopPropagation()
    e.preventDefault()
    if (containerRef.current) {
      let posX = e.pageX - rel.x
      let posY = e.pageY - rel.y
      const RightPosX = document.body.clientWidth - containerRef.current.offsetWidth
      const BottomPosY = document.body.clientHeight - containerRef.current.offsetHeight
      if (posX < 0) {
        posX = '0px'
      }
      if (posY < 0) {
        posY = '0px'
      }

      if (posX > RightPosX) {
        posX = RightPosX
      }
      if (posY > BottomPosY) {
        posY = BottomPosY
      }
      updateDetailMemoized({
        dragPosition: {
          x: posX,
          y: posY
        },
        type
      })
    }
  }

  const updateIndex = () => {
    if (index < highestZindex) {
      const newIndex = highestZindex + 1
      updateDetailMemoized({ index: newIndex, type })
    }
  }

  const onMouseUp = (e) => {
    e.preventDefault()
    e.stopPropagation()
    setDragging(false)
    document.removeEventListener('mousemove', onMouseMove)
    document.removeEventListener('mouseup', onMouseUp)
    updateIndex()
  }

  const onMouseDown = (e) => {
    setDragging(true)
    updateDetail({
      rel: {
        x: e.pageX - containerRef.current.getBoundingClientRect().left,
        y: e.pageY - containerRef.current.getBoundingClientRect().top
      },
      type
    })
  }

  const minimizePopup = () => {
    updateDetailMemoized({
      minimized: true,
      position: highestPosition + 1,
      type
    })
  }

  const maximizePopup = () => {
    updateDetailMemoized({ minimized: false, type })
  }

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', onMouseMove)
      document.addEventListener('mouseup', onMouseUp)
    }
  }, [dragging, tabIdDetail])

  // @todo - make PopupHeader have a complete content Prop
  return (
    isOpen ? (
      <Popup
        onClick={updateIndex}
        className="popup"
        style={corePopupStyles}
      >
        {showHeader ? (
          <PopupHeader
            type={type}
            minimized={minimized}
            minimizePopup={minimizePopup}
            maximizePopup={maximizePopup}
            closeHandler={closeHandlerMemoized}
            showCloseIcon={showCloseIcon}
            headerContent={header}
            mouseDownEvent={onMouseDown}
            onMouseMove={onMouseMove}
            onMouseUp={onMouseUp}
            isDraggable={isDraggable}
            coreHeaderStyles={coreHeaderStyles}
            coreDividerStyles={coreDividerStyles}
            showMinimizeIcon={showMinimizeIcon}
            headerHoverDisplay={headerHoverDisplay}
          />
        ) : null}
        { showBody ? body : null}
        { showFooter ? footer : null}
      </Popup>
    ) : null
  )
}

DetailsPopup.defaultProps = {
  isOpen: false,
  minimized: false,
  modifieable: {
    showMinimizeIcon: false,
    showCloseIcon: false,
    showFooter: false,
    showHeader: false,
    showBody: false
  },
  headerContent: (<></>),
  bodyContent: (<></>),
  footerContent: (<></>),
  highestZindex: 1,
  isDraggable: true,
  highestPosition: 0,
  coreHeaderStyles: {},
  corePopupStyles: {},
  coreDividerStyles: {},
  tabIdDetail: [],
  updateNoifiIndex: () => {},
  headerHoverDisplay: true
}

DetailsPopup.propTypes = {
  isOpen: PropTypes.bool,
  minimized: PropTypes.bool,
  modifieable: PropTypes.object,
  closeHandler: PropTypes.func.isRequired,
  headerContent: PropTypes.object,
  bodyContent: PropTypes.object,
  footerContent: PropTypes.object,
  updateDetail: PropTypes.func.isRequired,
  highestZindex: PropTypes.number,
  isDraggable: PropTypes.bool,
  containerRef: PropTypes.object.isRequired,
  rel: PropTypes.object.isRequired,
  tabIdDetail: PropTypes.array,
  rightAlignhandler: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  highestPosition: PropTypes.number,
  coreHeaderStyles: PropTypes.object,
  corePopupStyles: PropTypes.object,
  coreDividerStyles: PropTypes.object,
  index: PropTypes.number.isRequired,
  updateNoifiIndex: PropTypes.func,
  headerHoverDisplay: PropTypes.bool
}

export default React.memo(DetailsPopup)
