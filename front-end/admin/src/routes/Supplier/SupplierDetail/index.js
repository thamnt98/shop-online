import React, { Component } from "react";
import { Col, Row, Card, Button, Modal, notification } from "antd";
import { Link } from "react-router-dom";
import { getSupplier, deleteSupplier } from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';

class SupplierDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      supplier: {},
      visible: false,
      idSupplier: 0,
      loader: true
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
    const { id } = this.props.match.params;

    this.setState({ idSupplier: id });

    getSupplier(id)
      .then(response => {
        console.log("res", response.data.data.attributes);
        const supplier = {
          id: response.data.data.id,
          supplierCode: response.data.data.attributes.supplierCode,
          supplierName: response.data.data.attributes.supplierName,
          shopName: response.data.data.relationships.shop.name,
          tel: response.data.data.attributes.tel,
          zipcode: response.data.data.attributes.zipcode,
          pref_id: response.data.data.relationships.perf.value,
          ward: response.data.data.attributes.ward,
          addr1: response.data.data.attributes.addr1,
          addr2: response.data.data.attributes.addr2,
          created: response.data.data.attributes.createdDate,
          updated: response.data.data.attributes.updatedDate
        };

        this.setState({ supplier, loader: false });
      })
      .catch(ex => {});
  }

  handleDelete = () => {
    this.setState({ visible: true });
  };

  handleOk = () => {
    const { id } = this.props.match.params;
    deleteSupplier(id)
      .then(response => {
        this.openNotificationWithIcon("success", "Delete supplier success");
        this.props.history.replace(`/suppliers`);
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

  render() {
    const { supplier, visible, idSupplier, loader } = this.state;

    return (
      <div>
      <div className="title-header">
      <h3 className="text-title">Supplier Detail</h3>
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
                  <h3>Id</h3>
                </Col>
                <Col span={8}>{supplier.id}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Provider Code</h3>
                </Col>
                <Col span={8}>{supplier.supplierCode}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Provider Name</h3>
                </Col>
                <Col span={8}>{supplier.supplierName}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Store Name</h3>
                </Col>
                <Col span={8}>{supplier.shopName}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Phone Number</h3>
                </Col>
                <Col span={8}>{supplier.tel}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Postcode</h3>
                </Col>
                <Col span={8}>{supplier.zipcode}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Address</h3>
                </Col>
                <Col span={8}>{supplier.addr1}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Registration Date</h3>
                </Col>
                <Col span={8}>{supplier.created}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={16}>
                  <h3>Update Date</h3>
                </Col>
                <Col span={8}>{supplier.updated}</Col>
              </Row>
              <hr></hr>
                  <div className="dp-flex-jf-center dp-flex">
                <Link
                  to={"/suppliers/new/" + idSupplier}
                  className="ant-btn ant-btn-primary"
                >
                  Edit
                </Link>
                <Button type="danger" onClick={this.handleDelete}>
                  Delete
                </Button>
                <Link to="/suppliers" className="ant-btn">
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
          <p>Do you want delete this supplier</p>
        </Modal>
      </div>
    );
  }
}

export default SupplierDetail;
