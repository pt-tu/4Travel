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

function CustomerList() {
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
        <Link to="/them-moi-khach-hang">
          <Button icon={<FormOutlined />}></Button>
        </Link>
        //khi chọn chỉnh sửa sẽ load trang chỉnh sửa, lúc này trang chỉnh sửa input sẽ là dữ liệu của khách hàng được chọn. tham khảo useParams để truyền id khách hàng vào trang chỉnh sửa để query: https://ui.dev/react-router-url-parameters?fbclid=IwAR3grGeq74ae9OoC9xyeMVStoe2agUV-hLT2MnipjCJnK5GyHRXoRvKZEvI, nếu khó quá có thể tách thêm mới khách và chỉnh sửa khách ra 2 page khác nhau
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
            placeholder="Nhập tên, mã tour hoặc khách hàng bạn muốn"
            className="SearchBar"
            allowClear
            enterButton
            size="large"
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

export default CustomerList;
