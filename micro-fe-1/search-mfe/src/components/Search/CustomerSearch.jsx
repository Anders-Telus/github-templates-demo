import React, { useState } from 'react'
import Box from '@tds/core-box'
import InputFeedback from '@tds/core-input-feedback'
import { withRouter } from 'react-router-dom';
// import Radio from '../../components/Radio'
import { ThemeProvider, Button, ChevronLink, SideNav, Radio } from '@telus-uds/components-base';

import {
  SearchInputContainer,
  SearchGuidanceText,
  CustomerNameWrapper,
  CustomerNameError,
  StyledErrorMsg,
  HelpLabel,
  HelpText,
  HelpIcon
} from './styles'
import { ClearButton } from '../Styled'
import Input from '../../components/Input'
import Tooltip from '../../components/Tooltip'
import Information from '../../../static/Information'

import keywords from './search.json'
import { useBolster } from '@mobilelive-inc/bolsterjs'
import { hasAccess } from '../../helpers/auth'
import { permissions } from '../../helpers/constants'
import { getCasaAppLocale } from '../../utils/locale';
const CustomerSearch = ({ onSubmit}) => {
  const { roles, requiresAuth } = useBolster()
  const [customerState, setCustomerState] = useState({
    inputForm: {
      telephone: '',
      banOrEmail: '',
      customerID: '',
      caseOrTaskNumber: '',
      firstName: '',
      lastName: '',
      caseOrTask: 'task'
    },
    errorMsg: '',
    errorField: '',
    focusedFields: [],
    activeInput: null
  })
  const { inputForm, errorMsg, focusedFields, errorField, activeInput } =
    customerState
  const { lang } = useBolster()
  const locale = getCasaAppLocale(lang)

  const flNames = ['firstName', 'lastName']
  const caseNames = ['caseOrTaskNumber', 'caseOrTask']

  const getInputStyles = (id) => {
    const inputstyle = {}
    if (
      !!errorMsg &&
      (id === 'firstName' || id === 'lastName') &&
      (errorField === 'firstName' || errorField === 'lastName')
    ) {
      inputstyle.marginTop = '3.4rem'
    }
    return inputstyle
  }

  const onFormSubmit = (e) => {
    e.preventDefault()
    console.log('e', e);
    const isEmpty = Object.keys(inputForm).every((key) => {
      if (key === 'caseOrTask') return true
      return !inputForm[key]
    })
    if (isEmpty) {
      return setCustomerState({
        ...customerState,
        errorField: 'required',
        errorMsg: 'Please fill a field in the below form to search'
      })
    }
    if (inputForm.firstName || inputForm.lastName) {
      const errorField = ['firstName', 'lastName'].find(
        (key) => !inputForm[key]
      )
      if (errorField) {
        const errorMessage = {
          firstName: 'Please enter first name to search',
          lastName: 'Please enter last name to search'
        }
        return setCustomerState({
          ...customerState,
          errorField,
          errorMsg: errorMessage[errorField]
        })
      }
    }
    setCustomerState({
      ...customerState,
      errorField: '',
      errorMsg: ''
    })
    onSubmit(customerState)
  }

  const onInputChange = (name, val) => {
    console.log('a', name, val)
    let activeInput = (val && name) || null
    if (flNames.includes(name) && !val) {
      const key =
        flNames.find((field) => field !== name && !!inputForm[field]) || null
      activeInput = key
    }
    setCustomerState({
      ...customerState,
      focusedFields: [activeInput],
      activeInput,
      inputForm: { ...inputForm, [name]: val }
    })
  }

  const isDisabled = (name) => {
    console.log('name', name)
    if (flNames.includes(name) && flNames.includes(activeInput)) {
      return false
    } else if (caseNames.includes(name) && caseNames.includes(activeInput)) {
      return false
    }
    return activeInput !== null && activeInput !== name
  }

  const clearForm = () => {
    onSubmit(null, null)
    const newState = {
      inputForm: {
        telephone: '',
        banOrEmail: '',
        customerID: '',
        caseOrTaskNumber: '',
        firstName: '',
        lastName: '',
        caseOrTask: 'task'
      },
      errorMsg: '',
      errorField: '',
      focusedFields: [],
      activeInput: null
    }
    setCustomerState(newState)
  }

  const createSearchField = ({
    id,
    groupID,
    length = '20',
    disabled = false,
    helpText,
    labelType,
    labelItems
  }) => {
    let template = ''
    let label = ''
    if (labelType === 'text') {
      label = helpText ? (
        <HelpLabel>
          {locale.app.keywords[id]}
          <HelpIcon>
            <Tooltip text={helpText} variant='vertical' maxWidth={300}>
              <Information alt='information' />
            </Tooltip>
          </HelpIcon>
        </HelpLabel>
      ) : (
        locale.app.keywords[id]
      )
    } else if (labelType === 'radio') {
      label = (
        <Box inline between={3}>
          {labelItems.map((element) => (
            <Radio
              key={element.value}
              label={element.label}
              groupId={groupID}
              value={element.value}
              id={element.value}
              name={element.value}
              checked={element.checked}
              disabled={isDisabled(id)}
              onChange={() => onInputChange(groupID, element.value)}
            />
          ))}
        </Box>
      )
    }
    template = (
      <Input
        type='text'
        id={id}
        value={inputForm[id] || ''}
        label={label}
        maxLength={length}
        error={errorField && errorField !== 'required' ? errorMsg : ''}
        errField={errorField}
        onClickX={() => onInputChange(id, '')}
        isFieldFocused={focusedFields.includes(id)}
        onChange={(e) => onInputChange(id, e)}
        disabled={isDisabled(id)}
        style={getInputStyles(id)}
      />
    )
    return template
  }

  const customerNameHelpText = (
    <HelpText>
      <Box between={2}>
        <p>First and Last Name are both required.</p>
        <p>
          Refine results with a wildcard search. Type at least 3 characters of
          the name, followed by an asterisk*
        </p>
      </Box>
    </HelpText>
  )

  return (
    <form
      name='searchForm'
      id='searchForm'
      onSubmit={onFormSubmit}
      autoComplete='off'
    >
      <Box>
        <SearchGuidanceText>
          {locale.app.customerSearchInfo}
        </SearchGuidanceText>
        {errorMsg && errorField === 'required' && (
          <InputFeedback feedback='error'>{errorMsg}</InputFeedback>
        )}
        {createSearchField({ id: 'telephone', labelType: 'text' })}
        {createSearchField({
          id: 'banOrEmail',
          length: '40',
          labelType: 'text'
        })}
        {createSearchField({
          id: 'customerID',
          length: '9',
          labelType: 'text'
        })}
        {createSearchField({
          id: 'caseOrTaskNumber',
          groupID: 'caseOrTask',
          labelType: 'radio',
          labelItems: [
            {
              label: locale.app.keywords.taskNumber,
              value: 'task',
              checked: inputForm.caseOrTask === 'task'
            },
            {
              label: locale.app.keywords.caseNumber,
              value: 'case',
              checked: inputForm.caseOrTask === 'case'
            }
          ]
        })}
        <CustomerNameWrapper>
          <CustomerNameError>
            {errorMsg &&
              (errorField === 'firstName' || errorField === 'lastName') && (
                <InputFeedback feedback='error'>
                  <StyledErrorMsg>{errorMsg}</StyledErrorMsg>
                </InputFeedback>
            )}
          </CustomerNameError>
          <Box inline between={2}>
            {createSearchField({
              id: 'firstName',
              groupID: 'custName',
              labelType: 'text'
            })}
            {createSearchField({
              id: 'lastName',
              groupID: 'custName',
              helpText: locale.app.keywords.note,
              labelType: 'text'
            })}
          </Box>
        </CustomerNameWrapper>
        <SearchInputContainer>
          <ClearButton id='clrBtn' type='button' onClick={() => clearForm()} disabled={requiresAuth && !hasAccess(roles, permissions.SEARCH_ACTION)}>
            {locale.app.clear}
          </ClearButton>
          <Button onPress={onFormSubmit}>
            {locale.app.search}
          </Button>
        </SearchInputContainer>
      </Box>
    </form>
  )
}

export default CustomerSearch
