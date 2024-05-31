import { useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, FormInstance, message, Modal, ConfigProvider } from "antd";
import "./Form.css";
import ContactInfo from "../../components/ContactInfo";
import BookingInfo from "../../components/BookingInfo";
import useCreateCustomer from "../../hooks/CustomerManagement/useCreateCustomer";
import useCreateBooking from "../../hooks/BookingManagement/useCreateBooking";
import useGetCustomerByCCCD from "../../hooks/CustomerManagement/useGetCustomerByCCCD";
import useUser from "../../hooks/accountsystem/useUser";
import dayjs from "dayjs";
import { client } from "../../hooks/recombee";
import recombee from "recombee-js-api-client";

function ConfirmBooking() {
  const contactInfo = useRef<FormInstance | undefined>();
  const bookingInfo = useRef<FormInstance | undefined>();
  const navigate = useNavigate();
  const location = useLocation();

  const user = useUser();
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
  if (createCustomer.isSuccess)
    if (!customerid) setcustomerid(createCustomer.data.id);

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

  const getcustomerbycccd = useGetCustomerByCCCD(cccd);
  if (getcustomerbycccd.isError)
    console.log((getcustomerbycccd.error as any).message);

  function HandleSubmit() {
    getcustomerbycccd.refetch();
    if (contactInfo.current) contactInfo.current.submit();
  }

  function HandleContactInfoFinish() {
    if (bookingInfo.current) bookingInfo.current.submit();
  }

  function HandleBookingInfoFinish() {
    if (!customerid && getcustomerbycccd.data) {
      setcustomerid(getcustomerbycccd.data.id);
      if (customerid) {
        if (!ngaysinh)
          setngaysinh(
            getcustomerbycccd.data.ngaysinh
              ? dayjs(getcustomerbycccd.data.ngaysinh).toISOString()
              : ""
          );
        setdiachi(getcustomerbycccd.data.diachi);
        setghichu(getcustomerbycccd.data.ghichu);
        setyeucau(getcustomerbycccd.data.yeucau);
      }
    }

    for (const hk of hanhkhach) {
      if (hk.hoten == hoten) {
        if (!ngaysinh) setngaysinh(hk.ngaysinh);
        if (!ghichu) setghichu(hk.ghichu);
        break;
      }
    }

    if (!ngaysinh) setngaysinh(new Date().toISOString());

    createCustomer.mutate();

    user.data && client.send(new recombee.AddPurchase(user.data.id, tourid));
  }

  useEffect(() => {
    if (createCustomer.isSuccess) createBooking.mutate();
  }, [createCustomer.isSuccess]);

  // Lỗi 23505: duplicate key value violates unique constraint "customer_cccd_key"
  // Lỗi này xảy ra khi ta update customer mà vẫn giữ nguyên cccd
  // Do đó có thể xem đây là lỗi giả, cho phép chạy lại mutate 1 lần nữa
  useEffect(() => {
    if (createCustomer.isError) {
      if (retrymutate) {
        createCustomer.mutate();
        setretrymutate(false);
      } else
        message.error(
          "Cập nhật thông tin liên lạc thất bại. Lỗi: " +
            (createCustomer.error as any).message
        );
    }
  }, [createCustomer.isError]);

  useEffect(() => {
    if (createBooking.isError) {
      message.error(
        "Cập nhật booking thất bại. Lỗi: " +
          (createBooking.error as any).message
      );
    }
  }, [createBooking.isError]);

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
          <Button
            type="primary"
            htmlType="submit"
            onClick={HandleSubmit}
            style={{ boxShadow: "none", color: "White" }}
          >
            Xác nhận
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default ConfirmBooking;
