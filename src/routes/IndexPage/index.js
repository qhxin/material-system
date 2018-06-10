import _ from 'lodash';
import React from 'react';
import { connect } from 'dva';
import { Row, Col, Input, Button, Alert, Modal, message } from 'antd';
import styles from './style.less';

@connect((state) => {
  return {
    map: state.app.map,
    deling: state.loading.effects['app/deleteItem'],
    adding: state.loading.effects['app/addItem'],
  };
})
export default class IndexPage extends React.Component {
  state = {
    hoverOn: null,
    addForm: {},
    updateForm: {},
  };
  hoverLock = false;

  handleOnMouseEnter = (key) => {
    this.hoverLock = true;
    this.setState({
      hoverOn: key,
      addForm: {},
      updateForm: {},
    }, () => {
      this.hoverLock = false;
    });
  };

  handleOnMouseLeave = () => {
    if (!this.hoverLock) {
      this.setState({
        hoverOn: null,
        addForm: {},
        updateForm: {},
      });
    }
  };

  handleDelete = (key) => {
    const { dispatch } = this.props;

    Modal.confirm({
      title: '确认删除？',
      content: '合约将向区块链同步数据，删除后无法恢复，请谨慎操作',
      okText: '删除',
      cancelText: '取消',
      onOk() {
        dispatch({
          type: 'app/deleteItem',
          payload: key,
        });
      },
    });
  };

  handleAdd = () => {
    const { dispatch, map } = this.props;
    const { addForm: { key, num } } = this.state;
    if (map && map[key]) {
      message.error('已存在此物料记录');
      return;
    }
    if (_.isEmpty(key) || _.isEmpty(num)) {
      message.warning('所有填写项目不能为空');
      return;
    }
    this.setState({
      addForm: {},
    }, () => {
      dispatch({
        type: 'app/addItem',
        payload: { key, num },
      });
    });
  };

  handleUpdate = () => {
    const { dispatch } = this.props;
    const { updateForm: { value = [] } } = this.state;

    const [key, num] = value;
    if (_.isEmpty(_.trim(key)) || _.isEmpty(_.trim(num))) {
      message.warning('所有填写项目不能为空');
      return;
    }
    this.setState({
      updateForm: {},
    }, () => {
      dispatch({
        type: 'app/addItem',
        payload: { key, num },
      });
    });
  };

  handleUpdateForm = (type, key, value) => {
    const { addForm, updateForm } = this.state;
    let form = updateForm;
    if (type === 'addForm') {
      form = addForm;
    }
    this.setState({
      [type]: {
        ...form,
        [key]: value,
      },
    });
  };

  render() {
    const { map, deling, adding } = this.props;
    const { hoverOn, addForm, updateForm } = this.state;
    const updateFormValueKey = updateForm.value ? updateForm.value[0] : null;
    const updateFormValueVal = updateForm.value ? updateForm.value[1] : null;

    return (
      <div className={styles.page}>
        {map === null ? (
          <div className="pt-16 pb-16 text-center">
            <Alert
              message="暂无记录"
              type="info"
              showIcon
            />
          </div>
        ) : (
          <div className={styles.list}>
            {_.map(map, (num, key) => {
              const hover = hoverOn === key;
              return (
                <Row
                  key={key}
                  gutter={20}
                  className={styles.item}
                  onMouseEnter={() => this.handleOnMouseEnter(key)}
                  onMouseLeave={() => this.handleOnMouseLeave()}
                >
                  <Col span={9}>
                    <Input addonBefore="物料" value={key} disabled />
                  </Col>
                  <Col span={9}>
                    <Input
                      addonBefore="数量"
                      value={updateFormValueKey === key ? updateFormValueVal : num}
                      disabled={!hover}
                      onInput={e => this.handleUpdateForm('updateForm', 'value', [key, e.target.value])}
                    />
                  </Col>
                  <Col span={6}>
                    <Button
                      type="primary"
                      disabled={!hover}
                      loading={adding}
                      onClick={this.handleUpdate}
                    >
                      修改
                    </Button>
                    <Button
                      className="ml-8"
                      type="normal"
                      disabled={!hover}
                      onClick={() => this.handleDelete(key)}
                      loading={deling}
                    >
                      删除
                    </Button>
                  </Col>
                </Row>
              );
            })}
          </div>
        )}
        <div>
          <Row gutter={20}>
            <Col span={9}>
              <Input
                addonBefore="物料"
                value={addForm.key}
                onInput={e => this.handleUpdateForm('addForm', 'key', e.target.value)}
              />
            </Col>
            <Col span={9}>
              <Input
                addonBefore="数量"
                value={addForm.num}
                onInput={e => this.handleUpdateForm('addForm', 'num', e.target.value)}
              />
            </Col>
            <Col span={6}>
              <Button
                type="primary"
                onClick={this.handleAdd}
                loading={adding}
              >
                新增
              </Button>
            </Col>
          </Row>
          <div className="mt-20">
            退出只需关闭网页即可，数据不会有痕迹
          </div>
          <div className="mt-10">
            钱包应当有余额以支付区块链存储的GAS费用
          </div>
        </div>
      </div>
    );
  }
}
