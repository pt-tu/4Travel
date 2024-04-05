import { ArrowLeftOutlined, SearchOutlined } from "@ant-design/icons";
import { Button, ConfigProvider, Input, Space, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useState } from "react";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import { Link } from "react-router-dom";
import "../../components/Task2Component/CustomerDevice.css";
import "../../components/Task2Component/TourStyle.css";

function BookingDaThanhToan() {
  const { Search } = Input;
  const[CusName,setCusName]=useState("");

  interface CustomerType {
    bid: any;
    key: React.Key;
    cusName: any;
    tourName: any;
    by: any;
    time: any;
  }
  const columns: ColumnsType<CustomerType> = [
    {
      title: "Tên tour",
      dataIndex: "tourName",
      key: "tourName",
      width: 250,
    },
    {
      title: "Khách hàng",
      dataIndex: "cusName",
      key: "cusName",
    },

    {
      title: "Người thu",
      dataIndex: "by",
      key: "by",
    },
    {
      title: "Ngày thanh toán",
      dataIndex: "time",
      key: "time",
    },

    {
      title: "",
      key: "key",
      dataIndex: "key",
      width: 30,
      render: (text, record) => (
        <Link to={`/hoa-don-da-xuat/${record.bid}`}>
          <Button
            icon={<LiaFileInvoiceDollarSolid style={{ fontSize: 18 }} />}
          ></Button>
        </Link>
        //khi chọn chỉnh sửa sẽ load trang chỉnh sửa, lúc này trang chỉnh sửa input sẽ là dữ liệu của khách hàng được chọn. tham khảo useParams để truyền id khách hàng vào trang chỉnh sửa để query: https://ui.dev/react-router-url-parameters?fbclid=IwAR3grGeq74ae9OoC9xyeMVStoe2agUV-hLT2MnipjCJnK5GyHRXoRvKZEvI, nếu khó quá có thể tách thêm mới khách và chỉnh sửa khách ra 2 page khác nhau
      ),
    },
  ];
  const Customer: CustomerType[] = [];

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
            placeholder="Nhập tên khách hàng cần tìm hóa đơn"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}

            size="large"
            style={{paddingTop: "30px",paddingBottom: "30px"}}
            onChange={(e)=>setCusName(e.target.value)}
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/booking-can-thanh-toan">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="ButtonUp"
              >
                {" "}
                <b>Quay lại</b>
              </Button>
            </Link>
          </div>
          <div>
            <h2 style={{ fontSize: 18 }}>
              DANH SÁCH CÁC HÓA ĐƠN ĐÃ THANH TOÁN
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
