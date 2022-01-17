import React from 'react'
import PropTypes from 'prop-types'
import {
  PopupContainer,
  MenuContainer, MenuItem, MenuHeader, MenuFooter,
  ArrowBody, ArrowBorder
} from './styles'

const PopupMenu = React.forwardRef((props, ref) => {
  const {
    items, pos, header, footer, toggleMenu, addArrow, width, id, height
  } = props

  const cb = (e, callback, isEnabled) => {
    e.stopPropagation()
    if (callback && typeof callback === 'function' && isEnabled) {
      callback()
      toggleMenu(e, true)
    }
  }

  return items.length ? (
    <PopupContainer pos={pos} ref={ref} id={id}>
      {addArrow && (
        <>
          <ArrowBody x={pos.arrowX} hasHeader={!!header} />
          <ArrowBorder x={pos.arrowX} />
        </>
      )}
      <MenuContainer
        addArrow={addArrow} hasHeader={!!header} hasFooter={!!footer} width={width} height={height}
      >
        {!!header && (
          <MenuHeader key={`popUpHeader_${header}`} id={`popUpHeader_${header}`}>
            {header}
          </MenuHeader>
        )}
        {items.map((item, index) => {
          const { callback, content, align } = item
          const isEnabled = item.isEnabled || typeof item.isEnabled === 'undefined' // isEnabled is true if not specified
          const key = (`item_${index}`).replace(/\s/g, '')
          return (
            <MenuItem
              key={key}
              id={key}
              align={align || 'center'}
              isEnabled={isEnabled}
              isClickable={!!callback}
              onClick={e => cb(e, callback, isEnabled)}
            >
              {content || ''}
            </MenuItem>

          )
        })}
        {!!footer && (
          <MenuFooter onClick={() => {}} key={`popUpFooter_${footer}`} id={`popUpFooter_${footer}`}>
            {footer}
          </MenuFooter>
        )}
      </MenuContainer>
    </PopupContainer>
  ) : null
})
PopupMenu.defaultProps = {
  header: '',
  footer: null,
  addArrow: false,
  width: 'auto',
  height: 'auto'
}
PopupMenu.propTypes = {
  items: PropTypes.array.isRequired,
  pos: PropTypes.object.isRequired,
  toggleMenu: PropTypes.func.isRequired,
  id: PropTypes.string.isRequired,
  header: PropTypes.string,
  footer: PropTypes.node,
  addArrow: PropTypes.bool,
  width: PropTypes.string,
  height: PropTypes.string
}
PopupMenu.displayName = 'PopupMenu'
export default PopupMenu
