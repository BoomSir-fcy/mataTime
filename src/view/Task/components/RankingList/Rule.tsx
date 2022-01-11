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
          {t('相关规则：')}
        </Text>
        <Text small mt='30px'>
          {t(
            '1、 排名奖励，邀请好友前30名的用户，除了可以获得MATTER和TIME奖励之外，额外可以获得DSG奖励；',
          )}
        </Text>
        <Text small>{t('第1名，奖励10000个dsg；')}</Text>
        <Text small>{t('第2名-5名，奖励5000个dsg；')}</Text>
        <Text small>{t('第6名-15名，奖励1500个dsg；')}</Text>
        <Text small>{t('第16名-30名，奖励800个dsg；')}</Text>
        <Text small mt='20px'>
          {t('2、邀请成功的判定条件：')}
        </Text>
        <Text small>
          {t('好友成功注册并登录Metatime，并且至少完成5个以上的任务')}
        </Text>
        <Text small mt='20px'>
          {t('3、邀请好友数量相同时，先达到邀请数量的用户排名靠前')}
        </Text>
        <Text small mt='20px'>
          {t('4、活动时间：1月12日UTC 0点-1月19日UTC 0点')}
        </Text>
      </ContentCard>
    </RuleBox>
  );
});

export default Rule;
