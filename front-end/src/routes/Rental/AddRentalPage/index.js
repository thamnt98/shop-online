import React, { Component } from "react";
import {
  Row,
  Col,
  Form,
  Input,
  Cascader,
  Card,
  Button,
  notification
} from "antd";
import { Link } from "react-router-dom";
import {
  updateRental,
  createRental,
  getListShop,
  getRental
} from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";
class AddRentalPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rental: {
        rentalName: "",
        rentaldescription: "",
        fee: "",
        shopId: ""
      },
      shops: [],
      loader: true
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

  async componentDidMount() {
    const { id } = this.props.match.params;

    getListShop
      .then(response => {
        const shops = response.data.map(shop => {
          return {
            value: shop.id,
            label: shop.shopName
          };
        });

        this.setState({ shops});

        if(!id)
          this.setState({loader: false});
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });

    if (!id) {
      return;
    }

    getRental(id)
      .then(response => {
        const rental = {
          rentalName: response.data.data.attributes.rentalName,
          rentaldescription: response.data.data.attributes.rentalDescription,
          fee: response.data.data.attributes.fee,
          shopId: response.data.data.relationships[0].data.id
        };
        this.setState({ rental, loader: false });
      })
      .catch(ex => {});
  }

  handleSubmit = e => {
    const { id } = this.props.match.params;

    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          rental_name: values.nameRental,
          rental_description: values.rentalDescription,
          fee: values.fee,
          shop_id: values.shop[0]
        };
        if (!id) this.doCreateSubmit(obj);
        else this.doUpdateSubmit(obj, id);
      }
    });
  };

  async doUpdateSubmit(obj, id) {
    updateRental(obj, id)
      .then(response => {
        this.openNotificationWithIcon("success", "Update rental success.");
        this.props.history.replace(`/rentals`);
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

  async doCreateSubmit(obj) {
    createRental(obj)
      .then(response => {
        this.openNotificationWithIcon("success", "Create rental success.");
        this.props.history.replace(`/rentals`);
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

  renderInitShop = value => {
    if (!value) return [];

    return [value];
  };

  renderTitleHeader() {
    const { id } = this.props.match.params;

    return id ? "Update Rental" : "Create Rental";
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { shops, rental, loader } = this.state;

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
              <Form
                {...this.formItemLayout}
                onSubmit={this.handleSubmit}
                className="form-shape"
              >
                <Form.Item label="Rental Service Name">
                  {getFieldDecorator("nameRental", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Rental Service Name!"
                      }
                    ],
                    initialValue: rental.rentalName
                  })(<Input placeholder="Rental Service Name" />)}
                </Form.Item>
                <Form.Item label="Description">
                  {getFieldDecorator("rentalDescription", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Description!"
                      }
                    ],
                    initialValue: rental.rentaldescription
                  })(<Input placeholder="Description" />)}
                </Form.Item>
                <Form.Item label="Rental Service Rate">
                  {getFieldDecorator("fee", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Service Rate."
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Input Service Rate must be number."
                      }
                    ],
                    initialValue: rental.fee
                  })(<Input placeholder="Price" />)}
                </Form.Item>
                <Form.Item label="Store Name Avaliable">
                  {getFieldDecorator("shop", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Store Name Avaliable."
                      }
                    ],
                    initialValue: this.renderInitShop(rental.shopId)
                  })(<Cascader options={shops} />)}
                </Form.Item>
                <div className="dp-flex-jf-center dp-flex">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Link to="/rentals" className="ant-btn">
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

export default Form.create()(AddRentalPage);
