import React, { Component } from "react";
import { Form, Select, Input, Button, Card, notification } from "antd";
import { formItemLayout } from "react";
import { Link } from "react-router-dom";
import {
  getListShop,
  editService,
  getListCustomerType,
  getServiceById
} from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      shopName: [],
      customerType: [],
      idService: "",
      loader: true
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.setState({ idService: id });
  }

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const { id } = this.props.match.params;
        editService(id, values)
          .then(res => {
            if (res.status == 200) {
              this.openNotificationWithIcon("success", "Edit service success");
              this.props.history.replace(`/service`);
            }
          })
          .catch(e => {
            this.openNotificationWithIcon("error", "Service name exist!");
          });
      }
    });
  };

  componentDidMount() {
    getServiceById(this.state.idService).then(({ data }) => {
      this.setState({ service: data, loader: false });
    });
    getListShop.then(({ data }) => {
      this.setState({ shopName: data });
    });
    getListCustomerType().then(({ data }) => {
      this.setState({ customerType: data });
    });
  }

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
    background: "#fff"
  };

  handleBlur = e => {
    const { service } = this.state;
    var value = e.target.value;
    if (value.length == 0) {
      this.props.form.setFieldsValue({
        child_count: service["child_count"],
        fee: service["fee"]
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
    const { shopName, customerType, service, active, loader } = this.state;
    return (
      <div>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}
        <div className="title-header">
          <h3 className="text-title">Edit Service</h3>
        </div>
        <Card>
          <Form
            {...formItemLayout}
            {...this.formItemLayout}
            onSubmit={this.onSubmit}
            className="form-shape"
          >
            <Form.Item label="Serivce name">
              {getFieldDecorator("service_name", {
                initialValue: service["service_name"],
                rules: [
                  { required: true, message: "Please input your service name!" }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Service type">
              {getFieldDecorator("customer_type_id", {
                initialValue: service["customer_type_id"],
                rules: [
                  { required: true, message: "Please input your service type!" }
                ]
              })(
                <Select>
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
            <Form.Item label="Fee">
              {getFieldDecorator("fee", {
                initialValue: service["fee"],
                rules: [
                  { required: true, message: "Please input  price of service" },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Price must be number and greater than zero !"
                  }
                ]
              })(<Input onBlur={this.handleBlur} />)}
            </Form.Item>
            <Form.Item label="Service Introduction">
              {getFieldDecorator("service_description", {})(
                <Input placeholder="some description" />
              )}
            </Form.Item>
            <Form.Item label="Store name">
              {getFieldDecorator("shop_id", {
                initialValue: service["shop_id"],
                rules: [{ required: true, message: " Please input shop name!" }]
              })(
                <Select>
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
                initialValue: service["child_count"],
                rules: [
                  {
                    required: true,
                    message: "Please input your number of children!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message:
                      "Number of children must be number and greater than zero !"
                  }
                ]
              })(<Input onBlur={this.handleBlur} />)}
            </Form.Item>
            <div className="dp-flex-jf-center dp-flex">
              <Button htmlType="submit" type="primary">
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
