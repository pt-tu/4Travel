import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from 'dayjs';

const { TextArea } = Input;

function AddCustomer() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams();
  const CustomerData = useGetCustomerByCID(id ?? "");
  
  

  const [hoten, sethoten] = useState(CustomerData.data?.hoten);
  const [cccd, setcccd] = useState(CustomerData.data?.cccd);
  const [sdt, setsdt] = useState(CustomerData.data?.sdt);
  const [email, setemail] = useState(CustomerData.data?.email);
  const [ngaysinh, setngaysinh] = useState(CustomerData.data?.ngaysinh);
  const [diachi, setdiachi] = useState(CustomerData.data?.diachi);
  const [ghichu, setghichu] = useState(CustomerData.data?.ghichu);
  const [yeucau, setyeucau] = useState(CustomerData.data?.yeucau);

 


  const createCustomer = useCreateCustomer(
    {
      hoten: hoten,
      cccd: cccd,
      sdt: sdt,
      email: email,
      ngaysinh: ngaysinh,
      diachi: diachi,
      ghichu: ghichu,
      yeucau: yeucau,
    },
    id ?? ""
  );

  if (createCustomer.isSuccess) {
    message.success("Thêm thành công");
    navigate(-1);
    createCustomer.reset();
  } else if (createCustomer.error instanceof Error) {
    message.error("Thêm thất bại. Lỗi: " + createCustomer.error.message);
  }


  return (
    <div className="wrapper">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className="ButtonUp"
        onClick={() => navigate(-1)}
      >
        {" "}
        <b>Quay lại</b>
      </Button>

      <h1 className="pageTitle">Thông tin khách hàng</h1>

      <Form
        form={form}
        labelCol={{ span: 3 }}
        labelAlign="left"
        onFinish={() => createCustomer.mutate()}
      >
        <Row justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name={"name"}
              label="Họ và tên"
              initialValue={CustomerData.data?.hoten}
              rules={[{ required: true, message: "Nhập họ tên" }]}
            >
              <Input onChange={(e) => sethoten(e.target.value)} />
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"cic"}
              label="CMND/CCCD"
              initialValue={cccd}
              rules={[{ required: true, message: "Nhập CCCD" }]}
            >
              <Input onChange={(e) => setcccd(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>

        <Row justify={"space-between"}>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              wrapperCol={{ span: 17 }}
              name={"phone"}
              label="Số điện thoại"
              initialValue={sdt}
              rules={[{ required: true, message: "Nhập SĐT" }]}
            >
              <Input onChange={(e) => setsdt(e.target.value)} />
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item labelCol={{ span: 6 }} name={"email"} label="Email" initialValue={email}>
              <Input onChange={(e) => setemail(e.target.value)} />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name={"bday"}
          label="Ngày sinh"
          rules={[{ required: true, message: "Nhập ngày sinh" }]}
        >
          <DatePicker
            placeholder="DD/MM/YY"
            format={"DD/MM/YY"}
            onChange={(e) => setngaysinh(e?.toISOString() ?? "")}
            defaultValue={dayjs(ngaysinh)}
          />
        </Form.Item>

        <Form.Item
          name={"address"}
          label="Địa chỉ"
          initialValue={diachi}
          rules={[{ required: true, message: "Nhập địa chỉ" }]}
        >
          <Input
            className="longInput"
            onChange={(e) => setdiachi(e.target.value)}
          />
        </Form.Item>

        <Form.Item name={"notes"} label="Ghi chú" initialValue={ghichu}>
          <TextArea rows={5} onChange={(e) => setghichu(e.target.value)} />
        </Form.Item>

        <Form.Item name={"adhocreq"} label="Yêu cầu đặc biệt" initialValue={yeucau}>
          <TextArea rows={5} onChange={(e) => setyeucau(e.target.value)} />
        </Form.Item>

        <Form.Item className="submitButton">
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddCustomer;
