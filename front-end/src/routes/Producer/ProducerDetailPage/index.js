import React, { Component } from "react";
import { Col, Row, Card, Button, Modal, notification } from "antd";
import { Link, Redirect } from "react-router-dom";
import {
  getProducerById,
  deleteProducer
} from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      producer: [],
      id: "",
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
    this.setState({ id: this.props.match.params.id });
  }
  componentDidMount() {
    const { id } = this.state;
    getProducerById(id).then(({ data }) => {
      this.setState({ producer: data, loader: false });
    });
  }
  confirm = e => {
    const { id } = this.state;
    deleteProducer(id)
      .then(res => {
        if (res.status == 200) {
          this.openNotificationWithIcon("success", "Delete producer success");
          this.props.history.replace(`/producers`);
        }
      })
      .catch(e => {
        this.openNotificationWithIcon("error", "Delete producer error");
        this.setState({ visible: false });
      });
  };
  cancel = e => {
    this.setState({ visible: false });
    this.openNotificationWithIcon("error", "You didnt delete this producer");
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
    const { id, loader, visible, producer } = this.state;
    return (
      <div style={{ position: "relative" }}>
      <div className="title-header">
        <h3 className="text-title">Manufacturers Detail</h3>
        </div>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}
        <Row className="row">
          <Card
            title=" Manufacturer  Information "
            bordered={false}
            style={{ width: 800 }}
          >
            <Row>
              <Col span={8}>
                <p> Id : </p>
              </Col>
              <Col span={16}>
                <p>{producer["id"]}</p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p> Producer Code</p>
              </Col>
              <Col span={16}>
                <p>{producer["makerCode"]}</p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p>Manufacturer Name </p>
              </Col>
              <Col span={16}>
                <p>{producer["makerName"]} </p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p> Store Name </p>
              </Col>
              <Col span={16}>
                <p>{producer["shopName"]} </p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p>Phone Number</p>
              </Col>
              <Col span={16}>
                <p>{producer["phoneNumber"]} </p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p> Postcode: </p>
              </Col>
              <Col span={16}>
                <p>{producer["zipCode"]} </p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p> Address: </p>
              </Col>
              <Col span={16}>
                <p>{producer["address"]} </p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p> Registration date: </p>
              </Col>
              <Col span={16}>
                <p>{producer["created_date"]}</p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p> Updated date: </p>
              </Col>
              <Col span={16}>
                <p>{producer["updated_date"]} </p>
              </Col>
            </Row>
                  <div className="dp-flex-jf-center dp-flex">
                <Link to={"/producers/edit/" + id} className="ant-btn ant-btn-primary">
                  Edit
                </Link>
                <Button type="danger" onClick={this.handleDelete}>
                  Delete{" "}
                </Button>
                <Link to="/producers" className="ant-btn">
                  Back
                </Link>
              </div>
              <Modal
                title="Delete Producer"
                visible={visible}
                onOk={this.confirm}
                onCancel={this.cancel}
              >
                <p>Do you want delete this service ?</p>
              </Modal>
          </Card>
        </Row>
      </div>
    );
  }
}
export default Index;
