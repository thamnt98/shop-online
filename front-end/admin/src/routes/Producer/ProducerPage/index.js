import React, { Component } from "react";
import { Table, Button, Card, Col, Row, Select, Pagination } from "antd";
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import { getListProducer } from "../../../service/handleRequest";
import '../../../styles/customerStyle/index.css';
class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalPage: 1,
      producers: [],
      totalPage: 1,
      currentPage: 1,
      loader: true
    };
  }

  componentDidMount() {
    getListProducer(this.state.currentPage).then(res => {
      this.setState({
        producers: res.data.data,
        currentPage: res.data.meta.current_page,
        totalPage: res.data.meta.total,
        loader: false
      });
    });
  }

  onChangePage = page => {
    this.setState(
      {
        currentPage: page,
        loader: true
      },
      () => {
        getListProducer(this.state.currentPage).then(res => {
          this.setState({
            producers: res.data.data,
            loader: false
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
      title: "Producer Code",
      dataIndex: "makerCode",
      key: "makerCode"
    },
    {
      title: "Manufacturer Name",
      dataIndex: "makerName",
      key: "makerName",
      render: (text, record) => {
        return <Link to={`/producers/detail/${record.id}`}>{text}</Link>;
      }
    },
    {
      title: "Store Name",
      dataIndex: "shopName",
      key: "shopName"
    },
    {
      title: "Phone  Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "Postcode",
      dataIndex: "zipCode",
      key: "zipCode"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "",
      key: "edit",
      dataIndex: "tags",
      render: (text, record) => (
        <Link to={`/producers/edit/${record.id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      )
    }
  ];

  render() {
    const { loader, producers, currentPage, totalPage } = this.state;
    return (
      <div style={{ position: "relative" }}>
        <div>
          {loader ? (
            <div className="gx-loader-view" style={this.styleLoader}>
              <CircularProgress />
            </div>
          ) : null}
          <div className="title-header">
            <h3 className="text-title">Manufacturers</h3>
            </div>
          <Card>
            <Link to="producers/new">
              <Button type="primary">Add new </Button>
            </Link>
            <Table
              columns={this.columns}
              pagination={false}
              dataSource={producers}
              size="middle"
            />
            <div className="pagination">
              <Pagination
                current={currentPage}
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
export default Index;
