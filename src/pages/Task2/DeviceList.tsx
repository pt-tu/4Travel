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

function DeviceList() {
  const { Search } = Input;
  interface CustomerType {
    key: React.Key;
    name: string;
    cccd: string;
    address: string;
    phoneNumber: string;
  }
  const columns: ColumnsType<CustomerType> = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Địa chỉ",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
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
  const Customer: CustomerType[] = [];

  for (let i = 0; i < 46; i++) {
    Customer.push({
      key: i,
      name: `Thái Dương ${i}`,
      cccd: `1111111${i}`,
      address: "TP HCM",
      phoneNumber: "0999000999",
    });
  }

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: CustomerType[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: CustomerType) => ({
      disabled: record.name === "Disabled User", // Column configuration not to be checked
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
            style={{marginTop: "30px"}}
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
            rowSelection={{
              type: selectionType,
              ...rowSelection,
            }}
            columns={columns}
            dataSource={Customer}
            className="tableFilter"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default DeviceList;
