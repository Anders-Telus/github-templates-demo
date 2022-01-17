import styled from 'styled-components'

export const TableWrapper = styled.div`
scroll-snap-type: y mandatory;
`

export const TableRow = styled.div`
display: flex;
cursor: ${({ cursor }) => cursor || 'pointer'};
flex-direction: row;
flex-wrap: wrap;
width: 100%;
scroll-snap-align: end;
border-bottom: 1px solid ${({ bcolor }) => bcolor || '#D8D8D8'};
font-size: ${({ fonts }) => fonts || '1em'};
margin-bottom: ${({ marginb }) => marginb || 0};
margin-left: 13px;
font-weight: ${({ fweight }) => fweight || 0};
padding-bottom: ${({ paddingb }) => paddingb || 0};
padding-top: ${({ paddingt }) => paddingt || 0};
${({ selected }) => (selected ? `
    background-color: #F4F4FF;`
    : `&:nth-child(odd){
    background-color:#F7F7F8;
}`)}
&:hover {
    background-color: ${({ hover }) => (hover !== undefined ? hover : 'rgb(96, 96, 100)')};
}
`

export const TableHeader = styled.div`
margin-top: 37px;
display: flex;
flex-direction: row;
flex-wrap: wrap;
width: 100%;
font-weight: 600;
border-bottom: 1px solid #D8D8D8;
padding-bottom: 4px;
`
export const StickyHeader = styled.div`
margin-left: 13px;
background-color: white;
position: sticky;
top: 0;
`

export const TableColumn = styled.div`
word-break: ${({ wordBreak }) => wordBreak};
align-items: ${({ center }) => (center ? 'center' : 'unset')};
display: ${({ center }) => (center ? 'grid' : 'unset')};

@media  screen and (min-width: 1367px) {
  display: ${({ center }) => (center ? 'grid' : 'flex')};
  flex-direction: column;
  flex-basis: fit-content !important;
  flex: ${({ flex }) => flex};
  margin: 0px 8px;
}
@media  screen and (min-width: 1920px) {
  flex: ${({ flex, flexLg }) => (flexLg || flex)};
}
@media  screen and (max-width: 1366px) {
  width: ${({ width }) => width};
  margin-left: 0px;
  margin-right: 16px;
}
`

export const CenterAligned = styled.div`
padding-left: 18px;
`

export const OpenStatusIcon = styled.div`
  height: 8px;
  width: 8px;
  background-color: #2B8000;
  border-radius: 50%;
  display: inline-block;
  margin: ${({ margin }) => (margin || '0px 8px 2px 0px')}};
`

export const HollowStatusIcon = styled.div`
  height: 8px;
  width: 8px;
  border: 1px solid gray;
  border-radius: 50%;
  display: inline-block;
  margin: ${({ margin }) => (margin || '0px 8px 2px 0px')}};
`
