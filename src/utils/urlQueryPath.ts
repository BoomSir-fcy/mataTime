// `/topicList/${id}/${encodeURI(encodeURIComponent(name))}`

export const getEncodeValue = (query) => {
  try {
    return encodeURI(encodeURIComponent(query))
  } catch (error) {
    console.error(error)
    return ''
  }
}

export const getDecodeValue = (search) => {
  try {
    return decodeURIComponent(search)
  } catch (error) {
    console.error(error)
    return search
  }
}