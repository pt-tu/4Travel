import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input } from "antd";

const { TextArea } = Input;

function AddCustomer() {
  return (
    <div className="wrapper">
      <h3>Quay lại</h3>
      <h1 className="pageTitle">THÔNG TIN KHÁCH HÀNG</h1>
      <Form labelCol={{ span: 3 }} labelAlign="left">
        <Row justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name={"name"}
              required
              label="Họ và tên"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"cic"}
              required
              label="CMND/CCCD"
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
              required
              label="Số điện thoại"
            >
              <Input />
            </Form.Item>
          </Col>
          <Col span={11}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"email"}
              required
              label="Email"
            >
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={"bday"} required label="Ngày sinh">
          <DatePicker placeholder="DD/MM/YY" format={"DD/MM/YY"} />
        </Form.Item>
        <Form.Item name={"address"} required label="Địa chỉ">
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
