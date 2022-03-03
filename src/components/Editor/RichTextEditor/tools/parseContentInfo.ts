
const parseContentInfo = arr => {
  let userIdList: string[] = [];
  let imageList = []
  const deepArr = data => {
    data.forEach(item => {
      if (item.type === 'mention') {
        userIdList.push(`${item.character.slice(1)}_item.attrs.userid`);
      }
      if (item.type === 'image') {
        imageList.push(item.url)
      }
      if (item.children) {
        deepArr(item.children);
      }
    });
  };
  deepArr(arr);
  return {
    userIdList,
    imageList,
  };
};

export default parseContentInfo;
