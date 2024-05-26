import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, FormInstance, message, Modal, ConfigProvider } from "antd";
import "./Form.css";
import ContactInfo from "../../components/ContactInfo";
import BookingInfo from "../../components/BookingInfo";
import dayjs from "dayjs";
import { client } from "../../hooks/recombee";
import recombee from "recombee-js-api-client";

function ConfirmBooking() {
  const contactInfo = useRef<FormInstance | undefined>();
  const bookingInfo = useRef<FormInstance | undefined>();
  const navigate = useNavigate();
  const location = useLocation();

  const tourid = location.state ? location.state.tour_id ?? "" : "";
  const [customerid, setcustomerid] = useState(
    location.state ? location.state.cus_id ?? "" : ""
  );
  const [hoten, sethoten] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[4] ?? ""
        : ""
      : ""
  );
  const [cccd, setcccd] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[2] ?? ""
        : ""
      : ""
  );
  const [sdt, setsdt] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[1] ?? ""
        : ""
      : ""
  );
  const [email, setemail] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[3] ?? ""
        : ""
      : ""
  );
  const [ngaysinh, setngaysinh] = useState(
    location.state
      ? location.state.customer
        ? dayjs(location.state.customer[8]).toISOString()
        : ""
      : ""
  );
  const [diachi, setdiachi] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[5] ?? ""
        : ""
      : ""
  );
  const [ghichu, setghichu] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[6] ?? ""
        : ""
      : ""
  );
  const [yeucau, setyeucau] = useState(
    location.state
      ? location.state.customer
        ? location.state.customer[7] ?? ""
        : ""
      : ""
  );
  const [hanhkhach, sethanhkhach] = useState(
    location.state
      ? location.state.hanhkhach ?? [
          { hoten: hoten, gioitinh: "", ngaysinh: ngaysinh, ghichu: ghichu },
        ]
      : [{ hoten: hoten, gioitinh: "", ngaysinh: ngaysinh, ghichu: ghichu }]
  );
  const [retrymutate, setretrymutate] = useState(true);

  // Nếu không truyền tour_id thì back
  useEffect(() => {
    if (!tourid) {
      message.error("Không tìm thấy tour");
      navigate(-1);
    }
  }, []);

  const onConfirm = () => {
    if (tourid) {
      // client.send(new recombee.AddPurchase("user-7499", tourid));
    }
  };

  return (
    <div className="wrapper">
      <ConfigProvider theme={{ token: { colorPrimary: "#4B268F" } }}>
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
          setretrymutate={setretrymutate}
          ref={contactInfo}
        />

        <BookingInfo
          hanhkhach={hanhkhach}
          sethanhkhach={sethanhkhach}
          ref={bookingInfo}
        />

        <div className="submitButton">
          <Button
            type="primary"
            htmlType="submit"
            style={{ boxShadow: "none", color: "White" }}
            onClick={onConfirm}
          >
            Xác nhận
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default ConfirmBooking;
