import React, { Component } from 'react';
import { Modal, Form, Button, Input, Table, Skeleton, notification } from "antd";

class UpdateStock extends Component {
    constructor(props) {
      super(props);
      this.state = {
        data: {
          numberStock: 0,
          productName: "",
          productCode: "",
        },
        loader: true
      };
    }

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  componentDidMount(){
    this.setState({loader: false});
  }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          this.props.onSubmit(values);
        }
      });
    }

    render() {
      const { data, loader } = this.state;
      const { onClose, modelStock } = this.props;
      const { getFieldDecorator } = this.props.form;
  
      return (
        <Modal
          title='Plus stock'
          visible={modelStock.visible}
          onCancel={onClose}
          footer={false}
          maskClosable={true}
          className="modal-stock"
        >
          <Skeleton active loading={loader}>
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
          </Skeleton>
        </Modal>
      );
    }
}
 
export default Form.create()(UpdateStock);