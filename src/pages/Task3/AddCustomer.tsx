import React from "react";
import { DatePicker, Form, Input } from "antd";

const { TextArea } = Input;

const AddCustomer: React.FC = () => {
  return (
    <div className="AddEdit">
      <h3>Quay lại</h3>
      <h1>THÔNG TIN KHÁCH HÀNG</h1>
      <Form labelCol={{ span: 4 }} wrapperCol={{ span: 14 }}>
        <Form.Item name={"name"} required label="Họ và tên">
          <Input />
        </Form.Item>
        <Form.Item name={"cic"} required label="CCCD">
          <Input />
        </Form.Item>
        <Form.Item name={"tel"} required label="Số điện thoại">
          <Input />
        </Form.Item>
        <Form.Item name={"email"} label="Email">
          <Input />
        </Form.Item>
        <Form.Item name={"bday"} required label="Ngày sinh">
          <DatePicker />
        </Form.Item>
        <Form.Item name={"address"} required label="Địa chỉ">
          <Input />
        </Form.Item>
        <Form.Item name={"note"} label="Ghi chú">
          <TextArea />
        </Form.Item>
        <Form.Item name={"special"} label="Yêu cầu đặc biệt">
          <TextArea />
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddCustomer;
