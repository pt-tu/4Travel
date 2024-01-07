import React, { useEffect } from "react";
import { useState } from "react";
import { Button, ConfigProvider, Input, Table, Space } from "antd";
import { ArrowLeftOutlined, HistoryOutlined } from "@ant-design/icons";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import type { ColumnsType } from "antd/es/table";
import "../../components/Task2Component/TourStyle.css";
import "../../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";
import useGetBookingList from "../../hooks/BookingManagement/useGetBookingList";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import useGetTourByTID from "../../hooks/TourManagement/useGetTourByTID";
import useGetBookingForBill from "../../hooks/Bill/useGetBookingForBill";
import useGetBillList from "../../hooks/Bill/useGetBillList";
//chuyen lay gio phut giay
function convertToVietnameseFormat(dateTimeString: any) {
  // Chuyển đổi thành đối tượng Date
  const originalDate = new Date(dateTimeString);

  // Đặt múi giờ Việt Nam (UTC+7)
  const options = { timeZone: "Asia/Ho_Chi_Minh" };

  // Format the date and time using the Vietnamese locale and the specified options
  const vietnameseFormat = originalDate.toLocaleString("vi-VN", options);

  return vietnameseFormat;
}

//chuyen khong lay gio phut giay
function convertToVietnameseDateFormat(dateTimeString: any) {
  // Chuyển đổi thành đối tượng Date
  const originalDate = new Date(dateTimeString);

  // Đặt múi giờ Việt Nam (UTC+7)
  const options: Intl.DateTimeFormatOptions = {
    timeZone: "Asia/Ho_Chi_Minh",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  };

  // Format the date using the Vietnamese locale and the specified options
  const vietnameseDateFormat = originalDate.toLocaleDateString(
    "vi-VN",
    options
  );

  return vietnameseDateFormat;
}

function BookingDaThanhToan() {
  const { Search } = Input;
  const getbookinglist = useGetBookingForBill();
  if (getbookinglist.isSuccess) {
    console.log(getbookinglist.data.datadone);
  }
  const bill = useGetBillList();

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

  bill.data?.map((item, i) => {
    Customer.push({
      key: i,
      bid: item.id,
      cusName: item.cusname, // Fix the property name here
      tourName: item.tourname,
      by: item.by,
      time: item.time,
    });
  });

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
