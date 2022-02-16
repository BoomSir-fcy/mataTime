import styled from 'styled-components';
import { Box, Flex, Text } from 'uikit';

export const ContentBox = styled(Box)`
  margin-top: 20px;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
