import { createGlobalStyle } from 'styled-components';

const PrintGlobal = createGlobalStyle`
  @media print {
    body{
        -webkit-print-color-adjust:exact;
        -moz-print-color-adjust:exact;
        -ms-print-color-adjust:exact;
        print-color-adjust:exact;
    } 
    @page {
      size: A4;
      margin: 1cm 3cm;
      /* margin: 0; */
    }
    .print-hide{
      display: none;
    }
    .print-visible{
      display: block;
    }
}
`;

export default PrintGlobal;
