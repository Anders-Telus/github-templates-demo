import styled from 'styled-components'

export const AddCommentWrapper = styled.div`
  padding: 1rem;
  overflow: hidden;
  padding: ${props => (props.type === 'case' ? '1rem 1rem 1rem 0' : '1rem')};
`

export const AddCommentSection = styled.div`
  float:left;
  min-height:36px;
  width: ${props => (props.customWidth)};
`
export const CommentsButtonSection = styled.div`
  width:${props => (props.buttonWidth)};
  min-height:36px;
  display: flex;
  justify-content: flex-start;
  height: 100%;
  left: ${props => (props.left)};
`

export const SaveButtonWrapper = styled.div`
  bottom: 32px;
  left: 0px;
  margin-left: 14px;
`

export const Editable = styled.div`
  width: 100%;
  outline: none;
  margin-top:5px;
  overflow-x: hidden;
  &:focus {
    outline: none;
  }

  &::empty:before {
    content: attr(placeholder);
    color: #555; 
  }

  :empty:focus:before {
    content: "";
}
`
