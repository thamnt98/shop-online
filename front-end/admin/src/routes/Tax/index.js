import React, { Component } from "react";
import { Row, Col, Form, Input, Card, Button, notification } from "antd";
import { getTaxs, updateTaxs } from "../../service/handleRequest";
import "../../styles/customerStyle/index.css";
import CircularProgress from "components/CircularProgress/index";

class TaxPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {
        tax: "0",
        memberTax: "0"
      },
      loader: true
    };
  }

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  componentDidMount() {
    getTaxs().then(response => {
      const res = response.data;

      const data = {
        tax: res[0].data.attributes.value,
        memberTax: res[1].data.attributes.value
      };

      this.setState({ data, loader: false });
    });
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  handleSubmit = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const data = {
          tax_value: values.tax,
          member_value: values.taxMember
        };

        updateTaxs(data)
          .then(response => {
            this.openNotificationWithIcon("success", "Update success");
          })
          .catch(ex => {
            this.openNotificationWithIcon("error", "Update fail");
          });
      }
    });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { data, loader } = this.state;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Update Tax</h3>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="on-loader posi-absolute" >
              <CircularProgress />
            </div>
          ) : null}
            <Card>
              <Form
                {...this.formItemLayout}
                onSubmit={this.handleSubmit}
                className="form-shape"
              >
                <Form.Item label="Tax %">
                  {getFieldDecorator("tax", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Tax!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Input Tax must be number."
                      }
                    ],
                    initialValue: data.tax
                  })(<Input placeholder="Tax" />)}
                </Form.Item>
                <Form.Item label="Member Tax %">
                  {getFieldDecorator("taxMember", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Tax member!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Input Tax member must be number."
                      }
                    ],
                    initialValue: data.memberTax
                  })(<Input placeholder="Tax member" />)}
                </Form.Item>
                <div className="dp-flex-jf-center dp-flex">
                  <Button htmlType="submit" type="primary">
                    Update
                  </Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(TaxPage);
