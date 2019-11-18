import React from "react";
import { Button, Form, Icon, Input, notification } from "antd";
import { connect } from "react-redux";
import "./SingIn.css";

import {
  hideMessage,
  showAuthLoader,
  userFacebookSignIn,
  userGithubSignIn,
  userGoogleSignIn,
  userSignIn,
  userTwitterSignIn
} from "appRedux/actions/Auth";
import IntlMessages from "util/IntlMessages";
import CircularProgress from "components/CircularProgress/index";

const FormItem = Form.Item;

class SignIn extends React.Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.showAuthLoader();
        this.props.userSignIn(values);
      }
    });
  };

  componentDidUpdate() {
    if (this.props.showMessage) {
      setTimeout(() => {
        this.props.hideMessage();
      }, 100);
    }
    if (this.props.authUser !== null) {
      this.props.history.push("/");
    }
  }
  openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { showMessage, loader } = this.props;
    return (
      <div className="gx-app-login-wrap wrap">
        <div className="gx-app-login-container">
          <div className="gx-app-login-main-content">
            <div className="gx-app-logo-content logo">
              <div>
                <img
                  src={require("assets/images/playmountain.png")}
                  alt="Neature"
                />
              </div>
            </div>
            <div className="gx-app-login-content">
              <Form
                onSubmit={this.handleSubmit}
                className="gx-signin-form gx-form-row0"
              >
                <FormItem>
                  {getFieldDecorator("email", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Username!"
                      }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="user"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      placeholder="Username"
                      name="username"
                      onChange={this.handleChagne}
                    />
                  )}
                </FormItem>
                <FormItem>
                  {getFieldDecorator("password", {
                    rules: [
                      { required: true, message: "Please input your Password!" }
                    ]
                  })(
                    <Input
                      prefix={
                        <Icon
                          type="lock"
                          style={{ color: "rgba(0,0,0,.25)" }}
                        />
                      }
                      type="password"
                      placeholder="Password"
                      name="password"
                      onChange={this.handleChagne}
                    />
                  )}
                </FormItem>
                <FormItem className="button">
                  <Button type="primary" className="gx-mb-0" htmlType="submit">
                    <IntlMessages id="app.userAuth.signIn" />
                  </Button>
                </FormItem>
              </Form>
            </div>

            {loader ? (
              <div className="gx-loader-view">
                <CircularProgress />
              </div>
            ) : null}
            {showMessage
              ? this.openNotificationWithIcon(
                  "error",
                  "Login not success",
                  "Username or password incorrect!"
                )
              : null}
          </div>
        </div>
      </div>
    );
  }
}

const WrappedNormalLoginForm = Form.create()(SignIn);

const mapStateToProps = ({ auth }) => {
  const { loader, alertMessage, showMessage, authUser } = auth;
  return { loader, alertMessage, showMessage, authUser };
};

export default connect(
  mapStateToProps,
  {
    userSignIn,
    hideMessage,
    showAuthLoader,
    userFacebookSignIn,
    userGoogleSignIn,
    userGithubSignIn,
    userTwitterSignIn
  }
)(WrappedNormalLoginForm);
