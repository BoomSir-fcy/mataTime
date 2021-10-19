import styled from "styled-components";
import { flexbox } from "styled-system";
import { FlexProps } from "./types";
import Box from "./Box";

const Flex = styled(Box)<FlexProps>`
  display: flex;
  ${flexbox}
`;

export default Flex;
