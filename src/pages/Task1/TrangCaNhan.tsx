import React, { useState } from "react";
import Logo4T from "../../images/logo4T.png";
import FormItem from "antd/es/form/FormItem";
import { Button, Form, Input, message } from "antd";
import { Link, useNavigate } from "react-router-dom";
import useLogin from "../../hooks/accountsystem/useLogin";
import useUser from "../../hooks/accountsystem/useUser";
import useUpdateMetadata from "../../hooks/useUpdateMetadata";

export default function TrangCaNhan() {
  const getu = useUser();
  const [email, setemail] = useState(getu.data?.email);
  const [ten, seteten] = useState(getu.data?.user_metadata.ten);
  const [cccd, setcccd] = useState(getu.data?.user_metadata.cccd);
  const [diachi, setdiachi] = useState(getu.data?.user_metadata.diachi);
  const [sdt, setstd] = useState(getu.data?.user_metadata.sdt);
  const nav = useNavigate();
  const user = {
    ten: ten,
    cccd: cccd,
    sdt: sdt,
    diachi: diachi,
  };
  const updatemetadata = useUpdateMetadata(user);
  if (updatemetadata.isSuccess) {
    message.success("Cập nhật thông tin thành công, bạn sẽ quay lại trang chủ");
    setTimeout(() => {
      nav("/");
    }, 1000);
  }

  return (
    <div>
      <h2 style={{ marginTop: 30 }}>Thông tin tài khoản</h2>
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
              disabled
              value={getu.data?.email}
            ></Input>
          </FormItem>
          <FormItem label="Họ tên" style={{ fontSize: 20 }}>
            <Input
              defaultValue={getu.data?.user_metadata.ten}
              onChange={(e) => {
                seteten(e.target.value);
              }}
            ></Input>{" "}
          </FormItem>
          <FormItem label="CCCD" style={{ fontSize: 20 }}>
            <Input
              defaultValue={getu.data?.user_metadata.cccd}
              onChange={(e) => {
                setcccd(e.target.value);
              }}
            ></Input>
          </FormItem>
          <FormItem label="Địa chỉ" style={{ fontSize: 20 }}>
            <Input
              defaultValue={getu.data?.user_metadata.diachi}
              onChange={(e) => {
                setdiachi(e.target.value);
              }}
            ></Input>
          </FormItem>
          <FormItem label="Số điện thoại" style={{ fontSize: 20 }}>
            <Input
              defaultValue={getu.data?.user_metadata.sdt}
              onChange={(e) => {
                setstd(e.target.value);
              }}
            ></Input>
          </FormItem>

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
                updatemetadata.mutate();
              }}
            >
              Cập nhật
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}
