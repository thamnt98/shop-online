import React, { Component } from "react";
import { Select, Button, Card, notification, Col, Row } from "antd";
import { Link, Redirect } from "react-router-dom";
import { detailShop, deleteShop } from "../../../service/handleRequest";
import "../index.css";
import "../../../styles/customerStyle/index.css";
const { Option } = Select;
class ShowShop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shop: {}
    };
  }
  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };
  componentDidMount() {
    detailShop(this.props.match.params.id).then(response => {
      var data = response.data;
      this.setState({ shop: data });
    });
  }
  handleEdit() {
    this.setState({
      edit: true
    });
  }

  handleDelete = e => {
    e.preventDefault();
    deleteShop(this.props.match.params.id).then(res => {
      this.setState({ delete: true });
      this.openNotificationWithIcon("success", "Delete success!");
      this.props.history.replace(`/shop`);
    });
  };
  render() {
    let shop = this.state.shop;
    let pref = this.state.pref;
    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Store Detail</h3>
        </div>
        <Row>
          <Col span={24}>
            <Card>
              <Row>
                <Col span={12}>
                  <h3>Store code</h3>
                </Col>
                <Col span={6}>{shop.shop_code}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Store name</h3>
                </Col>
                <Col span={6}>{shop.shop_name}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Phone number</h3>
                </Col>
                <Col span={6}>{shop.tel}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Postcode</h3>
                </Col>
                <Col span={6}>{shop.zipcode}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>City</h3>
                </Col>
                <Col span={6}>{shop.city}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>District</h3>
                </Col>
                <Col span={6}>{shop.ward}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Town</h3>
                </Col>
                <Col span={6}>{shop.addr1}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Detailed address</h3>
                </Col>
                <Col span={6}>{shop.addr2}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Registration fee</h3>
                </Col>
                <Col span={6}>{shop.register_price}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Registration fee for members</h3>
                </Col>
                <Col span={6}>{shop.second_register_price}</Col>
              </Row>
              <hr></hr>
              <Row>
                <Col span={12}>
                  <h3>Regular membership fee</h3>
                </Col>
                <Col span={6}>{shop.other_shop_entry_fee}</Col>
              </Row>
              <hr></hr>
              <div className="dp-flex-jf-center dp-flex">
                <Link
                  to={`/shop/edit/${shop.id}`}
                  className="ant-btn ant-btn-primary"
                >
                  Edit
                </Link>
                <Button type="danger" onClick={this.handleDelete}>
                  Delete
                </Button>
                <Link to="/shop" className="ant-btn">
                  Back
                </Link>
              </div>
              <hr></hr>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}
export default ShowShop;
