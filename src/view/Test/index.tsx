import React, { useState, useEffect, useCallback } from 'react';
import styled from 'styled-components';
import { Button, Box, Text, Toggle, Card, Flex, Input } from 'uikit';
import { IM } from 'utils';
import { languagesOptions } from 'config/localization';
import { useTranslation } from 'contexts/Localization';
import { Select } from 'components';
import { useLanguange, useThemeManager } from 'store/app/hooks';
import { toast } from 'react-toastify';
import { Http } from 'apis/http';

const StyledNotFound = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  height: calc(100vh - 64px);
  justify-content: center;
`;

const CardStyled1 = styled(Card)`
  border-radius: 32px;
  background: ${({ theme }) => (theme.isDark ? '#37cdc0' : '#f1d45f')};
`;
const CardStyled2 = styled(Card)`
  background: ${({ theme }) => theme.colors.backgroundLight};
`;

const Test = () => {
  const { t } = useTranslation();
  const [languange, setUseLanguage] = useLanguange();
  const [isDark, toggleThemeHandle] = useThemeManager();
  const [inputVal, setInputVal] = useState<string>('');

  const handleRecharge = async () => {
    try {
      const res = await new Http().get('/v1/wallet/testgettime', {
        time_num: inputVal,
      });
      if (res.code === 1) {
        toast.success('充值成功！');
        setInputVal('');
      } else {
        toast.error('充值失败！');
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e: any) => {
    const inputVal = e.target.value;
    if (!inputVal || !/^[0-9]*[.]?[0-9]{0,18}$/.test(inputVal)) {
      toast.error('输入格式不正确！');
      return false;
    }
    setInputVal(inputVal);
  };

  const [value, setValue] = useState({ 1: 23 });
  const hanldeChange = useCallback(() => {
    setValue(vvv => {
      // eslint-disable-next-line no-param-reassign
      vvv[1] = vvv[1] + 1;
      return vvv;
    });
  }, [setValue]);

  const hanldeRead = useCallback(() => {
    console.debug(value);
  }, [value]);

  return (
    <StyledNotFound>
      <Flex>
        <Card padding='50px'>1</Card>
        <CardStyled1 margin='0 20px' padding='50px'>
          2
        </CardStyled1>
        <CardStyled2 padding='50px'>3</CardStyled2>
      </Flex>
      <Box>
        <Button onClick={hanldeChange}>change{value[1]}</Button>
        <Button onClick={hanldeRead}>read {value[1]}</Button>
      </Box>
      <Box>
        <Text>{t('Example: This is a passage')}</Text>
        <Text>
          {t('Example: There is a variable: %variableA% here', {
            variableA: 1,
          })}
        </Text>
        <Text>
          {t(
            'Example: There is variableA: %variableA% and variableB: %variableB%',
            { variableB: 23 },
          )}
        </Text>
      </Box>
      <Box mt='16px'>
        <Toggle checked={isDark} onClick={toggleThemeHandle} />
      </Box>
      <Box mt='16px'>
        <Select
          options={languagesOptions}
          defaultId={languange.id}
          onChange={(val: any) => setUseLanguage(val)}
        />
      </Box>
    </StyledNotFound>
  );
};

export default Test;
