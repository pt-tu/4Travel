import React, { useEffect, useState } from "react";
import "./TourStyle.css";
import Hanoi from "../../images/hanoi.jpg";
import { Button, ConfigProvider, Popconfirm, message } from "antd";
import { Link } from "react-router-dom";
import location from "../../images/location.png";
import useDeleteBooking from "../../hooks/BookingManagement/useDeleteBooking";

interface PropsType {
  name: any;
  tour_id: any;
  diemdi: any;
  hoten: any;
  bia: any;
  customer: any;
  hanhkhach: any;
}

export const TourHistory = (props: PropsType) => {
  const [cusid, setcusid] = useState("");
  const [tourid, settourid] = useState("");
  const deleteBooking = useDeleteBooking(cusid, tourid);
  if (deleteBooking.isSuccess) {
    message.success("Xoá thành công");
    window.location.reload();
  }

  useEffect(() => {
    if (cusid && tourid) deleteBooking.mutate();
  }, [cusid, tourid]);

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
          <span className="NameBold">{props?.tour_id}</span> <br></br>
          <span className="normal">Nơi khởi hành: </span>
          <span className="NameBold">{props?.diemdi}</span> <br></br>
          <span className="normal">Người đặt: </span>
          <span className="NameBold">{props?.hoten}</span> <br></br>
        </div>
        <div style={{ paddingRight: 10, paddingTop: 110 }}>
          <Link
            to="/xac-nhan-dat-tour"
            state={{
              tour_id: props.tour_id,
              customer: props.customer,
              hanhkhach: props.hanhkhach,
            }}
          >
            {/*comment như customerlist dòng 54*/}
            <Button type="primary" style={{ boxShadow: "none" }}>
              Sửa
            </Button>
          </Link>
          <Popconfirm
            title="Xác nhận?"
            description={"Xóa booking " + props.name}
            onConfirm={() => {
              setcusid(props.customer[0]);
              settourid(props.tour_id);
            }}
          >
            <Button
              type="primary"
              style={{ boxShadow: "none", marginLeft: 10 }}
              danger
            >
              Xóa
            </Button>
          </Popconfirm>
        </div>
      </ConfigProvider>
    </div>
  );
};
