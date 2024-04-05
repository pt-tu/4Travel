import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Form.css";
import { Button, Form, Input, ConfigProvider, Select } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

function AddDevice() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const deviceid = location.state ? location.state.id ?? "" : "";
  const [name, setname] = useState(
    location.state ? location.state.name ?? "" : ""
  );
  const [id_staff, setid_staff] = useState(
    location.state ? location.state.id_staff ?? "" : ""
  );
  const [status, setstatus] = useState(
    location.state ? location.state.status ?? "unoccupied" : "unoccupied"
  );

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

        <h1 className="pageTitle">Thông tin thiết bị</h1>

        <Form
          form={form}
          labelCol={{ span: 3 }}
          labelAlign="left"
        >
          <Form.Item
            name={"name"}
            label="Tên thiết bị"
          >
            <Input
              className="longInput"
              value={name}
              onChange={(e) => setname(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name={"id_staff"}
            label="Người quản lý"
          >
            <Input
              className="longInput"
              value={id_staff}
              onChange={(e) => setid_staff(e.target.value)}
            />
          </Form.Item>

          <Form.Item
            name={"status"}
            label="Trạng thái"
          >
            <Select
              style={{ width: "200px" }}
              showSearch
              onChange={(e) => setstatus(e)}
              defaultValue={status}
              options={[
                { value: "unoccupied", label: "unoccupied" },
                { value: "occupied", label: "occupied" },
              ]}
            />
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

export default AddDevice;
