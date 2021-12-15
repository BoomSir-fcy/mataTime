import styled from "styled-components";
import { Flex } from "uikit";
import { TagProps } from "../type";
import { space, variant as StyledSystemVariant } from "styled-system";
import { styleVariants } from "../theme";
import { variants } from '../type';

const StyledTag = styled(Flex) <TagProps>`
  justify-content: center;
  align-items: center;
  width: 139px;
  height: 40px;
  border-radius: 18px;

  ${StyledSystemVariant({
  variants: styleVariants,
})}
  ${space}
`;

StyledTag.defaultProps = {
  variant: variants.ACTIVITY
}
export default StyledTag;