import React, { Component } from "react";
import { Input, Form, Button, Row, Col, AutoComplete, Card } from "antd";
import { Link, Redirect } from "react-router-dom";
import { notification } from "antd";
import { changePassword } from "./../../../service/handleRequest";
import "../../../styles/customerStyle/index.css";

class ChangePassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      confirmDirty: false,
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
      redirect: false
    };
  }

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const data = {
          currentPassword: this.state.currentPassword,
          newPassword: this.state.newPassword,
          confirmPassword: this.state.confirmPassword
        };
        changePassword(data)
          .then(res => {
            if (res.status === 200) {
              this.openNotificationWithIcon(
                "success",
                "Change password success!",
                "Your account has been logged out from other login sessions"
              );
            }
            this.setState({
              redirect: true
            });
          })
          .catch(e => {
            this.openNotificationWithIcon(
              "error",
              "Change password not success!",
              e.response.data.message
            );
          });
      }
    });
  };
  handleConfirmBlur = e => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };
  openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description
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

  render() {
    const { getFieldDecorator } = this.props.form;
    if (this.state.redirect) {
      return <Redirect to={"/admin"} />;
    }

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Change Password</h3>
        </div>

        <Row className="posi-rel" type="flex" justify="center">
          <Col span={24} className="pd-0">
            <Card>
              <Form {...this.formItemLayout} className="form-shape">
                <Form.Item label="Current Password">
                  {getFieldDecorator("currentPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your current Password!"
                      },
                      {
                        pattern: new RegExp("^([a-zA-Z0-9]*$)"),
                        message: "Wrong format!"
                      },
                      {
                        min: 5,
                        max: 20,
                        message: "Password must be between 5 and 20 characters"
                      }
                    ]
                  })(
                    <Input.Password
                      name="currentPassword"
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
                <Form.Item label="Password" hasFeedback>
                  {getFieldDecorator("password", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your password!"
                      },
                      {
                        validator: this.validateToNextPassword
                      },
                      {
                        pattern: new RegExp("^([a-zA-z0-9]*$)"),
                        message: "Wrong format!"
                      },
                      {
                        min: 5,
                        max: 20,
                        message: "Password must be between 5 and 20 characters"
                      }
                    ]
                  })(
                    <Input.Password
                      name="newPassword"
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
                <Form.Item label="Confirm Password" hasFeedback>
                  {getFieldDecorator("confirm", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your confirm password!"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(
                    <Input.Password
                      onBlur={this.handleConfirmBlur}
                      name="confirmPassword"
                      onChange={this.handleChange}
                    />
                  )}
                </Form.Item>
              </Form>
              <div className="dp-flex-jf-center dp-flex">
                <Button
                  type="primary"
                  htmlType="submit"
                  onClick={this.handleSubmit}
                >
                  Save
                </Button>
                <Link to="/admin" className="ant-btn">
                  Back
                </Link>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(ChangePassWord);
