import styled from 'styled-components'
import {Flex} from 'uikit'
export const SearchPopBox = styled(Flex)`
margin-top:35px;
justify-content:space-between;
position:fixed;
z-index:999;
top:0;
right:0;
.search-box{
  margin-right:24px;
  .title{
    position:relative;
    input{
      padding:0  55px;
      width: 300px;
      height: 50px;
      background: #191F2D;
      border: 2px solid #4168ED;
      outline:none;
      border-radius: 20px;
     &::-webkit-input-placeholder{
          color: #b5b5b5;
      }
    }
    i{
      position:absolute;
    }
    i.icon-sousuo{
      left:20px;
    }
    i.icon-guanbi2fill{
      right:20px;
    }
  }
  .search-res-list{
    overflow-y:auto;
    direction: rtl;
    padding:20px 0;
    margin-top:20px;
    width: 300px;
    height: 571px;
    background: #2F3749;
    box-shadow: 0px 3px 10px 0px rgba(0, 0, 0, 0.5);
    border-radius: 10px;
    &::-webkit-scrollbar {
      width: 4px;
      }
    &::-webkit-scrollbar-thumb {
      background: #4168ED;
      border-radius: 2px;
    }
    &-item{
      direction: ltr;
      padding:10px 20px;
      cursor: pointer;
      &:hover{
        transition: all 0.3s;
        background-color:#191f2d;
      }
    }
  }
}
`