import React from "react";
import { useState } from "react";
import { Button, ConfigProvider, Input, Table, Space } from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import type { ColumnsType } from "antd/es/table";
import "../../components/Task2Component/TourStyle.css";
import "../../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";

function BookingDaThanhToan() {
  const { Search } = Input;
  interface CustomerType {
    key: React.Key;
    cusName: string;
    tourName: string;
    numPeople: number;
    startDay: string;
    endDay: string;
  }
  const columns: ColumnsType<CustomerType> = [
    {
      title: "Khách hàng",
      dataIndex: "cusName",
      key: "cusName",
    },
    {
      title: "Tên tour",
      dataIndex: "tourName",
      key: "tourName",
    },
    {
      title: "Số người",
      dataIndex: "numPeople",
      key: "numPeople",
    },
    {
      title: "Ngày bắt đầu",
      dataIndex: "startDay",
      key: "startDay",
    },
    {
      title: "Ngày kết thúc",
      dataIndex: "endDay",
      key: "endDay",
    },
    {
      title: "",
      key: "key",
      dataIndex: "key",
      width: 30,
      render: (text, record) => (
        <Link to="/hoa-don">
          <Button
            icon={<LiaFileInvoiceDollarSolid style={{ fontSize: 18 }} />}
          ></Button>
        </Link>
        //khi chọn chỉnh sửa sẽ load trang chỉnh sửa, lúc này trang chỉnh sửa input sẽ là dữ liệu của khách hàng được chọn. tham khảo useParams để truyền id khách hàng vào trang chỉnh sửa để query: https://ui.dev/react-router-url-parameters?fbclid=IwAR3grGeq74ae9OoC9xyeMVStoe2agUV-hLT2MnipjCJnK5GyHRXoRvKZEvI, nếu khó quá có thể tách thêm mới khách và chỉnh sửa khách ra 2 page khác nhau
      ),
    },
  ];
  const Customer: CustomerType[] = [];

  for (let i = 0; i < 46; i++) {
    Customer.push({
      key: i,
      cusName: `Thái Dương ${i}`, // Fix the property name here
      tourName: `1111111${i}`,
      numPeople: 10,
      startDay: "1/1/2023", // Month is 0-indexed
      endDay: "1/1/2023",
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
      disabled: record.cusName === "Disabled User", // Column configuration not to be checked
      name: record.cusName,
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
            <h2 style={{ fontSize: 18 }}>
              DANH SÁCH CÁC BOOKING CẦN THANH TOÁN
            </h2>
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

export default BookingDaThanhToan;
