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
  getProduct,
  updateProduct,
  addSize,
  addColor
} from "../../../service/handleRequest";

class AddProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      shops: [],
      sizes: [],
      colors: [],
      producers: [],
      suppliers: [],
      productId: 0,
      data: {
        productCode: "",
        productName: "",
        shop: "",
        stockPrice: "",
        noTaxPrice: "",
        taxPrice: "",
        memberPrice: "",
        size: "",
        sizeText: "",
        color: "",
        colorText: "",
        producer: "",
        supplier: "",
        note: ""
      }
    };
  }

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  componentDidMount() {
    const productId = this.props.match.params.id;

    this.setState({ productId });

    if (productId) {
      getProduct(productId).then(res => {
        const { data } = this.state;
        data.productCode = res.data.attributes.product_code;

        data.shop = res.data.attributes.shop_id;
        data.productName = res.data.attributes.product_name;
        data.productCode = res.data.attributes.product_code;
        data.memberPrice = res.data.attributes.member_price;
        data.stockPrice = res.data.attributes.stock_price;
        data.noTaxPrice = res.data.attributes.notax_price;
        data.taxPrice = res.data.attributes.tax_price;
        data.sizeText = res.data.attributes.size_name;
        data.colorText = res.data.attributes.color_name;
        data.size = res.data.attributes.size_id;
        data.color = res.data.attributes.color_id;
        data.producer = res.data.attributes.maker_id;
        data.supplier = res.data.attributes.supplier_id;
        data.note = res.data.attributes.notes;

        this.setState({ data, loader: false });
      });
    }

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
      .catch(ex => {
        this.openNotificationWithIcon('error', 'Server error');
      });

    getSize(1, 5000).then(res => {
      const sizes = res.data.data.map(size => {
        return {
          label: size.size_name,
          value: size.id
        };
      });

      this.setState({ sizes });
    });

    listColor(1, 10000).then(res => {
      const colors = res.data.data.map(color => {
        return {
          label: color.color_name,
          value: color.id
        };
      });

      this.setState({ colors });
    });

    getListProducer(1).then(res => {
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
  }

  renderInitCassader = value => {
    if (!value) return [];

    return [value];
  };

  renderTitleHeader = () => {
    const { id, url } = this.props.match.params;

    return id ? "Update Product" : "Create Product";
  };

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };
  handleSubmit = async e => {
    const { productId, colors, sizes } = this.state;
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        let id_size = -1;
        let id_color = -1;

        //check size
        if (values.sizeText) {
          for (var i = 0; i < sizes.length; i++) {
            if (sizes[i].label === values.sizeText) {
              id_size = sizes[i].value;
            }
          }
          if (id_size === -1) {
            const data = { size_name: values.sizeText };
            await addSize(data).then(res => {
              id_size = res.data.id;
            });
          }
        } else if (values.size[0]) {
          id_size = values.size[0];
        }

        //check color
        if (values.colorText) {
          for (var i = 0; i < colors.length; i++) {
            if (colors[i].label === values.colorText) {
              id_color = colors[i].value;
            }
          }
          if (id_color === -1) {
            const data = { color_name: values.colorText };
            await addColor(data).then(res => {
              id_color = res.data.id;
            });
          }
        } else if (values.color[0]) {
          id_color = values.color[0];
        }

        const obj = {
          shop_id: values.shop[0],
          product_name: values.productName,
          product_code: values.productCode,
          member_price: values.memberPrice,
          stock_price: values.purchase,
          notax_price: values.noTaxPrice,
          tax_price: values.taxPrice,
          size_id: id_size,
          color_id: id_color,
          maker_id: values.produrce[0],
          supplier_id: values.supplier[0],
          notes: values.note
        };

        if (!productId) {
          this.doCreateProduct(obj);
        }

        if (productId) {
          this.doUpdateProduct(obj, productId);
        }
      }
    });
  };

  doUpdateProduct = (data, id) => {
    updateProduct(data, id)
      .then(res => {
        this.openNotificationWithIcon("success", "Update product success");

        this.props.history.replace(`/products`);
      })
      .catch(es => {
        this.openNotificationWithIcon("error", "Update product falid");
      });
  };

  doCreateProduct(data) {
    createProduct(data)
      .then(res => {
        this.openNotificationWithIcon("success", "Create product success");

        this.props.history.push(`/products`);
      })
      .catch(es => {
        this.openNotificationWithIcon("error", "Create product falid");
      });
  }

  handleClickCopy = e => {
    const { productId } = this.state;
    this.props.form.validateFields((err, values) => {
      const obj = {
        shop_id: values.shop[0],
        product_name: values.productName,
        product_code: values.productCode,
        member_price: values.memberPrice,
        stock_price: values.purchase,
        notax_price: values.noTaxPrice,
        tax_price: values.taxPrice,
        size_text: values.sizeText,
        color_text: values.colorText,
        size_id: values.size[0],
        color_id: values.color[0],
        maker_id: values.produrce[0],
        supplier_id: values.supplier[0],
        notes: values.note
      };

      localStorage.setItem("copyUser", JSON.stringify(obj));
      this.props.history.push(`/products/edit-copy/` + productId);
    });
  };

  render() {
    const {
      loader,
      shops,
      sizes,
      colors,
      producers,
      suppliers,
      data
    } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">{this.renderTitleHeader()}</h3>
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
                  {getFieldDecorator("productCode", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Product Code!"
                      }
                    ],
                    initialValue: data.productCode
                  })(<Input placeholder="Product Code" />)}
                </Form.Item>
                <Form.Item label="Product Name">
                  {getFieldDecorator("productName", {
                    rules: [
                      {
                        required: true,
                        message: "Please input your Product Name!"
                      }
                    ],
                    initialValue: data.productName
                  })(<Input placeholder="Product Name" />)}
                </Form.Item>
                <Form.Item label="Store Name">
                  {getFieldDecorator("shop", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Store Name Avaliable."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.shop)
                  })(<Cascader options={shops} />)}
                </Form.Item>
                <Form.Item label="Purchase price">
                  {getFieldDecorator("purchase", {
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
                    initialValue: data.stockPrice
                  })(<Input placeholder="Purchase price" />)}
                </Form.Item>
                <Form.Item label="Price don't include tax">
                  {getFieldDecorator("noTaxPrice", {
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
                    initialValue: data.noTaxPrice
                  })(<Input placeholder="Price" />)}
                </Form.Item>
                <Form.Item label="Tax included price">
                  {getFieldDecorator("taxPrice", {
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
                    initialValue: data.taxPrice
                  })(<Input placeholder="Tax" />)}
                </Form.Item>
                <Form.Item label="Member price">
                  {getFieldDecorator("memberPrice", {
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
                    initialValue: data.memberPrice
                  })(<Input placeholder="Member price" />)}
                </Form.Item>
                <Form.Item label="Size">
                  {getFieldDecorator("size", {
                    rules: [
                      {
                        type: "array",
                        message: "Please select your Size."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.size)
                  })(<Cascader options={sizes} />)}
                </Form.Item>
                <Form.Item label="New size">
                  {getFieldDecorator("sizeText", {
                    initialValue: data.sizeText
                  })(<Input placeholder="New Size" />)}
                </Form.Item>
                <Form.Item label="Color">
                  {getFieldDecorator("color", {
                    rules: [
                      {
                        type: "array",
                        message: "Please select your Color."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.color)
                  })(<Cascader options={colors} />)}
                </Form.Item>
                <Form.Item label="New color">
                  {getFieldDecorator("colorText", {
                    initialValue: data.colorText
                  })(<Input placeholder="New Color" />)}
                </Form.Item>
                <Form.Item label="Manufacturer">
                  {getFieldDecorator("produrce", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Manufacturer."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.producer)
                  })(<Cascader options={producers} />)}
                </Form.Item>
                <Form.Item label="Suppliers">
                  {getFieldDecorator("supplier", {
                    rules: [
                      {
                        type: "array",
                        required: true,
                        message: "Please select your Supplier."
                      }
                    ],
                    initialValue: this.renderInitCassader(data.supplier)
                  })(<Cascader options={suppliers} />)}
                </Form.Item>
                <Form.Item label="Note">
                  {getFieldDecorator("note", {
                    initialValue: data.note
                  })(<Input placeholder="Note" />)}
                </Form.Item>
                <div className="dp-flex-jf-center dp-flex">
                  <Button type="primary" htmlType="submit">
                    Save
                  </Button>
                  <Link to="/products" className="ant-btn">
                    Back
                  </Link>
                  {this.renderTitleHeader() === 'Update Product'&&<Button type="primary" onClick={this.handleClickCopy}>
                    Copy
                  </Button>}
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(AddProductPage);
