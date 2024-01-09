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
import generatePDF, { Margin, Resolution } from "react-to-pdf";

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

// Lấy các thành phần ngày, tháng, năm, giờ, phút, giây
const day = currentDateTime.getDate().toString().padStart(2, "0");
const month = (currentDateTime.getMonth() + 1).toString().padStart(2, "0");
const year = currentDateTime.getFullYear().toString().slice(-2);
const hours = currentDateTime.getHours().toString().padStart(2, "0");
const minutes = currentDateTime.getMinutes().toString().padStart(2, "0");
const seconds = currentDateTime.getSeconds().toString().padStart(2, "0");

// Tạo chuỗi định dạng dd/mm/yy hh/mm/ss
const formattedTime = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;

const Bill: React.FC = () => {
  const user = useUser();
  const bid = uuidv4();
  const { cid, tid } = useParams();
  const tour = useGetTourByTID(tid as any);
  const cus = useGetCustomerByCID(cid as any);
  const booking = useGetBookingByPK(cid as any, tid as any);
  const date = Date();
  let hoten = "";
  let sdt = "";
  let email = "";
  let name = "";
  let hanhkhach = [""];
  let diemden = "";
  let status = "";
  let price = 0;

  if (cus.isSuccess) {
    hoten = cus.data.hoten;
    sdt = cus.data.sdt;
    email = cus.data.email;
  }
  if (tour.isSuccess) {
    name = tour.data.name;
    diemden = tour.data.diemden;
    price = tour.data.price;
  }
  if (booking.isSuccess) {
    hanhkhach = booking.data.hanhkhach;
    status = booking.data.status;
  }
  console.log(date);
  const checkout = useCheckOut(
    {
      cus_id: cid ? cid : "",
      tour_id: tid ? tid : "",
      hanhkhach: hanhkhach,
    },
    {
      id: bid,
      tourname: name,
      cusname: hoten,
      sdt: sdt,
      email: email,
      time: formattedTime,
      by: user.data?.user_metadata.ten,
      hanhkhach: hanhkhach,
      total: hanhkhach.length * price,
      price: price,
      diemden: diemden,
    }
  );
  useEffect(() => {
    if (hanhkhach[0] != "" && hoten != "" && booking.data.status != "done") {
      checkout.mutate();
    }
  }, [tour.data, cus.data]); //bug khi reload

  const options = {
    // default is `save`

    method: "open",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    align: "center",
    page: {
      // margin is in MM, default is Margin.NONE = 0
      margin: Margin.SMALL,
      // default is 'A4'
      format: "letter",
      // default is 'portrait'
      orientation: "landscape",
    },
    canvas: {
      // default is 'image/jpeg' for better size performance
      mimeType: "image/png",
      qualityRatio: 1,
    },
    // Customize any value passed to the jsPDF instance and html2canvas
    // function. You probably will not need this and things can break,
    // so use with caution.
    overrides: {
      // see https://artskydj.github.io/jsPDF/docs/jsPDF.html for more options
      pdf: {
        compress: true,
      },
      // see https://html2canvas.hertzen.com/configuration for more options
      canvas: {
        useCORS: true,
      },
    },
  };
  const getTargetElement = () => document.getElementById("content-id");

  return (
    <>
      <button
        style={{ marginTop: 20 }}
        onClick={() => generatePDF(getTargetElement as any, options as any)}
      >
        XUẤT BILL
      </button>
      <div style={invoiceStyles} id="content-id">
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
        <p style={text2}>Tên tour: {name} </p>
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
              <p style={text}>Ông/Bà: {hoten}</p>
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
              <p style={text}>Vào lúc: {formattedTime} </p>
              <p style={text}>Bởi: {user.data?.user_metadata.ten}</p>
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
                <td>{item.hoten}</td>
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
              <td>${hanhkhach.length * price}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Bill;
