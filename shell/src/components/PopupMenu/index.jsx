import React from 'react'
import PropTypes from 'prop-types'
import Portal from '../shared/Portal/index'
import PopupMenuBody from './PopupMenu'

class PopupMenu extends React.PureComponent {
  constructor (props) {
    super(props)
    this.state = { isVisible: false, pos: {} }
    this.target = {}
    this.targetRef = React.createRef()
    this.popupRef = React.createRef()
    this.toggleMenu = this.toggleMenu.bind(this)
    this.id = `popup_${props.id || 'menu'}`
  }

  componentDidMount () {
    this.target = this.targetRef.current.getBoundingClientRect()
  }

  setPosition () {
    const {
      align, manual, offset, top
    } = this.props
    const pos = { manual }
    const {
      x: targetX, y: targetY, width: targetWidth, height: targetHeight
    } = this.target
    const { width: popupWidth } = this.popupRef.current
      ? this.popupRef.current.getBoundingClientRect() : {}

    switch (align) {
      case 'center': {
        pos.left = Math.max(
          0, popupWidth
            ? Math.min(
                targetX - (popupWidth - targetWidth) / 2 + offset[0],
                window.innerWidth - popupWidth - 5
              ) : targetX
        )
        break
      }
      case 'left': {
        pos.left = Math.max(
          0, popupWidth
            ? Math.min(
                targetX - popupWidth + targetWidth + offset[0],
                window.innerWidth - popupWidth - 5
              ) : targetX
        )
        break
      }
      case 'right': {
        pos.left = Math.max(
          0, popupWidth
            ? Math.min(targetX + offset[0], window.innerWidth - popupWidth - 5)
            : targetX
        )
        break
      }
      default: break
    }

    pos.top = top || Math.max(0 + offset[1], targetY + targetHeight)
    pos.arrowX = targetX + (targetWidth / 2) - pos.left
    this.setState({ pos })
  }

  toggleMenu (e, isCallback = false) {
    e.stopPropagation()
    const { isEnabled, setActiveMenu, name } = this.props
    const isTargetOutsideMenu = !e.target.closest(`#${this.id}`)
    const closePopupMenu = (e.target.id === 'closePopupMenu')
    if (isTargetOutsideMenu || isCallback || closePopupMenu) {
      this.setState(
        prevState => ({
          isVisible: !isEnabled ? isEnabled : !prevState.isVisible
        }),
        () => {
          const { isVisible } = this.state
          if (isVisible && isEnabled) {
            this.setPosition()
            setActiveMenu(name)
            document.addEventListener('click', this.toggleMenu)
          } else {
            setActiveMenu('')
            document.removeEventListener('click', this.toggleMenu)
          }
        }
      )
    }
  }

  render () {
    const {
      items,
      children,
      parentId,
      isEnabled,
      header,
      footer,
      addArrow,
      width,
      height
    } = this.props
    const { isVisible, pos } = this.state
    return (
      <span id={`${this.id}_container`} role='none' onClick={this.toggleMenu}>
        <span ref={this.targetRef}>{children}</span>
        {isEnabled && isVisible && (
          <Portal parentId={parentId}>
            <PopupMenuBody
              id={this.id}
              header={header}
              footer={footer}
              items={items}
              pos={pos}
              ref={this.popupRef}
              toggleMenu={this.toggleMenu}
              addArrow={addArrow}
              width={width}
              height={height}
            />
          </Portal>
        )}
      </span>
    )
  }
}

PopupMenu.defaultProps = {
  isEnabled: true,
  parentId: '',
  manual: [],
  header: null,
  footer: null,
  align: 'center',
  addArrow: false,
  width: 'auto',
  setActiveMenu: () => {},
  name: '', // required if setActiveMenu is passed
  offset: [0, 0],
  top: 0,
  height: 'auto'
}

PopupMenu.propTypes = {
  items: PropTypes.array.isRequired,
  /**
   * The items containing the content that is to be displayed in the popup menu
   * Each in the list is of the form:
   *  {
   *    content: (REQUIRED) - a node that is displayed inside a menu row item
   *    callback: (OPTIONAL) - a function that is executed upon clicking the menu item
   *    align: (OPTIONAL) - text-aligns the content inside the menu item
   *    isEnabled: (OPTIONAL) - when false, the text content turns grey
   *                            and hover + callback is disabled. True by default.
   *  }
   */
  children: PropTypes.object.isRequired,
  /**
   * The target children components that trigger the popup upon click
   * and respectiely position the popup
   */
  id: PropTypes.string.isRequired,
  /**
   * Used as a post-fix to create a unique id of the form "popup_${props.id}",
   * otherwise "popup_menu" if id is not passed
   */
  isEnabled: PropTypes.bool,
  /**
   * Manual switch for enabling/disabling the popup
   */
  parentId: PropTypes.string,
  /**
   * By default, the popup is rendered as a child of the html body node.
   * Optionally, a parentId may be passed to render the popup as a child of
   * the closest component with that id.
   * - it is highly advised to pass a manual prop if using this approach
   */
  manual: PropTypes.array,
  /**
   * A manual override of the popup position
   * - format: [x units, y units]
   * - Relative to the body node or parentId
   */
  header: PropTypes.node,
  /**
   * An optional header of any type
   */
  footer: PropTypes.node,
  /**
   * An optional footer of any type
   */
  align: PropTypes.string,
  /**
   * One of 'left,' 'right,' or 'center'
   * - Aligns the entire popup menu to the left, right, or center of the target
   */
  addArrow: PropTypes.bool,
  /**
   * Attaches an arrows to the popup that points to the target
   */
  width: PropTypes.string,
  /**
   * Manual width set (if not passed, width adjusts to fit)
   */
  setActiveMenu: PropTypes.func,
  /**
   * For reference purposes
   * - updates the parent on the current active menu by name
   * - must pass a 'name' prop if using this function
   *
   */
  name: PropTypes.string,
  /**
   * An arbitrary name for the popup that is used by 'setActiveMenu'
   */
  offset: PropTypes.array,
  /**
   * A tuple in the form [x,y] that translates the popup x units and y units
   */
  top: PropTypes.number,
  /**
   * Manual margin from top
   */
  height: PropTypes.string
  /**
   * Manual height set (if not passed, height adjusts to fit)
   */
}

export default PopupMenu
