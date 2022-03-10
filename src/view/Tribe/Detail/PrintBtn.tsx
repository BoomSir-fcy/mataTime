import React, { useCallback, useState } from 'react';
import PrintGlobal from 'style/PrintGlobal';
import { Box, Text, Button, BoxProps } from 'uikit';
import { Icon } from 'components';

const PrintBtn: React.FC<BoxProps> = props => {
  const [imageSrc, setImageSrc] = useState('');
  const printHandle = useCallback(() => {
    window.print();
    // const domElement = document.getElementById('print-box');
    // console.log(domElement);
    // html2canvas(document.body, {
    //   onclone: document => {
    //     /* eslint-disable */
    //     // document.getElementById('print-button').style.visibility = 'hidden';
    //     // document.body.innerHTML = '<span style="color: red">21212121</span>';
    //   },
    // }).then(canvas => {
    //   console.log(12211221);
    //   const img = canvas.toDataURL('image/png');
    //   setImageSrc(img);
    //   const imgDom = new Image();
    //   imgDom.onload = () => {
    //     console.log(imgDom.width);
    //     console.log(imgDom.height);
    //     const pdf = new jsPdf();
    //     pdf.addImage(canvas, 'JPEG', 0, 0, imgDom.width, imgDom.height);
    //     pdf.save('your-filename.pdf');
    //     console.log(imgDom);
    //   };
    //   imgDom.src = img;
    // });
  }, []);
  return (
    <Box {...props}>
      {/* <img src={imageSrc} alt='' /> */}
      <PrintGlobal />
      {window.print && (
        <Button variant='text' onClick={printHandle}>
          <Icon color='white_black' name='icon-baocun' />
        </Button>
      )}
    </Box>
  );
};

export default PrintBtn;
