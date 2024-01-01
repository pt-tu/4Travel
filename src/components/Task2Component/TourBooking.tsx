import React from "react";
import "./TourStyle.css";
import Hanoi from "../../images/hanoi.jpg";
export const TourBooking = () => {
  return (
    <div className="card GridContainer">
      <div>
        <img className="cardImg" src={Hanoi} alt="Hanoi" />
      </div>
      <div style={{ textAlign: "left", paddingLeft: 10 }}>
        <h3 className="title">
          Combo 3N3Đ Hà Nội & Khách sạn 5 Sao (Bao ăn sáng, dịch vụ đưa đón tại
          sân bay)
        </h3>
        <span className="normal">Mã tour: </span>
        <span className="NameBold">NDDNG2640-011-161123VU</span> <br></br>
        <span className="normal">Nơi khởi hành: </span>
        <span className="NameBold">Đà Nẵng</span> <br></br>
        <span className="normal">Khách sạn: </span>
        <span className="NameBold">
          Peridot Grand Luxury Boutique Hotel
        </span>{" "}
        <br></br>
      </div>
      <div style={{ textAlign: "right", paddingRight: 10, paddingTop: 120 }}>
        <span style={{ color: "#FD5056" }} className="normal">
          Price:{" "}
        </span>
        <span style={{ color: "#FD5056" }} className="NameBold">
          6.999.000<u>đ</u>
        </span>
      </div>
    </div>
  );
};
