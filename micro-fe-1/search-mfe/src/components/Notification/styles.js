import styled from 'styled-components'

import { CasaBox } from '../Styled'

const NotificationContainer = styled(CasaBox)`
& > div {
  ${props => props.notificationStyle};
}
`

export default NotificationContainer
