import React, { Component } from "react";
import { Button, Card, Col, Row, notification, Modal } from "antd";
import { Link } from "react-router-dom";
import { getSizeById, deleteSize } from "../../../service/handleRequest";
import "./index.css";
import "../../../styles/customerStyle/index.css";

class SizeDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      visible: false
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    getSizeById(id).then(res => {
      this.setState({
        sizes: res.data
      });
    });
  }

  handleDelete = () => {
    this.setState({ visible: true });
  };

  handleOk = e => {
    e.preventDefault();
    deleteSize(this.props.match.params.id)
      .then(res => {
        this.openNotificationWithIcon("success", "Deleted success!");
        this.props.history.replace(`/sizes`);
      })
      .catch(err => {
        this.openNotificationWithIcon("error", "Deleted not success!");
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

  openNotificationWithIcon = (type, message, description) => {
    notification[type]({
      message: message,
      description: description
    });
  };

  render() {
    const { sizes, visible } = this.state;
    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Size Detail</h3>
        </div>
        <Row>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={14}>
                  <p>
                    <strong>Id :</strong>
                  </p>
                </Col>
                <Col span={10}>{sizes.id}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={14}>
                  <p>
                    <strong>Size Name :</strong>
                  </p>
                </Col>
                <Col span={10}>{sizes.size_name}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={14}>
                  <p>
                    <strong>Size Description :</strong>
                  </p>
                </Col>
                <Col span={10}>{sizes.size_description}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={14}>
                  <p>
                    <strong>Created at :</strong>
                  </p>
                </Col>
                <Col span={10}>{sizes.created_date}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={14}>
                  <p>
                    <strong>Updated at :</strong>
                  </p>
                </Col>
                <Col span={10}>{sizes.updated_date}</Col>
              </Row>
              <hr></hr>
              <Row>
                <div>
                  <Link to={`/sizes/edit/${sizes.id}`}>
                    <Button className="button" type="primary">
                      Edit
                    </Button>
                  </Link>

                  <Button
                    className="button"
                    type="danger"
                    onClick={this.handleDelete}
                  >
                    Delete
                  </Button>

                  <Link to="/sizes">
                    <Button className="button">Back</Button>
                  </Link>
                </div>
              </Row>
            </Card>
          </Col>
        </Row>
        <Modal
          title="Delete Size"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Do you want delete this size</p>
        </Modal>
      </div>
    );
  }
}
export default SizeDetailPage;
