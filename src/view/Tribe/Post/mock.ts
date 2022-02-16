export const tags = (() => {
  return Object.keys(Array.from({ length: 100 })).map(item => ({
    name: `标签${item}`,
    id: item,
  }))
})()