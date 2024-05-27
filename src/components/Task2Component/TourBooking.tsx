import React from "react";
import "./TourStyle.css";
import Hanoi from "../../images/hanoi.jpg";
import location from "../../images/location.png";
import { useNavigate } from "react-router";
import { client } from "../../hooks/recombee";
import recombee from "recombee-js-api-client";
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

  const onClick = () => {
    // client.send(new recombee.AddDetailView("user-9318", props.id));
    navigate("/xac-nhan-dat-tour", { state: { tour_id: props.id } });
  };

  return (
    <div
      className="card GridContainer"
      onClick={onClick}
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
