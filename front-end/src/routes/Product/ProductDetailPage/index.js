import React, { Component } from "react";
import {Row, Col, Card, Divider} from 'antd';
import CircularProgress from "components/CircularProgress/index";
import "../../../styles/customerStyle/index.css";
import {Link} from 'react-router-dom';
import {getProduct} from '../../../service/handleRequest';

class ProductDetailPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
        loader: true, 
        product: {}
    };
  }

  componentDidMount(){
    const {id} = this.props.match.params;
    getProduct(id).then(res => {
      const {product} = this.state;
      product.id = id;
      product.productName = res.data.attributes.product_name;
      product.productCode = res.data.attributes.product_code;
      product.memberPrice = res.data.attributes.member_price;
      product.sizeName = res.data.attributes.size_name;
      product.colorName = res.data.attributes.color_name
      product.producer = res.data.attributes.maker_name;
      product.supplierName = res.data.attributes.supplier_name;
      product.note = res.data.attributes.notes;
      product.createdDate = res.data.attributes.created_date;
      product.updatedDate = res.data.attributes.updated_date;

      this.setState({product, loader: false});
    })
  }

  render() {
    const {product, loader} = this.state;

    return (
      <div>
        <div className="title-header">
          <h3 className="text-title">Product Detail</h3>
        </div>

        <Row className="" type="flex" justify="center">
          <Col span={24} className="pd-0 posi-rel">
          {loader ? (
            <div className="posi-absolute on-loader" >
              <CircularProgress />
            </div>
          ) : null}
            <Card>
              <Row>
                <Col span={16}>
                  <h4>Id</h4>
                </Col>
                <Col span={8}>{product.id}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Product Name</h4>
                </Col>
                <Col span={8}>{product.productName}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Product Code</h4>
                </Col>
                <Col span={8}>{product.productCode}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Price</h4>
                </Col>
                <Col span={8}>{product.memberPrice}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Size</h4>
                </Col>
                <Col span={8}>{product.sizeName}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Color</h4>
                </Col>
                <Col span={8}>{product.colorName}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Manufacturer</h4>
                </Col>
                <Col span={8}>{product.producer}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Supplier</h4>
                </Col>
                <Col span={8}>{product.supplierName}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Note</h4>
                </Col>
                <Col span={8}>{product.note}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Creation Date</h4>
                </Col>
                <Col span={8}>{product.createdDate}</Col>
              </Row>
              <Divider></Divider>
              <Row>
                <Col span={16}>
                  <h4>Updated Date</h4>
                </Col>
                <Col span={8}>{product.updatedDate}</Col>
              </Row>
              <Divider></Divider>
                <div className="dp-flex-jf-center dp-flex">
                    <Link to={'/products/edit/' + product.id} className="ant-btn ant-btn-primary">Edit</Link>
                  <Link to="/products" className="ant-btn">
                    Back
                  </Link>
                </div>
            </Card>
          </Col>
        </Row>
      </div>
    );
  }
}

export default ProductDetailPage;
