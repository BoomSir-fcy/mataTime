import React from 'react';
import styled from 'styled-components';
import { Box, Flex } from 'uikit';

export const ModuleWrapper = styled(Flex)`
    width: 100%;
    height: 100%;
    align-items: center;
`

export const ComponentsWrapper = ({ children }) => {
    return (
        <ModuleWrapper>
            <Box width="100%">
                {children}
            </Box>
        </ModuleWrapper >
    );
}

const PageContent = styled(Box)`
    position: relative;
    /* width: 80%; */
    width: 100%;
    height: auto;
    /* overflow: visible; */
    margin: 0 auto;
    z-index: 2;
    ::-webkit-scrollbar {
        display: none;
    }
`

export const PageContainer: React.FC = ({ children }) => {
    return (
        <PageContent>{children}</PageContent>
    );
}