import React, { useState } from "react";
import Logo4T from "../../images/logo4T.png";
import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/accountsystem/useLogin";

export default function Login() {
  const [email, setemail] = useState("");
  const [password, setepass] = useState("");
  const nav = useNavigate();
  let message = "";
  const login = useLogin({ email, password });
  if (login.isSuccess) {
    nav("/");
    window.location.reload();
  }
  if (login.isError) {
    message = (login.error as any).message;
  }

  return (
    <div>
      <h1 style={{ color: "#4B268F", marginTop: 30 }}>4TRAVEL</h1>
      <div
        style={{
          marginLeft: 300,
          marginRight: 300,
          fontSize: 20,
          fontWeight: 600,
        }}
      >
        <Form layout="vertical">
          <FormItem label="Email" style={{ fontSize: 20 }}>
            <Input
              onChange={(e) => {
                setemail(e.target.value);
              }}
            ></Input>
          </FormItem>
          <FormItem label="Mật khẩu" style={{ fontSize: 20 }}>
            <Input
              onChange={(e) => {
                setepass(e.target.value);
              }}
            ></Input>
          </FormItem>
          {message}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginBottom: 80,
            }}
          >
            <Button
              style={{
                marginTop: 20,
                fontSize: 18,
                height: 40,
                backgroundColor: "#7200E4",
                color: "white",
                fontWeight: "bold",
              }}
              onClick={() => {
                login.mutate();
              }}
            >
              Đăng nhập
            </Button>
            <Link
              to="/quen-mat-khau"
              style={{ color: "#4B268F", marginTop: 30 }}
            >
              Quên mật khẩu?
            </Link>
            <Link to="/dang-ky" style={{ color: "#4B268F", marginTop: 30 }}>
              Chưa có tài khoản?
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}
