import { Col, Flex } from "antd";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import useGetTourByTID from "../../hooks/TourManagement/useGetTourByTID";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import useGetBookingByPK from "../../hooks/Bill/useGetBookingByPK";
import useUser from "../../hooks/accountsystem/useUser";
import BookingDaThanhToan from "./BookingDaThanhToan";
import useCheckOut from "../../hooks/Bill/useCheckOut";
import { v4 as uuidv4 } from "uuid";
import useGetBillByBID from "../../hooks/Bill/useGetBillByBID";

const invoiceStyles: React.CSSProperties = {
  width: "500px",
  margin: "20px auto",
  padding: "30px",
  border: "1px solid #ccc",
};

const text: React.CSSProperties = {
  fontSize: 16,
  paddingBottom: 15,
  paddingLeft: 18,
  textAlign: "start",
  margin: 0,
};

const text2: React.CSSProperties = {
  fontSize: 16,
  paddingBottom: 10,
  paddingLeft: 16,
  textAlign: "start",
  marginBottom: 20,
  margin: 0,

  color: "#4B268F",
};

const headerStyles: React.CSSProperties = {
  textAlign: "center",
  marginBottom: "20px",
};

const tableStyles: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  marginTop: "20px",
};

const rowStyles: React.CSSProperties = {
  borderBottom: "1px solid #ddd",
};

const rowStyles1: React.CSSProperties = {
  height: 35,
  borderBottom: "1px solid #ddd",
};

const lastRowStyles: React.CSSProperties = {
  ...rowStyles,
  borderBottom: "none",
};

const currentDateTime = new Date();

const BillDaXuat: React.FC = () => {
  const user = useUser();
  let { bid } = useParams();
  let bill = useGetBillByBID(bid);
  let cusname = "";
  let tourname = "";
  let sdt = "";
  let email = "";
  let time = "";
  let by = "";
  let hanhkhach = [""];
  let total = "";
  let diemden = "";
  let price = "";
  if (bill.isSuccess) {
    cusname = bill.data.cusname;
    tourname = bill.data.tourname;
    sdt = bill.data.sdt;
    email = bill.data.email;
    time = bill.data.time;
    by = bill.data.by;
    hanhkhach = bill.data.hanhkhach;
    total = bill.data.total;
    diemden = bill.data.diemden;
    price = bill.data.price;
  }
  return (
    <div style={invoiceStyles}>
      <h1
        style={{
          textAlign: "start",
          marginTop: 20,
          marginLeft: 30,
          paddingBottom: 10,
        }}
      >
        4T
      </h1>
      <div style={headerStyles}>
        <h2 style={{ marginBottom: 0, color: "#4B268F" }}> HÓA ĐƠN</h2>
      </div>
      <p style={text2}>Tên tour: {tourname} </p>
      <Flex>
        <div style={{ width: "50%" }}>
          {/* Red section content */}
          <div>
            <p
              style={{
                fontSize: 16,
                paddingBottom: 15,
                textAlign: "start",
                margin: 0,
                paddingLeft: 18,
                color: "#4B268F",
                fontWeight: "bold",
              }}
            >
              Đến:
            </p>
            <p style={text}>Ông/Bà: {cusname}</p>
            <p style={text}>Số điện thoại: {sdt}</p>
            <p style={text}>Email: {email}</p>
          </div>
        </div>
        <div style={{ width: "50%" }}>
          {/* Blue section content */}
          <div>
            <p
              style={{
                fontSize: 16,
                paddingBottom: 15,
                textAlign: "start",
                margin: 0,
                color: "#4B268F",
                fontWeight: "bold",
                paddingLeft: 18,
              }}
            >
              Chi tiết hóa đơn:
            </p>
            <p style={text}>Vào lúc: {time} </p>
            <p style={text}>Bởi: {by}</p>
          </div>
        </div>
      </Flex>

      <table style={tableStyles}>
        <thead>
          <tr style={rowStyles1}>
            <th>Số thứ tự</th>
            <th>Hành khách</th>
            <th>Điểm đến</th>

            <th>Giá vé</th>
          </tr>
        </thead>
        <tbody>
          {hanhkhach.map((item: any, key: any) => (
            <tr style={rowStyles}>
              <td>{key + 1}</td>
              <td>{item.ten}</td>
              <td>{diemden}</td>
              <td>${price}</td>
            </tr>
          ))}

          {/* Add more rows as needed */}
          <tr style={lastRowStyles}>
            <td
              colSpan={3}
              style={{
                textAlign: "right",
                marginTop: 50,
                height: 80,
              }}
            >
              <strong>Total:</strong>
            </td>
            <td>${total}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default BillDaXuat;
