import React, { Component } from "react";
import { Card, Table, Col, Row, Form, Select, notification, PageHeader } from "antd";
import { Link } from "react-router-dom";
import { getListShop, getRentalByShop } from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import '../../../styles/customerStyle/index.css';

class Rentalpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rentals: [],
      shops: [],
      selectedShop: {},
      loader: true
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
    getListShop
      .then(response => {
        const shops = response.data.map(shop => {
          return {
            value: shop.id,
            label: shop.shopName
          };
        });

        const selectedShop = shops[0];

        getRentalByShop(selectedShop.value)
          .then(response => {
            const rentals = response.data.data.map(rental => {
              return {
                id: rental.data.id,
                nameRental: rental.data.attributes.rentalName,
                rentalDescription: rental.data.attributes.rentalDescription,
                fee: rental.data.attributes.fee
              };
            });

            this.setState({ rentals, loader: false });
          })
          .catch(ex => {
            this.openNotificationWithIcon("error", "Server error");
          });

        this.setState({ shops, selectedShop });
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });
  }

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Name  of rental service",
      dataIndex: "",
      key: "nameRental",
      render: rental => {
        return (
          <Link to={`/rentals/detail/${rental.id}`}>{rental.nameRental}</Link>
        );
      }
    },
    {
      title: "Description",
      dataIndex: "rentalDescription",
      key: "rentalDescription"
    },
    {
      title: "Price",
      dataIndex: "fee",
      key: "fee"
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: rental => {
        return (
          <Link
            to={`/rentals/new/${rental.id}`}
            className="ant-btn ant-btn-primary"
          >
            Edit
          </Link>
        );
      }
    }
  ];

  handleSelectChange = async shopId => {
    const { shops } = this.state;

    const shop = shops.find(shop => {
      return shop.value === shopId;
    });

    getRentalByShop(shopId)
      .then(response => {
        const rentals = response.data.data.map(rental => {
          return {
            id: rental.data.id,
            nameRental: rental.data.attributes.rentalName,
            rentalDescription: rental.data.attributes.rentalDescription,
            fee: rental.data.attributes.fee
          };
        });

        this.setState({ selectedShop: shop, rentals });
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });
  };

  renderSelection = shops => {
    const { Option } = Select;

    return (
      <Form>
        <Form.Item>
          <Select
            defaultValue={1}
            onChange={this.handleSelectChange}
            style={{ width: 150 }}
          >
            {shops.map(shop => {
              return (
                <Option value={shop.value} key={shop.value}>
                  {shop.label}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
      </Form>
    );
  };

  render() {
    const { rentals, shops, selectedShop, loader } = this.state;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Rental</h3>
        </div>

        <div>
          <Link to="/rentals/new" className="ant-btn ant-btn-primary">
            Add Rental
          </Link>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="on-loader posi-absolute" >
              <CircularProgress />
            </div>
          ) : null}
            <Card
              title={selectedShop.label}
              extra={this.renderSelection(shops)}
            >
                <Table
                  columns={this.columns}
                  dataSource={rentals}
                  scroll={{x: 700}}
                  size="middle"
                ></Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Rentalpage;
