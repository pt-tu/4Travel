import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function DoiMatKhau() {
  let message1 = "";

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
          <FormItem label="Nhập mật khẩu mới" 
          style={{ fontSize: 20 }}
          name="password"
          >
            <Input
              type="password"
            ></Input>
          </FormItem>
          {message1}

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
            >
              Xác nhận
            </Button>
            <Link to="/dang-nhap" style={{ color: "#4B268F", marginTop: 30 }}>
              Quay lại đăng nhập
            </Link>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default DoiMatKhau;
