import React, { useCallback } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { usePopper } from 'react-popper';
import { Flex, Box, Text, TextProps } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import { Icon } from '../Icon';
import useRewardAuth from 'contexts/RewardAuthContext/hooks/useRewardAuth';

interface RewardAuthProps {
  data: Api.Home.post;
}

const RewardAuthTagStyled = styled(Flex)`
  cursor: pointer;
`;

const Portal = ({ children }) => {
  return typeof document === 'object'
    ? ReactDOM.createPortal(children, document.body)
    : null;
};

export const RewardAuthTag: React.FC<RewardAuthProps> = ({ data }) => {
  const { t } = useTranslation();
  const { setVisible, setPosition, setCurrent } = useRewardAuth();
  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const { styles, attributes } = usePopper(referenceElement, popperElement);
  const ref = React.useRef(null);

  const handleMounsEnter = useCallback(event => {
    if (ref.current) {
      // 获取当前元素位置
      // const positon = ref.current.getBoundingClientRect();
      // console.log(positon);
      // let elemTop = ref.current.offsetTop;
      // let elemLeft = ref.current.offsetLeft;
      // ref.current = ref.current.offsetParent;
      // while (ref.current != null) {
      //   elemTop += ref.current.offsetTop;
      //   elemLeft += ref.current.offsetLeft;
      //   ref.current = ref.current.offsetParent;
      // }
      // console.log(elemTop, elemLeft);
      // console.log(width, height);
      // const offsetLeft = ref.current?.offsetLeft;
      // const offsetTop = ref.current?.parentElement?.offsetTop;
      // setPosition({ top: elemTop - 200, left: elemLeft - 200 });
    }

    // setCurrent(data);
    // setVisible(true);
  }, []);

  const handleMounsLevel = useCallback(event => {
    // setVisible(false);
  }, []);

  // console.log(data.reward_stats);
  return (
    <RewardAuthTagStyled
      ref={ref}
      alignItems="center"
      onMouseEnter={handleMounsEnter}
      onMouseLeave={handleMounsLevel}
    >
      <button type="button" ref={setReferenceElement}>
        Reference
      </button>
      <Icon color="red" margin="0 10px 0 0" name="icon-dashang" />
      {(data?.reward_stats?.length && data?.reward_stats[0]?.count) || 0}
      <Portal>
        <div
          ref={setPopperElement}
          style={styles.popper}
          {...attributes.popper}
        >
          Popper
        </div>
      </Portal>
    </RewardAuthTagStyled>
  );
};

export default RewardAuthTag;
