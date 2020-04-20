import React from 'react';
import { Tabs, Card } from 'antd';
import ContractPropertiesView from './ContractPropertiesView';
import ContractGettersView from './ContractGettersView';
import ContractOperationsView from './ContractOperationsView';
import ContractEventsView from './ContractEventsView';

const TabPane = Tabs.TabPane;

type Props = {
  contract: any;
  web3Provider: any;
};

const ContractView: React.FC<Props> = props => {
  if (props.contract === undefined) {
    return <></>;
  } else {
    let contract = props.web3Provider.getContract(props.contract.abi, props.contract.address);
    return (
      <Card
        style={{
          width: '100%'
        }}
        className="fly"
      >
        <Tabs defaultActiveKey="properties" style={{ width: '100%' }}>
          <TabPane tab="Properties" key="properties">
            <ContractPropertiesView contract={contract} />
          </TabPane>
          <TabPane tab="Calls" key="getters">
            <ContractGettersView contract={contract} />
          </TabPane>
          <TabPane tab="Operations" key="operations">
            <ContractOperationsView contract={contract} />
          </TabPane>
          <TabPane tab="Events" key="events">
            <ContractEventsView contract={contract} />
          </TabPane>
        </Tabs>
      </Card>
    );
  }
};

export default ContractView;
