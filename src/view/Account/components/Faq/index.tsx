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
/* height:calc(100vh - 70px);
overflow-y: auto;
::-webkit-scrollbar {
  display: none;
}
-ms-overflow-style: none;
scrollbar-width: none; */
`

const FAQCircle = () => {
  return (
    <BgImgBox>
      <ComponentsWrapper>
        <CommonCircle width="18rem" height="18rem" margin="-9rem 0 0 -9rem" bgWidth="48rem" bgHeight="19rem" bgMargin="-13rem 0 0 -23rem" isAnimation>
          <Box width="14rem" height="14rem" margin="10rem 0 0 9rem">
            <Text fontSize="40px" color='white' lineHeight="54px" bold>FAQ</Text>
          </Box>
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
            <FaqQuestion>Q1：$TIME总量多少,是如何分配的？ </FaqQuestion>
            <FaqAnswerText>A1：$TIME总量为1,000,000,000,000,000,000,代币完全公平分发,没有团队或私募份额，所有的$TIME都分发给社区用户，具体分配比例如下：</FaqAnswerText>
          </ItemBox>
          <AnswerChart />
          <ItemBox>
            <FaqQuestion>Q2：使用$DSG兑换$TIME的价格是如何确定的？ </FaqQuestion>
            <FaqAnswerText>A2：$DSG兑换$TIME总共分为10轮，每轮的价格和锁仓规则都不相同，总体而言，越早期的兑换，价格越低，但是锁仓比例越高，并且解锁时间 越久。具体规则如下：</FaqAnswerText>
          </ItemBox>
          <AnswerRuleList>
            <Flex>
              <HeadText width="8%">周期</HeadText>
              <HeadText width="22%">$TIME to be exchanged</HeadText>
              <HeadText width="15%">兑换所需DSG</HeadText>
              <HeadText width="25%">TIME价格（以DSG计价）</HeadText>
              <HeadText width="12%">立即释放比例</HeadText>
              <HeadText width="20%">立即释放TIME总数量</HeadText>
              <HeadText width="15%">后续线性解锁时间</HeadText>
            </Flex>
            {
              ruleDataList.map(item =>
                <Flex mt="20px" key={item.period}>
                  <RowText width="8%">{item.period}</RowText>
                  <RowText width="22%">{formatLocalisedCompactNumber(item.exchnage)}</RowText>
                  <RowText width="15%">{formatLocalisedCompactNumber(item.need)}</RowText>
                  <RowText width="25%">{item.price}</RowText>
                  <RowText width="12%">{item.rate}</RowText>
                  <RowText width="20%">{formatLocalisedCompactNumber(item.total)}</RowText>
                  <RowText width="15%">{item.month}个月</RowText>
                </Flex>)
            }
          </AnswerRuleList>
          <BottomItemBox>
            <FaqQuestion>Q3：用于兑换$TIME的DSG将会如何处理 </FaqQuestion>
            <FaqAnswerText>A3：用户兑换$TIME的DSG：50%将会直接销毁，15%将会分配给vDSG的持有人，35%将会分配给质押$TIME的用户：其中15%立即释放， 20%在未来的6个月内线性释放 </FaqAnswerText>
            <br />
            <FaqQuestion>Q4：$TIME有哪些用例，我拿到$TIME可以做什么？ </FaqQuestion>
            <FaqAnswerText>A4：$TIME是使用社交产品Metatime必不可少的代币，用户浏览Metatime其他人发的内容时每秒都需要付出1$TIME，并且只有使用$TIME完成 任务才可以获得$MATTER。</FaqAnswerText>
            <br />
            <FaqAnswerText>
              除此以外，您还可以将$TIME质押，您可以获得后续兑换$TIME用户DSG的35%的奖励。
            </FaqAnswerText>
          </BottomItemBox>
        </Flex>
      </ScrollBox>
    </PageContainer>
  )
}
export default Faq