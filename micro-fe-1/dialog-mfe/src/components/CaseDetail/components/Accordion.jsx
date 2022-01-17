import React, { useState } from 'react'
import PropTypes from 'prop-types'
import AccordionSection from './AccordionSection'
import { AccordionMenu } from '../styles'

const Accordion = ({
  accordionHeight,
  allowMultipleOpen,
  handlerAccordionOpen,
  children,
  listRef,
  isRTSPopUpOpen
}) => {
  const [openSections, setOpenSections] = useState(
    children.reduce((result, child) => {
      if (child.props.isOpen) {
        const openSectionsAcc = Object.assign({}, result)
        openSectionsAcc[child.props.label] = true
        return openSectionsAcc
      }
      return result
    }, {})
  )

  const onClick = (label) => {
    const isOpen = !!openSections[label]
    if (allowMultipleOpen) {
      setOpenSections({ ...openSections, [label]: !isOpen })
    } else {
      setOpenSections({ [label]: !isOpen })
    }
    handlerAccordionOpen({ taskId: +label, isOpen: !isOpen })
  }

  return (
    <AccordionMenu>
      {children.map((child) => {
        const {
          label, header, taskStatus, caseCompleteCancelItem
        } = child.props
        return (
          <AccordionSection
            id="accordion_section"
            isOpen={!!openSections[label]}
            onClick={() => onClick(label)}
            key={label}
            header={header}
            taskStatus={taskStatus}
            accordionHeight={accordionHeight}
            listRef={listRef}
            caseCompleteCancelItem={caseCompleteCancelItem}
            isRTSPopUpOpen={isRTSPopUpOpen}
          >
            {child.props.children}
          </AccordionSection>
        )
      })}
    </AccordionMenu>
  )
}

Accordion.defaultProps = {
  allowMultipleOpen: false,
  handlerAccordionOpen: () => {},
  accordionHeight: ''
}

Accordion.propTypes = {
  children: PropTypes.instanceOf(Object).isRequired,
  allowMultipleOpen: PropTypes.bool,
  handlerAccordionOpen: PropTypes.func,
  accordionHeight: PropTypes.string,
  listRef: PropTypes.object.isRequired,
  isRTSPopUpOpen: PropTypes.bool.isRequired
}

export default Accordion
