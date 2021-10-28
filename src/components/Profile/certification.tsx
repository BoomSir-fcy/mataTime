import React from 'react';
import styled from 'styled-components';

const SafeIcon = styled.img`
  width: 20px;
  height: 20px;
`

export const Certification = (() => {
  return (
    <SafeIcon src={require('assets/images/icon_safe.png').default} alt="" />
  )
})