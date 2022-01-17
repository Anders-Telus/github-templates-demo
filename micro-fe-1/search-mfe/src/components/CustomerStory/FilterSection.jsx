import React from 'react'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import {
  FilterContainer,
  FilterListContainer,
  Label
} from './styles'
import Tasks from '../../assets/svgs/Tasks'
import Cases from '../../assets/svgs/Cases'
import Orders from '../../assets/svgs/Orders'
import { CounterBadge } from '../Styled'
import { getCasaAppLocale } from '../../shared/locale'

const FilterSection = ({
  tasksCount, casesCount, ordersCount,
  filter, setFilter,
  tabUniqId
}) => {
  const locale = getCasaAppLocale()

  const filterButton = (type) => {
    let count = 0
    let label = ''
    let icon = null
    const isSelected = filter === type
    const iconVariant = isSelected ? 'inverted' : 'default'

    switch (type) {
      case 'task': {
        count = tasksCount
        label = locale.task.tasksHeader
        icon = <Tasks variant={iconVariant} size='small' />
        break
      }
      case 'case': {
        count = casesCount
        label = locale.task.casesHeader
        icon = <Cases variant={iconVariant} size='small' />
        break
      }
      case 'order': {
        count = ordersCount
        label = locale.task.ordersHeader
        icon = <Orders variant={iconVariant} size='small' />
        break
      }
      default: break
    }

    const template = (
      <Box>
        <FilterContainer
          selected={isSelected}
          onClick={() => setFilter(tabUniqId, type)}
          id={`${type}-filter-icon`}
        >
          {icon}
          <CounterBadge selected={filter === type}>{count}</CounterBadge>
        </FilterContainer>
        <Label>{label}</Label>
      </Box>
    )

    return template
  }

  return (
    <FilterListContainer>
      {filterButton('task')}
      {filterButton('case')}
      {filterButton('order')}
    </FilterListContainer>
  )
}

FilterSection.defaultProps = {
  filter: '',
  tasksCount: 0,
  casesCount: 0,
  ordersCount: 0
}

FilterSection.propTypes = {
  setFilter: PropTypes.func.isRequired,
  tasksCount: PropTypes.oneOfType(
    [
      PropTypes.number,
      PropTypes.string
    ]
  ),
  casesCount: PropTypes.oneOfType(
    [
      PropTypes.number,
      PropTypes.string
    ]
  ),
  ordersCount: PropTypes.oneOfType(
    [
      PropTypes.number,
      PropTypes.string
    ]
  ),
  tabUniqId: PropTypes.string.isRequired,
  filter: PropTypes.string
}

export default FilterSection
