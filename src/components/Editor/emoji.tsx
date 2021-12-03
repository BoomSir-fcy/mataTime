import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { EmojiView, Icon } from 'components';
import { Box, Flex, Button, Svg } from 'uikit';

const EmojiWarpper = styled(Box)`
  position: relative;
`;

export const Emoji: React.FC<{
  onChange: (e: string) => void;
}> = ({ onChange }) => {
  const [state, setState] = useImmer({
    visible: false
  });

  React.useEffect(() => {
    const changeHandler = () => {
      setState(p => {
        p.visible = false;
      });
    };
    document.body.addEventListener('click', changeHandler);
    return () => document.body.removeEventListener('click', changeHandler);
  }, []);

  return (
    <EmojiWarpper onClick={e => e.stopPropagation()}>
      {/* <ButtonIcon variant="text" onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        setState(p  => {
          p.visible = !state.visible
        })
      }}>
        <Svg viewBox="0 0 45 45" width="25px">
          <image xlinkHref={require('./images/icon_emoji.png').default}/>
        </Svg>
      </ButtonIcon> */}
      <Icon
        size={20}
        color="textPrimary"
        current={1}
        name="icon-xiaolian"
        onClick={e => {
          e.nativeEvent.stopImmediatePropagation();
          setState(p => {
            p.visible = !state.visible;
          });
        }}
      />
      {state.visible && <EmojiView selectedEmoji={data => onChange(data)} />}
    </EmojiWarpper>
  );
};
