import React from 'react';
import { Button } from 'src/uikit';

export const Upload = () => {
  const imageInput = React.useRef<HTMLInputElement>();
  // 上传图片
  const uploadFile = async () => {
    const imageFile = imageInput.current.files;
    const imgMaxSize = 1024 * 1024 * 8;
    const arrImg: Array<string> = [];

    if (imageFile.length > 0) {
      for (let i = 0; i < imageFile.length; i++) {
        // 限制图片大小
        if (imageFile[i].size > imgMaxSize) {
        }
      }
    }
  };

  return (
    <React.Fragment>
      <Button>上传背景墙</Button>
      <input id="uploadFiles" ref={imageInput} onChange={() => uploadFile()} multiple type="file" accept="image/*" />
    </React.Fragment>
  );
};
