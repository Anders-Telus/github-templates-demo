import React from 'react'
import PropTypes from 'prop-types'

import { TablistItem, LabelWrapper } from './styles'

const Tab = ({
  tab,
  activeTab,
  onClick,
  tabWidth,
  tabPadding,
  highlight,
  medium,
  regular,
  light,
  minHeight,
  margin,
  labelMarginLeft
}) => {
  return (
    <TablistItem
      onClick={onClick} isActive={activeTab.id === tab.id}
      isBorderBottom={tab.isBorderBottom}
      tabWidth={tabWidth}
      tabPadding={tabPadding}
      minHeight={minHeight}
      margin={margin}
    >
      <LabelWrapper
        isActive={activeTab.id === tab.id}
        highlight={highlight}
        medium={medium}
        regular={regular}
        light={light}
        marginLeft={labelMarginLeft}
      >
        {tab.template}
      </LabelWrapper>
    </TablistItem>
  )
}

Tab.defaultProps = {
  tab: {},
  activeTab: {},
  tabWidth: '50%',
  tabPadding: '8px',
  minHeight: 'auto',
  margin: ''
}

Tab.propTypes = {
  tab: PropTypes.object,
  activeTab: PropTypes.object,
  onClick: PropTypes.func.isRequired,
  tabWidth: PropTypes.string,
  tabPadding: PropTypes.string,
  highlight: PropTypes.bool.isRequired,
  medium: PropTypes.string.isRequired,
  regular: PropTypes.oneOfType(
    [
      PropTypes.string,
      PropTypes.bool
    ]
  ).isRequired,
  light: PropTypes.string.isRequired,
  minHeight: PropTypes.string,
  margin: PropTypes.string,
  labelMarginLeft: PropTypes.string.isRequired
}

export default Tab
