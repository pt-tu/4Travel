import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, FormInstance, message } from "antd";
import "./Form.css";
import ContactInfo from "../../components/ContactInfo";
import BookingInfo from "../../components/BookingInfo";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import useCreateBooking from "../../hooks/BookingManagement/useCreateBooking";
import useGetCustomerByCID from "../../hooks/CustomerManagement/useGetCustomerByCID";
import useGetCustomerByCCCD from "../../hooks/CustomerManagement/useGetCustomerByCCCD";
import dayjs from "dayjs";

function ConfirmBooking() {
  const contactInfo = useRef<FormInstance | undefined>();
  const bookingInfo = useRef<FormInstance | undefined>();
  const navigate = useNavigate();
  const location = useLocation();

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

  const [hanhkhach, sethanhkhach] = useState([
    { hoten: "", gioitinh: "", ngaysinh: "", ghichu: "" },
  ]);

  // Nếu không truyền tour_id thì back
  useEffect(() => {
    if (!tourid) {
      message.error("Không tìm thấy tour");
      // navigate(-1);
      settourid("35624166-97d0-4653-a5a5-95a2ef920e22");
      // Cho tour id tạm 1 giá trị. Bao giờ gọi được trang này đúng cách thì nhớ bỏ cái này đi
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
  } else if (createCustomer.error instanceof Error) {
    message.error(
      "Cập nhật thông tin khách hàng thất bại. Lỗi: " +
        createCustomer.error.message
    );
  }

  const createBooking = useCreateBooking({
    cus_id: customerid,
    tour_id: tourid,
    hanhkhach: hanhkhach,
    status: "none",
  });
  if (createBooking.isSuccess) {
    message.success("Cập nhật booking thành công");
    navigate(-1);
    createCustomer.reset();
    createBooking.reset();
  } else if (createBooking.error instanceof Error) {
    message.error(
      "Cập nhật booking thất bại. Lỗi: " + createBooking.error.message
    );
  }

  const getcustomerbycid = useGetCustomerByCID(customerid);
  if (customerid && getcustomerbycid.error instanceof Error) {
    message.error(
      "Đồng bộ thông tin khách hàng thất bại. Lỗi: " +
        getcustomerbycid.error.message
    );
  }

  const getcustomerbycccd = useGetCustomerByCCCD(cccd);
  if (getcustomerbycccd.error instanceof Error) {
    console.log(getcustomerbycccd.error.message);
  }

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
      setngaysinh(
        getcustomerbycccd.data.ngaysinh
          ? dayjs(getcustomerbycccd.data.ngaysinh).toISOString()
          : ""
      );
      setdiachi(getcustomerbycccd.data.diachi);
      setghichu(getcustomerbycccd.data.ghichu);
      setyeucau(getcustomerbycccd.data.yeucau);
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

  // WARNING: Trick lỏ, xử lý bất đồng bộ sau
  useEffect(() => {
    if (createCustomer.isSuccess) createBooking.mutate();
  }, [createCustomer.isSuccess]);

  return (
    <div className="wrapper">
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
        hanhkhach={hanhkhach}
        sethanhkhach={sethanhkhach}
        onBookingInfoFinish={HandleBookingInfoFinish}
        ref={bookingInfo}
      />

      <div className="submitButton">
        <Button type="primary" htmlType="submit" onClick={HandleSubmit}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

export default ConfirmBooking;
