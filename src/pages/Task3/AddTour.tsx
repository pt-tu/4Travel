import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input, Select } from "antd";

const { TextArea } = Input;

function AddTour() {
  return (
    <div className="wrapper">
      <h3>Quay lại</h3>
      <h1 className="pageTitle">Thông tin tour</h1>
      <Form labelCol={{ span: 3 }} labelAlign="left">
        <Form.Item name={"name"} required label="Tên tour">
          <Input />
        </Form.Item>
        <Form.Item name={"tgid"} required label="Mã hướng dẫn viên">
          <Input className="shortInput" />
        </Form.Item>
        <Form.Item name={"tgname"} label="Tên hướng dẫn viên">
          <Input disabled className="shortInput" />
        </Form.Item>
        <Form.Item name={"origin"} required label="Điểm đi">
          <Select placeholder="Địa điểm" mode="multiple" />
        </Form.Item>
        <Form.Item name={"destination"} required label="Điểm đến">
          <Select placeholder="Địa điểm" mode="multiple" />
        </Form.Item>
        <Form.Item name={"hotel"} required label="Khách sạn">
          <Input className="shortInput" />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"start"}
              required
              label="Thời gian bắt đầu"
            >
              <DatePicker placeholder="DD/MM/YY" format={"DD/MM/YY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"end"}
              required
              label="Thời gian kết thúc"
            >
              <DatePicker placeholder="DD/MM/YY" format={"DD/MM/YY"} />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name={"note"} label="Ghi chú">
          <TextArea rows={5} />
        </Form.Item>
        <Form.Item className="submitButton">
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
      {/*thêm upload ảnh tour*/}
    </div>
  );
}

export default AddTour;
