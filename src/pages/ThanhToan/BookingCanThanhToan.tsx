import React, { useEffect } from "react";
import { useState } from "react";
import { Button, ConfigProvider, Input, Table, Space } from "antd";
import { ArrowLeftOutlined, HistoryOutlined,SearchOutlined } from "@ant-design/icons";
import { LiaFileInvoiceDollarSolid } from "react-icons/lia";
import type { ColumnsType } from "antd/es/table";
import "../../components/Task2Component/TourStyle.css";
import "../../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";
import useGetBookingList from "../../hooks/BookingManagement/useGetBookingList";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import useGetTourByTID from "../../hooks/TourManagement/useGetTourByTID";
import useGetBookingForBill from "../../hooks/Bill/useGetBookingForBill";
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

function BookingCanThanhToan() {
  const { Search } = Input;
  const getbookinglist = useGetBookingForBill();
  const[CusName,setCusName]=useState("");
  if (getbookinglist.isSuccess) {
    console.log(getbookinglist.data.datanone);
  }

  interface CustomerType {
    bookingid: any;
    key: React.Key;
    cusName: any;
    tourName: any;
    numPeople: number;
    startDay: any;
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
        <Link to={`/hoa-don/${record.bookingid}`}>
          <Button
            icon={<LiaFileInvoiceDollarSolid style={{ fontSize: 18 }} />}
          ></Button>
        </Link>
        //khi chọn chỉnh sửa sẽ load trang chỉnh sửa, lúc này trang chỉnh sửa input sẽ là dữ liệu của khách hàng được chọn. tham khảo useParams để truyền id khách hàng vào trang chỉnh sửa để query: https://ui.dev/react-router-url-parameters?fbclid=IwAR3grGeq74ae9OoC9xyeMVStoe2agUV-hLT2MnipjCJnK5GyHRXoRvKZEvI, nếu khó quá có thể tách thêm mới khách và chỉnh sửa khách ra 2 page khác nhau
      ),
    },
  ];
  const Customer: CustomerType[] = [];

  getbookinglist.data?.datanone.map((item, i) => {
    if(item.cus_id["hoten" as any].includes(CusName))
    Customer.push({
      key: i,
      cusName: item.cus_id["hoten" as any], // Fix the property name here
      tourName: item.tour_id["name" as any],
      numPeople: item.hanhkhach ? item.hanhkhach.length : 0, //có thể bug nếu hanhkhach null
      startDay: convertToVietnameseDateFormat(item.tour_id["start" as any]), // Month is 0-indexed
      endDay: convertToVietnameseDateFormat(item.tour_id["end" as any]), // Month is 0-indexed,
      bookingid: item.cus_id["id" as any] + "/" + item.tour_id["id" as any],
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
            placeholder="Nhập tên khách hàng cần tìm hóa đơn"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}

            size="large"
            style={{paddingTop: "30px", paddingBottom: "30px"}}
            onChange={(e)=>setCusName(e.target.value)}
            onSearch={()=>getbookinglist.refetch()}
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
            <Link to="/booking-da-thanh-toan">
              <Button icon={<HistoryOutlined />} className="ButtonUp"></Button>
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

export default BookingCanThanhToan;
