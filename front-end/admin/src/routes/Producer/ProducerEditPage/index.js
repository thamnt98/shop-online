import React, { Component } from "react";
import { Form, Select, Input, Button, Card, notification } from "antd";
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import {
  listPref,
  getListShop,
  getZipCode,
  getPrefById,
  addProducer,
  getProducerById,
  editProducer
} from "../../../service/handleRequest";
import '../../../styles/customerStyle/index.css';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      prefs: [],
      shops: [],
      zipcode: [],
      city: "",
      id: "",
      producer: [],
      loader: true
    };
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  componentWillMount() {
    const idProducer = this.props.match.params;
    this.setState({ id: idProducer.id });
  }
  componentDidMount() {
    getProducerById(this.state.id).then(({ data }) => {
      this.setState({ producer: data, loader: false });
    });
    listPref().then(({ data }) => {
      this.setState({ prefs: data });
    });
    getListShop.then(({ data }) => {
      this.setState({ shops: data });
    });
  }
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        editProducer(this.state.id, values)
          .then(res => {
            if (res.status == 200) {
              this.openNotificationWithIcon(
                "success",
                "Edit  producer success"
              );
              this.props.history.replace(`/producers`);
            }
          })
          .catch(e => {
            this.openNotificationWithIcon("error", "This  producer exist");
          });
      }
    });
  };
  handleBlur = e => {
    getZipCode(e.target.value).then(({ data }) => {
      this.setState({ zipcode: data });
      const { zipcode } = this.state;
      getPrefById(zipcode["pref_id"]).then(({ data }) => {
        this.setState({ city: data["id"] }, () => {
          this.props.form.setFieldsValue({
            ward: zipcode["ward"],
            addr1: zipcode["addr1"],
            pref_id: this.state.city
          });
        });
      });
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
    const { prefs, shops, producer, loader } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}
        <div className="title-header">
          <h3 className="text-title">Edit Manufacturers</h3>
          </div>
        <Card>
          <Form
          {...this.formItemLayout}
          className="form-shape"
            onSubmit={this.onSubmit}
          >
            <Form.Item label="Producer code">
              {getFieldDecorator("maker_code", {
                initialValue: producer["makerCode"],
                rules: [
                  {
                    required: true,
                    message: "Please input your  producer code!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Post code must be number !"
                  }
                ]
              })(<Input placeholder="1234" />)}
            </Form.Item>
            <Form.Item label="Manufacturer name">
              {getFieldDecorator("maker_name", {
                initialValue: producer["makerName"],
                rules: [
                  {
                    required: true,
                    message: "Please input your Manufacturer name!"
                  }
                ]
              })(<Input placeholder="abc" />)}
            </Form.Item>
            <Form.Item label="Store name">
              {getFieldDecorator("shop_id", {
                initialValue: producer["shop_id"],
                rules: [
                  { required: true, message: "Please input your store name!" }
                ]
              })(
                <Select placeholder="Shop name">
                  {shops.map(function(shop, i) {
                    return (
                      <option key={i} value={shop.id}>
                        {shop.shopName}
                      </option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="Phone number">
              {getFieldDecorator("tel", {
                initialValue: producer["phoneNumber"],
                rules: [
                  {
                    required: true,
                    message: "Please input your phone number!"
                  },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Phone number must be number !"
                  }
                ]
              })(<Input />)}
            </Form.Item>
            <Form.Item label="Post code">
              {getFieldDecorator("zipcode", {
                initialValue: producer["zipCode"],
                rules: [
                  { required: true, message: "Please input your post code!" },
                  {
                    pattern: new RegExp("^[0-9]*$"),
                    message: "Post code must be number !"
                  }
                ]
              })(<Input onBlur={this.handleBlur} />)}
            </Form.Item>
            <Form.Item label="City">
              {getFieldDecorator("pref_id", {
                initialValue: producer["pref_id"],
                rules: [{ required: true, message: "Please input your City!" }]
              })(
                <Select placeholder="City">
                  {prefs.map(function(pref, i) {
                    return (
                      <option key={i} value={pref.id}>
                        {pref.name}
                      </option>
                    );
                  })}
                </Select>
              )}
            </Form.Item>
            <Form.Item label="District">
              {getFieldDecorator("ward", {
                initialValue: producer["ward"]
              })(<Input placeholder="Some description" />)}
            </Form.Item>
            <Form.Item label="Town">
              {getFieldDecorator("addr1", {
                initialValue: producer["addr1"]
              })(<Input placeholder="Some description" />)}
            </Form.Item>
            <Form.Item label="Detailed address">
              {getFieldDecorator("addr2", {
                initialValue: producer["addr2"]
              })(<Input placeholder="Some description" />)}
            </Form.Item>
                  <div className="dp-flex-jf-center dp-flex">
              <Button htmlType="submit" type="primary">
                Save
              </Button>
              <Link to="/producers" className="ant-btn">
                  Back
              </Link>
              </div>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(Index);
