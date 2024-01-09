import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, FormInstance, message,ConfigProvider } from "antd";
import "./Form.css";
import ContactInfo from "../../components/ContactInfo";
import BookingInfo from "../../components/BookingInfo";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import useCreateBooking from "../../hooks/BookingManagement/useCreateBooking";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import useGetCustomerByCCCD from "../../hooks/CustomerManagement/useGetCustomerByCCCD";
import useGetHanhKhach from "../../hooks/TourManagement/useGetHanhKhach";
import useUser from "../../hooks/accountsystem/useUser";
import dayjs from "dayjs";

function ConfirmBooking() {
  const contactInfo = useRef<FormInstance | undefined>();
  const bookingInfo = useRef<FormInstance | undefined>();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useUser();
  const [customerid, setcustomerid] = useState(
    location.state ? location.state.cus_id ?? "" : ""
  );
  const [tourid, settourid] = useState(
    location.state ? location.state.tour_id ?? "" : ""
  );
  const [hoten, sethoten] = useState("");
  const [cccd, setcccd] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");
  const [ngaysinh, setngaysinh] = useState(new Date().toISOString());
  const [diachi, setdiachi] = useState("");
  const [ghichu, setghichu] = useState("");
  const [yeucau, setyeucau] = useState("");
  const defaulthanhkhach = [
    { hoten: "", gioitinh: "", ngaysinh: "", ghichu: "" },
  ];
  const [hanhkhach, sethanhkhach] = useState(defaulthanhkhach);

  // Nếu không truyền tour_id thì back
  useEffect(() => {
    if (!tourid) {
      message.error("Không tìm thấy tour");
      navigate(-1);
    }
  }, []);

  const createCustomer = useCreateCustomer(
    {
      hoten: hoten,
      cccd: cccd,
      sdt: sdt,
      email: email,
      ngaysinh: ngaysinh,
      diachi: diachi,
      ghichu: ghichu,
      yeucau: yeucau,
    },
    customerid
  );
  if (createCustomer.isSuccess) {
    if (!customerid) {
      setcustomerid(createCustomer.data.id);
    }
  }
  if (createCustomer.isError && createCustomer.error instanceof Error) {
    message.error(
      "Cập nhật thông tin khách hàng thất bại. Lỗi: " +
        createCustomer.error.message
    );
  }

  const createBooking = useCreateBooking(
    {
      cus_id: customerid,
      tour_id: tourid,
      hanhkhach: hanhkhach,
      status: "none",
    },
    user.data ? user.data.id : ""
  );
  if (createBooking.isSuccess) {
    message.success("Cập nhật booking thành công");
    navigate(-1);
    createCustomer.reset();
    createBooking.reset();
  }
  if (createBooking.isError && createBooking.error instanceof Error) {
    message.error(
      "Cập nhật booking thất bại. Lỗi: " + createBooking.error.message
    );
  }

  const getcustomerbycid = useGetCustomerByCID(customerid);
  if (
    getcustomerbycid.isError &&
    customerid &&
    getcustomerbycid.error instanceof Error
  ) {
    message.error(
      "Đồng bộ thông tin khách hàng thất bại. Lỗi: " +
        getcustomerbycid.error.message
    );
  }

  const getcustomerbycccd = useGetCustomerByCCCD(cccd);
  if (getcustomerbycccd.isError && getcustomerbycccd.error instanceof Error) {
    console.log(getcustomerbycccd.error.message);
  }

  const gethanhkhach = useGetHanhKhach(customerid, tourid);

  function HandleSubmit() {
    if (contactInfo.current && bookingInfo.current) {
      contactInfo.current.submit();
    }
  }

  function HandleContactInfoFinish() {
    if (bookingInfo.current) {
      bookingInfo.current.submit();
    }
  }

  function HandleBookingInfoFinish() {
    if (customerid) {
      if (getcustomerbycid.data) {
        setngaysinh(
          getcustomerbycid.data.ngaysinh
            ? dayjs(getcustomerbycid.data.ngaysinh).toISOString()
            : ""
        );
        setdiachi(getcustomerbycid.data.diachi);
        setghichu(getcustomerbycid.data.ghichu);
        setyeucau(getcustomerbycid.data.yeucau);
      } else return;
    } else if (getcustomerbycccd.data) {
      setcustomerid(getcustomerbycccd.data.id);
      if (!ngaysinh)
        setngaysinh(
          getcustomerbycccd.data.ngaysinh
            ? dayjs(getcustomerbycccd.data.ngaysinh).toISOString()
            : ""
        );
      if (!diachi) setdiachi(getcustomerbycccd.data.diachi);
      if (!ghichu) setghichu(getcustomerbycccd.data.ghichu);
      if (!yeucau) setyeucau(getcustomerbycccd.data.yeucau);
    } else if (hanhkhach.length > 0) {
      for (const hk of hanhkhach) {
        if (hk.hoten == hoten) {
          setngaysinh(hk.ngaysinh);
          setghichu(hk.ghichu);
          break;
        }
      }
    }

    createCustomer.mutate();
  }

  useEffect(() => {
    if (getcustomerbycid.data) {
      if (!hoten) sethoten(getcustomerbycid.data.hoten);
      if (!cccd) setcccd(getcustomerbycid.data.cccd);
      if (!sdt) setsdt(getcustomerbycid.data.sdt);
      if (!email) setemail(getcustomerbycid.data.email);
      setngaysinh(
        getcustomerbycid.data.ngaysinh
          ? dayjs(getcustomerbycid.data.ngaysinh).toISOString()
          : ""
      );
      setdiachi(getcustomerbycid.data.diachi);
      setghichu(getcustomerbycid.data.ghichu);
      setyeucau(getcustomerbycid.data.yeucau);
    }
    if (gethanhkhach.data && (!hanhkhach || hanhkhach == defaulthanhkhach)) {
      sethanhkhach([
        {
          hoten: gethanhkhach.data.hoten,
          gioitinh: gethanhkhach.data.gioitinh,
          ngaysinh: gethanhkhach.data.ngaysinh
            ? dayjs(gethanhkhach.data.ngaysinh).toISOString()
            : "",
          ghichu: gethanhkhach.data.ghichu,
        },
      ]);
    }
  }, [tourid, gethanhkhach.data]);

  // WARNING: Trick lỏ, xử lý bất đồng bộ sau
  useEffect(() => {
    if (createCustomer.isSuccess) createBooking.mutate();
  }, [createCustomer.isSuccess]);

  return (
    <div className="wrapper">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4B268F",
          },
        }}
      >
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className="ButtonUp"
        onClick={() => navigate(-1)}
      >
        {" "}
        <b>Quay lại</b>
      </Button>

      <h2>Thông tin khách hàng</h2>

      <ContactInfo
        hoten={hoten}
        sethoten={sethoten}
        cccd={cccd}
        setcccd={setcccd}
        sdt={sdt}
        setsdt={setsdt}
        email={email}
        setemail={setemail}
        onContactInfoFinish={HandleContactInfoFinish}
        ref={contactInfo}
      />

      <BookingInfo
        defaulthanhkhach={defaulthanhkhach}
        hanhkhach={hanhkhach}
        sethanhkhach={sethanhkhach}
        gethanhkhach={gethanhkhach}
        onBookingInfoFinish={HandleBookingInfoFinish}
        ref={bookingInfo}
      />

      <div className="submitButton">
        <Button type="primary" htmlType="submit" onClick={HandleSubmit} style={{boxShadow: "none", color: "White" }}>
          Xác nhận
        </Button>
      </div>
      </ConfigProvider>
    </div>
  );
}

export default ConfirmBooking;
