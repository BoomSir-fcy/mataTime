import isUrl from 'is-url';
import imageExtensions from 'image-extensions';
import { ImageElement } from './custom-types';
import { Transforms, createEditor, Descendant } from 'slate';

/* eslint-disable no-param-reassign */

const isImageUrl = url => {
  if (!url) return false;
  if (!isUrl(url)) return false;
  const ext = new URL(url).pathname.split('.').pop();
  return imageExtensions.includes(ext);
};

const insertImage = (editor, url) => {
  const text = { text: '' };
  const image: ImageElement = {
    type: 'image',
    loading: true,
    url,
    children: [text],
  };
  Transforms.insertNodes(editor, image);
};

export const withImages = editor => {
  const { insertData, isVoid } = editor;

  editor.isVoid = element => {
    return element.type === 'image' ? true : isVoid(element);
  };

  editor.insertData = data => {
    const text = data.getData('text/plain');
    const { files } = data;

    if (files && files.length > 0) {
      for (const file of files) {
        const reader = new FileReader();
        const [mime] = file.type.split('/');

        if (mime === 'image') {
          // reader.addEventListener('load', () => {
          //   const url = reader.result;
          //   console.log(url, 'url');
          //   insertImage(editor, url);
          //   console.log(file, 'load');
          // });
          // reader.readAsDataURL(file);
        }
      }
    } else if (isImageUrl(text)) {
      insertImage(editor, text);
    } else {
      insertData(data);
    }
  };

  return editor;
};

export const withMentions = editor => {
  const { isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === 'mention' ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === 'mention' ? true : isVoid(element);
  };

  return editor;
};

export const withLink = editor => {
  const { isInline, isVoid } = editor;

  editor.isInline = element => {
    return element.type === 'link' ? true : isInline(element);
  };

  editor.isVoid = element => {
    return element.type === 'link' ? true : isVoid(element);
  };
  return editor;
};
