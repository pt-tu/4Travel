import React from "react";
import { useState } from "react";
import { Button, ConfigProvider, Input, Table, Space } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "../../components/Task2Component/TourStyle.css";
import "../../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";
import useGetDeviceList from "../../hooks/DeviceManagement/useGetDeviceList";
function DeviceList() {
  const { Search } = Input;
  const [SearchName, setSearchName] = useState("");
  const DeviceList = useGetDeviceList(SearchName);
  if (DeviceList.isSuccess) {
    console.log(DeviceList.data);
  }
  if (DeviceList.isError) {
    console.log("That bai");
  }
  interface DeviceType {
    id: React.Key;
    name: string;
    id_staff:string;
    status: string;
  }
  const columns: ColumnsType<DeviceType> = [
    {
      title: "Tên thiết bị",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Người quản lý",
      dataIndex: "id_staff",
      key: "id_staff",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "",
      key: "key",
      dataIndex: "key",
      width: 50,
      render: (text, record) => (
        <Button
          icon={<FormOutlined />}
          onClick={() => {
            alert(`Bạn đã chọn sửa ${record.name}`);
          }}
        ></Button>
      ),
    },
    {
      title: "",
      key: "key",
      dataIndex: "key",
      width: 50,
      render: (text, record) => (
        <Button
          icon={<DeleteOutlined />}
          danger
          onClick={() => {
            alert(`Bạn đã chọn xóa ${record.name}`);
          }}
        ></Button>
      ),
    },
  ];


  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: DeviceType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: DeviceType) => ({
      disabled: record.name === "Disabled Device", // Column configuration not to be checked
      name: record.name,
    }),
  };
  const [selectionType, setSelectionType] = useState<"checkbox" | "radio">(
    "checkbox"
  );
  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4B268F",
          },
        }}
      >
        <div className="CenterContainer">
          <Search
            placeholder="Nhập tên, mã hàng bạn muốn tìm"
            className="SearchBar"
            allowClear
            enterButton
            size="large"
            style={{ marginTop: "30px" }}
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="ButtonUp"
              >
                {" "}
                <b>Quay lại</b>
              </Button>{" "}
            </Link>
            <Button icon={<PlusOutlined />} className="ButtonUp"></Button>
          </div>
          <div>
            <h2>DANH SÁCH HÀNG TỒN KHO</h2>
          </div>
          <Space></Space>
          <Table
            columns={columns}
            dataSource={DeviceList.data}
            className="tableFilter"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default DeviceList;
