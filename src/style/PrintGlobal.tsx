import { createGlobalStyle } from 'styled-components';

const PrintGlobal = createGlobalStyle`
  @media print {
    @page {
      size: A4;
      margin: 1cm 3cm;
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
