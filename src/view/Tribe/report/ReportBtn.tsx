import { Icon } from 'components';
import React from 'react';
import { NftStatus, TribeBelongNft, TribeInfo } from 'store/tribe/type';
import { ReportTribeModal } from '.';

export const ReportBtn: React.FC<{ tribeInfo: TribeInfo }> = ({
  tribeInfo,
}) => {
  const [visibleReport, setVisibleReport] = React.useState(false);
  return (
    <>
      {tribeInfo?.detail?.nft_type === TribeBelongNft.Member &&
        (tribeInfo?.status === NftStatus.Received ||
          tribeInfo?.status === NftStatus.UnStake ||
          tribeInfo?.status === NftStatus.Staked) && (
          <Icon
            margin='0px 8px'
            name='icon-tousu'
            color='textgrey'
            current
            onClick={() => {
              setVisibleReport(true);
            }}
          />
        )}

      {/* 举报 */}
      <ReportTribeModal
        tribeInfo={tribeInfo}
        visible={visibleReport}
        onClose={() => setVisibleReport(false)}
      />
    </>
  );
};
