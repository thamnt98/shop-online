import React, { Component } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { Link } from "react-router-dom";
import { addColor } from "../../../service/handleRequest";
import '../../../styles/customerStyle/index.css';
class NewColor extends Component {
  constructor(props) {
    super(props);
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        addColor(values)
          .then(() => {
            this.openNotificationWithIcon("success", "Add color success!");
            this.props.history.replace(`/color`);
          })
          .catch(e => {
            var errors = e.response.data.errors;
            if (errors.color_name)
              this.openNotificationWithIcon("error", errors.color_name);
          });
      }
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
    return (
      <div>
      <div className="title-header">
      <h3 className="text-title">Create Color</h3>
      </div>
        <Card>
          <Form
            {...this.formItemLayout}
            onSubmit={this.handleSubmit}
            className="form-shape"
          >
            <Form.Item label="Color name">
              {getFieldDecorator("color_name", {
                rules: [
                  {
                    required: true,
                    message: "Please input your color name!"
                  }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="RGB">
              {getFieldDecorator("rgb", {})(<Input />)}
            </Form.Item>

            <div className="dp-flex-jf-center dp-flex">
              <Button
                type="primary"
                htmlType="submit"
                onClick={this.handleSubmit}
              >
                Save
              </Button>
              <Link to="/color">
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
export default Form.create()(NewColor);
