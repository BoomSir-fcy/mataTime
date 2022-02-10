// import compression from 'browser-image-compression';

interface Options {
  /** @default Number.POSITIVE_INFINITY */
  maxSizeMB?: number;
  /** @default undefined */
  maxWidthOrHeight?: number;
  /** @default false */
  useWebWorker?: boolean;
  /** @default 10 */
  maxIteration?: number;
  /** Default to be the exif orientation from the image file */
  exifOrientation?: number;
  /** A function takes one progress argument (progress from 0 to 100) */
  onProgress?: (progress: number) => void;
  /** Default to be the original mime type from the image file */
  fileType?: string;
  /** @default 1.0 */
  initialQuality?: number;
}

const defaultOptions = {
  maxSizeMB: 1024 * 1024 * 20,
  useWebWorker: true,
}

const imageCompression = async (file, options?: Options) => {
  // return compression(file, {
  //   ...defaultOptions,
  //   ...options,
  // })
}

export default imageCompression


// 压缩函数
const compress = (img: any, encoder = 0.9) => {
  let canvas: any = document.createElement('canvas');
  const ctx: any = canvas.getContext('2d');
  //    瓦片canvas
  let tCanvas: any = document.createElement('canvas');
  const tctx: any = tCanvas.getContext('2d');
  let { width } = img;
  let { height } = img;
  // 如果图片大于四百万像素，计算压缩比并将大小压至400万以下
  let ratio;
  if ((ratio = width * height / 4000000) > 1) {
    ratio = Math.sqrt(ratio);
    width /= ratio;
    height /= ratio;
  } else {
    ratio = 1;
  }
  canvas.width = width;
  canvas.height = height;
  //        铺底色
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // 如果图片像素大于100万则使用瓦片绘制
  let count;
  if ((count = width * height / 1000000) > 1) {
    count = ~~(Math.sqrt(count) + 1); // 计算要分成多少块瓦片
    //            计算每块瓦片的宽和高
    const nw = ~~(width / count);
    const nh = ~~(height / count);
    tCanvas.width = nw;
    tCanvas.height = nh;
    for (let i = 0; i < count; i++) {
      for (let j = 0; j < count; j++) {
        tctx.drawImage(img, i * nw * ratio, j * nh * ratio, nw * ratio, nh * ratio, 0, 0, nw, nh);
        ctx.drawImage(tCanvas, i * nw, j * nh, nw, nh);
      }
    }
  } else {
    ctx.drawImage(img, 0, 0, width, height);
  }
  // 进行最小压缩
  const ndata = canvas.toDataURL('image/jpeg', encoder);
  canvas = null;
  tCanvas = null;
  return ndata;
};

// 将base64的图片转成二进制对象
const toBlob = (basestr: string) => {
  const arr: any = basestr.split(',');
  const bstr = atob(arr[1]);
  const mime = arr[0].match(/:(.*?);/)[1];
  const buffer: any = new Uint8Array(bstr.length);
  for (let i = 0; i < bstr.length; i++) {
    buffer[i] = bstr.charCodeAt(i);
  }
  return new Blob([buffer], { type: mime });
};
interface DefaultOption {
  encoder: number
  IMAGE_MAX: number
  imageTypes: string[]
}
const defaultImg = [
  'png',
  'PNG',
  'jpg',
  'JPG',
  'bmp',
  'BMP',
  'gif',
  'GIF',
  'jpeg',
  'JPEG',
];

const defaultOption = {
  encoder: 0.9,
  IMAGE_MAX: 2 * 1024 * 1024,
  imageTypes: defaultImg
}


export const cutDownImg = (file: File, option?: DefaultOption): Promise<string> => new Promise((resolve, reject) => {
  if (!file) return;

  const options: DefaultOption = {
    ...defaultOption,
    ...option,
  }
  const str1 = file.name.split('.');
  const letn = str1.length;
  const geImg = str1[letn - 1];
  const isFlase = options.imageTypes.indexOf(geImg);
  if (isFlase === -1) {
    reject(new Error('1'));
  }
  let img: any = new Image();
  const callback = () => {
    const data = compress(img, options.encoder); // base64
    const res = toBlob(data);
    if (res.size > options.IMAGE_MAX) {
      reject(new Error('2'));
    }
    // const newFile = new window.File(
    //   [res],
    //   file.name,
    //   { type: res.type },
    // );
    resolve(data);
    img = null;
  };
  try {
    img.src = URL.createObjectURL(file);
    if (img.complete) {
      callback();
    } else {
      img.onload = callback;
    }
  } catch (err) {
    reject(err);
  }
});
