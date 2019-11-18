import React, { Component } from "react";
import { Table, Button, Card, Col, Row, Pagination } from "antd";
import { Link, Route } from "react-router-dom";
import "./index.css";
import { listShop } from "../../service/handleRequest";
import moment from 'moment';
import CircularProgress from "components/CircularProgress/index";
import '../../styles/customerStyle/index.css';
class Shop extends Component {
  constructor(props) {
    super(props);
    this.state = {
      shops: [],
      page: 1,
      totalPage: 1,
      isLoading: false
    };
  }
  componentDidMount() {
    this.setState({isLoading: true})
    listShop(1)
    .then(response => {
      var data = response.data.data;
      console.log(response);
      const shops = data.map(shop => {
        return {
          id: shop.id,
          shop_code: shop.shop_code,
          shop_name: shop.shop_name,
          tel: shop.tel,
          address: shop.address,
          employees: shop.employees,
          register_price: shop.register_price,
          second_register_price: shop.second_register_price,
          other_shop_entry_fee: shop.other_shop_entry_fee,
          created_date: shop.created_date
        };
      });
      this.setState({
        shops,
        page: response.data.meta.current_page,
        totalPage: response.data.meta.total,
        isLoading: false
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
  columns = [
    {
      title: "Store Code",
      dataIndex: "shop_code",
      key: "shop_code"
    },
    {
      title: "Shop Name",
      dataIndex: "shop_name",
      key: "shop_name",
      render: (text, record) => (
        <Link to={`/shop/detail/${record.id}`}>{text}</Link>
      )
    },
    {
      title: "Phone Number",
      dataIndex: "tel",
      key: "tel"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Employees",
      dataIndex: "employees",
      key: "employees"
    },
    {
      title: "Registration Fee",
      dataIndex: "register_price",
      key: "register_price"
    },
    {
      title: "Registration fee for members",
      dataIndex: "second_register_price",
      key: "second_register_price"
    },
    {
      title: "Regular membership fee",
      dataIndex: "other_shop_entry_fee",
      key: "other_shop_entry_fee"
    },
    {
      title: "Store creation date	",
      dataIndex: "created_date",
      key: "created_date",
      render:(text)=>(
        moment(text).format("DD.MM.YYYY HH:mm")
      )
    },
    {
      title: "",
      key: "edit",
      dataIndex: "tags",
      render: (text, record) => (
        <Link to={`/shop/edit/${record.id}`}>
          <Button type="primary">Edit</Button>
        </Link>
      )
    }
  ];
  onChangePage = page => {
    this.setState(
      {
        page: page,
        isLoading: true
      },
      () => {
        listShop(this.state.page)
          .then(response => {
            var data = response.data.data;
            console.log(response);
            const shops = data.map(shop => {
              return {
                id: shop.id,
                shop_code: shop.shop_code,
                shop_name: shop.shop_name,
                tel: shop.tel,
                address: shop.address,
                employees: shop.employees,
                register_price: shop.register_price,
                second_register_price: shop.second_register_price,
                other_shop_entry_fee: shop.other_shop_entry_fee,
                created_date: shop.created_date
              };
            });
            this.setState({
              shops,
              page: response.data.meta.current_page,
              totalPage: response.data.meta.total,
              isLoading: false
            });
          });
      }
    );
  };
  render() {
    const { shops, totalPage, page, isLoading } = this.state;
    return (
      <div  style={{ position: "relative" }}>
        <div>
        {isLoading ? (
            <div className="gx-loader-view" style={this.styleLoader}>
              <CircularProgress />
            </div>
          ) : null}
          <div className="title-header">
          <h3 className="text-title">Store</h3>
          </div>
        <Card className="style-card">
          <Link to="/shop/new">
            <Button className="style-button-add">Add new </Button>
          </Link>
          <Row>
            <Col span ={24}>
                <Table
                  columns={this.columns}
                  dataSource={shops}
                  pagination={false}
                  scroll={{x: 900}}
                  size="middle"
                />
            </Col>
          </Row>
          <div className="pagination">
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
export default Shop;