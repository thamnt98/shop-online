import React, { Component } from "react";
import { Card, Row, Col, Button } from "antd";
import { Link } from "react-router-dom";
import "./admin.css";
import { getUserById } from "./../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      infoUser: {}
    };
  }

  async componentDidMount() {
    getUserById()
      .then(response => {
        this.setState({
          infoUser: response.data,
          loader: false
        });
      })
      .catch(error => {
        return error;
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

  render() {
    const { loader } = this.state;
    return (
      <div>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}
        <Row type="flex" justify="center">
          <Card title="Basic Setting" bordered={false} style={{ width: 800 }}>
            <Row>
              <Col span={11}>
                <p>Username : </p>
              </Col>
              <Col span={13}>
                <p>{this.state.infoUser.username}</p>
              </Col>
            </Row>
            <Row>
              <Col span={11}>
                <p>Last logged : </p>
              </Col>
              <Col span={13}>
                <p>{this.state.infoUser.last_login_time}</p>
              </Col>
            </Row>
            <Row className="button-change-password">
              <Col span={8}>
                <Link to="/admin/changePassword">
                  <Button type="primary"> Change Password </Button>
                </Link>
              </Col>
            </Row>
          </Card>
        </Row>
      </div>
    );
  }
}

export default Admin;
