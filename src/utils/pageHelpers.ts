export const getTotalPage = (totalNum, pageSize) => {
  if (pageSize != 0 && totalNum % pageSize == 0) {
    return parseInt(String(totalNum / pageSize));
  }
  if (pageSize != 0 && totalNum % pageSize != 0) {
    return parseInt(String(totalNum / pageSize)) + 1;
  }
};
