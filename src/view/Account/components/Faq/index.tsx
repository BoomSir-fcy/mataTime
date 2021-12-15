import React from "react";
import { Text, Flex, Box } from "uikit";
import { ComponentsWrapper, PageContainer } from "components/Cirde/PageContainer";
import styled from "styled-components";
import BgImg from 'assets/images/myWallet/TimeHeaderBg.png'
import { formatLocalisedCompactNumber } from "utils/formatBalance";
import AnswerChart from "./AnswerChart";
import { ruleDataList } from './data'
import CommonCircle from "components/Cirde/CommonCircle";
import { useTranslation } from "contexts/Localization";
import { WalletHead } from "../../head";

const ItemBox = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`
const BottomItemBox = styled(Box)`
${({ theme }) => theme.mediaQueriesSize.padding}
${({ theme }) => theme.mediaQueriesSize.marginb}
`

const AnswerRuleList = styled(Box)`
  ${({ theme }) => theme.mediaQueriesSize.padding}
  border-bottom: 1px solid ${({ theme }) => theme.colors.borderThemeColor};

`
const BgImgBox = styled(Box)`
  background-image: url(${BgImg});
  background-size: 100%;
`
const HeadText = styled(Text)`
  color:${({ theme }) => theme.colors.textTips};
  font-size: 14px;
`
const RowText = styled(Text)`
  color:${({ theme }) => theme.colors.white_black};
  font-size: 14px;
`

const ScrollBox = styled(Box)`
padding-top: 70px;
max-width:970px;
`

const CenterText = styled(Text)`
    position: absolute;
    top: 40%;
    left: 36%;
`


const FAQCircle = () => {
  return (
    <BgImgBox>
      <ComponentsWrapper>
        <CommonCircle width="18rem" height="18rem" margin="-9rem 0 0 -9rem" bgWidth="48rem" bgHeight="19rem" bgMargin="-13rem 0 0 -23rem" isAnimation>
          <CenterText fontSize="40px" color='white' lineHeight="54px" bold>FAQ</CenterText>
        </CommonCircle>
      </ComponentsWrapper>
    </BgImgBox >
  );
}

const FaqQuestion = ({ children }) => <Text color='white_black'>{children}</Text>;
const FaqAnswerText = ({ children }) => <Text color='white_black'>{children}</Text>;

const Faq: React.FC = () => {
  const { t } = useTranslation();

  return (
    <PageContainer>
      <WalletHead title={t('FAQ')} />
      <ScrollBox>
        <Flex flexDirection="column" >
          <FAQCircle />
          <ItemBox>
            <FaqQuestion>{t('FAQ Q1')}</FaqQuestion>
            <FaqAnswerText>{t('FAQ A1')}</FaqAnswerText>
          </ItemBox>
          <AnswerChart />
          <ItemBox>
            <FaqQuestion>{t('FAQ Q2')}</FaqQuestion>
            <FaqAnswerText>{t('FAQ A2')}</FaqAnswerText>
          </ItemBox>
          <AnswerRuleList>
            <Flex>
              <HeadText width="8%">{t('FAQ Round')}</HeadText>
              <HeadText width="22%">$TIME to be exchanged</HeadText>
              <HeadText width="15%">{t('FAQ DSG required for exchange')}</HeadText>
              <HeadText width="25%">{t('FAQ TIME Price')}{t('FAQ priced in DSG')}</HeadText>
              <HeadText width="12%">{t('FAQ Immediately unlocked ratio')}</HeadText>
              <HeadText width="20%">{t('FAQ Amount of TIME immediately unlocked')}</HeadText>
              <HeadText width="15%">{t('FAQ Subsequent linear unlocking period')}</HeadText>
            </Flex>
            {
              ruleDataList.map(item =>
                <Flex mt="20px" key={item.period}>
                  <RowText width="8%">{item.period}</RowText>
                  <RowText width="22%">{formatLocalisedCompactNumber(item.exchnage, 6)}</RowText>
                  <RowText width="15%">{formatLocalisedCompactNumber(item.need, 6)}</RowText>
                  <RowText width="25%">{item.price}</RowText>
                  <RowText width="12%">{item.rate}</RowText>
                  <RowText width="20%">{formatLocalisedCompactNumber(item.total, 6)}</RowText>
                  <RowText width="15%">{item.month} {t('FAQ months')}</RowText>
                </Flex>)
            }
          </AnswerRuleList>
          <BottomItemBox>
            <FaqQuestion>{t('FAQ Q3')}</FaqQuestion>
            <FaqAnswerText>{t('FAQ A3')}</FaqAnswerText>
            <br />
            <FaqQuestion>{t('FAQ Q4')}</FaqQuestion>
            <FaqAnswerText>{t('FAQ A4')}</FaqAnswerText>
            <br />
            <FaqAnswerText>
              {t('FAQ addition')}
            </FaqAnswerText>
          </BottomItemBox>
        </Flex>
      </ScrollBox>
    </PageContainer>
  )
}
export default Faq