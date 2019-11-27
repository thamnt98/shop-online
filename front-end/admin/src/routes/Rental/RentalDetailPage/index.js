import React, { Component } from "react";
import { Col, Row, Card, Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { deleteRental, getRental } from "../../../service/handleRequest";
import moment from "moment";
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';

class RentalDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rental: {},
      idRental: 0,
      visible: false,
      loader: true
    };
  }

  componentWillMount() {
    const { id } = this.props.match.params;

    this.setState({ idRental: id });
  }

  async componentDidMount() {
    const { id } = this.props.match.params;

    getRental(id)
      .then(response => {
        const rental = {
          id: response.data.data.id,
          shopName: response.data.data.relationships[0].data.shopName,
          rentalName: response.data.data.attributes.rentalName,
          renatalDescription: response.data.data.attributes.rentalDescription,
          fee: response.data.data.attributes.fee,
          createdDate: moment(
            response.data.data.attributes.created_date
          ).format("DD.MM.YYYY HH:mm"),
          updatedDate: moment(
            response.data.data.attributes.updated_date
          ).format("DD.MM.YYYY HH:mm")
        };

        this.setState({ rental, loader: false });
      })
      .catch(ex => {});
  }

  handleDelete = async () => {
    this.setState({ visible: true });
  };

  handleOk = async () => {
    const { id } = this.props.match.params;
    deleteRental(id)
      .then(response => {
        this.props.history.replace(`/rentals`);
      })
      .catch(ex => {});

    this.setState({
      visible: false
    });
  };

  handleCancel = () => {
    this.setState({
      visible: false
    });
  };


  styleLoader = {
    'position': 'fixed',
    'top': '0',
    'left': '0',
    'width': '100%',
    'z-index': '12',
    'background-color': '#fff'
  };

  render() {
    const { rental, idRental, visible, loader } = this.state;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Rental Detail</h3>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="on-loader posi-absolute" >
              <CircularProgress />
            </div>
          ) : null}
            <Card>
              <Row>
                <Col span={16}>
                  <h4>Id</h4>
                </Col>
                <Col span={8}>{rental.id}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Store Name Available</h4>
                </Col>
                <Col span={8}>{rental.shopName}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Rental Service Name</h4>
                </Col>
                <Col span={8}>{rental.rentalName}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Description</h4>
                </Col>
                <Col span={8}>{rental.renatalDescription}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Rental Service Rate</h4>
                </Col>
                <Col span={8}>{rental.fee}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Creation Date</h4>
                </Col>
                <Col span={8}>{rental.createdDate}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h4>Updated Date</h4>
                </Col>
                <Col span={8}>{rental.updatedDate}</Col>
              </Row>
              <hr></hr>
              <div>
                <Link
                  to={"/rentals/new/" + idRental}
                  className="ant-btn ant-btn-primary"
                >
                  Edit
                </Link>
                <Button type="danger" onClick={this.handleDelete}>
                  Delete
                </Button>
                <Link to="/rentals" className="ant-btn">
                  Back
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Delete Rental"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Do you want delete this rental</p>
        </Modal>
      </div>
    );
  }
}

export default RentalDetail;
