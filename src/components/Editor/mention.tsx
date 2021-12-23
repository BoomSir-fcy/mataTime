import React from 'react';
import styled from 'styled-components';
import { Box } from 'uikit';

const Context = styled(Box)``;

export const MentionUser: React.FC<{
  data: string[];
  index: number;
}> = React.memo(({ data, index }) => {
  const ref = React.useRef<HTMLDivElement | null>();

  return (
    <Context
      ref={ref}
      style={{
        top: '-9999px',
        left: '-9999px',
        position: 'absolute',
        zIndex: 1,
        padding: '3px',
        background: 'white',
        borderRadius: '4px',
        boxShadow: '0 1px 5px rgba(0,0,0,.2)'
      }}
      data-cy='mentions-portal'
    >
      {data.map((char, i) => (
        <div
          key={char}
          style={{
            padding: '1px 3px',
            borderRadius: '3px',
            background: i === index ? '#B4D5FF' : 'transparent'
          }}
        >
          {char}
        </div>
      ))}
    </Context>
  );
});
