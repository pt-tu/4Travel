import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import "./Form.css";
import { Col, Row, Button, DatePicker, Form, Input, message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const { TextArea } = Input;

function AddCustomer() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const { id } = useParams();
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
