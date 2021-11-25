import React, { useState, useEffect } from 'react'
import styled, { keyframes } from 'styled-components'
import { Button, Box } from 'pancake-uikit'


const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`

const scaleFrame = keyframes`
  0% {
    opacity: 0.5;
    transform: scale(0);
  }

  50% {
    opacity: 1;
    transform: scale(0.5);
  }

  100% {
    opacity: 1;
    transform: scale(1);
  }
`

const BoxStyled = styled(Box)`
  animation-name: ${scaleFrame};
  animation-duration: 0.5s;
  animation-delay: 30ms;
  animation-timing-function: linear;
  animation-iteration-count: 1;
`
const Div1 = styled.p`
 color: red;
 `
const Test = () => {
  // const { t } = useTranslation()
  // const [fruit, setFruit] = useState('banana');


  // const [onLoading, onClose, onPresent] = useLoading(<Box>
  //   <Button onClick={() => {
  //     onLoading(LoadingType.MEAT_MYSTERY, true)
  //     // onPresent(<BoxStyled><NftCardImg /></BoxStyled>)
  //   }}>0</Button>
  //   <Button>1</Button>
  //   <Button>2</Button>
  // </Box>, true)

  // return (
  //   <Page>
  //     <StyledNotFound>
  //       <Button onClick={() => onLoading()} scale="sm">
  //         {t('Test')}
  //       </Button>
  //     </StyledNotFound>
  //   </Page>
  // )
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.title = `You clicked ${count} times`;
  });

  return (
    <div>
      <Div1>You clicked {count} times</Div1>
      <Button onClick={() => setCount(count + 1)}>
        Click me
      </Button>
    </div>
  );

}

export default Test
