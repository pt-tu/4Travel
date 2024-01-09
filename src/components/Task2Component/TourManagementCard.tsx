import React from "react";
import "./TourStyle.css";
import Hanoi from "../../images/hanoi.jpg";
import { Button, ConfigProvider } from "antd";
import { Link } from "react-router-dom";
import location from "../../images/location.png";

interface PropsType {
  name: string;
  id: string;
  diemdi: string;
  hotel: string;
  bia: string;
  price: string;
}

export const TourManagementCard = (props: PropsType) => {
  return (
    <div className="card GridContainer">
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#FFB700",
          },
        }}
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
        <div style={{ paddingRight: 10, paddingTop: 110 }}>
          <Link to="/them-moi-tour" state={{ id: props.id }}>
            <Button type="primary" style={{ boxShadow: "none" }}>
              Sửa
            </Button>
          </Link>
          <Button
            type="primary"
            style={{ boxShadow: "none", marginLeft: 10 }}
            danger
          >
            Xóa
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
};
