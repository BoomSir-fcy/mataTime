import React from 'react';
import styled from 'styled-components';
import { debounce } from 'lodash';
import { useImmer } from 'use-immer';
import { Card, Flex, Button, Input } from 'uikit';
import { Icon } from 'components';
import { useTranslation } from 'contexts';
import CircleLoader from 'components/Loader/CircleLoader';

const SearchBox = styled(Card)<{ focus?: boolean }>`
  position: relative;
  padding: 0 16px;
  height: 40px;
  border-radius: 20px;
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

export const SearchTribe: React.FC<{
  mr?: string;
  loading: boolean;
  onEndCallback: (value?: string) => void;
}> = React.memo(props => {
  const [state, setState] = useImmer({
    focus: false,
    value: '',
  });
  const { t } = useTranslation();
  const { loading, onEndCallback, mr } = props;
  const { focus, value } = state;
  const inputRef = React.useRef<HTMLInputElement>(null);

  return (
    <Flex mr={mr}>
      <form
        name='searchForm'
        id='searchForm'
        onFocus={() =>
          setState(p => {
            p.focus = true;
          })
        }
        onBlur={e =>
          setState(p => {
            p.focus = false;
          })
        }
        onSubmit={event => {
          event.preventDefault();
          if (!value) return;
          if (inputRef.current) {
            inputRef.current.blur();
          }
          onEndCallback(value.trim());
        }}
        action=''
      >
        <SearchBox focus={focus}>
          <Flex height='100%' alignItems='center'>
            <ButtonStyled focus padding='0' variant='text'>
              <Icon name='icon-sousuo' size={16} color='white_black' />
            </ButtonStyled>
            <InputStyled
              value={value}
              ref={inputRef}
              autoComplete='off'
              list='ice-cream-flavors'
              onChange={e =>
                setState(p => {
                  p.value = e.target.value;
                })
              }
              placeholder={t('SearchPlaceholder')}
            />
            {Boolean(value) && (
              <ButtonStyledLine
                onClick={debounce(() => {
                  setState(p => {
                    p.value = '';
                  });
                  onEndCallback();
                }, 1000)}
                focus={focus}
                padding='0'
                type='button'
                variant='text'
              >
                <Icon name='icon-guanbi2fill' size={19} color='white_black' />
              </ButtonStyledLine>
            )}
          </Flex>
        </SearchBox>
      </form>
    </Flex>
  );
});
