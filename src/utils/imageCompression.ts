import compression from 'browser-image-compression';

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
  return compression(file, {
    ...defaultOptions,
    ...options,
  })
}

export default imageCompression
