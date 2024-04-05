import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Form.css";
import {
  Col,
  Row,
  Button,
  DatePicker,
  Form,
  Input,
  message,
  ConfigProvider,
} from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

function AddCustomer() {
  const [form] = Form.useForm();
  const { TextArea } = Input;
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

  return (
    <div className="wrapper">
      <ConfigProvider theme={{ token: { colorPrimary: "#4B268F" } }}>
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
        >
          <Row justify={"space-between"}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 6 }}
                wrapperCol={{ span: 17 }}
                name={"name"}
                label="Họ và tên"
              >
                <Input onChange={(e) => sethoten(e.target.value)} />
              </Form.Item>
            </Col>

            <Col span={11}>
              <Form.Item
                labelCol={{ span: 6 }}
                name={"cic"}
                label="CMND/CCCD"
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
            <Button
              type="primary"
              htmlType="submit"
              style={{ boxShadow: "none", color: "White" }}
            >
              Xác nhận
            </Button>
          </Form.Item>
        </Form>
      </ConfigProvider>
    </div>
  );
}

export default AddCustomer;
