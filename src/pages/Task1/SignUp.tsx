import React, { useState } from "react";
import FormItem from "antd/es/form/FormItem";
import { Button, ConfigProvider, Form, Input } from "antd";
import { Link } from "react-router-dom";
// customer sau khi đăng ký
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hoten, setName] = useState("");
  const [sdt, setsdt] = useState("");
  let message = "";
  return (
    <ConfigProvider
      theme={{
        token: {},
        components: {
          Form: { fontSize: 16 },
        },
      }}
    >
      <div style={{ marginBottom: 50 }}>
        <h1 style={{ color: "#4B268F", marginTop: 30, marginBottom: 30 }}>
          4TRAVEL
        </h1>
        <div
          style={{
            marginLeft: 300,
            marginRight: 300,
            fontSize: 20,
            fontWeight: 600,
          }}
        >
          <Form layout="vertical">
            <FormItem label="Họ tên"
              style={{ fontSize: 20 }}
              name="hoten"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập tên đăng nhập!",
                },
                {
                  min: 6,
                  message: "Tên đăng nhập phải có hơn 6 kí tự!",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Số điện thoại" 
            style={{ fontSize: 20 }}
            name="sdt"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập số điện thoại!",
                }
              ]}
            >
              <Input
                onChange={(e) => {
                  setsdt(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Email"
              style={{ fontSize: 20 }}
              name="email"
              rules={[
                {
                  type: "email",
                  message: "Email không hợp lệ!",
                },
                {
                  required: true,
                  message: "Bạn chưa nhập email",
                },
              ]}
            >
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Mật khẩu"
              style={{ fontSize: 20 }}
              name="password"
            >
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Xác nhận mật khẩu"
              style={{ fontSize: 20 }}
              name="confirm"
            >
              <Input type="password"></Input>
            </FormItem>
            {message}
            <div style={{ display: "flex", flexDirection: "column" }}>
              <Button
                style={{
                  marginTop: 20,
                  fontSize: 16,
                  height: 40,
                  backgroundColor: "#7200E4",
                  color: "white",
                  fontWeight: "bold",
                }}
              >
                Đăng ký
              </Button>
              <Link
                to="/dang-nhap"
                style={{ color: "#4B268F", marginTop: 30, fontSize: 16 }}
              >
                Bạn đã có tài khoản?
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </ConfigProvider>
  );
}
