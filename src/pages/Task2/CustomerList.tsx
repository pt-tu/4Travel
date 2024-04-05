import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Table,
  Space,
  Popconfirm,
  message,
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
import { Link } from "react-router-dom";

function CustomerList() {
  const { Search } = Input;
  const [DeleteID, setDeleteID] = useState("");
  const [cccd, setcccd] = useState("");

  interface Customer {
    id: string;
    hoten: string;
    cccd: string;
    sdt: string;
    email: string;
    ngaysinh: string;
    diachi: string;
    ghichu: string;
    yeucau: string;
  }
  const columns: ColumnsType<Customer> = [
    { title: "Họ tên", dataIndex: "hoten", key: "hoten" },
    { title: "CMND/CCCD", dataIndex: "cccd", key: "cccd" },
    { title: "Địa chỉ", dataIndex: "diachi", key: "diachi" },
    { title: "Số điện thoại", dataIndex: "sdt", key: "sdt" },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (text, record) => (
        <Link to={"/them-moi-khach-hang"} state={{ id: record.id }}>
          <Button icon={<FormOutlined />} />
        </Link>
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
          description={"Xóa người dùng " + record.hoten}
          onConfirm={() => setDeleteID(record.id)}
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Customer[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: Customer) => ({
      disabled: record.hoten === "Disabled User", // Column configuration not to be checked
      name: record.hoten,
    }),
  };

  return (
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: "#4B268F" } }}>
        <div className="CenterContainer">
          <Search
            placeholder="Nhập CCCD hoặc tên của khách hàng bạn muốn tìm"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            style={{ marginTop: "30px" }}
            onChange={(e) => setcccd(e.target.value)}
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

            <Link to="/them-moi-khach-hang">
              <Button icon={<PlusOutlined />} className="ButtonUp"></Button>
            </Link>
          </div>

          <div>
            <h2>DANH SÁCH KHÁCH HÀNG</h2>
          </div>

          <Space></Space>

          <Table
            columns={columns}
            className="tableFilter"
            rowKey="id"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default CustomerList;
