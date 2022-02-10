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

import { createEditor, Descendant, Transforms, Editor } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { withHistory } from 'slate-history';
import { withImages } from '../withEditor';
import { Element, Leaf } from './RenderElement';
import Toolbar from './Toolbar';
import { initialValue } from './testdata';

interface RichTextEditorProps extends BoxProps {
  maxLength?: number;
  background?: string;
}

const getColor = (color: string, theme: DefaultTheme) => {
  return getThemeValue(`colors.${color}`, color)(theme);
};

const RichTextEditor: React.FC<RichTextEditorProps> = ({
  background = 'input',
  ...props
}) => {
  const { theme } = useTheme();

  // const [editor] = useState(() => withReact(createEditor()));
  const editor = useMemo(
    () => withImages(withHistory(withReact(createEditor()))),
    [],
  );

  const renderElement = useCallback(props => <Element {...props} />, []);
  const renderLeaf = useCallback(props => <Leaf {...props} />, []);

  const [value, setValue] = useState<Descendant[]>(initialValue);

  // useEffect(() => {
  //   setValue(initialValue);
  // }, [slateRef.current]);

  return (
    <Card isRadius>
      <Box
        width='100%'
        minHeight='455px'
        padding='0 20px 20px 20px'
        background={getColor(background, theme)}
        {...props}
      >
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => setValue(newValue)}
        >
          <Toolbar />
          <Divider margin='0 -20px' pb='3px' />
          {/* <Divider margin='0 -20px' />
          <Divider margin='0 -20px' /> */}
          <Editable
            renderElement={renderElement}
            renderLeaf={renderLeaf}
            placeholder='Enter some text...'
            onKeyDown={event => {
              if (event.key === '`' && event.ctrlKey) {
                console.log(212121);
                // Prevent the "`" from being inserted by default.
                event.preventDefault();
                // Otherwise, set the currently selected blocks type to "code".
                Transforms.setNodes(
                  editor,
                  { type: 'code' },
                  { match: n => Editor.isBlock(editor, n) },
                );
              }
            }}
          />
        </Slate>
      </Box>
    </Card>
  );
};

export default React.memo(RichTextEditor);
