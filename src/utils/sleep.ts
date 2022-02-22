const sleep = async <T>(time, fn?: () => T) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      let result = null
      if (typeof fn === 'function') {
        result = fn()
      }
      res(result)
    }, time);
  })
}

export default sleep;
