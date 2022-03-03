export enum FormatType {
  MARK,
  BLOCK,
  HISTORY,
  EMOJI,
}

export const markFormats = [
  {
    format: 'bold',
    icon: 'icon-bianjiqiBjiacu1',
    type: FormatType.MARK,
    title: 'Bold',
  },
  {
    format: 'italic',
    icon: 'icon-bianjiqi_Ixieti704',
    type: FormatType.MARK,
    title: 'Italic'
  },
  {
    format: 'underline',
    icon: 'icon-705bianjiqi_Uxiahuaxian',
    type: FormatType.MARK,
    title: 'Underline',
  },
  {
    format: 'del',
    icon: 'icon-707bianjiqi_shanchuxian',
    type: FormatType.MARK,
    title: 'Line-through'
  },
]

export const blockFormats = [
  {
    format: 'code',
    icon: 'icon-754bianjiqi_daima',
    type: FormatType.BLOCK,
    title: 'Block-code'
  },
  {
    format: 'block-quote',
    icon: 'icon-713bianjiqi_yinyong',
    type: FormatType.BLOCK,
    title: 'Block-quote'
  },
  {
    format: 'numbered-list',
    icon: 'icon-bianjiqi_wuxuliebiao719',
    type: FormatType.BLOCK,
    title: 'Numbered-list'
  },
  {
    format: 'bulleted-list',
    icon: 'icon-bianjiqi_liangduanduiqi735',
    type: FormatType.BLOCK,
    title: 'Bulleted-list'
  },
]

export const hisoryFormats = [
  {
    format: 'undo',
    icon: 'icon-z701bianjiqi_chexiao',
    type: FormatType.HISTORY,
    title: 'Undo'
  },
  {
    format: 'redo',
    icon: 'icon-z702bianjiqi_zhongzuo',
    type: FormatType.HISTORY,
    title: 'Redo'
  },
]
