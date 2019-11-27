import React, { Component } from "react";
import { Input, Form, Button, Card, Row, Col, AutoComplete } from "antd";
import { Link, Redirect } from "react-router-dom";
import { notification } from "antd";
import { getSizeById, sizeEdit } from "./../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import "./index.css";
import "../../../styles/customerStyle/index.css";

class ChangePassWord extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      sizeName: "",
      sizeDescription: "",
      redirect: false,
      loader: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getSizeById(id).then(res => {
      this.setState({
        sizes: res.data,
        loader: false
      });
    });
  }

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: "2",
    background: "#fff"
  };

  handleChange = e => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({
      [name]: value
    });
  };

  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const id = this.props.match.params.id;
        sizeEdit(values, id)
          .then(res => {
            if (res.status == 200) {
              this.openNotificationWithIcon(
                "success",
                "Edit size success!",
                ""
              );
              this.setState({ redirect: true });
            }
          })
          .catch(res => {
            if (res.response.status === 422) {
              this.openNotificationWithIcon(
                "error",
                "Edit size not success!",
                "The size name has already been taken!"
              );
            } else {
              this.openNotificationWithIcon("error", "Edit size not success!");
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
    const { getFieldDecorator } = this.props.form;
    const { sizes, loader } = this.state;
    if (this.state.redirect) {
      return <Redirect to={"/sizes"} />;
    }

    return (
      <div>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}

        <div className="title-header">
          <h3 className="text-title">Edit Size</h3>
        </div>
        <Card>
          <Form
            {...this.formItemLayout}
            className="form-shape"
            onSubmit={this.onSubmit}
          >
            <Form.Item label="Size Name">
              {getFieldDecorator("size_name", {
                initialValue: sizes.size_name,
                rules: [
                  {
                    required: true,
                    message: "Please input your size name!"
                  }
                ]
              })(<Input onChange={this.handleChange} />)}
            </Form.Item>

            <Form.Item label="Size Description">
              {getFieldDecorator("size_description", {
                initialValue: sizes.size_description
              })(<Input onChange={this.handleChange} />)}
            </Form.Item>
            <Form.Item>
              <Button onClick={this.onSubmit} htmlType="submit" type="primary">
                Save
              </Button>
              <Link to="/sizes">
                <Button>Back</Button>
              </Link>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

export default Form.create()(ChangePassWord);
