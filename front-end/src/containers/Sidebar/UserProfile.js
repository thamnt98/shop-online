import React, { Component } from "react";
import { connect } from "react-redux";
import { Avatar, Popover } from "antd";
import { userSignOut } from "appRedux/actions/Auth";
import { getUserById } from "./../../service/handleRequest";
import "./UserProfile.css";

class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      infoUser: {}
    };
  }

  async componentDidMount() {
    getUserById()
      .then(response => {
        this.setState({
          infoUser: response.data
        });
      })
      .catch(error => {
        return error;
      });
  }
  render() {
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={() => this.props.userSignOut()}>Logout</li>
      </ul>
    );

    return (
      <div className="gx-flex-row gx-align-items-center gx-mb-4 gx-avatar-row">
        <Popover
          placement="bottomRight"
          content={userMenuOptions}
          trigger="click"
          className="info-user"
        >
          <Avatar
            src={require("assets/images/admin.png")}
            className="gx-size-40 gx-pointer gx-mr-3"
            alt="admin"
          />
          <span className="gx-avatar-name">
            {this.state.infoUser.username}
            <i className="icon icon-chevron-down gx-fs-xxs gx-ml-2" />
          </span>
        </Popover>
      </div>
    );
  }
}

export default connect(
  null,
  { userSignOut }
)(UserProfile);
