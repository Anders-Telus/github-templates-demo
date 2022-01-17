import styled from 'styled-components'

export const CommentBox = styled.div`
  overflow-y: scroll;
  max-height: 110px;
`
export const CommentBody = styled.div`
  padding: ${props => ((props.type === 'fifa') ? '0' : '15px')};
  color: #2A2C2E;
  line-height: 20px !important;
  font-size: 14px !important;
  letter-spacing: 0.6px !important;
  font-style: normal !important;
`
export const AgentDetailBody = styled.div`
  line-height: 20px;
  font-weight: bold;
`
export const CommentTextBody = styled.div`
line-height: 20px;
& p{
  word-break: break-word;
}
`
export const CommentSectionWrapper = styled.div`
  display: block;
  > div > div > div {
    padding: ${props => ((props.type === 'fifa') ? '15px 0 15px 0' : '15px')};
  }
  .gZHAWe {
    height: ${props => (((props.taskStatus === 'COMPLETED' || props.taskStatus === 'CANCELLED') && props.commentCount) ? '0px' : '1px')};
  }
`
