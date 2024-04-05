import { Col, Row, Form, Input, FormInstance } from "antd";
import React, { useEffect } from "react";
import { useImperativeHandle, useRef } from "react";
import { useLocation } from "react-router-dom";

function ContactInfo(props: any, ref: React.Ref<FormInstance | undefined>) {
  // This is confusing, but for now it's the only way to get the form instance
  const [form] = Form.useForm(); // Form instance used inside this component to get validation status
  const contactInfo = useRef<FormInstance>(); // Form instance referenced by parent component to trigger form validation

  useImperativeHandle(ref, () => contactInfo.current);
  // use global color variables
  const contactForm = { backgroundColor: "#e6e6e6", padding: 10 };
  const padRight = { paddingRight: 5 };
  const padLeft = { paddingLeft: 5 };

  return (
    <div className="contact">
      <h3>Thông tin liên lạc</h3>
      <Form
        form={form}
        ref={contactInfo as React.Ref<FormInstance>}
        style={contactForm}
        layout="vertical"
      >
        <Row>
          <Col span={12} style={padRight}>
            <Form.Item
              name={"name"}
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
              label="CMND/CCCD"
            >
              <Input
                value={props.cccd}
                onChange={(e) => {
                  props.setcccd(e.target.value);
                  props.setretrymutate(true);
                }}
              />
            </Form.Item>
          </Col>
        </Row>

        <Row>
          <Col span={12} style={padRight}>
            <Form.Item
              name={"phone"}
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
