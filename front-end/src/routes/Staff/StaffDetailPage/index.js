import React, { Component } from "react";
import { Row, Col, Card, Divider, Button, Modal, notification } from "antd";
import { Link } from "react-router-dom";
import { getStaff, deleteStaff } from "../../../service/handleRequest";
import moment from "moment";
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';

class StaffDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staff: {},
      idStaff: 0,
      visible: false,
      loader: true
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;

    getStaff(id)
      .then(response => {
        const staff = {
          id: response.data.data.id,
          username: response.data.data.attributes.username,
          staffName: response.data.data.attributes.name,
          shop: response.data.data.attributes.shopName,
          parttime: response.data.data.attributes.parttime === 1 ? "Yes" : "No",
          phoneNumber: response.data.data.attributes.tel,
          zipCode: response.data.data.attributes.zipcode,
          city: response.data.data.attributes.cityName,
          ward: response.data.data.attributes.ward,
          underDistrict: response.data.data.attributes.addr1,
          homeAddress: response.data.data.attributes.addr2,
          lastLogin: moment(response.data.data.attributes.lastLoginTime
          ).format("DD.MM.YYYY HH:mm"),
          createdDate: moment(
            response.data.data.attributes.created_date
          ).format("DD.MM.YYYY HH:mm"),
          updatedDate: moment(
            response.data.data.attributes.updated_date
          ).format("DD.MM.YYYY HH:mm")
        };

        this.setState({ staff, loader: false, idStaff: id });
      })
      .catch(ex => {
          
      });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
    message: message
    });
};

  handleDelete = () => {
    this.setState({ visible: true });
  };
  handleOk = () => {
    const {id} = this.props.match.params;
    deleteStaff(id).then(response => {
        this.openNotificationWithIcon('success', 'Delete staff success');
        this.props.history.replace(`/staffs`);
    }).catch(ex => {
        this.openNotificationWithIcon('error', 'Delete staff fail');
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
    const { staff, idStaff, visible, loader } = this.state;

    return (
      <div>
      <div className="title-header">
        <h3 className="text-title">Staff Detail</h3>
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
                <Col span={8}>{staff.id}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Username</h3>
                </Col>
                <Col span={8}>{staff.username}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Staff Name</h3>
                </Col>
                <Col span={8}>{staff.staffName}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Store</h3>
                </Col>
                <Col span={8}>{staff.shop}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Work Pass-time</h3>
                </Col>
                <Col span={8}>{staff.parttime}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Phone Number</h3>
                </Col>
                <Col span={8}>{staff.phoneNumber}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Zipcode</h3>
                </Col>
                <Col span={8}>{staff.zipCode}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>City</h3>
                </Col>
                <Col span={8}>{staff.city}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>District, District, ...</h3>
                </Col>
                <Col span={8}>{staff.ward}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Unser the district,...</h3>
                </Col>
                <Col span={8}>{staff.underDistrict}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Home address</h3>
                </Col>
                <Col span={8}>{staff.homeAddress}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Last login time</h3>
                </Col>
                <Col span={8}>{staff.lastLogin}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Create Date</h3>
                </Col>
                <Col span={8}>{staff.createdDate}</Col>
              </Row>
              <Divider />
              <Row>
                <Col span={16}>
                  <h3>Updated Date</h3>
                </Col>
                <Col span={8}>{staff.updatedDate}</Col>
              </Row>
              <Divider />
                  <div className="dp-flex-jf-center dp-flex">
                <Link
                  to={"/staffs/new/" + idStaff}
                  className="ant-btn ant-btn-primary"
                >
                  Edit
                </Link>
                <Button type="danger" onClick={this.handleDelete}>
                  Delete
                </Button>
                <Link to={"/staffs/changePassword/" + idStaff} className="ant-btn">Change Password</Link>
                <Link to="/staffs" className="ant-btn">
                  Back
                </Link>
              </div>
            </Card>
          </Col>
        </Row>

        <Modal
          title="Delete Staff"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
        >
          <p>Do you want delete this staff</p>
        </Modal>
      </div>
    );
  }
}

export default StaffDetailPage;
