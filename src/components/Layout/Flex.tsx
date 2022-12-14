import styled from 'styled-components'

const FlexLayout = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  & > * {
    min-width: 320px;
    max-width: 460px;
    width: 100%;
    flex: 1;
    margin: 0 8px;
    margin-bottom: 32px;
  }
`
export default FlexLayout
