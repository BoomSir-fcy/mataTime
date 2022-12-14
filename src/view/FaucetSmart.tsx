import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { Button, Box, Text, Toggle, Card, Flex, Input } from 'uikit'
import { IM } from 'utils';
import { languagesOptions } from 'config/localization';
import { useTranslation } from 'contexts/Localization'
import { Crumbs } from 'components';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { toast } from 'react-toastify';
import { Http } from 'apis/http';


const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  /* height: calc(100vh - 64px); */
  justify-content: center;
`

const CardStyled1 = styled(Card)`
  border-radius: 32px;
  background: ${({ theme }) => theme.isDark ? '#37cdc0' : '#f1d45f'};

`
const CardStyled2 = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundLight};
`

const FaucetSmart = () => {
  const { t } = useTranslation()
  const [languange, setUseLanguage] = useLanguange();
  const [isDark, toggleThemeHandle] = useThemeManager();
  const [inputVal, setInputVal] = useState<string>('');

  const handleRecharge = async () => {
    try {
      const res = await new Http().get('/v1/wallet/testgettime', { time_num: inputVal });
      if (res.code === 1) {
        toast.success('充值成功！');
        setInputVal('');
      } else {
        toast.error('充值失败！');
      }
    } catch (error) {
      console.error(error);

    }

  }

  const handleInputChange = (e: any) => {
    const inputVal = e.target.value;
    if (!inputVal || !/^[0-9]*[.]?[0-9]{0,18}$/.test(inputVal)) {
      toast.error('输入格式不正确！');
      return false;
    }
    setInputVal(inputVal);
  }

  return (
    <StyledNotFound>
      <Crumbs title={t('Dinosaur Sofi Faucet')} />
      <Box mt="38.2%">
        <Flex>
          <Input value={inputVal} onChange={(e) => setInputVal(e.target.value)} onBlur={handleInputChange} placeholder="输入充值time数量" />
          <Button width="100px" ml="20px" onClick={() => handleRecharge()}>充值</Button>
        </Flex>
      </Box>
    </StyledNotFound>
  )
}

export default FaucetSmart
