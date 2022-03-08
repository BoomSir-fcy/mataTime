import { createGlobalStyle } from 'styled-components';

const PrintGlobal = createGlobalStyle`
  @media print {
    @page {
      size: A4;

    }
}
`;

export default PrintGlobal;
