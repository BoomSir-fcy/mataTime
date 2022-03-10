import React, {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
} from 'react';
import { Flex, Input, Button, Card, Box } from 'uikit';
import { useTranslation } from 'contexts/Localization';
import styled from 'styled-components';
import { useStore } from 'store';
import { useDispatch } from 'react-redux';
import useParsedQueryString from 'hooks/useParsedQueryString';
import CircleLoader from 'components/Loader/CircleLoader';
import { Icon } from 'components';
import { useHistory, useLocation } from 'react-router-dom';
import debounce from 'lodash/debounce';
import { useTribeInfoById } from 'store/mapModule/hooks';
import { useToast } from 'hooks';

const SearchBox = styled(Card)<{ focus?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 50px;
  border-radius: 20px;
  border: 1px solid
    ${({ focus, theme }) => (focus ? theme.colors.primary : 'transparent')};
  transition: all 0.3s;
  &:hover,
  :focus {
    border: 1px solid ${({ theme }) => theme.colors.primary};
  }
`;

const ButtonStyled = styled(Button)<{ focus?: boolean }>`
  font-weight: 400;
  opacity: ${({ focus }) => (focus ? 1 : 0)};
  height: auto;
`;
const ButtonStyledLine = styled(ButtonStyled)`
  &:focus {
    outline: 3px solid ${({ theme }) => theme.colors.textPrimary};
  }
`;

const InputStyled = styled(Input)`
  background: transparent;
  border: none;
  box-shadow: none;
`;

interface DetailTitlePorps {
  TribeId: number;
  tabsChange?: (item) => void;
}
const DetailTitle: React.FC<DetailTitlePorps> = ({ TribeId, tabsChange }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const parsedQs = useParsedQueryString();
  const { push, replace } = useHistory();
  const inputRef = useRef<HTMLInputElement>(null);

  const [focus, setFocus] = useState(false);
  const [toFocus, setToFocus] = useState(false);
  const [value, setValue] = useState(parsedQs.search || '');
  const { loading } = useStore(p => p.tribe.postList);
  const { pathname } = useLocation();
  const tribeDetailInfo = useTribeInfoById(parsedQs.id);
  const { toastWarning } = useToast();

  const debouncedOnChange = useMemo(
    () =>
      debounce(e => {
        if (tribeDetailInfo?.status === 4) {
          replace(
            `${pathname}?id=${TribeId}&active=${
              parsedQs.active ? parsedQs.active : 0
            }&search=${e}`,
          );
          tabsChange({
            search: e,
            SearchActiveTitle: Number(parsedQs.active),
          });
        } else if (
          e &&
          typeof tribeDetailInfo?.status === 'number' &&
          !isNaN(tribeDetailInfo?.status)
        ) {
          toastWarning(t('Only clan members can search'));
        }
      }, 500),
    [dispatch, toastWarning, parsedQs, tribeDetailInfo?.status, pathname],
  );

  const searchChange = useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handleSubmit = useCallback(
    search => {
      debouncedOnChange(search);
    },
    [dispatch, push, replace],
  );

  useEffect(() => {
    const search = value ? `${value}`.trim() : value;
    debouncedOnChange(search);
  }, [value]);

  return (
    <Box>
      <form
        name='searchForm'
        id='searchForm'
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={e => {
          if (toFocus) {
            setToFocus(false);
            e.target.focus();
            return;
          }
          setFocus(false);
        }}
        onSubmit={event => {
          event.preventDefault();
          handleSubmit(value.trim());
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        action=''
      >
        <label htmlFor='search'>
          <SearchBox focus={focus} isBoxShadow>
            <Flex height='100%' alignItems='center'>
              <ButtonStyled focus padding='0' variant='text'>
                {loading && value ? (
                  <CircleLoader color='white_black' />
                ) : (
                  <Icon name='icon-sousuo' size={16} color='white_black'></Icon>
                )}
              </ButtonStyled>
              <InputStyled
                value={value}
                ref={inputRef}
                autoComplete='off'
                list='ice-cream-flavors'
                onChange={e => {
                  searchChange(e);
                }}
                type='search'
                id='search'
                placeholder={t('SearchPlaceholder')}
              />

              <ButtonStyledLine
                onClick={() => {
                  setValue('');
                }}
                focus={focus}
                padding='0'
                type='button'
                variant='text'
              >
                <Icon name='icon-guanbi2fill' size={19} color='white_black' />
              </ButtonStyledLine>
            </Flex>
          </SearchBox>
        </label>
      </form>
    </Box>
  );
};

export default DetailTitle;
