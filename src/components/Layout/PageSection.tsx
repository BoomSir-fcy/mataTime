import React from 'react'
import styled from 'styled-components'
import { BoxProps, Box, Flex, FlexProps } from 'uikit'
import Container from 'components/Layout/Container'
// backgroundVariants

interface PageSectionProps extends FlexProps {
  containerProps?: BoxProps
  innerProps?: BoxProps
}

const BackgroundColor = styled(Flex)`
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;
  overflow: auto;
`

const ChildrenWrapper = styled(Container)`
  min-height: auto;
  width: 100%;
`

const PageSection: React.FC<PageSectionProps> = ({
  children,
  containerProps,
  innerProps,
  ...props
}) => {

  return (
    <Box height="100%" {...containerProps}>
      <BackgroundColor {...props}>
        <ChildrenWrapper {...innerProps}>{children}</ChildrenWrapper>
      </BackgroundColor>
    </Box>
  )
}

export default PageSection
