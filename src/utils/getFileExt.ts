const getFileExt = (fileName?: string) => {
  const str1 = `${fileName}`.split('.');
  const letn = str1.length;
  const geImg = str1[letn - 1];
  return geImg
}

export default getFileExt
