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
  },
  {
    format: 'italic',
    icon: 'icon-bianjiqi_Ixieti704',
    type: FormatType.MARK,
  },
  {
    format: 'underline',
    icon: 'icon-705bianjiqi_Uxiahuaxian',
    type: FormatType.MARK,
  },
  {
    format: 'del',
    icon: 'icon-707bianjiqi_shanchuxian',
    type: FormatType.MARK,
  },
]

export const blockFormats = [
  {
    format: 'code',
    icon: 'icon-754bianjiqi_daima',
    type: FormatType.BLOCK,
  },
  {
    format: 'block-quote',
    icon: 'icon-713bianjiqi_yinyong',
    type: FormatType.BLOCK,
  },
  {
    format: 'numbered-list',
    icon: 'icon-bianjiqi_wuxuliebiao719',
    type: FormatType.BLOCK,
  },
  {
    format: 'bulleted-list',
    icon: 'icon-bianjiqi_liangduanduiqi735',
    type: FormatType.BLOCK,
  },
]

export const hisoryFormats = [
  {
    format: 'undo',
    icon: 'icon-701bianjiqi_chexiao',
    type: FormatType.HISTORY,
  },
  {
    format: 'redo',
    icon: 'icon-702bianjiqi_zhongzuo',
    type: FormatType.HISTORY,
  },
]
