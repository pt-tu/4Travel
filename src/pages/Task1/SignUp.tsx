import React, { useState } from "react";
import Logo4T from "../../images/logo4T.png";
import FormItem from "antd/es/form/FormItem";
import { Button, ConfigProvider, Form, Input } from "antd";
import { Link } from "react-router-dom";
import useCreateUser from "../../hooks/accountsystem/useCreateUser";
// customer sau khi đăng ký
export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [hoten, setName] = useState("");
  const [sdt, setsdt] = useState("");
  let message = "";
  const dangky = useCreateUser({ sdt, hoten, email, password });
  if (dangky.isSuccess) {
    message = "Hãy kiểm tra email của bạn";
  }
  if (dangky.isError) {
    message = (dangky.error as any).message;
  }
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
            <FormItem label="Họ tên" style={{ fontSize: 20 }}>
              <Input
                onChange={(e) => {
                  setName(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Số điện thoại" style={{ fontSize: 20 }}>
              <Input
                onChange={(e) => {
                  setsdt(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Email" style={{ fontSize: 20 }}>
              <Input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Mật khẩu" style={{ fontSize: 20 }}>
              <Input
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></Input>
            </FormItem>
            <FormItem label="Xác nhận mật khẩu" style={{ fontSize: 20 }}>
              <Input></Input>
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
                onClick={() => {
                  dangky.mutate();
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
