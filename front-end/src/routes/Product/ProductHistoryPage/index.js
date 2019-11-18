import React, { Component } from "react";
import "../../../styles/customerStyle/index.css";
import {
  Row,
  Col,
  Form,
  Cascader,
  Table,
  Button,
  Card,
  DatePicker
} from "antd";
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import { searchProductHistory, listShop } from "../../../service/handleRequest";
import moment from "moment";

class ProductHistoryPage extends Component {
  constructor(props) {
    super(props);
    const today = new Date();
    moment(today.setDate(today.getDate() - 1)).format("YYYY-MM-DD");

    const date_end = moment(today.setDate(today.getDate() + 1)).format(
      "YYYY-MM-DD"
    );

    const date_start = moment(today.setDate(today.getDate() - 2)).format(
      "YYYY-MM-DD"
    );

    this.state = {
      loader: false,
      searchProductHistory: [],
      getShops: [],
      date_start: date_start,
      date_end: date_end,
      shop_id: ""
    };
  }

  componentDidMount() {
    this.setState({ loader: true });
    const page = 1;
    listShop(page).then(response => {
      var data = response.data.data;

      const getShops = data.map(getShop => {
        return {
          value: getShop.id,
          label: getShop.shop_name
        };
      });
      this.setState({
        getShops: getShops
      });
    });

    const product_id = this.props.match.params;
    const data = {
      date_start: this.state.date_start,
      date_end: this.state.date_end,
      shop_id: this.state.shop_id,
      product_id: product_id.id
    };

    searchProductHistory(data).then(res => {
      this.setState({
        searchProductHistory: res.data,
        loader: false
      });
    });
  }

  columns = [
    {
      title: "Date",
      dataIndex: "date",
      key: "date"
    },
    {
      title: "Id",
      dataIndex: "id",
      key: "id"
    },
    {
      title: "Product Code",
      dataIndex: "product_code",
      key: "product_code"
    },
    {
      title: "Product Name",
      dataIndex: "product_name",
      key: "product_name"
    },
    {
      title: "Number",
      dataIndex: "number",
      key: "number"
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type"
    }
  ];

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  handleSubmit = e => {
    e.preventDefault();
    this.setState({
      loader: true
    });
    this.props.form.validateFields((err, values) => {
      if (!err) {
        const product_id = this.props.match.params;
        const data = {
          date_start: values.date[0].format("YYYY-MM-DD"),
          date_end: values.date[1].format("YYYY-MM-DD"),
          shop_id: values.shop[0],
          product_id: product_id.id
        };
        searchProductHistory(data).then(res => {
          this.setState({
            searchProductHistory: res.data,
            loader: false
          });
        });
      }
    });
  };

  styleLoader = {
    position: "sticky",
    top: 0,
    left: 0,
    width: "100%",
    zIndex: "2",
    background: "#fff"
  };

  render() {
    const dateFormat = "YYYY-MM-DD";
    const {
      loader,
      shops,
      getShops,
      searchProductHistory,
      date_start,
      date_end
    } = this.state;
    const { RangePicker } = DatePicker;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Goods Management</h3>
        </div>

        <Row>
          <Col span={24} className="posi-rel">
            {loader ? (
              <div className="gx-loader-view" style={this.styleLoader}>
                <CircularProgress />
              </div>
            ) : null}
            <Card>
              <Form
                className="form-shape"
                {...this.formItemLayout}
                onSubmit={this.handleSubmit}
              >
                <Form.Item label="Date">
                  {getFieldDecorator("date", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your date start!"
                      }
                    ],
                    initialValue: [
                      moment(date_start, dateFormat),
                      moment(date_end, dateFormat)
                    ]
                  })(
                    <RangePicker format={dateFormat} onChange={this.onChange} />
                  )}
                </Form.Item>
                <Form.Item label="Store Name">
                  {getFieldDecorator("shop", {
                    initialValue: [""]
                  })(
                    <Cascader
                      options={[{ value: "", label: "All" }, ...getShops]}
                    />
                  )}
                </Form.Item>
                <div className="dp-flex-jf-center dp-flex">
                  <Button htmlType="submit" type="primary">
                    Search
                  </Button>
                  <Link to="/products">
                    <Button>Back</Button>
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col span={24} className="posi-rel">
            <Card>
              <Table
                columns={this.columns}
                dataSource={searchProductHistory}
                size="middle"
                pagination={false}
              ></Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(ProductHistoryPage);
