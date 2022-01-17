import React from 'react'
import PropTypes from 'prop-types'
import RadioBody from './Radio'

const Radio = (props) => {
  const ref = React.createRef()
  const { id, groupId, value } = props
  return <RadioBody {...props} id={id || `${groupId}_${value}`} ref={ref} />
}

Radio.propTypes = {
  /**
     * The label.
     */
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.node]).isRequired,
  /**
     * Associate this radio with a group. Set as the HTML name attribute.
     */
  groupId: PropTypes.string.isRequired,
  /**
     * The value. Must be unique within the group.
     */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.bool]).isRequired,
  /**
     * Use `checked` for controlled radio. For uncontrolled radio,
     *  use React's built-in `defaultChecked` prop.
     * See examples below for more details.
     */
  checked: PropTypes.bool,
  /**
     * The id. Must be unique within the group. If no id is provided,
     * one will be generated in the following format: `name_value`
     */
  id: PropTypes.string
}

Radio.defaultProps = {
  id: undefined,
  checked: undefined
}

export default Radio
