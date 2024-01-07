import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, FormInstance, message } from "antd";
import "./Form.css";
import ContactInfo from "../../components/ContactInfo";
import BookingInfo from "../../components/BookingInfo";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import useCreateBooking from "../../hooks/BookingManagement/useCreateBooking";

function ConfirmBooking({ cus_id = "", tour_id = "" }) {
  const contactInfo = useRef<FormInstance | undefined>();
  const bookingInfo = useRef<FormInstance | undefined>();
  const navigate = useNavigate();

  const [hoten, sethoten] = useState("");
  const [cccd, setcccd] = useState("");
  const [sdt, setsdt] = useState("");
  const [email, setemail] = useState("");

  // Nếu không truyền tour_id thì back
  useEffect(() => {
    if (!tour_id) {
      message.error("Không tìm thấy tour");
      // navigate(-1);
      tour_id = "35624166-97d0-4653-a5a5-95a2ef920e22";
      // Cho tour id tạm 1 giá trị. Bao giờ gọi được trang này đúng cách thì nhớ bỏ cái này đi
    }
  }, [tour_id]);

  const [hanhkhach, sethanhkhach] = useState([
    { hoten: "", gioitinh: "", ngaysinh: "", ghichu: "" },
  ]);

  const createCustomer = useCreateCustomer(
    {
      hoten: hoten,
      cccd: cccd,
      sdt: sdt,
      email: email,
      ngaysinh: new Date().toISOString(),
      diachi: "",
      ghichu: "",
      yeucau: "",
    },
    cus_id
  );

  const createBooking = useCreateBooking({
    cus_id: cus_id,
    tour_id: tour_id,
    hanhkhach: hanhkhach,
    status: "none",
  });

  if (createCustomer.isSuccess) {
    if (!cus_id) {
      cus_id = createCustomer.data[0].id;
    }
  } else if (createCustomer.error instanceof Error) {
    message.error("Thêm thất bại. Lỗi: " + createCustomer.error.message);
  }
  if (createBooking.isSuccess) {
    message.success("Thêm thành công");
    navigate(-1);
    createCustomer.reset();
    createBooking.reset();
  } else if (createBooking.error instanceof Error) {
    message.error("Thêm thất bại. Lỗi: " + createBooking.error.message);
  }

  const onSubmit = useCallback(() => {
    if (contactInfo.current) {
      contactInfo.current.submit();
    }
    if (bookingInfo.current) {
      bookingInfo.current.submit();
    }
  }, []);

  function onContactInfoFinish() {
    createCustomer.mutate();
  }

  function onBookingInfoFinish() {
    if (cus_id) {
      createBooking.mutate();
    }
  }

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
        cus_id={cus_id}
        hoten={hoten}
        sethoten={sethoten}
        cccd={cccd}
        setcccd={setcccd}
        sdt={sdt}
        setsdt={setsdt}
        email={email}
        setemail={setemail}
        onContactInfoFinish={onContactInfoFinish}
        ref={contactInfo}
      />

      <BookingInfo
        hanhkhach={hanhkhach}
        sethanhkhach={sethanhkhach}
        onBookingInfoFinish={onBookingInfoFinish}
        ref={bookingInfo}
      />

      <div className="submitButton">
        <Button type="primary" htmlType="submit" onClick={onSubmit}>
          Xác nhận
        </Button>
      </div>
    </div>
  );
}

export default ConfirmBooking;
