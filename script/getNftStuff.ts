const images = require('images')
const path = require('path')
const fs = require('fs')
const SRC_NAME = 'images/stuff'
const SRC_NAME_COMPRESS = 'images/compress-stuff'
const PATH_NAME = `../public/${SRC_NAME}`
const PATH_NAME_COMPRESS = `../public/${SRC_NAME_COMPRESS}`
const DEFAULT_IMAGE = '0default.png'

const readFileDir = (path): Promise<string[]> => {
  return new Promise((resolve, rej) => {
    fs.readdir(path, (err, files) => {
      resolve(files)
    })
  })
}

const mkdirSync = (dirname) => {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirSync(path.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
  return false
}

const compressImage = (path, savePath, { width = 300, height = 300, quality = 100  }) => {
  images(path) //Load image from file 
  //加载图像文件
  .size(width, height) //Geometric scaling the image to 400 pixels width
  //等比缩放图像到400像素宽
  .save(savePath, { //Save the image to a file, with the quality of 50
    quality //保存图片到文件,图片质量为50
  }); 
}

const getData = (files) => {
  const penddings = files.map(async (element, index) => {
    const path = `${PATH_NAME}/${element}`
    let stat = fs.lstatSync(`${PATH_NAME}/${element}`)
    if (stat.isDirectory() === true) { 
      const res = await readFileDir(path)
      mkdirSync(`${PATH_NAME_COMPRESS}/${element}`)
      return res.map((item, id) => {
        compressImage(`${path}/${item}`, `${PATH_NAME_COMPRESS}/${element}/${item}`, {})
        return {
          index,
          id,
          src: `/${SRC_NAME}/${element}/${item}`,
          images: `/${SRC_NAME_COMPRESS}/${element}/${item}`,
          // 图层：
          // 优先级:
          // 1.图片文件名第一个 _ 后数字
          // 2.文件夹名第一个 _ 后数字
          // 4.文件夹名第一位数字
          zIndex: Number(item.split('_')[1]) || Number(element.split('_')[1]) || Number(element.split('_')[0]),
          lable: element.split('_')[2],
          isBase: !element.split('_')[3],
          isDefault: item === DEFAULT_IMAGE,
        }
      })
    }
    return []
  });
  const results = Promise.all(penddings)
  return results
}

const main = async () => {
  const files = await readFileDir(PATH_NAME)
  const res = await getData(files)
  fs.writeFile(`../src/config/constants/stuff.json`, JSON.stringify(res, null, 2), (err) => {
    if (err) throw err
    console.info(` ✅ - stuff.json has been updated!`)
  })
}
main()
