import { Descendant } from 'slate';

export const initialValue: Descendant[] = [
  {
    type: 'paragraph',
    children: [
      {
        text: '',
      },
    ],
  },
  {
    type: 'image',
    url: 'https://source.unsplash.com/kFrdX5IeQzI',
    children: [{ text: '' }],
  },
  // {
  //   type: 'paragraph',
  //   children: [
  //     {
  //       text:
  //         'This example shows images in action. It features two ways to add images. You can either add an image via the toolbar icon above, or if you want in on a little secret, copy an image URL to your clipboard and paste it anywhere in the editor!',
  //     },
  //   ],
  // },
  // {
  //   type: 'paragraph',
  //   children: [
  //     {
  //       text:
  //         'You can delete images with the cross in the top left. Try deleting this sheep:',
  //     },
  //   ],
  // },
  // {
  //   type: 'image',
  //   url: 'https://source.unsplash.com/zOwZKwZOZq8',
  //   children: [{ text: '' }],
  // },
];
