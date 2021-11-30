import React from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';
import { Icon } from 'components';

type imgListType = {
  imgList: string[];
  delImgItem: (index) => void;
};

const ImgListBox = styled(Box)`
  padding-top: 10px;
  overflow-x: auto;
  display: flex;
  background: ${({ theme }) => theme.colors.backgroundTextArea};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
  & > div {
    position: relative;
    margin-left: 15px;
    img {
      width: 53px;
      height: 53px;
      border-radius: 5px;
      border: solid 1px #6e6e6e;
      object-fit: cover;
    }
    i {
      padding: 5px;
      position: absolute;
      top: -10px;
      right: -10px;
      transition: all 0.3s;
    }
  }
`;

export const UploadList = (props: imgListType) => {
  const { imgList } = props;

  const delImgItem = index => {
    const temp = [...imgList];
    temp.splice(index, 1);
    props.delImgItem(temp);
  };

  return (
    <React.Fragment>
      {imgList.length && (
        <ImgListBox>
          {imgList.map((item, index) => (
            <Box key={index}>
              <Icon
                current={1}
                size={17}
                name="icon-jian"
                color="#ec612b"
                onClick={delImgItem.bind(this, index)}
              />
              <img src={item} alt="" />
            </Box>
          ))}
        </ImgListBox>
      )}
    </React.Fragment>
  );
};
