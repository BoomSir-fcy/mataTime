import React from 'react';
import styled from 'styled-components';
import { Box, Text } from 'uikit';
import { useImmer } from 'use-immer';

const Container = styled(Box)`
  display: flex;
  overflow: hidden;
  word-wrap: break-word;
  word-break: break-word;
  white-space: pre-wrap;
  color: ${({ theme }) => theme.colors.white_black};
`;

const Imitate = styled.input`
  display: none;
  &::checked + div {
    max-height: none;
  }
  &::checked + div::after {
    visibility: hidden;
  }
  &::checked + div .btn::before {
    visibility: hidden;
  }
  &::checked + div .btn::after {
    content: '收起';
  }
`;

const Desc = styled(Box)<{ visible: boolean; lineNum: number }>`
  position: relative;
  overflow: hidden;
  text-overflow: ellipsis;
  display: ${({ visible }) => (visible ? 'block' : '-webkit-box')};
  -webkit-line-clamp: ${({ lineNum }) => lineNum};
  -webkit-box-orient: vertical;
  &::before {
    content: '';
    height: calc(100% - 22px);
    float: right;
  }
`;

const LabelButton = styled.label`
  position: relative;
  float: right;
  clear: both;
  color: ${({ theme }) => theme.colors.textPrimary};
  margin-left: 5px;
  cursor: pointer;
`;

export const LineClamp: React.FC<{
  showText: string;
  openText: string;
  collapseText: string;
  lineNum?: number;
  contentStyle?: object;
  operationStyle?: object;
}> = ({
  showText,
  lineNum,
  openText,
  collapseText,
  operationStyle,
  contentStyle,
}) => {
  const boxRef = React.useRef<HTMLDivElement>(null);
  const [state, setState] = useImmer({
    openStatus: false,
    visible: false,
  });
  const { visible, openStatus } = state;

  React.useEffect(() => {
    if (boxRef?.current && showText) {
      const height = boxRef?.current.clientHeight;
      setState(p => {
        p.openStatus = height / lineNum > 20 ? true : false;
      });
    }
  }, [showText]);

  return (
    <Container ref={boxRef}>
      <Imitate id='toggleInput' type='checkbox' />
      <Desc lineNum={lineNum} visible={visible}>
        {openStatus && (
          <LabelButton
            htmlFor='toggleInput'
            onClick={() =>
              setState(p => {
                p.visible = !state.visible;
              })
            }
          >
            {visible ? collapseText : openText}
          </LabelButton>
        )}
        <Text>{showText}</Text>
      </Desc>
    </Container>
  );
};

LineClamp.defaultProps = {
  showText: '',
  openText: '展开',
  collapseText: '收起',
  lineNum: 2,
  contentStyle: {},
  operationStyle: {},
};
