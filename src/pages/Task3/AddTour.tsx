import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input, Select } from "antd";

const { TextArea } = Input;

function AddTour() {
  return (
    <div className="wrapper">
      <h3>Quay lại</h3>
      <h1 className="pageTitle">Thông tin tour</h1>
      <Form labelCol={{ span: 3 }} labelAlign="left">
        <Form.Item
          name={"name"}
          label="Tên tour"
          rules={[{ required: true, message: "Nhập tên tour" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name={"tgid"}
          label="Mã hướng dẫn viên"
          rules={[{ required: true, message: "Nhập mã HDV" }]}
        >
          <Input className="shortInput" />
        </Form.Item>
        <Form.Item name={"tgname"} label="Tên hướng dẫn viên">
          <Input disabled className="shortInput" />
        </Form.Item>
<<<<<<< HEAD
        <Form.Item name={"origin"} required label="Điểm đi">
          <Select placeholder="Địa điểm" mode="multiple" />
        </Form.Item>
        <Form.Item name={"destination"} required label="Điểm đến">
          <Select placeholder="Địa điểm" mode="multiple" />
=======
        <Form.Item
          name={"origin"}
          label="Điểm đi"
          rules={[{ required: true, message: "Nhập điểm đi" }]}
        >
          <Select placeholder="Địa điểm" />
        </Form.Item>
        <Form.Item
          name={"destination"}
          label="Điểm đến"
          rules={[{ required: true, message: "Nhập điểm đến" }]}
        >
          <Select placeholder="Địa điểm" />
>>>>>>> origin/task-3
        </Form.Item>
        <Form.Item
          name={"hotel"}
          label="Khách sạn"
          rules={[{ required: true, message: "Nhập khách sạn" }]}
        >
          <Input className="shortInput" />
        </Form.Item>
        <Row>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"start"}
              label="Thời gian bắt đầu"
              rules={[{ required: true, message: "Nhập thời gian bắt đầu" }]}
            >
              <DatePicker placeholder="DD/MM/YY" format={"DD/MM/YY"} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"end"}
              label="Thời gian kết thúc"
              rules={[{ required: true, message: "Nhập thời gian kết thúc" }]}
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
