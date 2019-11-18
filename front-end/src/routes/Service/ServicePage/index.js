import React, { Component } from "react";
import { Table, Button, Card, Col, Row, Select, Pagination } from "antd";
import { Link } from "react-router-dom";
import {
  getListShop,
  getServiceByPage,
  getListServiceByShop
} from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import { relative } from "path";
import "../../../styles/customerStyle/index.css";

const { Option } = Select;
class ServicePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      services: [],
      shopName: [],
      seletedShopName: "",
      idShop: "",
      totalPage: 1,
      page: 1,
      loader: true
    };
  }

  componentDidMount() {
    getListShop.then(({ data }) => {
      this.setState(
        {
          shopName: data,
          idShop: data[0].id,
          seletedShopName: data[0].shopName
        },
        () => {
          let idShop = this.state.idShop;
          getListServiceByShop(idShop).then(res => {
            const services = res.data.data.map(service => {
              return {
                id: service.id,
                serviceName: service.service_name,
                serviceDescription: service.service_description,
                fee: service.fee,
                type: service.type,
                child_count: service.child_count
              };
            });
            this.setState({
              loader: false,
              services,
              totalPage: res.data.meta.total,
              page: res.data.meta.current_page
            });
          });
        }
      );
    });
  }

  getShopName = (value, name) => {
    this.setState(
      {
        seletedShopName: name.props.children,
        idShop: value
      },
      () => {
        getListServiceByShop(this.state.idShop).then(response => {
          const services = response.data.data.map(service => {
            return {
              id: service.id,
              serviceName: service.service_name,
              serviceDescription: service.service_description,
              fee: service.fee,
              type: service.type,
              child_count: service.child_count
            };
          });
          this.setState(
            {
              services,
              totalPage: response.data.meta.total,
              page: response.data.meta.current_page
            },
            () => {}
          );
        });
      }
    );
  };

  onChangePage = page => {
    this.setState(
      {
        page: page
      },
      () => {
        getServiceByPage(this.state.idShop, this.state.page).then(response => {
          const services = response.data.data.map(service => {
            return {
              id: service.id,
              serviceName: service.service_name,
              serviceDescription: service.service_description,
              fee: service.fee,
              type: service.type,
              child_count: service.child_count
            };
          });
          this.setState({
            services,
            totalPage: response.data.meta.total,
            page: response.data.meta.current_page
          });
        });
      }
    );
  };

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: "2",
    background: "#fff"
  };

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Service name",
      dataIndex: "serviceName",
      key: "serviceName",
      render: (text, record) => {
        return <Link to={`/service/detail/${record.id}`}>{text}</Link>;
      }
    },
    {
      title: "Service description",
      dataIndex: "serviceDescription",
      key: "serviceDescription"
    },
    {
      title: "Price",
      dataIndex: "fee",
      key: "price"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "tyoe"
    },
    {
      title: "Number of children",
      dataIndex: "child_count",
      key: "numberOfChildren"
    },
    {
      title: "",
      key: "edit",
      dataIndex: "tags",
      render: (text, record) => (
        <Link to={`/service/edit/${record.id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      )
    }
  ];

  render() {
    const {
      services,
      seletedShopName,
      shopName,
      page,
      totalPage,
      loader
    } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <div>
          {loader ? (
            <div className="gx-loader-view" style={this.styleLoader}>
              <CircularProgress />
            </div>
          ) : null}
          {/* <Card>List of service packages</Card> */}

          <div className="title-header">
            <h3 className="text-title">Service</h3>
          </div>
          <Card>
            <Row>
              <Col lg={{ span: 5 }} xs={{ span: 10 }}>
                {" "}
                <p>{seletedShopName}</p>
              </Col>
              <Col lg={{ span: 14 }} xs={{ span: 3 }}></Col>
              <Col lg={{ span: 5 }} xs={{ span: 11 }}>
                <Select
                  style={{ width: "100%" }}
                  optionFilterProp="children"
                  onChange={this.getShopName}
                  defaultValue={1}
                >
                  {shopName.map(function(shop, i) {
                    return (
                      <option key={i} value={shop.id}>
                        {shop.shopName}
                      </option>
                    );
                  })}
                </Select>
              </Col>
            </Row>
            <div>
              <Link to="service/new">
                <Button type="primary">Add new </Button>
              </Link>
            </div>
            <Table
              columns={this.columns}
              pagination={false}
              dataSource={services}
              scroll={{ x: 700 }}
              size="middle"
            />
            <div className="dp-flex dp-flex-jf-end mt-10">
              <Pagination
                current={page}
                defaultPageSize={15}
                total={totalPage} //total number of card data available
                onChange={this.onChangePage}
              />
            </div>
          </Card>
        </div>
      </div>
    );
  }
}
export default ServicePage;
