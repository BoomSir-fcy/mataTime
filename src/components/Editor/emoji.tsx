import React from 'react';
import styled from 'styled-components';
import { useImmer } from 'use-immer';
import { EmojiView } from 'components';
import { Box, Flex, Button, Svg } from 'uikit';

const EmojiWarpper = styled(Box)`
  position: relative;
  padding-right: 10px;
`

const ButtonIcon = styled(Button)`
  padding: 0;
`

export const Emoji: React.FC<{
  onChange: (e: string) => void
}> = (({ onChange }) => {

  const [state, setState] = useImmer({
    visible: false
  })

  React.useEffect(() => {
    const changeHandler = () => {
      setState(p=> {p.visible = false});
    } 
    document.body.addEventListener('click', changeHandler)
    return () => document.body.removeEventListener('click', changeHandler)
  }, [])

  return(
    <EmojiWarpper>
      <ButtonIcon variant="text" onClick={(e) => {
        e.nativeEvent.stopImmediatePropagation();
        setState(p  => {
          p.visible = !state.visible
        })
      }}>
        <Svg viewBox="0 0 45 45" width="25px">
          <image xlinkHref={require('./images/icon_emoji.png').default}/>
        </Svg>
      </ButtonIcon>
      {
        state.visible && <EmojiView selectedEmoji={(data) => onChange(data)} />
      }
    </EmojiWarpper>
  )
})