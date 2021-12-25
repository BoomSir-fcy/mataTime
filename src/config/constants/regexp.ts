export const HTTP_REGEXP = /(http[s]?:\/\/\S+)/g

// 匹配币种
export const SYMBOL_REGEXP = /\$(?=\S*[a-zA-Z])(\w{2,40})\s?/g

// 匹配话题
export const SQUARE_REGEXP = /(#\S{1,40}\s|#\S{1,40}$)/g
// export const SQUARE_REGEXP = /#(\S{1,40})\s/g
// export const SQUARE_REGEXP = /(#(\S{1,40}\s))|(#(\S{1,40}$))/
