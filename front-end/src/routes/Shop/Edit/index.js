import React, { Component } from "react";
import { Form, Select, Input, Button, Card, notification } from "antd";
import { Link } from "react-router-dom";
import {
  detailShop,
  listPref,
  updateShop
} from "../../../service/handleRequest";
import '../../../styles/customerStyle/index.css';

const { Option } = Select;
class EditShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: {},
      pref: [],
    };
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  componentDidMount() {
    detailShop(this.props.match.params.id).then(response => {
      var data = response.data;
      this.setState({ shop: data });
    });

    listPref().then(response => {
      var data = response.data;
      const pref = data.map(pref => {
        return {
          id: pref.id,
          name: pref.name
        };
      });
      this.setState({ pref: data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        updateShop(this.props.match.params.id, values)
          .then(res => {
            var data = res.data;
            this.setState({ shop: data, save: true });
            this.openNotificationWithIcon("success", "edit success!");
            this.props.history.replace(`/shop`);
          })
          .catch(e => {
            var errors = e.response.data.errors;
            if(errors.shop_code) this.openNotificationWithIcon("error", errors.shop_code);
            if(errors.shop_name) this.openNotificationWithIcon("error", errors.shop_name);
          });
      }
    });
  };

  onBlurChange=(e)=>{
    const length = e.target.value.length;
    if(length === 0 && e.target.id==='register_price'){
      this.props.form.setFieldsValue({
        register_price: this.state.shop.register_price,
      });
    }
    if(length === 0 && e.target.id==='second_register_price'){
      this.props.form.setFieldsValue({
        second_register_price: this.state.shop.second_register_price,
      });
    }
    if(length === 0 && e.target.id==='other_shop_entry_fee'){
      this.props.form.setFieldsValue({
        other_shop_entry_fee: this.state.shop.other_shop_entry_fee,
      });
    }
  }

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  render() {
    let shop = this.state.shop;
    let pref = this.state.pref;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <div className="title-header">
        <h3 className="text-title">Edit Store</h3>
        </div>
        <p>{this.state.mess ? "Success" : ""}</p>
        <Card>
          <Form
            {...this.formItemLayout}
            className="form-shape"
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Store code">
              {getFieldDecorator("shop_code", {
                initialValue: shop.shop_code,
                rules: [
                  { required: true, message: "Please input your store code!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Store name">
              {getFieldDecorator("shop_name", {
                initialValue: shop.shop_name,
                rules: [
                  { required: true, message: "Please input your store name!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Phone number">
              {getFieldDecorator("tel", {
                initialValue: shop.tel,
                rules: [
                  { required: true, message: "Please input your store name!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Postcode">
              {getFieldDecorator("zipcode", {
                initialValue: shop.zipcode,
                rules: [
                  { required: true, message: "Please input your store name!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="City">
              {getFieldDecorator("city", {
                initialValue: shop.city
              })(
                <Select>
                  {pref.map((city, index) => (
                    <Option key={index} value={city.name}>
                      {city.name}
                    </Option>
                  ))}
                </Select>
              )}
            </Form.Item>

            <Form.Item label="District">
              {getFieldDecorator("ward", {
                initialValue: shop.ward
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Town">
              {getFieldDecorator("addr1", {
                initialValue: shop.addr1
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Detailed address">
              {getFieldDecorator("addr2", {
                initialValue: shop.addr2
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Registration fee">
              {getFieldDecorator("register_price", {
                initialValue: shop.register_price,
                rules: [
                  {
                    required: true,
                    message: "Please input your registration fee!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message:  "Input must be number and greater than zero."
                  }
                ]
              })(<Input onBlur={this.onBlurChange}/>)}
            </Form.Item>

            <Form.Item label="Registration fee for members">
              {getFieldDecorator("second_register_price", {
                initialValue: shop.second_register_price,
                rules: [
                  {
                    required: true,
                    message: "Please input your registration fee for members!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message:  "Input must be number and greater than zero."
                  }
                ]
              })(<Input onBlur={this.onBlurChange}/>)}
            </Form.Item>

            <Form.Item label="Regular membership fee">
              {getFieldDecorator("other_shop_entry_fee", {
                initialValue: shop.other_shop_entry_fee,
                rules: [
                  {
                    required: true,
                    message: "Please input your regular membership fee!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message:  "Input must be number and greater than zero."
                  }
                ]
              })(<Input onBlur={this.onBlurChange}/>)}
            </Form.Item>

            <div className="dp-flex-jf-center dp-flex">
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                Save
              </Button>
              <Link to="/shop">
                <Button>
                  Back
                </Button>
              </Link>
              </div>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(EditShop);
