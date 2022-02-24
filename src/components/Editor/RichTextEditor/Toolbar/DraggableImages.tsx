import React, { forwardRef, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TouchBackend } from 'react-dnd-touch-backend';
import AsanySortable, { SortableItemProps } from '@asany/sortable';
import { Text, Box, Button } from 'uikit'
import client from 'utils/client';
import styled from 'styled-components';
import { Icon, Loading } from 'components';

const defaultStyle = {
  // border: '1px dashed gray',
  // padding: '5px 10px',
  marginBottom: '5px',
  marginRight: '5px',
  backgroundColor: 'white',
  width: '105px',
  height: '105px',
};

const Image = styled.img`
  box-sizing: border-box;
  margin: 0px;
  min-width: 0px;
  max-width: 100%;
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 2px;
  user-select: none;
  -webkit-user-drag: none;
`

const CloseBtnBox = styled(Box)`
  position: absolute;
  z-index: 23;
  right: -9px;
  top: -9px;
  background: ${({ theme }) => theme.colors.primaryDark};
  border-radius: 50%;
`;

const CloseBtn = styled(Button)`
  padding: 5px;
  height: 18px;
  width: 18px;
`;


export interface ImgItem {
  src: string;
  loading?: boolean;
  type: 'sortable-card';
  id: string;
  index: number
}
interface DraggableImagesProps {
  imgList: ImgItem[]
  setImgList: React.Dispatch<React.SetStateAction<ImgItem[]>>
}


const SortItem = forwardRef((props: SortableItemProps<ImgItem>, ref: any) => {
  const { data, style, drag, className, animated, remove } = props;
  return (
    <li
      className={className}
      style={{ ...defaultStyle, position: 'relative', ...style }}
      ref={drag(ref)}
      {...animated}
    >
      <Loading zIndex={2} overlay visible={data.loading} />
      <Image src={data.src} alt="" />
      <CloseBtnBox>
        <CloseBtn onClick={remove} variant='tertiary'>
          <Icon size={10} name='icon-guanbi' />
        </CloseBtn>
      </CloseBtnBox>
    </li>
  );
});

const DraggableImages: React.FC<DraggableImagesProps> = ({ imgList, setImgList }) => {


  // const [items, setItems] = useState<ImgItem[]>([
  //   { src: 'https://static.social.qgx.io/common/84c9e02b-c59e-49e1-8126-87dc3465196a.jpg', loading: false, type: 'sortable-card', id: '0', },
  // ]);

  const handleChange = (data, event) => {
    setImgList(data)
  };

  return (
    <Box width='100%' height='100%' padding='18px 0'>
      <DndProvider backend={client.isApp ? TouchBackend : HTML5Backend}>
        <AsanySortable
          accept={['sortable-card']}
          tag="ul"
          style={{ listStyle: 'none', padding: 0 }}
          items={imgList}
          layout='grid'
          onChange={handleChange}
          itemRender={SortItem}
        />
      </DndProvider>
    </Box>
  );
};

export default DraggableImages
