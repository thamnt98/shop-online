import React, { Component } from "react";
import { Row, Col, Card, Table, notification, BackTop } from "antd";
import { Link } from "react-router-dom";
import { getStaffs } from "../../../service/handleRequest";
import CircularProgress from "components/CircularProgress/index";
import moment from "moment";
import "../../../styles/customerStyle/index.css";

class StaffPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      staffs: [],
      paginate: {
        total: 0,
        currentPage: 1
      },
      loader: true
    };
  }

  columns = [
    {
      title: "Store Name",
      dataIndex: "shopName",
      key: "shopName"
    },
    {
      title: "Staff Name",
      dataIndex: "",
      key: "staffName",
      render: staff => {
        return <Link to={`/staffs/detail/${staff.id}`}>{staff.staffName}</Link>;
      }
    },
    {
      title: "Phone Number",
      dataIndex: "phoneNumber",
      key: "phoneNumber"
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address"
    },
    {
      title: "Username",
      dataIndex: "username",
      key: "username"
    },
    {
      title: "Last login time",
      dataIndex: "lastLoginTime",
      key: "lastLoginTime",
      render: lastLoginTime => {
        return moment(lastLoginTime).format("DD.MM.YYYY HH:mm");
      }
    },
    {
      title: "Account create time",
      dataIndex: "createdTime",
      key: "createdTime",
      render: createdTime => {
        return moment(createdTime).format("DD.MM.YYYY HH:mm");
      }
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: staff => {
        return (
          <Link to={`staffs/new/${staff}`} className="ant-btn ant-btn-primary">
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
    const { paginate } = this.state;
    getStaffs(paginate.currentPage)
      .then(response => {
        const staffs = response.data.data.map(({ data: staff }) => {
          return {
            id: staff.id,
            shopName: staff.attributes.shopName,
            staffName: staff.attributes.name,
            tel: staff.attributes.tel,
            address: staff.attributes.address,
            username: staff.attributes.username,
            lastLoginTime: staff.attributes.lastLoginTime,
            createdTime: staff.attributes.created_date
          };
        });

        const paginate = {
          total: response.data.meta.total,
          currentPage: response.data.meta.currentPage
        };

        this.setState({ staffs, paginate, loader: false });
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });
  }

  handleChange = page => {
    getStaffs(page)
      .then(response => {
        const staffs = response.data.data.map(({ data: staff }) => {
          return {
            id: staff.id,
            shopName: staff.attributes.shopName,
            staffName: staff.attributes.name,
            tel: staff.attributes.tel,
            address: staff.attributes.address,
            username: staff.attributes.username,
            lastLogin: staff.attributes.lastLoginTime,
            createdTime: staff.attributes.created_date
          };
        });

        const paginate = {
          total: response.data.meta.total,
          currentPage: page
        };

        this.setState({ staffs, paginate });
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Server error");
      });
  };

  render() {
    const { staffs, paginate, loader } = this.state;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Staff</h3>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="on-loader posi-absolute" >
              <CircularProgress />
            </div>
          ) : null}
            <Card>
              <Link to="/staffs/new" className="ant-btn ant-btn-primary">
                Add Staff
              </Link>
                <Table
                  columns={this.columns}
                  dataSource={staffs}
                  pagination={{
                    pageSize: 15,
                    onChange: this.handleChange,
                    total: paginate.total
                  }}
                  scroll={{x: 900}}
                  size="middle"
                ></Table>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default StaffPage;
