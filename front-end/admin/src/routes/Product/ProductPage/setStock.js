import React, { Component } from "react";
import { Modal, Form, Button, Input, Table, Skeleton, notification } from "antd";
import { getStockHistory, setStock } from "../../../service/handleRequest";
import { moment } from 'moment';
class SetStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        numberStock: 0,
        productName: "",
        productCode: "",
        historyStocks: []
      },
      loader: true,
      paginate: {
        totalPage: 1,
        pageNumber: 1,
        perPage: 15
      }
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  handleSubmit = e => {
    const {data} = this.state;
    const { productId, onClose } = this.props.modelSetStock;
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        setStock(values.stockNumber, productId)
          .then(res => {
            
            getStockHistory(productId).then(res => {
              const historyStocks = res.data.map(history => {
                return {
                  time: history.set_date,
                  quantity: history.set_number
                };
              });
        
              data.historyStocks = historyStocks;
              this.setState({ data });
            });

            this.openNotificationWithIcon("success", "Set stock success");
            
            
          })
          .catch(ex => {
            this.openNotificationWithIcon("error", "Set stock fail");
          });
      }
    });
  };

  columns = [
    {
      title: "Time",
      dataIndex: "time",
      key: "time"
    },
    {
      title: "Quatity",
      dataIndex: "quantity",
      key: "quantity"
    }
  ];

  componentDidMount() {
    const { productId } = this.props.modelSetStock;
    const { data } = this.state;

    getStockHistory(productId).then(res => {
      const historyStocks = res.data.map(history => {
        return {
          time: history.set_date,
          quantity: history.set_number
        };
      });

      data.historyStocks = historyStocks;
      this.setState({ data });
    });

    this.setState({loader: false});
  }

  handlePaginateChange = pageNumber => {
    const { paginate } = this.state;

    paginate.pageNumber = pageNumber;

    this.setState({ paginate });
  };

  renderTitle = (numberStock, loader) => {
    if (loader)
      return (
        <Skeleton active loading={loader} paragraph={{ rows: 0 }}></Skeleton>
      );

    return `Number of stock: ${numberStock}`;
  };

  render() {
    const { data, paginate, loader } = this.state;
    const { onClose, modelSetStock } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title={this.renderTitle(modelSetStock.stock, loader)}
        visible={modelSetStock.visible}
        onCancel={onClose}
        footer={false}
        maskClosable={true}
        className="modal-stock"
      >
        <Skeleton active loading={loader}>
          <div className="dp-flex-jf-between dp-flex">
            <div>
              <p>
                <span className="title-hint">Product Code: </span>
                {modelSetStock.productCode}
              </p>
              <p>
                <span className="title-hint">Product Name: </span>
                {modelSetStock.productName}
              </p>
            </div>
          </div>
          <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Stock number">
              {getFieldDecorator("stockNumber", {
                rules: [
                  {
                    required: true,
                    message: "Stock number is required."
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Stock must be number."
                  }
                ]
              })(<Input placeholder="Stock number" />)}
            </Form.Item>
            <div className="dp-flex-jf-center dp-flex">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
            </div>
          </Form>
          <div>
            <Table
              columns={this.columns}
              scroll={{ y: "30vh" }}
              dataSource={data.historyStocks}
              size="small"
            ></Table>
          </div>
        </Skeleton>
      </Modal>
    );
  }
}

export default Form.create()(SetStock);
