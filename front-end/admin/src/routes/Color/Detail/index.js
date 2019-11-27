import React, { Component } from "react";
import { Button, Card, notification, Col, Row, Modal } from "antd";
import { Link } from "react-router-dom";
import { detailColor, deleteColor } from "../../../service/handleRequest";
import "../index.css";
import moment from "moment";
import "../../../styles/customerStyle/index.css";

class ShowColor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      color: {},
      visible: false
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

  handleDelete = () => {
    this.setState({ visible: true });
  };

  handleOk = e => {
    e.preventDefault();
    deleteColor(this.props.match.params.id).then(res => {
      this.openNotificationWithIcon("success", "Delete color success!");
      this.props.history.replace(`/color`);
    });

    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };

  render() {
    let color = this.state.color;
    const { visible } = this.state;
    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Color Detail</h3>
        </div>
        <Row>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={16}>
                  <h4>Id</h4>
                </Col>
                <Col span={8}>{color.id}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Color name</h4>
                </Col>
                <Col span={8}>{color.color_name}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Creation Date</h4>
                </Col>
                <Col span={8}>
                  {moment(color.created_date).format("DD.MM.YYYY HH:mm")}
                </Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Updated date</h4>
                </Col>
                <Col span={8}>
                  {moment(color.updated_date).format("DD.MM.YYYY HH:mm")}
                </Col>
              </Row>
              <hr></hr>
              <div className="dp-flex-jf-center dp-flex">
                <Link
                  to={`/color/edit/${color.id}`}
                  className="ant-btn ant-btn-primary"
                >
                  Edit
                </Link>
                <Button type="danger" onClick={this.handleDelete}>
                  delete
                </Button>
                <Link to="/color" className="ant-btn">
                  Back
                </Link>
              </div>
              <hr></hr>
            </Card>
          </Col>
        </Row>
        <Modal
          title="Delete Rental"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Do you want delete this supplier</p>
        </Modal>
      </div>
    );
  }
}
export default ShowColor;
