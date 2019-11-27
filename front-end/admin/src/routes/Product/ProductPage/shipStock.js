import React, { Component } from "react";
import { Modal, Form, Button, Input, Skeleton, Cascader } from "antd";
import { getListShop, moveStore } from "../../../service/handleRequest";

class ShipStock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        numberStock: 0,
        productName: "",
        productCode: ""
      },
      loader: true,
      shops: []
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

  componentDidMount() {
    getListShop
      .then(response => {
        const shops = response.data.map(shop => {
          return {
            value: shop.id,
            label: shop.shopName
          };
        });

        this.setState({ shops, loader: false });
      })
      .catch(ex => {});
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };

  render() {
    const { data, loader, shops } = this.state;
    const { moveProduct, onClose } = this.props;
    const { getFieldDecorator } = this.props.form;
    const temp = shops.filter(shop => {
      return shop.label !== moveProduct.shopName;
    });
    return (
      <Modal
        title="Ship stock"
        visible={moveProduct.visible}
        onCancel={onClose}
        footer={false}
        maskClosable={true}
        className="modal-stock"
      >
        <Skeleton active loading={loader}>
          <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
            <Form.Item label="Store name">
              {getFieldDecorator("shop", {
                rules: [
                  {
                    type: "array",
                    required: true,
                    message: "Please select your Store Name Avaliable."
                  }
                ]
              })(<Cascader options={temp} />)}
            </Form.Item>
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
              <Button onClick={() => {}}></Button>
            </div>
          </Form>
        </Skeleton>
      </Modal>
    );
  }
}
export default Form.create()(ShipStock);
