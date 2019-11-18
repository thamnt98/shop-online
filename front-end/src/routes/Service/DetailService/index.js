import React, { Component } from "react";
import { Col, Row, Card, Button, Modal, notification, Divider } from "antd";
import { Link, Redirect } from "react-router-dom";
import { getServiceById, deleteService } from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      service: [],
      idService: "",
      loader: true,
      visible: false
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentWillMount() {
    const { id } = this.props.match.params;
    this.setState({ idService: id });
  }

  componentDidMount() {
    const { idService } = this.state;
    getServiceById(idService).then(({ data }) => {
      this.setState({ service: data, loader: false });
    });
  }

  confirm = e => {
    const { idService } = this.state;
    deleteService(idService)
      .then(res => {
        if (res.status == 200) {
          this.openNotificationWithIcon("success", "Delete service success");
          this.props.history.replace(`/service`);
        }
      })
      .catch(e => {
        this.openNotificationWithIcon("error", "Delete service error");
        this.setState({ visible: false });
      });
  };

  cancel = e => {
    this.setState({ visible: false });
    this.openNotificationWithIcon("error", "You did not delete this service");
  };

  handleDelete = () => {
    this.setState({ visible: true });
  };

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: 1,
    background: "#fff"
  };

  render() {
    const { idService, loader, visible } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}

        <div className="title-header">
          <h3 className="text-title">Service Detail</h3>
        </div>
        <Row>
          <Col span={24}>
          <Card>
            <Row>
              <Col span={16}>
                <h4> Id : </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["id"]}</p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Service Name: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["service_name"]} </p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Style: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["type"]} </p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Service Description: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["service_description"]} </p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Price: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["fee"]} </p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Number of Children: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["child_count"]} </p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Creation date: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["created_date"]} </p>
              </Col>
            </Row>
            <Divider></Divider>
            <Row>
              <Col span={16}>
                <h4> Updated date: </h4>
              </Col>
              <Col span={8}>
                <p>{this.state.service["updated_date"]} </p>
              </Col>
            </Row>
            <div className="dp-flex-jf-center dp-flex">
              <Link
                to={"/service/edit/" + idService}
                className="ant-btn ant-btn-primary"
              >
                Edit
              </Link>
              <Button type="danger" onClick={this.handleDelete}>
                Delete{" "}
              </Button>
              <Link to="/service" className="ant-btn">
                Back
              </Link>
            </div>
            <Modal
              title="Delete Service"
              visible={visible}
              onOk={this.confirm}
              onCancel={this.cancel}
            >
              <p>Do you want delete this service ?</p>
            </Modal>
          </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default Index;
