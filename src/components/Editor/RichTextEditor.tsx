import React, { useState, useCallback } from 'react';
import styled, { DefaultTheme } from 'styled-components';
import { Box, BoxProps, Card, Text } from 'uikit';
import getThemeValue from 'uikit/util/getThemeValue';
import useTheme from 'hooks/useTheme';

import { createEditor, Descendant, Transforms, Editor } from 'slate';
import { Slate, Editable, withReact, DefaultElement } from 'slate-react';
import { CodeElement } from './RichTextEditorRenderElement';

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

  const [editor] = useState(() => withReact(createEditor()));

  const [value, setValue] = useState<Descendant[]>([
    {
      type: 'paragraph',
      children: [{ text: 'A line of text in a paragraph.' }],
    },
  ]);

  const renderElement = useCallback(props => {
    switch (props.element.type) {
      case 'code':
        return <CodeElement {...props} />;
      default:
        return <DefaultElement {...props} />;
    }
  }, []);

  return (
    <Card isRadius>
      <Box
        width='100%'
        minHeight='455px'
        background={getColor(background, theme)}
        {...props}
      >
        <Slate
          editor={editor}
          value={value}
          onChange={newValue => setValue(newValue)}
        >
          <Editable
            renderElement={renderElement}
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
