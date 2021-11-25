import React from 'react'
import styled from 'styled-components'
import { Flex } from 'pancake-uikit'

const StyledPage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 16px;
  padding-bottom: 16px;
  min-height: 100%;
  /* min-height: calc(100vh - 64px); */
  /* background: ${({ theme }) => theme.colors.gradients.bubblegum}; */
  background: no-repeat bottom right;
  background-size: cover;

  background-image: ${({ theme }) =>
    theme.isDark ? 'url("/images/page-bg/dark-1.jpg")' : 'url("/images/page-bg/light-1.jpg")'};
  /* background-image: ${({ theme }) => (theme.isDark ? 'red' : '#')}  */

  ${({ theme }) => theme.mediaQueries.xs} {
    background-size: cover;
  }

  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 24px;
    padding-bottom: 0;
  }

  ${({ theme }) => theme.mediaQueries.lg} {
    padding-top: 32px;
    /* min-height: calc(100vh - 64px); */
  }
`

const Page: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, ...props }) => {
  return (
    <StyledPage {...props}>
      {children}
      <Flex flexGrow={1} />
      {/* <Footer /> */}
    </StyledPage>
  )
}

export default Page
