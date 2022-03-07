import styled from 'styled-components';
import { Box } from 'uikit';
import { Crumbs } from 'components';
import { useTranslation } from 'contexts';
import { useTribeInfoById, useFetchTribeInfoById } from 'store/mapModule/hooks';
import useParsedQueryString from 'hooks/useParsedQueryString';

import DetailHeader from './components/tribeInfoDetail';
import TribeInformation from './components/tribeInformation';

const Info = styled(Box)`
  padding: 25px 15px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.borderThemeColor};
`;

const AppTribeDetails = () => {
  const { t } = useTranslation();
  const parsedQs = useParsedQueryString();
  const tribInfo = useTribeInfoById(parsedQs.id);
  const { updater } = useFetchTribeInfoById(parsedQs.id);

  return (
    <Box>
      <Crumbs top zIndex={1005} title='部落信息' />
      <DetailHeader tribeInfo={tribInfo} />
      <Info>
        <TribeInformation tribe_id={parsedQs.id} mb='0' />
      </Info>
    </Box>
  );
};

export default AppTribeDetails;
