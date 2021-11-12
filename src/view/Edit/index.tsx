import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { useLocation } from 'hooks';
import { Box, Flex } from 'uikit';
import { Upload } from 'components';

import { Header } from './center';
// import NftAvatar from './center/nftavatar';
import FormInput from './center/formInput';

import defaultImages from 'assets/images/default_me_background.jpg';

const Background = styled(Flex)`
  width: 100%;
  background-size: 100%;
  border-radius: 10px;
  padding: 190px 0 55px;
  justify-content: center;
`;

const Edit: React.FC = () => {
  useLocation();
  const [state, setState] = useImmer({
    value: 1,
    background: defaultImages
  });

  return (
    <Box>
      <Header />
      <Background style={{ backgroundImage: `url(${state.background})` }}>
        <Upload
          multiple
          uploadSuccess={(imgSrc: string) =>
            setState(p => {
              p.background = imgSrc;
            })
          }
        />
      </Background>
      <FormInput />
    </Box>
  );
};

export default Edit;
