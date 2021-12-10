import React from "react";
import styled from "styled-components";
import { Image } from "../Image";
import { Heading } from "../Heading";
import { Text } from "../Text";
import { Flex } from "../Box";
import { EmptyProps, scales, Scales } from "./types";
import { useTranslation } from "contexts/Localization";

export const scaleIconVariants = {
  [scales.LG]: {
    width: 496,
    height: 700
  },
  [scales.MD]: {
    width: 248,
    height: 350.8
  },
  [scales.SM]: {
    width: 128,
    height: 175.4
  },
};



const Empty: React.FC<EmptyProps> = ({ scale }) => {
  const { t } = useTranslation()
  const { width, height } = scaleIconVariants[scale]
  return <Flex width="100%" flexDirection="column" alignItems="center" justifyContent="center">
    <Image width={width} height={height} src="/images/no-data.png" />
    <Text>{t('No Data')}</Text>
  </Flex>
};

Empty.defaultProps = {
  scale: scales.SM
}

export default Empty;
