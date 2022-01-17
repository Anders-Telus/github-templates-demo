import styled from 'styled-components'

export const Wrapper = styled.div`
  display: block;
  padding: 5px;
`

export const WrapperContent = styled.div`
  padding: 0px 10px 10px 20px;
  overflow: hidden;
`
export const CommDetails = styled.div`
  font-size: 14px;
  padding-left: 30px;
  margin: -18px 0 15px -15px;
  span {
    display: inline-block;
  }

  span :first-of-type {
    margin-right: 10px;
  }
`

export const BanTitle = styled.div`
  display: flex;
  
  span {
    display: inline-block;
  }

  &:last-child {
    float: right;
  }
`
export const PinContainer = styled.div`
  display: flex;
  align-items: center; 
  float: right;
  width: 85px;
  color: #4B286D;
  font-size: 14px;
  letter-spacing: 0.43px;
  margin-right: -20px;
  span {
    margin-right: 5px;
    font-weight: 700;
  }
`
export const BanNumber = styled.div`
  color: #2A2C2E;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  margin-left: 2px;
`
export const FFHBanNumber = styled.div`
  color: #2A2C2E;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  margin: 2px 0 13px 9px;
`
export const CID = styled.div`
  color: #797979;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  margin-bottom: 5px;
`
export const BanHeader = styled.div`
  margin: -7px 0 -5px -9px;
`
export const SubHead = styled.div`
  color: #797979;
  font-size: 14px;
  font-weight: 700;
  display: inline-flex;
  margin-right: 6px;
`
export const AuthDetails = styled.div`
  color: #36393C;
  font-size: 14px;
  display: inline-flex;
  margin-left: 5px;
  font-weight: 500;
`
export const AuthEllipsisDetails = styled.div`
  color: #36393C;
  white-space: nowrap;
  overflow: hidden;
  font-size: 14px;
  margin-left: 5px;
  font-weight: 500;
  text-overflow: ellipsis;
  max-width: 200px;
`
export const LOBDetails = styled.div`
  display: inline-flex;
  color: #4B286D;
  font-size: 14px;
  margin-top: 5px;
  margin-left: -10px;
`
export const LobName = styled.div`
  display: inline-flex;
  color: #4B286D;
  font-size: 14px;
  margin-left: 4px;
  margin-top: -3px;
`
export const Divider = styled.div`
 width: 500px;
 border-bottom: 1px solid #d8d8d8;
 margin: 5px 0 10px -20px;
`
export const AuthSection = styled.div`
 margin-top: -10px;
 margin-bottom: 23px; 
`
export const SubSectionContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 3px 0px;
`
