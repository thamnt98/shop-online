import React, { Component } from "react";
import { Modal, Form, Cascader, Button, Upload, Icon, message } from "antd";
import "../../../styles/customerStyle/index.css";

class UploadFile extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  renderInitCascader = value => {
    if (!value) return [];

    return [value];
  };

  formItemLayout = {
    labelCol: {
      sm: { span: 8 }
    },
    wrapperCol: {
      sm: { span: 16 }
    }
  };

  handleUpload = e => {
    e.preventDefault();

    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
      }
    });
  };

  defaultSetting = {
    name: "file",
    multiple: true,
    action: "https://www.mocky.io/v2/5cc8019d3000009",
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    }
  };

  render() {
    const { Dragger } = Upload;
    const { visible, onClose } = this.props;
    const { getFieldDecorator } = this.props.form;

    return (
      <Modal
        title="Upload file CSV"
        visible={visible}
        onCancel={onClose}
        footer={false}
      >
        <Form {...this.formItemLayout} onSubmit={this.handleUpload}>
          <Form.Item label="Store Name Avaliable">
            {getFieldDecorator("shop", {
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your Store Name Avaliable."
                }
              ],
              initialValue: this.renderInitCascader(1)
            })(<Cascader options={[]} />)}
          </Form.Item>
          <Form.Item label="Supplier Name Avaliable">
            {getFieldDecorator("supplier", {
              rules: [
                {
                  type: "array",
                  required: true,
                  message: "Please select your Supplier Name Avaliable."
                }
              ],
              initialValue: this.renderInitCascader(1)
            })(<Cascader options={[]} />)}
          </Form.Item>
          <div className="dp-flex-jf-center dp-flex">
            <Dragger {...this.defaultSetting}>
              <p className="ant-upload-drag-icon">
                <Icon type="inbox" />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from
                uploading company data or other band files
              </p>
            </Dragger>
          </div>

          <div className="dp-flex-jf-center dp-flex mt-10">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </div>
        </Form>
      </Modal>
    );
  }
}

export default Form.create({ name: "upload" })(UploadFile);
