import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Table,
  Space,
  message,
  Popconfirm,
} from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "../../components/Task2Component/TourStyle.css";
import "../../components/Task2Component/CustomerDevice.css";
import { Link, useNavigate } from "react-router-dom";

function DeviceList() {
  const { Search } = Input;
  const navigate = useNavigate();
  const [SearchName, setSearchName] = useState("");
  const [DeleteID, setDeleteID] = useState("");
  const DeviceList = {
    data: [
      {
        id: "1",
        name: "Device 1",
        id_staff: "Staff 1",
        status: "unoccupied",
      },
      {
        id: "2",
        name: "Device 2",
        id_staff: "Staff 2",
        status: "occupied",
      },
      {
        id: "3",
        name: "Device 3",
        id_staff: "Staff 3",
        status: "unoccupied",
      },
      // ... more data
      {
        id: "100",
        name: "Device 100",
        id_staff: "Staff 100",
        status: "occupied",
      },
    ],
  };

  interface DeviceType {
    id: string;
    name: string;
    id_staff: string;
    status: string;
  }
  const columns: ColumnsType<DeviceType> = [
    { title: "Tên thiết bị", dataIndex: "name", key: "name" },
    { title: "Người quản lý", dataIndex: "id_staff", key: "id_staff" },
    { title: "Trạng thái", dataIndex: "status", key: "status" },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (text, record) => (
        <Button
          icon={<FormOutlined />}
          onClick={() =>
            navigate("/them-moi-nguon-luc", {
              state: {
                id: record.id,
                name: record.name,
                id_staff: record.id_staff,
                status: record.status,
              },
            })
          }
        />
      ),
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (text, record) => (
        <Popconfirm
          title="Xác nhận?"
          description={"Xóa thiết bị " + record.name}
          onConfirm={() => {
            setDeleteID(record.id);
          }}
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
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
      <ConfigProvider theme={{ token: { colorPrimary: "#4B268F" } }}>
        <div className="CenterContainer">
          <Search
            placeholder="Nhập tên, mã hàng bạn muốn tìm"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            style={{ marginTop: "30px" }}
            onChange={(e) => setSearchName(e.target.value)}
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
              </Button>
            </Link>

            <Button
              icon={<PlusOutlined />}
              className="ButtonUp"
              onClick={() => navigate("/them-moi-nguon-luc")}
            />
          </div>

          <div>
            <h2>DANH SÁCH HÀNG TRANG THIẾT BỊ</h2>
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
