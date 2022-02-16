import React, {
  useState,
  useCallback,
  useMemo,
  useEffect,
  useRef,
} from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box, BoxProps, Button, Card, Text, Divider } from 'uikit';
import getThemeValue from 'uikit/util/getThemeValue';
import useTheme from 'hooks/useTheme';
import { Icon } from 'components';
import {
  createEditor,
  Text as SlateText,
  Descendant,
  Transforms,
  Editor,
  Node,
} from 'slate';
import { Slate, Editable, withReact, ReactEditor } from 'slate-react';
import { withHistory } from 'slate-history';
import { withImages, withMentions } from '../withEditor';
import { Element, Leaf } from './RenderElement';
import Toolbar from './Toolbar';
import { initialValue } from './testdata';
import MentionPortal from './Mentions/MentionPortal';
import { useMentions, insertMention } from './Mentions/hooks';
import decorate from './tools/decorate';
import { onHotkeyDown } from './tools/hotkey';
import { HUGE_ARTICLE_POST_MAX_LEN } from 'config';

interface ParseContentProps extends BoxProps {
  maxLength?: number;
  background?: string;
  content: Descendant[];
}

const getColor = (color: string, theme: DefaultTheme) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const ParseContent: React.FC<ParseContentProps> = ({
  background = 'input',
  content = [],
  ...props
}) => {
  console.log(content);
  return (
    <Card isRadius>
      <Box {...props}>2121</Box>
    </Card>
  );
};

export default React.memo(ParseContent);
