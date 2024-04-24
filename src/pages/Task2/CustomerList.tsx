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
  const CustomerList1 = {
    data: [
      {
        id: "1",
        hoten: "Nguyen Van A",
        cccd: "123456789",
        sdt: "0901234567",
        email: "nguyenvana@gmail.com",
        ngaysinh: "1990-01-01",
        diachi: "123 ABC, District 1, HCM City",
        ghichu: "VIP customer",
        yeucau: "Need special care",
      },
      {
        id: "2",
        hoten: "Le Thi B",
        cccd: "987654321",
        sdt: "0907654321",
        email: "lethib@gmail.com",
        ngaysinh: "1992-02-02",
        diachi: "456 DEF, District 2, HCM City",
        ghichu: "Regular customer",
        yeucau: "None",
      },
      {
        id: "3",
        hoten: "Tran Van C",
        cccd: "112233445",
        sdt: "0908765432",
        email: "tranvanc@gmail.com",
        ngaysinh: "1993-03-03",
        diachi: "789 GHI, District 3, HCM City",
        ghichu: "New customer",
        yeucau: "None",
      },
      {
        id: "4",
        hoten: "Pham Thi D",
        cccd: "556677889",
        sdt: "0901122334",
        email: "phamthid@gmail.com",
        ngaysinh: "1994-04-04",
        diachi: "321 JKL, District 4, HCM City",
        ghichu: "VIP customer",
        yeucau: "Need special care",
      },
      {
        id: "5",
        hoten: "Hoang Van E",
        cccd: "998877665",
        sdt: "0904433221",
        email: "hoangvane@gmail.com",
        ngaysinh: "1995-05-05",
        diachi: "654 MNO, District 5, HCM City",
        ghichu: "Regular customer",
        yeucau: "None",
      },
      // ... add more data as needed
    ],
  };

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
            dataSource={CustomerList1.data}
            className="tableFilter"
            rowKey="id"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default CustomerList;
