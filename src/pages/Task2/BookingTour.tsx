import React from "react";
import { TourBooking } from "../../components/Task2Component/TourBooking";
import "../../components/Task2Component/TourStyle.css";
import location from "../../images/location.png";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  FilterFilled,
  HistoryOutlined,
} from "@ant-design/icons";
import { Input, Space, ConfigProvider, DatePicker, Select } from "antd";
import { inherits } from "util";
import { Link } from "react-router-dom";
function BookingTour() {
  const { Search } = Input;

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4B268F",
          },
        }}
      >
        <div className="CenterContainer">
          <div className="LocateDateBar" style={{marginTop: "30px"}}>
            <div className="fitterDiv">
              <div
                className="fitter"
                style={{
                  backgroundColor: "white",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={location}
                  alt="location"
                  style={{ height: 30, width: 25, marginLeft: 10 }}
                />
                <Select
                  size="large"
                  className="Selector"
                  defaultValue="DaNang"
                  style={{ marginRight: 20 }}
                  bordered={false}
                  options={[
                    { value: "DaNang", label: "Đà Nẵng" },
                    { value: "HaNoi", label: "Hà Nội" },
                    { value: "HCM", label: "Hồ Chí Minh" },
                  ]}
                />
                <ArrowRightOutlined></ArrowRightOutlined>
                <img
                  src={location}
                  alt="location"
                  style={{ height: 30, width: 25, marginLeft: 20 }}
                />
                <Select
                  size="large"
                  className="Selector"
                  defaultValue="HaNoi"
                  bordered={false}
                  options={[
                    { value: "DaNang", label: "Đà Nẵng" },
                    { value: "HaNoi", label: "Hà Nội" },
                    { value: "HCM", label: "Hồ Chí Minh" },
                  ]}
                />
              </div>
            </div>
            <div className="fitterDiv">
              <DatePicker.RangePicker className="fitter"></DatePicker.RangePicker>
            </div>

            <Button
              type="primary"
              style={{
                boxShadow: "none",
                height: "50px",
                borderRadius: "4px",
                marginTop: "3px",
                marginRight: "3px",
                marginLeft: "3px",
              }}
            >
              <b>Tìm kiếm</b>
            </Button>
          </div>
          <Search
            placeholder="Nhập tên hoặc mã tour bạn muốn"
            className="SearchBar"
            allowClear
            enterButton
            size="large"
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Button icon={<FilterFilled />} className="ButtonUp">
              {" "}
              Lọc
            </Button>
            <Link to="/lich-su-dat">
              <Button icon={<HistoryOutlined />} className="ButtonUp"></Button>
            </Link>
          </div>
          <TourBooking></TourBooking>
          <TourBooking></TourBooking>
          <TourBooking></TourBooking>
          <TourBooking></TourBooking>
          <TourBooking></TourBooking>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "90%",
            marginTop: 50,
          }}
        >
          <Button
            type="primary"
            icon={<ArrowRightOutlined />}
            className="ButtonNext"
            style={{ direction: "rtl", boxShadow: "none" }}
          >
            Xem thêm
          </Button>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default BookingTour;
