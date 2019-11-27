import React, { Component } from "react";
import { Table, Button, Card, Row, Col, Pagination, Select } from "antd";
import { getSize } from "./../../../service/handleRequest";
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import "./index.css";
import '../../../styles/customerStyle/index.css';

const { Option } = Select;
class SizePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sizes: [],
      page: 1,
      totalPage: "",
      per_page: 15,
      loader: true
    };
  }

  async componentDidMount() {
    const { page, per_page } = this.state;
    getSize(page, per_page).then(res => {
      this.setState({
        sizes: res.data.data,
        page: res.data.meta.current_page,
        totalPage: res.data.meta.total,
        loader: false
      });
    });
  }

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: "2",
    background: "#fff"
  };

  onChangePage = page => {
    const per_page = this.state.per_page;
    getSize(page, per_page).then(data => {
      this.setState({
        sizes: data.data.data,
        page: data.data.meta.current_page
      });
    });
  };

  handleSelect = value => {
    this.setState(
      {
        per_page: value,
        page: 1
      },
      () => {
        getSize(this.state.page, this.state.per_page).then(res => {
          this.setState({
            sizes: res.data.data,
            page: res.data.meta.current_page,
            totalPage: res.data.meta.total
          });
        });
      }
    );
  };

  render() {
    const columns = [
      { title: "ID", dataIndex: "id", key: "id" },
      {
        title: "Size Name",
        dataIndex: "size_name",
        key: "size_name",
        render: (text, sizes) => (
          <Link to={`/sizes/detail/${sizes.id}`}>{text}</Link>
        )
      },
      {
        title: "Size Description",
        dataIndex: "size_description",
        key: "size_description"
      },
      {
        title: "Action",
        key: "operation",
        render: sizes => (
          <Link to={`/sizes/edit/${sizes.id}`}>
            <Button type="primary">Edit</Button>
          </Link>
        )
      }
    ];
    const { totalPage, page, sizes, loader } = this.state;
    return (
      <div>
        {loader ? (
          <div className="gx-loader-view" style={this.styleLoader}>
            <CircularProgress />
          </div>
        ) : null}
        <Row>
          <Col span={24}>
            <div>
            <div className="title-header">
              <h3 className="text-title">Size</h3>
            </div>
              <Card>
                <Link to="/sizes/news">
                  <Button type="primary">Add new </Button>
                </Link>
                <div style={{ float: "right" }}>
                  <Select
                    defaultValue="15"
                    style={{ width: 120 }}
                    onChange={this.handleSelect}
                  >
                    <Option value="15">15/page</Option>
                    <Option value="30">30/page</Option>
                    <Option value="50">50/page</Option>
                    <Option value="100">100/page</Option>
                  </Select>
                </div>
                <Table
                  className="table"
                  columns={columns}
                  dataSource={sizes}
                  pagination={false}
                  size="middle"
                />
                <div className="pagination">
                  <Pagination
                    page={page}
                    defaultPageSize={15}
                    total={totalPage}
                    onChange={this.onChangePage}
                  />
                </div>
              </Card>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default SizePage;
