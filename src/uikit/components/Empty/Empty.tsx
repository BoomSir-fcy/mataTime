import React from "react";
import styled from "styled-components";
import { Image } from "../Image";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Flex } from "../Box";
import { EmptyProps, scales, Scales } from "./types";
import { useTranslation } from "contexts/Localization";
import { AnimationRingIcon } from "../Svg";

export const scaleIconVariants = {
  [scales.LG]: {
    width: '496px',
    height: '700px'
  },
  [scales.MD]: {
    width: '248px',
    height: '350.8px'
  },
  [scales.SM]: {
    width: '128px',
    height: '175.4px'
  },
};

const DataBox = styled.div`
width: max-content;
`

const Empty: React.FC<EmptyProps> = ({ scale, title }) => {
  const { t } = useTranslation()
  const { width, height } = scaleIconVariants[scale]
  return (
    <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
      {/* <Image width={width} height={height} src="/images/no-data.png" />
      <Text>{t('No Data')}</Text> */}
      <AnimationRingIcon active2 isRotate width={width} height={height}>
        <DataBox>
          <Text>{ title || t('No Data')}</Text>
        </DataBox>
      </AnimationRingIcon>
    </Flex>
  )
};

Empty.defaultProps = {
  scale: scales.SM
}

export default Empty;
