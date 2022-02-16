export const HTTP_REGEXP = /(http[s]?:\/\/\S+)/g

// 匹配币种
export const SYMBOL_REGEXP = /\$(?=\S*[a-zA-Z])(\w{2,40})\s?/g

// 匹配话题
export const SQUARE_REGEXP = /(#\S{1,40}\s|#\S{1,40}$)/g

export const CONTENT_KEYWORD_REGEXP = /\[\{"type":|"children":|\[\{"text":|\}\]\}\]|"paragraph"|"topic"|"mention"/g

export const LETTER_ENGLISH_REGEXP = /[a-zA-Z]+/g

export const CHINESE_WORD_REGEXP = /[\u4e00-\u9fa5]/g


// export const SQUARE_REGEXP = /#(\S{1,40})\s/g
// export const SQUARE_REGEXP = /(#(\S{1,40}\s))|(#(\S{1,40}$))/
