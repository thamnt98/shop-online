import React, { Component } from "react";
import { Form, Input, Button, Card, notification } from "antd";
import { Link } from "react-router-dom";
import { updateColor, detailColor } from "../../../service/handleRequest";
import "../../../styles/customerStyle/index.css";

class EditColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {}
    };
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  componentDidMount() {
    detailColor(this.props.match.params.id).then(response => {
      var data = response.data;
      this.setState({ color: data });
    });
  }

  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        updateColor(this.props.match.params.id, values)
          .then(res => {
            var data = res.data;
            this.setState({ color: data });
            this.openNotificationWithIcon("success", "Edit color success!");
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
    let color = this.state.color;
    const { getFieldDecorator } = this.props.form;
    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Edit Color</h3>
        </div>
        <Card>
          <Form
            {...this.formItemLayout}
            className="form-shape"
            onSubmit={this.handleSubmit}
          >
            <Form.Item label="Color name">
              {getFieldDecorator("color_name", {
                initialValue: color.color_name,
                rules: [
                  { required: true, message: "Please input your store code!" }
                ]
              })(<Input />)}
            </Form.Item>

            <Form.Item label="RGB ">
              {getFieldDecorator("rgb", {
                initialValue: color.rgb
              })(<Input />)}
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
                <Button>Back</Button>
              </Link>
            </div>
          </Form>
        </Card>
      </div>
    );
  }
}
export default Form.create()(EditColor);
