import React, { useState } from 'react';

import {
  LetterWrapper
} from './style';



const Letter: React.FC = () => {
  const [list, setList] = useState<any[]>([{}, {}, {}]);
  return (
    <LetterWrapper>私信</LetterWrapper>
  )
}

export default Letter;