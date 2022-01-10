import React, {
  useState,
  useRef,
  useMemo,
  useCallback,
  useEffect,
  FormEvent,
} from 'react';
import styled from 'styled-components';
import debounce from 'lodash/debounce';
import uniqueId from 'lodash/uniqueId';
import { fetchThunk, storeAction, useStore } from 'store';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'contexts/Localization';
import {
  Flex,
  Box,
  Button,
  Card,
  Input,
  CardProps,
  BoxProps,
  Empty,
} from 'uikit';
import { useSearchResultLength } from 'store/search/hooks';
import SearchUserItem from './SearchUserItem';
import SearchTopicItem from './SearchTopicItem';
import HistoryList from './HistoryList';
import { useHistory, useLocation } from 'react-router-dom';
import {
  getDecodeValue,
  getEncodeValue,
  getSearchPath,
} from 'utils/urlQueryPath';
import CircleLoader from 'components/Loader/CircleLoader';
import { BASE_USER_PROFILE_URL } from 'config';
import { HoverLink } from '../Layout/HoverLink';
import { Icon } from '../Icon';
import { UserFlowItem } from '../Profile/UserFlowItem';
import useParsedQueryString from 'hooks/useParsedQueryString';
import { SearchHistiryType } from 'store/search/types';
import SearchFilter from './SearchFilter';
import SearchPostLen from './SearchPostLen';

const SearchBox = styled(Card)<{ focus?: boolean; result?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 50px;
  border-radius: 20px;
  /* border-radius: ${({ result }) =>
    result ? '20px 20px 0px 0px' : '20px 20px 20px 20px'}; */
  border: 1px solid
    ${({ focus, theme }) => (focus ? theme.colors.primary : 'transparent')};
  transition: all 0.3s;
  &:hover {
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
const ResultBox = styled(Box)`
  background: ${({ theme }) => theme.colors.background};
  box-shadow: 0px 0px 10px 0px rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  height: 571px;
  max-height: 571px;
  position: absolute;
  width: 100%;
  overflow: auto;
  z-index: 99;
  top: 15px;
  right: 0;
  min-width: 300px;
`;

const BlurInput = styled.input`
  position: fixed;
  height: 0;
  top: -1000px;
  right: -1000px;
  opacity: 0;
`;

interface SearchInputProps extends BoxProps {}

const SearchInput: React.FC<SearchInputProps> = ({ ...props }) => {
  const { t } = useTranslation();
  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);
  const [toFocus, setToFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const dispatch = useDispatch();
  const {
    resultListOfPeoples,
    resultListOfTopic,
    loading,
    historyList,
    searchVal,
    resultListOfPostLen,
  } = useStore(p => p.search);
  const { uid } = useStore(p => p.loginReducer.userInfo);
  const resultLength = useSearchResultLength();
  const { push, replace } = useHistory();
  const { pathname } = useLocation();
  const parsedQs = useParsedQueryString();

  useEffect(() => {
    const query = getDecodeValue(parsedQs.q);
    if (parsedQs.q && pathname === '/search') {
      setValue(query);
      handleSearchDispaly(query);
    }
  }, [pathname, parsedQs.q]);

  const debouncedOnChange = useMemo(
    () =>
      debounce(
        e =>
          dispatch(
            fetchThunk.fetchSearchAsync({
              search: e,
            }),
          ),
        500,
      ),
    [dispatch],
  );

  useEffect(() => {
    const search = value ? `${value}`.trim() : value;
    if (search) {
      debouncedOnChange(search);
    }
  }, [value]);

  const searchChange = useCallback(
    e => {
      setValue(e.target.value);
    },
    [setValue],
  );

  const handleSearchDispaly = useCallback(
    search => {
      // if (!search || search === '#' || search === '@') return
      debouncedOnChange.cancel();
      dispatch(storeAction.setSearchDisplayPeople({ list: [] }));
      dispatch(storeAction.setSearchDisplayTopic({ list: [] }));
      dispatch(
        fetchThunk.fetchSearchAsync({
          search,
          fetchDisplay: true,
        }),
      );
    },
    [dispatch, debouncedOnChange],
  );

  const handleSubmit = useCallback(
    search => {
      handleSearchDispaly(search);
      if (pathname === '/search') {
        replace(
          getSearchPath({
            q: search,
          }),
        );
      } else {
        push(
          getSearchPath({
            q: search,
          }),
        );
      }
      dispatch(
        storeAction.addSearchHistoryData({
          text: search,
          searchId: uniqueId('search_'),
          type: SearchHistiryType.TEXT,
        }),
      );
    },
    [dispatch, pathname, push, replace],
  );

  const showTopicLen = useMemo(() => {
    if (value?.[0] === '#') return undefined;
    return 3;
  }, [value]);
  return (
    <Box {...props}>
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
          handleSubmit(`${value}`.trim());
          if (inputRef.current) {
            inputRef.current.blur();
          }
        }}
        action=''
      >
        <label htmlFor='search'>
          <SearchBox focus={focus} isBoxShadow result={!!resultLength}>
            <Flex height='100%' alignItems='center'>
              <ButtonStyled focus padding='0' variant='text'>
                {loading ? (
                  <CircleLoader />
                ) : (
                  <Icon name='icon-sousuo' size={16}></Icon>
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
                // tabIndex={-1}
                onMouseDown={() => setToFocus(true)}
                onClick={() => {
                  dispatch(
                    fetchThunk.fetchSearchAsync({
                      search: '',
                    }),
                  );
                  setValue('');
                }}
                focus={focus}
                padding='0'
                type='button'
                variant='text'
              >
                <Icon name='icon-guanbi2fill' size={19} />
              </ButtonStyledLine>
            </Flex>
          </SearchBox>
        </label>
        <Box
          onMouseDown={() => setToFocus(true)}
          position='relative'
          height='0'
        >
          {focus && (
            <ResultBox>
              {value ? (
                <Box>
                  {Boolean(resultListOfPostLen) && (
                    <SearchPostLen
                      text={searchVal}
                      post_num={resultListOfPostLen}
                      pathname={pathname}
                    />
                  )}
                  {resultListOfTopic.slice(0, showTopicLen).map(item => (
                    <SearchTopicItem
                      post_num={item.post_num}
                      id={item.topic_id}
                      key={`t_${item.topic_id}`}
                      onClick={() => {
                        dispatch(
                          storeAction.addSearchHistoryData({
                            ...item,
                            searchId: uniqueId('search_'),
                            type: SearchHistiryType.TOPIC,
                          }),
                        );
                      }}
                      name={item.topic_name}
                    />
                  ))}
                  {resultListOfPeoples.map(item => (
                    <SearchUserItem
                      uid={item.uid}
                      mineUserId={uid}
                      user_avator_url={item.nft_image}
                      nick_name={item.nick_name}
                      address={item.address}
                      is_attention={item.is_attention}
                      avatarCallback={undefined}
                      key={`u_${item.uid}`}
                      onClick={() => {
                        dispatch(
                          storeAction.addSearchHistoryData({
                            ...item,
                            searchId: uniqueId('search_'),
                            type: SearchHistiryType.USER,
                          }),
                        );
                      }}
                    />
                  ))}
                  {!loading &&
                    resultListOfTopic.length === 0 &&
                    resultListOfPeoples.length === 0 && <Empty />}
                </Box>
              ) : (
                <HistoryList />
              )}
            </ResultBox>
          )}
        </Box>
      </form>
    </Box>
  );
};

export default SearchInput;
