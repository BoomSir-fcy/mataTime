// `/topiclist/${id}/${encodeURI(encodeURIComponent(name))}`

export const getEncodeValue = (query) => {
  try {
    return encodeURI(encodeURIComponent(query))
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const getDecodeValue = (search) => {
  if (!search) return ''
  try {
    return decodeURIComponent(search)
  } catch (error) {
    console.error(error)
    return search
  }
}

export const getSearchPath = (query) => {
  const f = query.f ? query.f : (query.q?.[0] === '#' ? 'topic' : (query.q?.[0] === '#' ? 'user' : ''))
  return `/search?q=${ query.q ? getEncodeValue(getDecodeValue(query.q)) : ''}&f=${f}`
}