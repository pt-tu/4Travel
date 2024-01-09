import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import useCreateDevice from "../../hooks/DeviceManagement/useCreateDevice";
import "./Form.css";
import { Button, Form, Input, message, ConfigProvider, Select } from "antd";
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

  const createDevice = useCreateDevice(
    {
      name: name,
      id_staff: id_staff,
      status: status,
    },
    deviceid
  );

  if (createDevice.isSuccess) {
    message.success("Cập nhật thông tin thành công");
    navigate(-1);
    createDevice.reset();
  } else if (createDevice.isError && createDevice.error instanceof Error) {
    message.error("Thêm thất bại. Lỗi: " + createDevice.error.message);
  }

  useEffect(() => {
    form.setFieldsValue({
      name: location.state ? location.state.name ?? "" : "",
      id_staff: location.state ? location.state.id_staff ?? "" : "",
    });
  }, [location.state]);

  return (
    <div className="wrapper">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4B268F",
          },
        }}
      >
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
          onFinish={() => createDevice.mutate()}
        >
          <Form.Item
            name={"name"}
            label="Tên thiết bị"
            rules={[{ required: true, message: "Nhập Tên thiết bị" }]}
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
            rules={[{ required: true, message: "Nhập id người quản lý" }]}
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
              style={{width: "200px"}}
              showSearch
              onChange={(e) => setstatus(e)}
              defaultValue={status}
              options={[
                {value: "unoccupied", label: "unoccupied"},
                {value: "occupied", label: "occupied"}
              ]}
            >
            </Select>
          </Form.Item>
          <Form.Item className="submitButton">
            <Button type="primary" htmlType="submit" style={{ boxShadow: "none", color: "White" }}>
              Xác nhận
            </Button>
          </Form.Item>


        </Form>
      </ConfigProvider>
    </div>
  );
}

export default AddDevice;
