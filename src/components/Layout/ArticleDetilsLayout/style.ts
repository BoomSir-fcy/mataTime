import styled from 'styled-components';
import { Flex, Box, Card } from 'uikit';
import { mediaQueries, mediaQueriesSize } from 'uikit/theme/base';

export const PageContainer = styled.div`
  /* width: 1200px; */
  margin: 0 auto;
  /* display:flex;
justify-content:center; */
`;
export const PageStyle = styled(PageContainer)`
  overflow-x: hidden;
  width: calc(100vw - 8px);
  ${({ theme }) => theme.mediaQueries.sm} {
    width: 100%;
  }
`;
export const LeftCard = styled(Flex)`
  width: 200px;
  /* height: 100vh; */
  overflow: auto;
`;
export const CenterCard = styled(Box)`
  // flex: 1;
  // ${mediaQueriesSize.marginLRmd}
  // width:670px;
  /* width: 670px; */
  flex: 1;
  /* margin: 0 15px; */
  /* width: 100%; */
  border-left: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
  border-right: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;
export const RightCard = styled(Flex)`
  width: 300px;
  /* height: 100vh; */
  position: relative;
  overflow: auto;
`;
export const CommentListBox = styled(Card)`
  background-color: ${({ theme }) => theme.colors.primaryDark};
  overflow: visible;
  margin-bottom: 50px;
`;
export const CommentTitle = styled(Flex)`
  padding: 0 10px;
  height: 54px;
  font-size: 18px;
  font-weight: bold;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding-left: 29px;
    padding-right: 17px;
  }
  .sort-box {
    display: flex;
    & > div {
      display: flex;
      margin-left: 10px;
      ${({ theme }) => theme.mediaQueries.sm} {
        margin-left: 25px;
      }
    }
  }
`;
export const CommentItem = styled.div`
  :hover {
    /* background-color: #1F2534; */
    background-color: ${({ theme }) => theme.colors.backgroundCard};
    transition: all 0.3s;
  }
  padding: 8px 8px 0 12px;
  ${({ theme }) => theme.mediaQueries.sm} {
    padding: 18px 18px 0 28px;
  }
  .mention-operator {
    padding-bottom: 20px;
    border-bottom: solid 1px ${({ theme }) => theme.colors.borderColor};
  }
`;
export const CommentHeader = styled(Flex)`
  .relative-time {
    margin-top: 8px;
    font-size: 14px;
    color: #b5b5b5;
  }
  .topic {
    display: flex;
    align-items: center;
    margin-left: 27px;
    padding: 0 10px;
    height: 35px;
    font-size: 14px;
    color: #ffffff;
    border: 2px solid #4168ed;
    border-radius: 10px;
  }
  .reply {
    margin-left: 18px;
    font-size: 16px;
    font-weight: 400;
    color: #b5b5b5;
    line-height: 35px;
    div {
      line-height: initial;
    }
    span {
      cursor: pointer;
      color: #4168ed;
    }
  }
`;
export const CommentContent = styled(Box)`
  padding-right: 30px;
  margin: 20px 0;
`;
export const CommentFooter = styled(Flex)`
  padding-left: 100px;
  align-items: center;
  height: 60px;
  color: #b5b5b5;
  border-bottom: solid 1px ${({ theme }) => theme.colors.commentBorder};
  & div {
    padding: 10px;
    margin-right: 30px;
  }
`;
export const CommentListFooter = styled.div`
  text-align: center;
  line-height: 60px;
  font-size: 14px;
  font-weight: 400;
  color: #b5b5b5;
`;
