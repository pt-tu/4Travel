import "./AddCustomer.css";
import { Col, Row, Button, DatePicker, Form, Input } from "antd";

const { TextArea } = Input;

function AddCustomer() {
  return (
    <div className="AddEdit">
      <h3>Quay lại</h3>
      <h1>THÔNG TIN KHÁCH HÀNG</h1>
      <Form>
        <Row>
          <Col span={12}>
            <Form.Item name={"name"} required label="Họ và tên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"cic"} required label="CMND/CCCD">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12}>
            <Form.Item name={"phone"} required label="Số điện thoại">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name={"email"} required label="Email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={"bday"} required label="Ngày sinh">
          <DatePicker placeholder="DD/MM/YY" format={"DD/MM/YY"} />
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
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCustomer;
