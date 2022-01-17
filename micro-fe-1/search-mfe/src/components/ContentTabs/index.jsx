import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Tablist } from './styles'
import Tab from './Tab'

class ContentTabs extends Component {
  constructor (props) {
    super(props)
    this.state = {
      activeTab: props.activeTab || props.tabs[0]
    }
    this.onClickTabItem = this.onClickTabItem.bind(this)
  }

  onClickTabItem (tab) {
    const { handleTabClick, disabled } = this.props
    if (disabled) return
    if (tab.isOnClickTabItemDisabled) return
    handleTabClick(tab)
    if (!tab.disabled) {
      this.setState({ activeTab: tab })
    }
  }

  render () {
    const {
      tabs, highlight, medium, regular, light, disabled, backgroundColor, display, labelMarginLeft
    } = this.props
    const { activeTab } = this.state
    return (
      <>
        <Tablist
          disabled={disabled}
          backgroundColor={backgroundColor}
          display={display}
        >
          {
            tabs.map((tab) => {
              return (
                <Tab
                  key={tab.id}
                  id='content-tabs'
                  tab={tab}
                  activeTab={activeTab}
                  onClick={() => this.onClickTabItem(tab)}
                  tabWidth={tab.tabWidth}
                  tabPadding={tab.tabPadding}
                  highlight={highlight}
                  medium={medium}
                  regular={regular}
                  light={light}
                  minHeight={tab.minHeight}
                  margin={tab.margin}
                  labelMarginLeft={labelMarginLeft}
                />
              )
            })
          }
        </Tablist>
      </>
    )
  }
}

ContentTabs.defaultProps = {
  tabs: [],
  activeTab: null,
  highlight: false,
  medium: '',
  regular: false,
  light: '',
  disabled: false,
  backgroundColor: '',
  display: '',
  labelMarginLeft: '-12px'
}

ContentTabs.propTypes = {
  tabs: PropTypes.array,
  activeTab: PropTypes.object,
  highlight: PropTypes.bool,
  handleTabClick: PropTypes.func.isRequired,
  medium: PropTypes.string,
  regular: PropTypes.bool,
  light: PropTypes.string,
  disabled: PropTypes.bool,
  backgroundColor: PropTypes.string,
  display: PropTypes.string,
  labelMarginLeft: PropTypes.string
}

export default ContentTabs
