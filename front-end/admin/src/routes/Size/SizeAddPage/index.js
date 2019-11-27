import React, { Component } from "react";
import { Form, Input, Button, Row, Card, Col, notification } from "antd";
import { addSize } from "./../../../service/handleRequest";
import { Redirect, Link } from "react-router-dom";
import '../../../styles/customerStyle/index.css';
class SizeAddPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizeName: "",
      sizeDescription: "",
      redirect: false
    };
  }

  handleChange = e => {
    const name = e.target.name;
    this.setState({
      [name]: e.target.value
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(err => {
      if (!err) {
        const data = {
          size_name: this.state.sizeName,
          size_description: this.state.sizeDescription
        };
        addSize(data)
          .then(res => {
            if (res.status === 201) {
              this.openNotificationWithIcon("success", "Add size success!", "");
              this.setState({
                redirect: true
              });
            }
          })
          .catch(res => {
            if (res.response.status === 422) {
              this.openNotificationWithIcon(
                "error",
                "Add size not success!",
                "The size name has already been taken!"
              );
            } else {
              this.openNotificationWithIcon(
                "error",
                "Add size not success!",
                res.response.data.message
              );
            }
          });
      }
    });
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
    if (this.state.redirect) {
      return <Redirect to={"/sizes"} />;
    }
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
      <div className="title-header">
        <h3 className="text-title">Create Size</h3>
        </div>
        <Row>
          <Col span={24}  className="pd-0">
            <div className="ant-col ant-col-24">
              <Card>
                <Form onSubmit={this.handleSubmit} {...this.formItemLayout} className="form-shape">
                  <Form.Item
                    label="Size Name"
                    className="ant-form-item-children"
                  >
                    {getFieldDecorator("sizeName", {
                      rules: [
                        {
                          required: true,
                          message: "Please input size name"
                        }
                      ]
                    })(
                      <Input
                        placeholder="Enter size name"
                        name="sizeName"
                        onChange={this.handleChange}
                      />
                    )}
                  </Form.Item>
                  <Form.Item label="Size Description">
                    <Input
                      name="sizeDescription"
                      placeholder="Enter size description"
                      onChange={this.handleChange}
                    />
                  </Form.Item>
                  <div className="dp-flex-jf-center dp-flex">
                    <Button type="primary" htmlType="submit">
                      Save
                    </Button>
                    <Link to="/sizes">
                      <Button>
                        Back
                      </Button>
                    </Link>
                  </div>
                </Form>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(SizeAddPage);
