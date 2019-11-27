import React, { Component } from "react";
import {
  Card,
  Table,
  Col,
  Row,
  Form,
  Select,
  notification,
  Pagination
} from "antd";
import { Link } from "react-router-dom";
import { getSuppliers } from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";

class SupplierPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suppliers: [],
      loader: true
    };
  }

  columns = [
    {
      title: "Provider code",
      dataIndex: "supplierCode",
      key: "supplierCode",
      defaultSortOrder: "descend",
      sorter: (a, b) => a.supplierCode - b.supplierCode
    },
    {
      title: "Provider name",
      dataIndex: "info",
      key: "supplierName",
      defaultSortOrder: "nd",
      sorter: (a, b) => {
        return a.supplierName.length - b.supplierName.length;
      },
      render: supplier => {
        return (
          <Link to={`/suppliers/detail/${supplier.id}`}>{supplier.value}</Link>
        );
      }
    },
    {
      title: "Store name",
      dataIndex: "shopName",
      key: "shopName",
      defaultSortOrder: "nd",
      sorter: (a, b) => a.shopName.length - b.shopName.length
    },
    {
      title: "Phone number",
      dataIndex: "tel",
      key: "tel"
    },
    {
      title: "Post code",
      dataIndex: "zipcode",
      key: "zipcode"
    },
    {
      title: "Address",
      dataIndex: "addr1",
      key: "addr1"
    },
    {
      title: "",
      dataIndex: "",
      key: "x",
      render: supplier => {
        return (
          <Link
            to={`/suppliers/new/${supplier.id}`}
            className="ant-btn ant-btn-primary"
          >
            Edit
          </Link>
        );
      }
    }
  ];

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
    getSuppliers()
      .then(response => {
        const suppliers = response.data.map(supplier => {
          return {
            id: supplier.data.id,
            supplierCode: supplier.data.attributes.supplierCode || "",
            supplierName: supplier.data.attributes.supplierName || "",
            shopName: supplier.data.relationships.shop.name || "",
            tel: supplier.data.attributes.tel,
            zipcode: supplier.data.attributes.zipcode,
            addr1: supplier.data.attributes.addr1,
            info: {
              id: supplier.data.id,
              value: supplier.data.attributes.supplierName
            }
          };
        });

        this.setState({ suppliers, loader: false });
      })
      .catch(es => {});
  }

  render() {
    const { suppliers, loader } = this.state;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Supplier</h3>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="on-loader posi-absolute" >
              <CircularProgress />
            </div>
          ) : null}
            <Card>
              <Link to="/suppliers/new" className="ant-btn ant-btn-primary">
                Add Suppliers
              </Link>
              <div style={{ overflow: "auto" }}>
                <Table
                  columns={this.columns}
                  dataSource={suppliers}
                  pagination={{ pageSize: 50 }}
                  scroll={{x: 900}}
                  size="middle"
                ></Table>
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default SupplierPage;
