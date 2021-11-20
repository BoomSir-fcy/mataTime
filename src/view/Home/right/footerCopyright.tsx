import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useTranslation } from 'contexts/Localization';
import { Flex, Box, Text } from 'uikit';

const FooterCopyrightBox = styled(Box)`
  padding: 0 20px;
  width: 300px;
  margin-top: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.textTips};
  line-height: 35px;
  a {
    text-decoration: underline;
  }
`;

export const FooterCopyright: React.FC = () => {
  const { t } = useTranslation();
  return (
    <FooterCopyrightBox>
      <Flex justifyContent="space-between">
        <Text color="textTips" as={Link} to="/">
          {t('loginTeamText')}
        </Text>
        <Text color="textTips" as={Link} to="/">
          {t('loginPrivacyPolicyText')}
        </Text>
      </Flex>
      <Box style={{ textAlign: 'center' }} mt="12px">
        <Text color="textTips">
          © Copyright 2021 Metatime. All Rights Reserved.
        </Text>
      </Box>
    </FooterCopyrightBox>
  );
};
