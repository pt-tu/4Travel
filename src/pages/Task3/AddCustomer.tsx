import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

function AddCustomer() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const customerid = location.state ? location.state.id ?? "" : "";
  const [hoten, sethoten] = useState("");
  const [cccd, setcccd] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");
  const [ngaysinh, setngaysinh] = useState("");
  const [diachi, setdiachi] = useState("");
  const [ghichu, setghichu] = useState("");
  const [yeucau, setyeucau] = useState("");

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
    customerid
  );

  if (createCustomer.isSuccess) {
    message.success("Cập nhật thông tin thành công");
    navigate(-1);
    createCustomer.reset();
  }
  if (createCustomer.isError && createCustomer.error instanceof Error) {
    message.error("Thêm thất bại. Lỗi: " + createCustomer.error.message);
  }

  const getcustomer = useGetCustomerByCID(customerid);

  if (getcustomer.isError && customerid && getcustomer.error instanceof Error) {
    message.error(getcustomer.error.message);
  }

  useEffect(() => {
    if (getcustomer.data) {
      sethoten(getcustomer.data.hoten);
      setcccd(getcustomer.data.cccd);
      setsdt(getcustomer.data.sdt);
      setemail(getcustomer.data.email);
      setngaysinh(
        getcustomer.data.ngaysinh
          ? dayjs(getcustomer.data.ngaysinh).toISOString()
          : ""
      );
      setdiachi(getcustomer.data.diachi);
      setghichu(getcustomer.data.ghichu);
      setyeucau(getcustomer.data.yeucau);

      form.setFieldsValue({
        name: getcustomer.data.hoten,
        cic: getcustomer.data.cccd,
        phone: getcustomer.data.sdt,
        email: getcustomer.data.email,
        bday: getcustomer.data.ngaysinh ? dayjs(getcustomer.data.ngaysinh) : "",
        address: getcustomer.data.diachi,
        notes: getcustomer.data.ghichu,
        adhocreq: getcustomer.data.yeucau,
      });
    }
  }, [customerid, getcustomer.data]);

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
              rules={[{ required: true, message: "Nhập SĐT" }]}
            >
              <Input onChange={(e) => setsdt(e.target.value)} />
            </Form.Item>
          </Col>

          <Col span={11}>
            <Form.Item labelCol={{ span: 6 }} name={"email"} label="Email">
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
          />
        </Form.Item>

        <Form.Item
          name={"address"}
          label="Địa chỉ"
          rules={[{ required: true, message: "Nhập địa chỉ" }]}
        >
          <Input
            className="longInput"
            onChange={(e) => setdiachi(e.target.value)}
          />
        </Form.Item>

        <Form.Item name={"notes"} label="Ghi chú">
          <TextArea rows={5} onChange={(e) => setghichu(e.target.value)} />
        </Form.Item>

        <Form.Item name={"adhocreq"} label="Yêu cầu đặc biệt">
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
