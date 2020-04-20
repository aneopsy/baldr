import React from 'react';
import PropTypes from 'prop-types';
import { Card, Collapse, Row, Col } from 'antd';
import FunctionResults from '../common/FunctionResults';
import FunctionInputs from '../common/FunctionInputs';
import * as message from '../common/errorMessage';

class Item extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      callResult: null
    };

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(inputValues) {
    this.props
      .onFetch(this.props.method.name, inputValues)
      .then(callResult => {
        this.setState({ callResult });
      })
      .catch(e => {
        message.showArgumentsError(e);
      });
  }

  render() {
    return (
      <>
        <Row gutter={24}>
          <Col span={12}>
            <FunctionInputs
              button="Fetch"
              onClick={this.handleClick}
              inputs={this.props.method.inputs}
            />
          </Col>
          <Col span={12}>
            {this.state.callResult != null ? (
              <Card title="Fetch results" bordered={false}>
                <FunctionResults method={this.props.method} result={this.state.callResult} />
              </Card>
            ) : null}
          </Col>
        </Row>
      </>
    );
  }
}

Item.propTypes = {
  method: PropTypes.object.isRequired,
  onFetch: PropTypes.func.isRequired
};

/**
 * List of contract's getters - constant methods with parameters
 * Props:
 *      contract - web3.Contract object
 */
class ContractGettersView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.fetch = this.fetch.bind(this);
  }

  //methodParams come as Array of input parametes values
  fetch(methodName, methodParams) {
    return new Promise((resolve, reject) => {
      this.props.contract.methods[methodName](...methodParams)
        .call()
        .then(result => resolve(result))
        .catch(error => reject(error));
    });
  }

  render() {
    //select only constant methods with parameters
    let methods = this.props.contract._jsonInterface.filter(
      item =>
        (item.stateMutability === 'pure' || item.stateMutability === 'view') &&
        item.inputs.length > 0
    );

    return (
      <Collapse>
        {methods.map(method => (
          <Collapse.Panel header={method.name} key={`${method.name}-${method.inputs.length}`}>
            <Item method={method} onFetch={this.fetch} />
          </Collapse.Panel>
        ))}
      </Collapse>
    );
  }
}

ContractGettersView.propTypes = {
  contract: PropTypes.object.isRequired
};

export default ContractGettersView;
