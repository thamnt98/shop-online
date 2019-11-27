import React, { Component } from "react";
import "../../../styles/customerStyle/index.css";
import {
  Row,
  Col,
  Collapse,
  Form,
  Input,
  Radio,
  Cascader,
  Table,
  Button,
  Pagination,
  Tag,
  Modal,
  Skeleton,
  notification
} from "antd";
import { Link } from "react-router-dom";
import UploadFile from "./uploadFile";
import CircularProgress from "components/CircularProgress/index";
import SetStock from "./setStock";
import {
  getProducts,
  getStockHistory,
  getSuppliers,
  getListShop,
  getListProducer,
  addStock,
  getProduct,
  moveStore
} from "../../../service/handleRequest";
import UpdateStock from "./updateStock";
import ShipStock from "./shipStock";

class ProductPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      paginate: {
        pageNumber: 1,
        perPage: 15,
        totalPage: 1
      },
      dataSearch: {
        productName: "",
        productCode: "",
        shop: "",
        supplier: "",
        maker: "",
        type: "exact"
      },
      visible: false,
      visibleStockModal: false,
      modelSetStock: {
        visible: false,
        productId: 0,
        productName: "",
        productCode: "",
        stock: 0
      },
      modelStock: {
        visible: false,
        productId: 0,
        data: []
      },
      moveProduct: {
        visible: false,
        productId: 0,
        data: []
      },
      loader: true,
      products: [],
      shops: [],
      suppliers: [],
      producers: [],
      product: []
    };
  }

  defaultSearch = [
    {
      value: "all",
      label: "All"
    }
  ];

  openNotificationWithIcon = (type, message) => {
    notification[type]({
      message: message
    });
  };

  handleShowUpdateStock = product => {
    const { modelStock } = this.state;

    modelStock.productId = product.id;
    modelStock.visible = true;

    this.setState({ modelStock, product: product });
  };

  handleShowMoveProduct = product => {
    const { moveProduct } = this.state;

    moveProduct.productId = product.id;
    moveProduct.shopName = product.shop;
    moveProduct.visible = true;

    this.setState({ moveProduct });
  };

  handleShowStockDetail = product => {
    const { modelSetStock } = this.state;

    modelSetStock.productId = product.id;
    modelSetStock.productCode = product.productCode;
    modelSetStock.productName = product.productName;
    modelSetStock.stock = product.stock;
    modelSetStock.visible = true;

    this.setState({ modelSetStock });
  };

  columns = [
    {
      title: "Product Code",
      dataIndex: "productCode",
      key: "productCode"
    },
    {
      title: "Product Name",
      dataIndex: "productName",
      key: "productName",
      render: (productName, product) => {
        return <Link to={"/products/detail/" + product.id}>{productName}</Link>;
      }
    },
    {
      title: "Purchase price",
      dataIndex: "purchase",
      key: "purchase"
    },
    {
      title: "Prices do not include taxes",
      dataIndex: "price",
      key: "price"
    },
    {
      title: "Tax inclusive price",
      dataIndex: "tax",
      key: "tax"
    },
    {
      title: "Size",
      dataIndex: "size",
      key: "size"
    },
    {
      title: "Color",
      dataIndex: "color",
      key: "color"
    },
    {
      title: "Manufacturer",
      dataIndex: "manufacturer",
      key: "manufacturer"
    },
    {
      title: "Suppliers",
      dataIndex: "supplier",
      key: "supplier"
    },
    {
      title: "Store",
      dataIndex: "shop",
      key: "shop"
    },
    {
      title: "Note",
      dataIndex: "note",
      key: "note"
    },
    {
      title: "Stock Number",
      dataIndex: "stock",
      key: "stock",
      render: (stock, product) => {
        return (
          <Tag
            className="ant-btn"
            onClick={() => this.handleShowStockDetail(product)}
          >
            {stock}
          </Tag>
        );
      }
    },
    {
      title: "Add more",
      dataIndex: "id",
      key: "more",
      render: (productId, product) => {
        return (
          <div>
            <Link to={`/products/edit/${productId}`}>
              <Button size="small" type="primary">
                Edit
              </Button>
            </Link>
            <Link to={`/products/copy/${productId}`}>
              <Button size="small" type="primary">
                Copy
              </Button>
            </Link>
            <Link to={`/products/history/${productId}`}>
              <Button size="small" type="primary">
                History
              </Button>
            </Link>
          </div>
        );
      }
    },
    {
      title: "Plus stock",
      dataIndex: "id",
      key: "update",
      render: (productId, product) => {
        return (
          <Tag
            className="ant-btn"
            onClick={() => this.handleShowUpdateStock(product)}
          >
            Plus
          </Tag>
        );
      }
    },
    {
      title: "Move Product",
      dataIndex: "id",
      key: "move",
      render: (productId, product) => {
        return (
          <Tag
            className="ant-btn"
            onClick={() => this.handleShowMoveProduct(product)}
          >
            Move
          </Tag>
        );
      }
    }
  ];

  componentDidMount() {
    const { paginate } = this.state;

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

      this.setState({ suppliers });
    });

    getProducts(paginate.pageNumber, paginate.perPage, "", "", "", "", "", "")
      .then(res => {
        const products = res.data.data.map(product => {
          return {
            id: product.id,
            colorShop: product.attributes.color_shop,
            productCode: product.attributes.product_code,
            productName: product.attributes.product_name,
            purchase: product.attributes.member_price,
            price: product.attributes.notax_price,
            tax: product.attributes.tax_price,
            size: product.attributes.size_name,
            color: product.attributes.color_name,
            manufacturer: product.attributes.maker_name,
            supplier: product.attributes.supplier_name,
            shop: product.attributes.shop_name,
            note: product.attributes.notes,
            stock: product.attributes.stock_number
          };
        });

        paginate.pageNumber = res.data.meta.current_page;
        paginate.perPage = res.data.meta.per_page;
        paginate.totalPage = res.data.meta.total;

        this.setState({ products, paginate, loader: false });
      })
      .catch(ex => {});
  }

  handleOpenModal = () => {
    this.setState({ visible: true });
  };

  handleCloseModal = () => {
    this.setState({ visible: false });
  };

  handleSubmitUpdateStock = e => {
    const { modelStock } = this.state;
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        const obj = {
          id: modelStock.productId,
          value: values._stockNumber
        };

        modelStock.data = [];
        this.setState({ modelStock });
        this.openNotificationWithIcon("success", "Update stock success");
        this.props.history.replace("/products");
      }
    });
  };

  handleSubmit = e => {
    const { paginate, dataSearch, loader } = this.state;
    this.setState({ loader: true });
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        getProducts(
          paginate.pageNumber,
          paginate.perPage,
          values.productCode || "",
          values.productName || "",
          values.shop[0] === "all" ? "" : values.shop[0],
          values.supplier[0] === "all" ? "" : values.supplier[0],
          values.maker[0] === "all" ? "" : values.maker[0],
          values.type
        ).then(res => {
          dataSearch.productCode = values.productCode || "";
          dataSearch.productName = values.productName || "";
          dataSearch.shop = values.shop[0] === "all" ? "" : values.shop[0];
          dataSearch.supplier =
            values.supplier[0] === "all" ? "" : values.supplier[0];
          dataSearch.maker = values.maker[0] === "all" ? "" : values.maker[0];
          dataSearch.type = values.type = values.type;

          const products = res.data.data.map(product => {
            return {
              id: product.id,
              colorShop: product.attributes.color_shop,
              productCode: product.attributes.product_code,
              productName: product.attributes.product_name,
              purchase: product.attributes.member_price,
              price: product.attributes.notax_price,
              tax: product.attributes.tax_price,
              size: product.attributes.size_name,
              color: product.attributes.color_name,
              manufacturer: product.attributes.maker_name,
              supplier: product.attributes.supplier_name,
              shop: product.attributes.shop_name,
              note: product.attributes.notes,
              stock: product.attributes.stock_number
            };
          });

          paginate.pageNumber = res.data.meta.current_page;
          paginate.perPage = res.data.meta.per_page;
          paginate.totalPage = res.data.meta.total;

          this.setState({ products, paginate, dataSearch, loader: false });
        });
      }
    });
  };

  handleReset = () => {
    this.props.form.resetFields();
  };

  handlePagineChange = pageNumber => {
    const { paginate, dataSearch, loader } = this.state;
    this.setState({ loader: true });
    paginate.pageNumber = pageNumber;

    getProducts(
      paginate.pageNumber,
      paginate.perPage,
      dataSearch.productCode || "",
      dataSearch.productName || "",
      dataSearch.shop || "",
      dataSearch.supplier || "",
      dataSearch.maker || "",
      dataSearch.type || ""
    )
      .then(res => {
        const { paginate } = this.state;
        const products = res.data.data.map(product => {
          return {
            id: product.id,
            colorShop: product.attributes.color_shop,
            productCode: product.attributes.product_code,
            productName: product.attributes.product_name,
            purchase: product.attributes.member_price,
            price: product.attributes.notax_price,
            tax: product.attributes.tax_price,
            size: product.attributes.size_name,
            color: product.attributes.color_name,
            manufacturer: product.attributes.maker_name,
            supplier: product.attributes.supplier_name,
            shop: product.attributes.shop_name,
            note: product.attributes.notes,
            stock: product.attributes.stock_number
          };
        });

        paginate.perPage = res.data.meta.per_page;
        paginate.totalPage = res.data.meta.total;

        this.setState({ products, paginate, loader: false });
      })
      .catch(ex => {});
  };

  handlePaginateShowSizeChange = (pageNumber, perPage) => {
    const { paginate, dataSearch } = this.state;
    paginate.pageNumber = pageNumber;
    paginate.perPage = perPage;

    getProducts(
      paginate.pageNumber,
      paginate.perPage,
      dataSearch.productCode || "",
      dataSearch.productName || "",
      dataSearch.shop || "",
      dataSearch.supplier || "",
      dataSearch.maker || "",
      dataSearch.type || ""
    )
      .then(res => {
        const { paginate } = this.state;
        const products = res.data.data.map(product => {
          return {
            id: product.id,
            colorShop: product.attributes.color_shop,
            productCode: product.attributes.product_code,
            productName: product.attributes.product_name,
            purchase: product.attributes.member_price,
            price: product.attributes.notax_price,
            tax: product.attributes.tax_price,
            size: product.attributes.size_name,
            color: product.attributes.color_name,
            manufacturer: product.attributes.maker_name,
            supplier: product.attributes.supplier_name,
            shop: product.attributes.shop_name,
            note: product.attributes.notes,
            stock: product.attributes.stock_number
          };
        });

        paginate.totalPage = res.data.meta.total;

        this.setState({ products, paginate });
      })
      .catch(ex => {});
  };

  renderTable = () => {
    const { paginate, dataSearch } = this.state;

    getProducts(
      paginate.pageNumber,
      paginate.perPage,
      dataSearch.productCode || "",
      dataSearch.productName || "",
      dataSearch.shop || "",
      dataSearch.supplier || "",
      dataSearch.maker || "",
      dataSearch.type || ""
    )
      .then(res => {
        const { paginate } = this.state;
        const products = res.data.data.map(product => {
          return {
            id: product.id,
            colorShop: product.attributes.color_shop,
            productCode: product.attributes.product_code,
            productName: product.attributes.product_name,
            purchase: product.attributes.member_price,
            price: product.attributes.notax_price,
            tax: product.attributes.tax_price,
            size: product.attributes.size_name,
            color: product.attributes.color_name,
            manufacturer: product.attributes.maker_name,
            supplier: product.attributes.supplier_name,
            shop: product.attributes.shop_name,
            note: product.attributes.notes,
            stock: product.attributes.stock_number
          };
        });

        paginate.totalPage = res.data.meta.total;

        this.setState({ products, paginate });
      })
      .catch(ex => {});
  };

  handleCloseModalStock = () => {
    const { modelSetStock } = this.state;

    modelSetStock.visible = false;

    this.setState({ modelSetStock });
    this.renderTable();
  };

  handleCloseModalUpdateStock = () => {
    const { modelStock } = this.state;

    modelStock.visible = false;

    this.setState({ modelStock });
  };

  handleCloseModalMoveProduct = () => {
    const { moveProduct } = this.state;
    moveProduct.visible = false;
    this.setState({ moveProduct });
  };

  renderOnRow = (record, rowIndex) => {
    return {
      style: {
        backgroundColor: record.colorShop
      }
    };
  };

  handleAddMulStock = () => {
    const { modelStock } = this.state;
  };

  handleBlurAdd = e => {
    const { value } = e.target;
    const { modelStock } = this.state;

    const dupStock = modelStock.data.findIndex(stock => {
      return stock.id === modelStock.productId;
    });

    if (dupStock === -1) {
      const obj = {
        id: modelStock.productId,
        value: value
      };

      modelStock.data.push(obj);
    } else {
      modelStock.data[dupStock].value = value;
    }
    this.setState({ modelStock });
  };

  pageSizeOptions = ["15", "30", "50", "100"];

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  handleMoveProduct = data => {
    const { product, moveProduct,products } = this.state;
    const id = moveProduct.productId;
    getProduct(id).then(res => {
      this.setState(
        {
          product: res.data.attributes
        },
        () => {
          const { product } = this.state;
          const product1 = {
            ...product,
            new_shop_id: data["shop"][0],
            quantity: data.stockNumber,
            id: id
          };
          this.setState({ product: product1 }, () => {
            moveStore(this.state.product)
              .then(res => {
                const index = products.findIndex(product => {
                  return product.id === moveProduct.productId;
                });
                products[index].stock -=  (+data.stockNumber);
                this.setState({products});
                this.openNotificationWithIcon(
                  "success",
                  "Move product success"
                );
              })
              .catch(ex => {
                this.openNotificationWithIcon("error", "Move product   fail");
              });
          });
        }
      );
    });
  };

  handleUpdateStock = data => {
    const { modelStock, products } = this.state;
    const mapData = {
      product_id: modelStock.productId,
      add_number: data.stockNumber
    };

    addStock(mapData)
      .then(res => {
        const index = products.findIndex(product => {
          return product.id === modelStock.productId;
        });

        products[index].stock +=  (+data.stockNumber);

        this.openNotificationWithIcon("success", "Plus stock success");
      })
      .catch(ex => {
        this.openNotificationWithIcon("error", "Plus stock fail");
      });
  };

  render() {
    const { Panel } = Collapse;
    const {
      paginate,
      visible,
      modelSetStock,
      loader,
      products,
      shops,
      suppliers,
      producers,
      modelStock,
      moveProduct
    } = this.state;
    const { getFieldDecorator } = this.props.form;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Goods Management</h3>
        </div>

        <div className="search-area bg-while">
          <div className="pt-10 ml-10">
            <Link to="/products/new" className="ant-btn ant-btn-primary">
              Add Product
            </Link>
          </div>
          <Collapse defaultActiveKey={[1]}>
            <Panel header="Search" key="1">
              <Form layout="vertical" onSubmit={this.handleSubmit}>
                <div className="group-input dp-flex">
                  <div className="grop-input-row">
                    <Form.Item label="Product Code">
                      {getFieldDecorator("productCode")(
                        <Input placeholder="Product code" />
                      )}
                    </Form.Item>
                    <Form.Item label="Product Name">
                      {getFieldDecorator("productName")(
                        <Input placeholder="Product name" />
                      )}
                    </Form.Item>
                    <Form.Item label="Manufacturer">
                      {getFieldDecorator("maker", {
                        rules: [
                          {
                            type: "array"
                          }
                        ],
                        initialValue: ["all"]
                      })(
                        <Cascader
                          options={[...this.defaultSearch, ...producers]}
                        />
                      )}
                    </Form.Item>
                  </div>
                  <div className="grop-input-row">
                    <Form.Item label="Suppliers">
                      {getFieldDecorator("supplier", {
                        rules: [
                          {
                            type: "array"
                          }
                        ],
                        initialValue: ["all"]
                      })(
                        <Cascader
                          options={[...this.defaultSearch, ...suppliers]}
                        />
                      )}
                    </Form.Item>
                    <Form.Item label="Shop">
                      {getFieldDecorator("shop", {
                        rules: [
                          {
                            type: "array"
                          }
                        ],
                        initialValue: ["all"]
                      })(
                        <Cascader options={[...this.defaultSearch, ...shops]} />
                      )}
                    </Form.Item>
                    <Form.Item label="Type search">
                      {getFieldDecorator("type", {
                        initialValue: "exact"
                      })(
                        <Radio.Group>
                          <Radio value="exact">Exact</Radio>
                          <Radio value="like">Like</Radio>
                        </Radio.Group>
                      )}
                    </Form.Item>
                  </div>
                  <div className="dp-flex-jf-center dp-flex">
                    <Button htmlType="submit" type="primary">
                      Search
                    </Button>
                    <Button onClick={this.handleReset} type="primary">
                      Reset
                    </Button>
                    <Button type="primary" onClick={this.handleOpenModal}>
                      Import CSV
                    </Button>
                  </div>
                </div>
              </Form>
              <UploadFile
                visible={visible}
                onClose={this.handleCloseModal}
              ></UploadFile>
            </Panel>
          </Collapse>
        </div>
        <Row className="posi-rel" type="flex" justify="center">
          {loader ? (
            <div className="posi-absolute on-loader">
              <CircularProgress />
            </div>
          ) : null}
          <Col span={24} className="pd-0">
            <div className="dp-flex dp-flex-jf-center mt-10 mb-10 pt-10 pb-10 bg-while">
              <Pagination
                showQuickJumper
                showSizeChanger
                defaultCurrent={1}
                current={paginate.pageNumber}
                pageSize={paginate.perPage}
                total={paginate.totalPage}
                pageSizeOptions={this.pageSizeOptions}
                onShowSizeChange={this.handlePaginateShowSizeChange}
                onChange={this.handlePagineChange}
              />
            </div>
            <div className="bg-while pb-10">
              <Table
                onRow={this.renderOnRow}
                size="small"
                columns={this.columns}
                scroll={{ x: 900 }}
                dataSource={products}
                pagination={false}
              ></Table>
              {modelSetStock.visible && (
                <SetStock
                  visible={modelSetStock.visible}
                  modelSetStock={modelSetStock}
                  onClose={this.handleCloseModalStock}
                ></SetStock>
              )}
              {modelStock.visible && (
                <UpdateStock
                  onClose={this.handleCloseModalUpdateStock}
                  onSubmit={this.handleUpdateStock}
                  modelStock={modelStock}
                ></UpdateStock>
              )}
              {moveProduct.visible && (
                <ShipStock
                  onClose={this.handleCloseModalMoveProduct}
                  onSubmit={this.handleMoveProduct}
                  moveProduct={moveProduct}
                ></ShipStock>
              )}
              <div className="dp-flex pt-10 ml-10">
                <Button
                  type="primary"
                  className="mb-0"
                  onClick={this.handleAddMulStock}
                >
                  Add multible stock
                </Button>
                <Button type="primary" className="mb-0">
                  Move multible stock
                </Button>
              </div>
            </div>
            <div className="dp-flex dp-flex-jf-center mt-10 mb-10 pt-10 pb-10 bg-while">
              <Pagination
                showQuickJumper
                showSizeChanger
                defaultCurrent={1}
                current={paginate.pageNumber}
                pageSize={paginate.perPage}
                total={paginate.totalPage}
                pageSizeOptions={this.pageSizeOptions}
                onShowSizeChange={this.handlePaginateShowSizeChange}
                onChange={this.handlePagineChange}
              />
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Form.create()(ProductPage);
