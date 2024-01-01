import "./Form.css";
import ContactInfo from "../../components/ContactInfo";
import BookingInfo from "../../components/BookingInfo";

function ConfirmBooking() {
  return (
    <div className="wrapper">
      {/*link tùy theo trang đó là chỉnh sửa booking hay thêm mới booking*/}
      <h3>Quay lại</h3>
      <h2>Thông tin khách hàng</h2>
      <ContactInfo />
      <BookingInfo />
    </div>
  );
}

export default ConfirmBooking;
