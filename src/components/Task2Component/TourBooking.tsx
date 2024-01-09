import React from "react";
import "./TourStyle.css";
import Hanoi from "../../images/hanoi.jpg";
import location from "../../images/location.png";
import { useNavigate } from "react-router";
interface PropsType {
  name: string;
  id: string;
  diemdi: string;
  hotel: string;
  bia: string;
  price: string;
}

export const TourBooking = (props: PropsType) => {
  const navigate = useNavigate();
  return (
    <div
      className="card GridContainer"
      onClick={() =>
        navigate("/xac-nhan-dat-tour", { state: { tour_id: props.id } })
      }
      style={{ cursor: "pointer" }}
    >
      <div>
        <img
          className="cardImg"
          src={props?.bia ?? location}
          alt={props?.name}
        />
      </div>
      <div style={{ textAlign: "left", paddingLeft: 10 }}>
        <h3 className="title">{props?.name}</h3>
        <span className="normal">Mã tour: </span>
        <span className="NameBold">{props?.id}</span> <br></br>
        <span className="normal">Nơi khởi hành: </span>
        <span className="NameBold">{props?.diemdi}</span> <br></br>
        <span className="normal">Khách sạn: </span>
        <span className="NameBold">{props?.hotel}</span> <br></br>
      </div>
      <div style={{ textAlign: "right", paddingRight: 10, paddingTop: 120 }}>
        <span style={{ color: "#FD5056" }} className="normal">
          Price:{" "}
        </span>
        <span style={{ color: "#FD5056" }} className="NameBold">
          {props?.price}
          <u>đ</u>
        </span>
      </div>
    </div>
  );
};
