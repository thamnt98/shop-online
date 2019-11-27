import React, { Component } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Input,
  Button,
  Cascader,
  notification
} from "antd";
import { Link } from "react-router-dom";
import {
  getSupplier,
  getListShop,
  listPref,
  updateSupplier,
  createSupplier
} from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';

class AddSupplierPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: {
        id: "",
        supplierCode: "",
        supplierName: "",
        shopName: "",
        tel: "",
        zipcode: "",
        pref_id: "",
        ward: "",
        addr1: "",
        addr2: ""
      },
      shops: [],
      prefs: [],
      loader: true
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    getListShop
      .then(response => {
        const shops = response.data.map(shop => {
          return {
            value: shop.id,
            label: shop.shopName
          };
        });

        this.setState({ shops });
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });

    listPref().then(response => {
      const prefs = response.data.map(pref => {
        return {
          value: pref.id,
          label: pref.name
        };
      });

      this.setState({ prefs, loader: false });
    });

    if (!id) {
      return;
    }

    getSupplier(id)
      .then(response => {
        const supplier = {
          id: response.data.data.id,
          supplierCode: response.data.data.attributes.supplierCode,
          supplierName: response.data.data.attributes.supplierName,
          shopName: response.data.data.attributes.shopId,
          tel: response.data.data.attributes.tel,
          zipcode: response.data.data.attributes.zipcode,
          pref_id: response.data.data.attributes.pref_id,
          ward: response.data.data.attributes.ward,
          addr1: response.data.data.attributes.addr1,
          addr2: response.data.data.attributes.addr2
        };

        this.setState({ supplier });
      })
      .catch(ex => {});
  }

  handleSubmit = e => {
    const { id } = this.props.match.params;

    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          supplier_code: values.supplierCode,
          supplier_name: values.supplierName,
          shop_id: values.shopName[0],
          tel: values.tel,
          zipcode: values.zipcode,
          pref_id: values.pref_id[0],
          ward: values.ward,
          addr1: values.addr1,
          addr2: values.addr2
        };

        if (!id) this.doCreateSubmit(obj);
        else this.doUpdateSubmit(obj, id);
      }
    });
  };

  async doCreateSubmit(obj) {
    await createSupplier(obj)
      .then(response => {
        this.openNotificationWithIcon("success", "Create rental success.");
        this.props.history.replace(`/suppliers`);
      })
      .catch(ex => {
        if (ex.response && ex.response.status === 422) {
          if (ex.response.data.errors.rental_name[0])
            this.openNotificationWithIcon("error", "Shop name is exist.");
        } else {
          this.openNotificationWithIcon("error", "Server error");
        }
      });
  }

  async doUpdateSubmit(obj, id) {
    updateSupplier(obj, id)
      .then(response => {
        this.openNotificationWithIcon("success", "Update rental success.");
        this.props.history.replace(`/suppliers`);
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });
  }

  renderInitShop = value => {
    if (!value) return [];

    return [value];
  };

  renderTitleHeader() {
    const { id } = this.props.match.params;
    return id ? "Update Supplier" : "Create Supplier";
  }

  styleLoader = {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    "z-index": "12",
    "background-color": "#fff"
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
    const { supplier, shops, prefs, loader } = this.state;

    return (
      <div>
        <div className="title-header">
            <h3 className="text-title">{this.renderTitleHeader()}</h3>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="on-loader posi-absolute" >
              <CircularProgress />
            </div>
          ) : null}
            <Card>
              <Form {...this.formItemLayout} onSubmit={this.handleSubmit} className="form-shape">
                <Form.Item label="Provider Code">
                  {getFieldDecorator("supplierCode", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Provider Code!"
                      }
                    ],
                    initialValue: supplier.supplierCode
                  })(<Input placeholder="Provider Code" />)}
                </Form.Item>
                <Form.Item label="Provider Name">
                  {getFieldDecorator("supplierName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Provider Name!"
                      }
                    ],
                    initialValue: supplier.supplierName
                  })(<Input placeholder="Provider Name" />)}
                </Form.Item>
                <Form.Item label="Store Name Avaliable">
                  {getFieldDecorator("shopName", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Store Name Avaliable."
                      }
                    ],
                    initialValue: this.renderInitShop(supplier.shopName)
                  })(<Cascader options={shops} />)}
                </Form.Item>
                <Form.Item label="Phone number">
                  {getFieldDecorator("tel", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Phone number!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Input Phone incorect."
                      }
                    ],
                    initialValue: supplier.tel
                  })(<Input placeholder="Phone number" />)}
                </Form.Item>
                <Form.Item label="Post code">
                  {getFieldDecorator("zipcode", {
                    initialValue: supplier.zipcode
                  })(<Input placeholder="Post code" />)}
                </Form.Item>
                <Form.Item label="City">
                  {getFieldDecorator("pref_id", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your City."
                      }
                    ],
                    initialValue: this.renderInitShop(supplier.pref_id)
                  })(<Cascader options={prefs} />)}
                </Form.Item>
                <Form.Item label="District">
                  {getFieldDecorator("ward", {
                    initialValue: supplier.ward
                  })(<Input placeholder="District" />)}
                </Form.Item>
                <Form.Item label="Town">
                  {getFieldDecorator("addr1", {
                    initialValue: supplier.addr1
                  })(<Input placeholder="Town" />)}
                </Form.Item>
                <Form.Item label="Detail address">
                  {getFieldDecorator("addr2", {
                    initialValue: supplier.addr2
                  })(<Input placeholder="Detail address" />)}
                </Form.Item>
                  <div className="dp-flex-jf-center dp-flex">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Link to="/suppliers" className="ant-btn">
                    Back
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(AddSupplierPage);
