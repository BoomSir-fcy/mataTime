import { useTranslation } from 'contexts/Localization';
import React from 'react';
import styled from 'styled-components';
import { Box, Text, Flex } from 'uikit';

const RuleBox = styled(Flex)`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  ${({ theme }) => theme.mediaQueriesSize.paddingxs}
`;
const ContentCard = styled(Box)`
  width: 100%;
  margin: 20px 0;
  background: ${({ theme }) => theme.colors.backgroundThemeCard};
  border-radius: 10px;
  ${({ theme }) => theme.mediaQueriesSize.padding}
`;
const Rule: React.FC = React.memo(() => {
  const { t } = useTranslation();
  return (
    <RuleBox>
      <img
        width='174px'
        src={require('assets/images/task/coin.png').default}
        alt=''
      />
      <ContentCard>
        <Text fontSize='18px' bold>
          {t('Relevant rules:')}
        </Text>
        <Text small mt='30px'>
          {t('RankingRule1')}
        </Text>
        <Text small>{t('RankingRule1Describe1')}</Text>
        <Text small>{t('RankingRule1Describe2')}</Text>
        <Text small>{t('RankingRule1Describe3')}</Text>
        <Text small>{t('RankingRule1Describe4')}</Text>
        <Text small mt='20px'>
          {t('RankingRule2')}
        </Text>
        <Text small>{t('RankingRule2Describe1')}</Text>
        <Text small mt='20px'>
          {t('RankingRule3')}
        </Text>
        <Text small mt='20px'>
          {t('RankingRule4')}
        </Text>
      </ContentCard>
    </RuleBox>
  );
});

export default Rule;
