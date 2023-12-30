import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input } from "antd";

const { TextArea } = Input;

function AddCustomer() {
  return (
    <div className="wrapper">
      <h3>Quay lại</h3>
      <h1 className="pageTitle">Thông tin khách hàng</h1>
      <Form labelCol={{ span: 3 }} labelAlign="left">
        <Row justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name={"name"}
              label="Họ và tên"
              rules={[{ required: true, message: "Nhập họ tên" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"cic"}
              label="CMND/CCCD"
              rules={[{ required: true, message: "Nhập CMND/CCCD" }]}
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name={"phone"}
              label="Số điện thoại"
              rules={[{ required: true, message: "Nhập số điện thoại" }]}
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item labelCol={{ span: 6 }} name={"email"} label="Email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item
          name={"bday"}
          label="Ngày sinh"
          rules={[{ required: true, message: "Nhập ngày sinh" }]}
        >
          <DatePicker placeholder="DD/MM/YY" format={"DD/MM/YY"} />
        </Form.Item>
        <Form.Item
          name={"address"}
          label="Địa chỉ"
          rules={[{ required: true, message: "Nhập địa chỉ" }]}
        >
          <Input className="longInput" />
        </Form.Item>
        <Form.Item name={"note"} label="Ghi chú">
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item name={"special"} label="Yêu cầu đặc biệt">
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item className="submitButton">
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCustomer;
