import React from 'react';
import { Redirect, Route, Switch, useHistory, useRouteMatch } from 'react-router-dom';
import cn from 'classnames';
import { BONDTokenMeta } from 'web3/contracts/bond';
import { DAITokenMeta } from 'web3/contracts/dai';
import { SUSDTokenMeta } from 'web3/contracts/susd';
import { UNISWAPTokenMeta } from 'web3/contracts/uniswap';
import { USDCTokenMeta } from 'web3/contracts/usdc';

import Button from 'components/antd/button';
import Tabs from 'components/antd/tabs';
import Grid from 'components/custom/grid';
import Icon from 'components/custom/icon';
import { Text } from 'components/custom/typography';
import PoolTokenDeposit from 'modules/yield-farming/components/pool-token-deposit';
import PoolTokenWithdraw from 'modules/yield-farming/components/pool-token-withdraw';
import PoolTxTable from 'modules/yield-farming/components/pool-tx-table';
import { useWallet } from 'wallets/wallet';

import { PoolActions, PoolTypes, getPoolNames } from 'modules/yield-farming/utils';

import s from './s.module.scss';

type RouteParams = {
  pool: PoolTypes;
  action: PoolActions;
};

const PoolDetailsView: React.FC = () => {
  const {
    params: { pool = PoolTypes.STABLE, action = PoolActions.DEPOSIT },
  } = useRouteMatch<RouteParams>();

  const history = useHistory();
  const wallet = useWallet();

  const [activeTab, setActiveTab] = React.useState<string>(action);

  React.useEffect(() => {
    setActiveTab(action);
  }, [action]);

  React.useEffect(() => {
    document.documentElement.scrollTop = 0;
  }, []);

  if (!wallet.initialized) {
    return null;
  }

  if (!wallet.isActive) {
    return <Redirect to="/yield-farming" />;
  }

  function handleBackClick() {
    history.replace('/yield-farming');
  }

  function handleTabChange(tabKey: string) {
    setActiveTab(tabKey);
    history.push(`/yield-farming/${pool}/${tabKey}`);
  }

  return (
    <div>
      <Button type="link" onClick={handleBackClick} className={cn(s.link, 'mb-16')}>
        <Grid flow="col" gap={8} align="center">
          <Icon name="arrow-back" width={24} height={24} />
          <Text type="p1" weight="semibold" color="secondary">
            Overview
          </Text>
        </Grid>
      </Button>

      <Grid flow="col" align="center" className="mb-32">
        <Text type="h2" weight="bold" color="primary" font="secondary">
          {getPoolNames(pool).join('/')}
        </Text>
      </Grid>

      <Tabs simple activeKey={activeTab} onChange={handleTabChange} className="mb-24">
        <Tabs.Tab key={PoolActions.DEPOSIT} tab="Deposit" />
        <Tabs.Tab key={PoolActions.WITHDRAW} tab="Withdraw" />
      </Tabs>

      <Switch>
        <Route
          path={`/yield-farming/${pool}/${PoolActions.DEPOSIT}`}
          exact
          render={() => (
            <>
              <div className="grid flow-row row-gap-16 mb-64">
                {pool === PoolTypes.STABLE && (
                  <>
                    <PoolTokenDeposit token={USDCTokenMeta} />
                    <PoolTokenDeposit token={DAITokenMeta} />
                    <PoolTokenDeposit token={SUSDTokenMeta} />
                  </>
                )}
                {pool === PoolTypes.UNILP && <PoolTokenDeposit token={UNISWAPTokenMeta} expanded />}
                {pool === PoolTypes.BOND && <PoolTokenDeposit token={BONDTokenMeta} expanded />}
              </div>

              <PoolTxTable label="My Transactions" ownTransactions pool={pool} action={PoolActions.DEPOSIT} />
            </>
          )}
        />
        <Route
          path={`/yield-farming/${pool}/${PoolActions.WITHDRAW}`}
          exact
          render={() => (
            <>
              <div className="grid flow-row row-gap-16 mb-64">
                {pool === PoolTypes.STABLE && (
                  <>
                    <PoolTokenWithdraw token={USDCTokenMeta} />
                    <PoolTokenWithdraw token={DAITokenMeta} />
                    <PoolTokenWithdraw token={SUSDTokenMeta} />
                  </>
                )}
                {pool === PoolTypes.UNILP && <PoolTokenWithdraw token={UNISWAPTokenMeta} expanded />}
                {pool === PoolTypes.BOND && <PoolTokenWithdraw token={BONDTokenMeta} expanded />}
              </div>

              <PoolTxTable label="My Transactions" ownTransactions pool={pool} action={PoolActions.WITHDRAW} />
            </>
          )}
        />
      </Switch>
    </div>
  );
};

export default PoolDetailsView;
