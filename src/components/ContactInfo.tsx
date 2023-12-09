import { Col, Row, Form, Input } from "antd";

function ContactInfo() {
  // use global color variables
  const contactForm = { backgroundColor: "#e6e6e6", padding: 10 };
  const padRight = { paddingRight: 5 };
  const padLeft = { paddingLeft: 5 };
  return (
    <div className="contact">
      <h3>Thông tin liên lạc</h3>
      <Form style={contactForm} layout="vertical">
        <Row>
          <Col span={12} style={padRight}>
            <Form.Item name={"name"} required label="Họ và tên">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={padLeft}>
            <Form.Item name={"cic"} required label="CMND/CCCD">
              <Input />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={padRight}>
            <Form.Item name={"phone"} required label="Số điện thoại">
              <Input />
            </Form.Item>
          </Col>
          <Col span={12} style={padLeft}>
            <Form.Item name={"email"} label="Email">
              <Input />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default ContactInfo;
