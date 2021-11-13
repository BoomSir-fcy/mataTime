import React from 'react';

export const Badge: React.FC<{
  count: number | string;
}> = props => {
  let { count } = props;
  if (count > 99) {
    count = '+99';
  }
  return (
    <span
      style={{
        position: 'absolute',
        right: '0',
        padding: '0 6px',
        height: '15px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        background: '#EC612B',
        borderRadius: '5px',
        fontWeight: 400,
        fontSize: '12px'
      }}
    >
      {count}
    </span>
  );
};
