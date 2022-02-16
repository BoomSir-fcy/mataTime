import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { EmojiView, Icon } from 'components';
import { Box, Flex, Button, Svg, useTooltip } from 'uikit';
import useTheme from 'hooks/useTheme';

import { useTranslation } from 'contexts/Localization';

const EmojiWarpper = styled(Box)`
  position: relative;
`;

export const Emoji: React.FC<{
  onChange: (e: string) => void;
  color?: string;
}> = ({ onChange, color = 'white_black' }) => {
  const { t } = useTranslation();
  const [state, setState] = useImmer({
    visible: false,
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

  const { theme } = useTheme();

  const { targetRef, tooltip, tooltipVisible } = useTooltip(
    <EmojiView selectedEmoji={data => onChange(data)} />,
    {
      placement: 'top-start',
      trigger: 'click',
      stylePadding: '0',
      hideArrow: true,
      tooltipPadding: 0,
    },
  );

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
      <span ref={targetRef}>
        <Icon
          size={20}
          color={color}
          current={1}
          name='icon-xiaolian'
          onClick={e => {
            e.nativeEvent.stopImmediatePropagation();
            setState(p => {
              p.visible = !state.visible;
            });
          }}
          title={t('editorEmoji')}
        />
      </span>
      {tooltipVisible && tooltip}
      {/* {state.visible && <EmojiView selectedEmoji={data => onChange(data)} />} */}
    </EmojiWarpper>
  );
};
