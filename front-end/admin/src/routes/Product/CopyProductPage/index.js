import React, { Component } from "react";
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Cascader,
  Button,
  notification
} from "antd";
import { Link } from "react-router-dom";
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";
import {
  getListShop,
  getSize,
  listColor,
  getListProducer,
  getSuppliers,
  createProduct,
  getProduct
} from "../../../service/handleRequest";

class CopyProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      productId: 0,
      data: {
        product_code: "",
        product_name: "",
        shop_id: "",
        stock_price: "",
        notax_price: "",
        tax_price: "",
        member_price: "",
        size_id: "",
        size_text: "",
        color_text: "",
        maker_id: "",
        supplier_id: "",
        notes: ""
      },
      shops: [],
      sizes: [],
      colors: [],
      suppliers: [],
      producers: [],
      fixNumber: {
        size: 150,
        color: 100,
        produce: 1
      }
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.setState({ productId: id });
    const {fixNumber}= this.state;

    getListShop
      .then(response => {
        const shops = response.data.map(shop => {
          return {
            value: shop.id,
            label: shop.shopName
          };
        });

        this.setState({ shops });
      })
      .catch(ex => {});

    getSize(1, fixNumber.size).then(res => {
      const sizes = res.data.data.map(size => {
        return {
          label: size.size_name,
          value: size.id
        };
      });

      this.setState({ sizes });
    });

    listColor(1, fixNumber.color).then(res => {
      const colors = res.data.data.map(color => {
        return {
          label: color.color_name,
          value: color.id
        };
      });

      this.setState({ colors });
    });

    getListProducer(fixNumber.produce).then(res => {
      const producers = res.data.data.map(producer => {
        return {
          label: producer.makerName,
          value: producer.id
        };
      });

      this.setState({ producers });
    });

    getSuppliers().then(res => {
      const suppliers = res.data.map(supplier => {
        return {
          value: supplier.data.id,
          label: supplier.data.attributes.supplierName || ""
        };
      });

      this.setState({ suppliers, loader: false });
    });

    const isCopy = this.props.match.path.split("/")[2];
    console.log(isCopy);

    if (isCopy === "copy") {
      getProduct(id).then(res => {
        const data = {
          product_code: res.data.attributes.product_code,
          product_name: res.data.attributes.product_name,
          shop_id: res.data.attributes.shop_id,
          stock_price: res.data.attributes.stock_price,
          notax_price: res.data.attributes.notax_price,
          tax_price: res.data.attributes.tax_price,
          member_price: res.data.attributes.member_price,
          size_id: res.data.attributes.size_id,
          size_text: res.data.attributes.size_text,
          color_text: res.data.attributes.color_text,
          maker_id: res.data.attributes.maker_id,
          supplier_id: res.data.attributes.supplier_id,
          notes: res.data.attributes.notes
        };

        this.setState({ data });
      });
    } else {
      const coypUser = localStorage.getItem("copyUser");
      this.setState({ data: JSON.parse(coypUser) });
    }
  }

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  renderInitCassader = value => {
    if (!value) return [];

    return [value];
  };

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  handleSubmit = e => {
    const { productId } = this.state;

    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          shop_id: values.shop_id[0],
          product_name: values.product_name,
          product_code: values.product_code,
          member_price: values.member_price,
          stock_price: values.stock_price,
          notax_price: values.notax_price,
          tax_price: values.tax_price,
          size_text: values.size_text,
          color_text: values.color_text,
          size_id: values.size_id[0],
          color_id: values.color_id[0],
          maker_id: values.maker_id[0],
          supplier_id: values.supplier_id[0],
          notes: values.notes
        };

        createProduct(obj)
          .then(res => {
            this.openNotificationWithIcon("success", "Create product success");
            localStorage.removeItem("copyUser");
            this.props.history.push("/products");
          })
          .catch(ex => {
            this.openNotificationWithIcon("error", "Create product fail");
          });
      }
    });
  };

  render() {
    const {
      sizes,
      colors,
      suppliers,
      shops,
      producers,
      loader,
      data
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    
    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">AddProduct</h3>
        </div>

        <Row type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
            {loader ? (
              <div className="posi-absolute on-loader">
                <CircularProgress />
              </div>
            ) : null}
            <Card>
              <Form
                {...this.formItemLayout}
                onSubmit={this.handleSubmit}
                className="form-shape"
              >
                <Form.Item label="Product Code">
                  {getFieldDecorator("product_code", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Product Code!"
                      }
                    ],
                    initialValue: data.product_code
                  })(<Input placeholder="Product Code" />)}
                </Form.Item>
                <Form.Item label="Product Name">
                  {getFieldDecorator("product_name", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Product Name!"
                      }
                    ],
                    initialValue: data.product_name
                  })(<Input placeholder="Product Name" />)}
                </Form.Item>
                <Form.Item label="Store Name">
                  {getFieldDecorator("shop_id", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Store Name Avaliable."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.shop_id)
                  })(<Cascader options={shops} />)}
                </Form.Item>
                <Form.Item label="Purchase price">
                  {getFieldDecorator("stock_price", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Purchase price!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Purchase price must be number."
                      }
                    ],
                    initialValue: data.stock_price
                  })(<Input placeholder="Purchase price" />)}
                </Form.Item>
                <Form.Item label="Price don't include tax">
                  {getFieldDecorator("notax_price", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Price!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Price no tax must be number."
                      }
                    ],
                    initialValue: data.notax_price
                  })(<Input placeholder="Price" />)}
                </Form.Item>
                <Form.Item label="Tax included price">
                  {getFieldDecorator("tax_price", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Tax!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Tax must be number."
                      }
                    ],
                    initialValue: data.tax_price
                  })(<Input placeholder="Tax price" />)}
                </Form.Item>
                <Form.Item label="Member price">
                  {getFieldDecorator("member_price", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Member price!"
                      },
                      {
                        pattern: new RegExp("^[0-9]*$"),
                        message: "Member price must be number."
                      }
                    ],
                    initialValue: data.member_price
                  })(<Input placeholder="Member price" />)}
                </Form.Item>
                <Form.Item label="Size">
                  {getFieldDecorator("size_id", {
                    rules: [
                      {
                        type: "array",
                        message: "Please select your Size."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.size_id)
                  })(<Cascader options={sizes} />)}
                </Form.Item>
                <Form.Item label="New size">
                  {getFieldDecorator("size_text", {
                    initialValue: data.size_text
                  })(<Input placeholder="New Size" />)}
                </Form.Item>
                <Form.Item label="Color">
                  {getFieldDecorator("color_id", {
                    rules: [
                      {
                        type: "array",
                        message: "Please select your Color."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.color_id)
                  })(<Cascader options={colors} />)}
                </Form.Item>
                <Form.Item label="New color">
                  {getFieldDecorator("color_text", {
                    initialValue: data.color_text
                  })(<Input placeholder="New Color" />)}
                </Form.Item>
                <Form.Item label="Manufacturer">
                  {getFieldDecorator("maker_id", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Manufacturer."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.maker_id)
                  })(<Cascader options={producers} />)}
                </Form.Item>
                <Form.Item label="Suppliers">
                  {getFieldDecorator("supplier_id", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Supplier."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.supplier_id)
                  })(<Cascader options={suppliers} />)}
                </Form.Item>
                <Form.Item label="Note">
                  {getFieldDecorator("notes", {
                    initialValue: data.notes
                  })(<Input placeholder="Note" />)}
                </Form.Item>
                <div className="dp-flex-jf-center dp-flex">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Link to="/products" className="ant-btn">
                    Back
                  </Link>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(CopyProductPage);
