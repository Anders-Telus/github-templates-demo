import React from 'react'
// import Text from '@tds/core-text'
import PropTypes from 'prop-types'
import Box from '@tds/core-box'
import { withRouter } from 'react-router-dom'
import { useBolster } from '@mobilelive-inc/bolsterjs'
import Skeleton from '../shared/Skeleton'
import Tooltip from '../Tooltip'
import { CasaRegularText, GraySkeleton } from '../Styled'
import { getCreditClass, getCreditToolTip } from './helpers'
import {
  ExplicitCreditClass, LetterContainer, CreditVal
} from './styles'
import CreditClass from '../../assets/svgs/CreditClass'
import { getCasaAppLocale } from '../../utils/locale'

const CreditValue = ({
  creditInfo,
  isRefresh,
  lineOfBusiness,
}) => {
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang)
  const { creditClassCd } = creditInfo
  const creditClassValue = getCreditToolTip(lineOfBusiness, creditClassCd)
  return (
    <>
      <Box vertical={1}>
        <div>
          <CasaRegularText style={{ color: '#797979', fontWeight: '700' }}>
            {locale.app.ban.creditValue}
          </CasaRegularText>
        </div>
      </Box>
      <Box vertical={1}>
        {(() => {
          if (isRefresh) {
            return (
              <div style={{ marginLeft: '5px' }}>
                <Skeleton type='text' lines={1} characters={1} />
              </div>
            )
          }
          return !creditInfo ? (
            <GraySkeleton characters={1} height={18} />
          ) : (
            <div style={{
              marginLeft: '8px', marginTop: '2px', fontWeight: '900', fontSize: '12px'
            }}
            >

              {creditInfo && getCreditClass(lineOfBusiness, creditClassCd) === true ? (
                <ExplicitCreditClass>
                  <CreditClass />
                  <LetterContainer
                    id='letter_container'
                    lang='en'
                  >
                    <Tooltip text={`${locale.app.ban.creditClass[creditClassValue]}`}>
                      {creditClassCd}
                    </Tooltip>
                  </LetterContainer>
                </ExplicitCreditClass>
              ) : (
                <CreditVal>
                  {' '}
                  <Tooltip text={`${locale.app.ban.creditClass[creditClassValue]}`}>
                    {creditClassCd}
                  </Tooltip>

                </CreditVal>
              )}
            </div>
          )
        })()}
      </Box>
    </>
  )
}

CreditValue.defaultProps = {
  creditInfo: '',
  isRefresh: false
}

CreditValue.propTypes = {
  creditInfo: PropTypes.string,
  isRefresh: PropTypes.bool,
  lineOfBusiness: PropTypes.string.isRequired

}

export default CreditValue
