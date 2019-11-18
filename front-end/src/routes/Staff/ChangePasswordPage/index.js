import React, { Component } from "react";
import { Input, Form, Row, Col, Card, notification, Button } from "antd";
import { Link } from "react-router-dom";
import { changePasswordStaff } from "../../../service/handleRequest";
import "../../../styles/customerStyle/index.css";

class ChangePasswordPage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue("newPassword")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  handleSubmit = e => {
    const { id } = this.props.match.params;

    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          id: id,
          password: values.newPassword
        };

        changePasswordStaff(data)
          .then(res => {
            this.openNotificationWithIcon("success", "Update password success");
            this.props.history.replace(`/staffs/detail/${id}`);
          })
          .catch(ex => {
            this.openNotificationWithIcon(
              "error",
              "Update staff password fail."
            );
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Staff Change Password</h3>
        </div>
        <Row>
          <Col span={24}>
            <Card>
              <Form {...this.formItemLayout} onSubmit={this.handleSubmit}>
                <Form.Item label="New Password">
                  {getFieldDecorator("newPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your New Password!"
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
                  })(<Input.Password placeholder="New Password" />)}
                </Form.Item>
                <Form.Item label="Confirm Password">
                  {getFieldDecorator("confirmPassword", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Confirm Password!"
                      },
                      {
                        pattern: new RegExp("^([a-zA-z0-9]*$)"),
                        message: "Wrong format!"
                      },
                      {
                        min: 5,
                        max: 20,
                        message: "Password must be between 5 and 20 characters"
                      },
                      {
                        validator: this.compareToFirstPassword
                      }
                    ]
                  })(<Input.Password placeholder="Confirm Password" />)}
                </Form.Item>
                <div className="dp-flex-jf-center dp-flex">
                  <Button type="primary" htmlType="submit">
                    Change Password
                  </Button>
                  <Link to="/staffs" className="ant-btn">
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

export default Form.create()(ChangePasswordPage);
