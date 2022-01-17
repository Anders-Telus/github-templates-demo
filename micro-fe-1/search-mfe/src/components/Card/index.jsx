import React from 'react'
import Card from '@tds/core-card'
import PropTypes from 'prop-types'
import {
  CardHeader,
  CardHeaderExpand,
  Container,
  CardWrapper
} from './styles'
import { CasaH4 } from '../Styled'
import ExpandCollapse from '../ExpandCollapse'

const CasaCard = ({
  header, children, spacing, height, margin, collapsable, headerCSS, borderRadius, iconCSS, variant
}) => {
  return (
    <CardWrapper margin={margin} id='card-wrapper'>
      <Card variant={variant} spacing={spacing} id='card'>
        {collapsable
          ? (
            <ExpandCollapse
              iconCSS={iconCSS}
              borderRadius={borderRadius}
              headerCSS={headerCSS}
              header={(
                <CardHeaderExpand>
                  <CasaH4>
                    {header}
                  </CasaH4>
                </CardHeaderExpand>
              )}
            >
              {children}
            </ExpandCollapse>
            )
          : (
            <>
              <Container height={height}>
                {header
                  ? (
                    <CardHeader id='header'>
                      <CasaH4>
                        {header}
                      </CasaH4>
                    </CardHeader>
                    ) : null}
                {children}
              </Container>
            </>
            )}
      </Card>
    </CardWrapper>
  )
}

CasaCard.defaultProps = {
  header: null,
  spacing: null,
  height: 'auto',
  margin: '0',
  collapsable: false,
  borderRadius: '3px',
  headerCSS: {
    marginTop: 0,
    padding: 0,
    background: '#F7F7F8',
    marginBottom: 0
  },
  iconCSS: {
    paddingLeft: '6px',
    paddingTop: '8px'
  },
  variant: 'defaultWithBorder'
}

CasaCard.propTypes = {
  header: PropTypes.node,
  children: PropTypes.node.isRequired,
  spacing: PropTypes.string,
  height: PropTypes.string,
  margin: PropTypes.string,
  borderRadius: PropTypes.string,
  collapsable: PropTypes.bool,
  headerCSS: PropTypes.object,
  iconCSS: PropTypes.object,
  variant: PropTypes.string
}

export default CasaCard
