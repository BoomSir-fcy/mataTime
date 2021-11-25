import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 280px;
    max-width: 31.5%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`
export const FlexLayoutFour = styled(FlexLayout)`
  & > * {
    min-width: 200px;
    max-width: 23%;
    width: 100%;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`

export default FlexLayout
