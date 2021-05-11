import React from 'react';

import Grid from 'components/custom/grid';
import { Text } from 'components/custom/typography';
import PoolCard from 'modules/yield-farming/components/pool-card';
import PoolTxChart from 'modules/yield-farming/components/pool-tx-chart';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';

import { PoolTypes } from 'modules/yield-farming/utils';

import s from './s.module.scss';

const PoolsOverviewView: React.FC = () => {
  return (
    <>
      <Grid flow="row" gap={16} className="mb-32">
        <Text type="h2" weight="semibold" color="primary" font="secondary">
          Pools
        </Text>
        <Text type="p1" weight="semibold" color="secondary">
          Overview
        </Text>
      </Grid>
      <div className={s.poolCards}>
        <PoolCard pool={PoolTypes.AAVE} />
        <PoolCard pool={PoolTypes.BOND} />
        <PoolCard pool={PoolTypes.COMP} />
        <PoolCard pool={PoolTypes.SNX} />
        <PoolCard pool={PoolTypes.SUSHI} />
        <PoolCard pool={PoolTypes.LINK} />
        <PoolCard pool={PoolTypes.ILV} />
      </div>
      <PoolTxChart className="mb-32" />
      <PoolTxTable label="Transactions" />
    </>
  );
};

export default PoolsOverviewView;
