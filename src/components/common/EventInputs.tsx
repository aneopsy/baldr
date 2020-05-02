import React from 'react';
import { Button, Form, Row, Col, Card } from 'antd';
import { PlusCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CustomInput from './CustomInput';

type IInput = {
  name: string;
  type: string;
  indexed: boolean;
};

type Props = {
  onClick: (filter: any) => void;
  inputs: IInput[];
  button: string;
};

const EventInputs: React.FC<Props> = props => {
  const indexedParams = props.inputs.filter((input: any) => input.indexed);

  return (
    <Form onFinish={props.onClick}>
      {indexedParams.map((item: any, index: number) => (
        <Card
          key={index}
          title={`${item.name} (${item.type})`}
          style={{ margin: '0 0 16px 0' }}
          size="small"
        >
          <Form.List name={item.name}>
            {(fields, { add, remove }) => {
              return (
                <>
                  {fields.map((field, index) => (
                    <Form.Item required={false} key={field.key}>
                      <Row gutter={8}>
                        <Col span={12}>
                          <Form.Item
                            {...field}
                            validateTrigger={['onChange', 'onBlur']}
                            rules={[
                              {
                                required: true,
                                whitespace: true,
                                message: `Please input <${item.name} (${
                                  item.type
                                })> or delete this field.`
                              }
                            ]}
                            noStyle={true}
                          >
                            <CustomInput key={index} type={item.type} />
                          </Form.Item>
                        </Col>
                        <Col span={12}>
                          <MinusCircleOutlined
                            className="dynamic-delete-button"
                            style={{ margin: '0 8px', fontSize: '16px', verticalAlign: 'bottom' }}
                            onClick={() => {
                              remove(field.name);
                            }}
                          />
                        </Col>
                      </Row>
                    </Form.Item>
                  ))}
                  <Form.Item noStyle={true}>
                    <Button
                      type="dashed"
                      onClick={() => {
                        add();
                      }}
                      style={{ width: '60%', textAlign: 'left' }}
                    >
                      <PlusCircleOutlined /> Add Field
                    </Button>
                  </Form.Item>
                </>
              );
            }}
          </Form.List>
        </Card>
      ))}
      <Form.Item>
        <Button htmlType="submit">{props.button}</Button>
      </Form.Item>
    </Form>
  );
};

export default EventInputs;
