import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import isEqual from 'lodash/isEqual';
import { Crumbs } from 'components';
import RichTextEditor from 'components/Editor/RichTextEditor';
import styled, { css } from 'styled-components';
import { Box, Flex, Input, Text, Divider, Card } from 'uikit';
import SubHeader from '../components/SubHeader';
import { Tag, CancleIcon, TagText } from 'view/Me/Tribe/components/TagList';
import { useFetchTribeTopicList } from 'store/tribe/helperHooks';
import { FetchStatus } from 'config/types';
import { useFetchTribeInfoById, useTribeInfoById } from 'store/mapModule/hooks';

const TagBoxStyled = styled(Card)<{ isOpen?: boolean }>`
  background-color: ${({ theme }) => theme.colors.input};
  flex: 1;
  position: relative;
  overflow: visible;
  transition: border-radius 0.15s;
  z-index: 50;
  ${props =>
    props.isOpen &&
    css`
      border-radius: ${({ theme }) =>
        `${theme.radii.card} ${theme.radii.card} 0 0`};
    `}
`;
const TagOptionBoxStyled = styled(Card)<{ isOpen?: boolean }>`
  width: 100%;
  min-height: 80px;
  max-height: 430px;
  position: absolute;
  overflow: auto;
  top: 100%;
  left: 0;
  transition: transform 0.15s, opacity 0.15s, border-radius 0.15s;
  transform: scaleY(0);
  transform-origin: top;
  opacity: 0;
  height: 0;
  background-color: ${({ theme }) => theme.colors.input};

  ${props =>
    props.isOpen &&
    css`
      transform: scaleY(1);
      opacity: 1;
      border-radius: ${({ theme }) =>
        `0 0 ${theme.radii.card} ${theme.radii.card}`};
      height: auto;
    `}
`;

const TagInput = styled.input`
  margin: 0;
  padding: 0;
  background: 0 0;
  border: none;
  outline: none;
  appearance: none;
  width: 100%;
  min-width: 4.1px;
  color: ${({ theme }) => theme.colors.textPrimary};
`;

interface InputTagProps {
  onChange: (value: any[]) => void;
  tribe_id: number;
}

const InputTag: React.FC<InputTagProps> = ({ onChange, tribe_id }) => {
  const [tagsList, setTagsList] = useState<Api.Tribe.TopicInfo[]>([]);
  const [selectTags, setSelectTags] = useState<Api.Tribe.TopicInfo[]>([]);
  const [focus, setFocus] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [toFocus, setToFocus] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const tribeInfo = useTribeInfoById(tribe_id);

  useEffect(() => {
    if (!isEqual(tribeInfo?.topics, selectTags) && tribeInfo?.topics) {
      setTagsList(tribeInfo?.topics);
    }
  }, [selectTags, tribeInfo?.topics]);

  const handleAddTag = useCallback(
    item => {
      setSelectTags(prep => prep.concat(item));
    },
    [setSelectTags],
  );

  const handleRemoveTag = useCallback(
    item => {
      if (item) {
        setSelectTags(prep => prep.filter(i => i.id !== item.id));
      }
    },
    [setSelectTags],
  );

  const renderTagsList = useMemo(() => {
    return tagsList.filter(item => {
      const flag1 = !selectTags.some(subItem => subItem.id === item.id);
      const flag2 = item.topic.indexOf(inputValue) !== -1;
      return flag1 && flag2;
    });
  }, [tagsList, selectTags, inputValue]);

  useEffect(() => {
    onChange(selectTags);
  }, [selectTags]);

  return (
    <TagBoxStyled isOpen={focus} isRadius>
      <Flex width='100%'>
        <Flex minHeight='50px' padding='8px 0 8px 16px' pb='0' flexWrap='wrap'>
          {selectTags.map(item => (
            <Tag
              onMouseDown={event => {
                event.preventDefault();
                // setToFocus(true);
              }}
              mr='2px'
              key={item.id}
            >
              <TagText>{item.topic}</TagText>
              <CancleIcon
                onClick={() => {
                  handleRemoveTag(item);
                }}
              />
            </Tag>
          ))}
          <Flex flex={1}>
            <TagInput
              ref={inputRef}
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
              onChange={event => {
                setInputValue(event.target.value);
              }}
              value={inputValue}
              onKeyDown={event => {
                if (event.key === 'Backspace' && inputValue === '') {
                  console.log(1222222222);
                  handleRemoveTag(selectTags[selectTags.length - 1]);
                }
              }}
              type='text'
            />
          </Flex>
        </Flex>
      </Flex>

      {focus && <Divider color='borderThemeColor' />}
      <TagOptionBoxStyled
        onMouseDown={event => {
          event.preventDefault();
          // setToFocus(true);
        }}
        isOpen={focus}
        isRadius
      >
        <Flex flexWrap='wrap' padding='8px 16px'>
          {renderTagsList.map(item => (
            <Tag
              onClick={() => {
                handleAddTag(item);
                inputRef.current.focus();
              }}
              cursor='pointer'
              key={item.id}
            >
              <TagText>{item.topic}</TagText>
            </Tag>
          ))}
        </Flex>
      </TagOptionBoxStyled>
    </TagBoxStyled>
  );
};

export default InputTag;
