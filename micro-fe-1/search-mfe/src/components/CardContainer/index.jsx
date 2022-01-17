import React from 'react'
import Card from '@tds/core-card'
import Box from '@tds/core-box'
import PropTypes from 'prop-types'
import Container from './styles'

const CardContainer = ({
  minHeight, header, content, footer, spacing, margin
}) => {
  return (
    <Container minHeight={minHeight} margin={margin}>
      <Card variant='defaultWithBorder' spacing={spacing} fullHeight>
        {header ? (
          <Box>
            {header}
          </Box>
        ) : null}
        <Box style={{ minHeight: '340px' }}>
          {content}
        </Box>
        {footer ? (
          <Box>
            {footer}
          </Box>
        ) : null}
      </Card>
    </Container>
  )
}

CardContainer.defaultProps = {
  minHeight: '',
  header: null,
  footer: null,
  spacing: 'default',
  margin: '32'
}

CardContainer.propTypes = {
  minHeight: PropTypes.string,
  header: PropTypes.node,
  content: PropTypes.node.isRequired,
  footer: PropTypes.node,
  spacing: PropTypes.string,
  margin: PropTypes.string
}

export default CardContainer
