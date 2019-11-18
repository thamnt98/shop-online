import React, { Component } from "react";
import {
  Form,
  Select,
  Input,
  Button,
  Card,
  notification,
  Row,
  Col
} from "antd";
import { Link } from "react-router-dom";
import {
  getListShop,
  addService,
  getListCustomerType
} from "../../../service/handleRequest";
import { connect } from "react-redux";
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      shopName: [],
      shops: [],
      customerType: [],
      listService: [],
      loader: false
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
    getListShop.then(({ data }) => {
      this.setState({ shopName: data, loader: false });
    });
    getListCustomerType().then(({ data }) => {
      this.setState({ customerType: data });
    });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addService(values)
          .then(res => {
            if (res.status == 200) {
              this.setState({ loader: true });
              this.openNotificationWithIcon("success", "Add  service success");
              this.props.history.replace(`/service`);
            }
          })
          .catch(e => {
            this.setState({ loader: false });
            this.openNotificationWithIcon("error", "This  service exist");
          });
      }
    });
  };

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
    background: "#fff"
  };

  handleBlur = e => {
    var value = e.target.value;
    if (value.length == 0) {
      this.props.form.setFieldsValue({
        child_count: 0,
        fee: 0
      });
    }
  };

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { shopName, customerType, loader } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}

        <div className="title-header">
          <h3 className="text-title">Create Service</h3>
        </div>
        <Card>
          <Form
            {...this.formItemLayout}
            onSubmit={this.onSubmit}
            className="form-shape"
          >
            <Form.Item label="Service name" className="normal_login">
              {getFieldDecorator("service_name", {
                rules: [
                  { required: true, message: "Please input your service name!" }
                ]
              })(<Input placeholder="定期パス" />)}
            </Form.Item>
            <Form.Item label="Service type">
              {getFieldDecorator("customer_type_id", {
                rules: [
                  { required: true, message: "Please input your service type!" }
                ]
              })(
                <Select placeholder="Service type">
                  {customerType.map(function(type, i) {
                    return (
                      <option key={i} value={type.id}>
                        {type.customer_type}
                      </option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Price">
              {getFieldDecorator("fee", {
                initialValue: 0,
                rules: [
                  { required: true, message: "Please input your fee!" },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Price must be number and greater than zero!"
                  }
                ]
              })(<Input onBlur={this.handleBlur} />)}
            </Form.Item>
            <Form.Item label="Service Introduction">
              {getFieldDecorator("service_description", {})(
                <Input placeholder="Some description" />
              )}
            </Form.Item>
            <Form.Item label="Store name">
              {getFieldDecorator("shop_id", {
                rules: [
                  { required: true, message: "Please input your store name!" }
                ]
              })(
                <Select placeholder="Shop name">
                  {shopName.map(function(shop, i) {
                    return (
                      <option key={i} value={shop.id}>
                        {shop.shopName}
                      </option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Number of children">
              {getFieldDecorator("child_count", {
                initialValue: 0,
                rules: [
                  { required: true, message: "Please input your child count!" },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message:
                      "Number of children must be number and  greater than zero!!"
                  }
                ]
              })(<Input onBlur={this.handleBlur} />)}
            </Form.Item>
            <div className="dp-flex-jf-center dp-flex">
              <Button type="primary" htmlType="submit">
                Save
              </Button>
              <Link to="/service">
                <Button>Back</Button>
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(Index);
