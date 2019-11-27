import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Cascader,
  Button,
  Radio,
  notification
} from "antd";
import {
  getListShop,
  listPref,
  getStaff,
  createStaff,
  updateStaff,
  updateZipcode
} from "../../../service/handleRequest";
import {Link} from 'react-router-dom';
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';

class AddStaffPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: {
        username: "",
        staffName: "",
        password: "",
        shop: "",
        city: '',
        parttime: "",
        phoneNumber: "",
        zipCode: "",
        disitrict: "",
        underDistrict: "",
        homeAddress: ""
      },
      shops: [],
      cities: [],
      loader: true
    };
  }

  renderInitCascader = value => {
    if (!value) return [];

    return [value];
  };

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

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

        if(!id){
          this.setState({loader: false})
        }
      })
      .catch(ex => {});

    listPref()
      .then(response => {
        const cities = response.data.map(city => {
          return {
            value: city.id,
            label: city.name
          };
        });

        this.setState({ cities });
      })
      .catch(ex => {});

    if (!id) {
      return;
    }

    getStaff(id)
      .then(response => {
        const staff = {
          username: response.data.data.attributes.username,
          staffName: response.data.data.attributes.name,
          shop: response.data.data.attributes.shop,
          city: response.data.data.attributes.city,
          parttime: response.data.data.attributes.parttime,
          phoneNumber: response.data.data.attributes.tel,
          zipCode: response.data.data.attributes.zipcode,
          disitrict: response.data.data.attributes.ward,
          underDistrict: response.data.data.attributes.addr1,
          homeAddress: response.data.data.attributes.addr2
        };

        this.setState({ staff, loader: false });
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });
  }

  doCreateSubmit(staff) {
    createStaff(staff)
      .then(response => {
        this.openNotificationWithIcon("success", "Create staff success.");
        this.props.history.replace(`/staffs`);
      })
      .catch(ex => {
        if (ex.response && ex.response.status === 422) {
          if (ex.response.data.errors.username)
            this.openNotificationWithIcon("error", "Username is exist.");
        } else {
          this.openNotificationWithIcon("error", "Server error");
        }
      });
  }

  doUpdateSubmit(staff, id) {
    console.log(staff);
    updateStaff(staff, id)
      .then(response => {
        this.openNotificationWithIcon("success", "Update staff success.");
        this.props.history.replace(`/staffs`);
      })
      .catch(ex => {
        if (ex.response && ex.response.status === 422) {
          if (ex.response.data.errors.username)
            this.openNotificationWithIcon("error", "Username is exist.");
        } else {
          this.openNotificationWithIcon("error", "Server error");
        }
      });
  }

  handleSubmit = e => {
    const { id } = this.props.match.params;

    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          pref_id: values.city[0],
          ward: values.district,
          addr1: values.homeAddress,
          is_parttime: values.partTime,
          password: values.password,
          tel: values.phoneNumber,
          shop_id: values.shop[0],
          name: values.staffName,
          addr2: values.underDistrict,
          username: values.username,
          zipcode: values.zipcode
        };

        if (!id) this.doCreateSubmit(obj);
        else this.doUpdateSubmit(obj, id);
      }
    });
  };

  renderTitleHeader() {
    const { id } = this.props.match.params;
    return id ? "Update Staff" : "Create Staff";
  }

  handelBlur = e => {
    const { value } = e.target;
    updateZipcode(value).then(res => {
      console.log(res.data);
      const {staff} = this.state;

      staff.city = res.data.pref_id;
      staff.disitrict = res.data.ward;
      staff.underDistrict = res.data.addr1;
      staff.homeAddress = res.data.addr2;

      this.setState({staff});
    }).catch(ex => {

    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { shops, cities, staff, loader } = this.state;

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
                <Form.Item label="Username">
                  {getFieldDecorator("username", {
                    rules: [
                      { required: true, message: "Please input your Username!" }
                    ],
                    initialValue: staff.username
                  })(<Input placeholder="Username" />)}
                </Form.Item>
                <Form.Item label="Staff Name">
                  {getFieldDecorator("staffName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Staff Name!"
                      }
                    ],
                    initialValue: staff.staffName
                  })(<Input placeholder="Staff Name" />)}
                </Form.Item>
                <Form.Item label="Password">
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ],
                    initialValue: staff.password
                  })(<Input.Password placeholder="Password" />)}
                </Form.Item>
                <Form.Item label="Store">
                  {getFieldDecorator("shop", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Store Name Avaliable."
                      }
                    ],
                    initialValue: this.renderInitCascader(staff.shop)
                  })(<Cascader options={shops} />)}
                </Form.Item>
                <Form.Item label="Part-time work">
                  {getFieldDecorator("partTime", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Passtime work!"
                      }
                    ],
                    initialValue: staff.parttime
                  })(
                    <Radio.Group>
                      <Radio value={1}>Yes</Radio>
                      <Radio value={0}>No</Radio>
                    </Radio.Group>
                  )}
                </Form.Item>
                <Form.Item label="Phone Number">
                  {getFieldDecorator("phoneNumber", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Phone Number!"
                      }
                    ],
                    initialValue: staff.phoneNumber
                  })(<Input placeholder="Phone Number" />)}
                </Form.Item>
                <Form.Item label="Zipcode">
                  {getFieldDecorator("zipcode", {
                    initialValue: staff.zipCode
                  })(<Input placeholder="Zipcode" onBlur={this.handelBlur}/>)}
                </Form.Item>
                <Form.Item label="City">
                  {getFieldDecorator("city", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your City Avaliable."
                      }
                    ],
                    initialValue: this.renderInitCascader(staff.city)
                  })(<Cascader options={cities} />)}
                </Form.Item>
                <Form.Item label="District, district, ...">
                  {getFieldDecorator("district", {
                    initialValue: staff.disitrict
                  })(<Input placeholder="District" />)}
                </Form.Item>
                <Form.Item label="Under the district, ...">
                  {getFieldDecorator("underDistrict", {
                    initialValue: staff.underDistrict
                  })(<Input placeholder="Under district" />)}
                </Form.Item>
                <Form.Item label="Home address">
                  {getFieldDecorator("homeAddress", {
                    initialValue: staff.homeAddress
                  })(<Input placeholder="Home Address" />)}
                </Form.Item>
                  <div className="dp-flex-jf-center dp-flex">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Link to="/staffs" className="ant-btn">Back</Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(AddStaffPage);
