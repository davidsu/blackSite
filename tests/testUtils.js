function eventually(fn, timeout = 1000, ellapsed = 0) {
  try {
    fn()
  } catch (e) {
    if (ellapsed > timeout) {
      // eslint-disable-next-line prefer-promise-reject-errors
      return Promise.reject(
        `eventually never occured -- callback was not true after ${timeout}ms\n${e}`
      )
    }
    return new Promise((resolve, reject) =>
      setTimeout(() => {
        eventually(fn, timeout, ellapsed + 10)
          .then(resolve)
          .catch(reject)
      }, 10)
    )
  }
  return Promise.resolve()
}
export { eventually }
