import React from 'react';
import { BoxProps, Placement } from 'pancake-uikit';
interface Props extends BoxProps {
    text: string | React.ReactNode;
    placement?: Placement;
    color?: string;
}
declare const QuestionHelper: React.FC<Props>;
export default QuestionHelper;
