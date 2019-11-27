import React, { Component } from "react";
import { Table, Button, Card, Col, Row, Pagination, Select } from "antd";
import { Link, Route } from "react-router-dom";
import "./index.css";
import { listColor } from "../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import '../../styles/customerStyle/index.css';

const { Option } = Select;
class Color extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colors: [],
      page: 1,
      totalPage: 1,
      per_page: 15,
      isLoading: false
    };
  }

  componentDidMount() {
    this.setState({isLoading: true})
    listColor(this.state.page, this.state.per_page).then(response => {
      var colors = response.data.data;
      this.setState({
        colors,
        page: response.data.meta.current_page,
        totalPage: response.data.meta.total,
        isLoading: false
      });
    });
  }

  columns = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Color Name",
      dataIndex: "color_name",
      key: "color_name",
      render: (text, record) => (
        <Link to={`/color/detail/${record.id}`}>{text}</Link>
      )
    },
    {
      title: "RGB Color Name",
      dataIndex: "rgb",
      key: "rgb"
    },
    {
      title: "",
      key: "edit",
      dataIndex: "tags",
      render: (text, record) => (
        <Link to={`/color/edit/${record.id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      )
    }
  ];
  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: "2",
    background: "#fff"
  };
  onChangePage = page => {
    this.setState(
      {
        page: page,
        isLoading: true
      },
      () => {
        listColor(this.state.page, this.state.per_page).then(response => {
          var colors = response.data.data;
          this.setState({
            colors,
            page: response.data.meta.current_page,
            totalPage: response.data.meta.total,
            isLoading: false
          });
        });
      }
    );
  };

  handleSelect = value =>{
    this.setState({
      per_page: value,
      page: 1,
      isLoading: true
    },
    () => {
      listColor(this.state.page, this.state.per_page).then(response => {
        var colors = response.data.data;
        this.setState({
          colors,
          page: response.data.meta.current_page,
          totalPage: response.data.meta.total,
          isLoading: false
        });
      });
    })

  }
  render() {
    const { colors, totalPage, page, per_page, isLoading } = this.state;
    return (
      <div style={{ position: "relative" }}>
        {isLoading ? (
            <div className="gx-loader-view" style={this.styleLoader}>
              <CircularProgress />
            </div>
          ) : null}
          
          <div className="title-header">
            <h3 className="text-title">Color</h3>
            </div>
        <Card>
          <Col span={24}>
          <Link to="/color/new" >
            <Button type="primary">Add new </Button>
          </Link>
          <div style={{float:"right"}}>
            <Select
              defaultValue='15'
              style={{ width: 120 }}
              onChange={this.handleSelect}
            >
              <Option value='15'>15/page</Option>
              <Option value='30'>30/page</Option>
              <Option value='50'>50/page</Option>
              <Option value='100'>100/page</Option>
            </Select>
          </div>
          </Col>
          <Row>
            <Col span={24}>
            <Table
              columns={this.columns}
              dataSource={colors}
              pagination={false}
              scroll={{x: 550}}
              size="middle"
            />
            </Col>
          </Row>
          <div className="pagination">
            <Pagination
              current={page}
              pageSize={per_page}
              total={totalPage} //total number of card data available
              onChange={this.onChangePage}
               />
          </div>
        </Card>
      </div>
    );
  }
}
export default Color;
