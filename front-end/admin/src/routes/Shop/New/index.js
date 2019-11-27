import React, { Component } from "react";
import { Redirect } from "react-router";
import { Form, Select, Input, Button, Card, notification } from "antd";
import { Link } from "react-router-dom";
import axios from "axios";
import { listPref, addShop } from "../../../service/handleRequest";
import '../../../styles/customerStyle/index.css';
const { Option } = Select;
class NewShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pref: [],
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
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
        addShop(values)
          .then(res => {
            var data = res.data;
            this.setState({ shop: data });
            this.openNotificationWithIcon("success", "Add shop success!");
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
        register_price: 0,
      });
    }
    if(length === 0 && e.target.id==='second_register_price'){
      this.props.form.setFieldsValue({
        second_register_price: 0,
      });
    }
    if(length === 0 && e.target.id==='other_shop_entry_fee'){
      this.props.form.setFieldsValue({
        other_shop_entry_fee: 0,
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
    let pref = this.state.pref;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <div className="title-header">
        <h3 className="text-title">Create Store</h3>
        </div>
        <Card>
          <Form
            {...this.formItemLayout}
            className="form-shape"
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Store code">
              {getFieldDecorator("shop_code", {
                rules: [
                  { required: true, message: "Please input your store code!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Store name">
              {getFieldDecorator("shop_name", {
                rules: [
                  { required: true, message: "Please input your store name!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Phone number">
              {getFieldDecorator("tel", {
                rules: [
                  { required: true, message: "Please input your phone number!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Postcode">
              {getFieldDecorator("zipcode", {
                rules: [
                  { required: true, message: "Please input your postcode!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="City">
              {getFieldDecorator("city", {
                rules: [{ required: true, message: "Please input your city!" }]
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
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Town">
              {getFieldDecorator("addr1", {
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Detailed address">
              {getFieldDecorator("addr2", {
              })(<Input />)}
            </Form.Item>

            <Form.Item label="Registration fee">
              {getFieldDecorator("register_price", {
                initialValue:0,               
                rules: [
                  {
                    required: true,
                    message: "Please input your registration fee!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Input must be number and greater than zero."
                  }
                ]
              })(<Input onBlur={this.onBlurChange}/>)}
            </Form.Item>

            <Form.Item label="Registration fee for members">
              {getFieldDecorator("second_register_price", {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                    message: "Please input your registration fee for members!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Input must be number and greater than zero."
                  }
                ]
              })(<Input onBlur={this.onBlurChange}/>)}
            </Form.Item>

            <Form.Item label="Regular membership fee">
              {getFieldDecorator("other_shop_entry_fee", {
                initialValue: 0,
                rules: [
                  {
                    required: true,
                    message: "Please input your regular membership fee!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Input must be number and greater than zero."
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
export default Form.create()(NewShop);
