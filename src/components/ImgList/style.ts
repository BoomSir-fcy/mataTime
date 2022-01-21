import styled from 'styled-components';
import {Flex} from 'uikit'
export const  ImgListBox = styled(Flex)`
margin-top:10px;
width:100%;
flex-wrap: wrap;
overflow: hidden;
border: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
border-radius: 10px;

a{
  /* object-fit: cover;
  object-position: top; */
  width:50%;
  display: block;
  cursor: zoom-in;
  max-height: 150px;
  padding-bottom: 1px;
  &:nth-child(2n - 1) {
    padding-right: 1px;
  }
}
img{
  object-fit: cover;
  object-position: top;
  width: 100%;
  height: 100%;
  display: block;
  /* width:50%;
  cursor: zoom-in;
  max-height: 150px;
  padding-bottom: 1px;
  &:nth-child(2n - 1) {
    padding-right: 1px;
  } */
}
.imgListRightBox{
  flex:50%;
  display:flex;
  flex-direction: column;
  a{
    width:100%;
    max-height: 150px;
  }
  /* img{
    width:100%;
    max-height: 150px;
  } */
}
`
// export const  ImgItem = styled.img`
// width: 164px;
// height: 164px;
// border-radius: 5px;
// border:slid 1px #6E6E6E;
// margin-right:10px;
// `
// export const  MoreImg = styled(Flex)`
// align-items: center;
// justify-content: center;
// // width: 100%;
// background: #232A3D;
// border-radius: 5px;
// font-size: 18px;
// font-weight: bold;
// color: #FFFFFF;
// cursor: pointer;
// `