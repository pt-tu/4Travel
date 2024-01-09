import { Button, Form, Input, message } from "antd";
import FormItem from "antd/es/form/FormItem";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useResetPassword from "../../hooks/accountsystem/useResetPassword";

function DoiMatKhau() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const resetpassword = useResetPassword(password);
  let message1 = "";
  if (resetpassword.isSuccess) {
    message.success("Đổi mật khẩu thành công, bạn sẽ quay lại trang chủ");
    setTimeout(() => {
      window.location.reload();
    }, 500);
    navigate("/");
  }

  if (resetpassword.error) {
    message1 = (resetpassword.error as any).message;
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
          <FormItem label="Nhập mật khẩu mới" 
          style={{ fontSize: 20 }}
          name="password"
              rules={[
                {
                  required: true,
                  message: "Bạn chưa nhập mật khẩu!",
                },
                {
                  pattern: new RegExp(
                    "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$"
                  ),
                  message: "Mật khẩu cần có hơn 6 kí tự và ít nhất 1 chữ, 1 số, một ký tự đặc biệt.",
                },
              ]}
          >
            <Input
              onChange={(e) => {
                setPassword(e.target.value);
              }}
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
              onClick={() => {
                resetpassword.mutate();
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
