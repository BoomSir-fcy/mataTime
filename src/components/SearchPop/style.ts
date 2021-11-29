import styled from 'styled-components';
import { Flex } from 'uikit';

export const SearchPopBox = styled(Flex)`
  margin-top: 35px;
  justify-content: space-between;
  position: absolute;
  z-index: 1002;
  top: 150px;
  color: ${({ theme }) => theme.colors.searchTopicTxt};
  .search-box {
    .title {
      position: relative;
      input {
        padding: 0 55px;
        width: 300px;
        height: 50px;
        background: ${({ theme }) => theme.colors.searchTopicBg};
        border: 2px solid #4168ed;
        outline: none;
        border-radius: 20px;
        color: ${({ theme }) => theme.colors.searchTopicTxt};
        &::-webkit-input-placeholder {
          // color: #b5b5b5;
        }
      }
      i {
        position: absolute;
      }
      i.icon-sousuo {
        left: 20px;
      }
      i.icon-guanbi2fill {
        right: 20px;
      }
    }
    .search-res-list {
      overflow-y: auto;
      direction: rtl;
      padding: 20px 0;
      margin-top: 5px;
      width: 300px;
      height: 350px;
      background: ${({ theme }) => theme.colors.searchTopicBg};
      box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
      border-radius: 10px;
      &::-webkit-scrollbar {
        width: 4px;
      }
      &::-webkit-scrollbar-thumb {
        background: #4168ed;
        border-radius: 2px;
      }
      &-item {
        direction: ltr;
        padding: 10px 20px;
        cursor: pointer;
        &:hover {
          transition: all 0.3s;
          background-color: #191f2d;
          background: ${({ theme }) => theme.colors.searchTopicHoverBg};
        }
      }
    }
  }
`;
