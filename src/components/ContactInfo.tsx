import { Col, Row, Form, Input, FormInstance } from "antd";
import React from "react";
import { useImperativeHandle, useRef } from "react";

function ContactInfo(props: any, ref: React.Ref<FormInstance | undefined>) {
  // This is confusing, but for now it's the only way to get the form instance
  const [form] = Form.useForm(); // Form instance used inside this component to get validation status
  const contactInfo = useRef<FormInstance>(); // Form instance referenced by parent component to trigger form validation

  useImperativeHandle(ref, () => contactInfo.current);
  // use global color variables
  const contactForm = { backgroundColor: "#e6e6e6", padding: 10 };
  const padRight = { paddingRight: 5 };
  const padLeft = { paddingLeft: 5 };

  function handleFinish() {
    const validationerror = form
      .getFieldsError()
      .filter(({ errors }) => errors.length).length;
    if (!!validationerror) {
      return;
    } else {
      props.onContactInfoFinish();
    }
  }

  return (
    <div className="contact">
      <h3>Thông tin liên lạc</h3>
      <Form
        form={form}
        ref={contactInfo as React.Ref<FormInstance>}
        style={contactForm}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Row>
          <Col span={12} style={padRight}>
            <Form.Item
              name={"name"}
              rules={[{ required: true, message: "Nhập họ tên" }]}
              label="Họ và tên"
            >
              <Input
                value={props.hoten}
                onChange={(e) => props.sethoten(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12} style={padLeft}>
            <Form.Item
              name={"cic"}
              rules={[{ required: true, message: "Nhập CMND/CCCD" }]}
              label="CMND/CCCD"
            >
              <Input
                value={props.cccd}
                onChange={(e) => props.setcccd(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col span={12} style={padRight}>
            <Form.Item
              name={"phone"}
              rules={[{ required: true, message: "Nhập số điện thoại" }]}
              label="Số điện thoại"
            >
              <Input
                value={props.sdt}
                onChange={(e) => props.setsdt(e.target.value)}
              />
            </Form.Item>
          </Col>
          <Col span={12} style={padLeft}>
            <Form.Item name={"email"} label="Email">
              <Input
                value={props.email}
                onChange={(e) => props.setemail(e.target.value)}
              />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default React.forwardRef(ContactInfo);
