import React, { useState } from "react";
import { TourBooking } from "../../components/Task2Component/TourBooking";
import "../../components/Task2Component/TourStyle.css";
import location from "../../images/location.png";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  FilterFilled,
  HistoryOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, Space, ConfigProvider, DatePicker, Select } from "antd";
import { Link } from "react-router-dom";
import useGetTourPage from "../../hooks/TourManagement/useGetTourPage";
function BookingTour() {
  const { Search } = Input;
  const [Page, setPage] = useState<number>(1);

  const GetTourPage = useGetTourPage(Page);
  
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
          <div className="LocateDateBar" style={{ marginTop: "30px" }}>
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
                color:"White"
              }}
            >
              <b>Tìm kiếm</b>
            </Button>
          </div>
          <Search
            placeholder="Nhập tên hoặc mã tour bạn muốn"
            className="SearchBar"
            enterButton={<SearchOutlined style={{color:"White"}}/>}
            size="large"
            allowClear
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
          {GetTourPage.data?.map((item) => (
            <TourBooking
              name={item.name}
              id={item.id}
              diemdi={item.diemdi}
              hotel={item.hotel}
              bia={item.bia}
              price={item.price}
            ></TourBooking>
          ))}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              width: "80%",
              marginTop: 50,
            }}
          >
            <Button
              type="primary"
              icon={<ArrowLeftOutlined />}
              className="ButtonNext"
              style={{ boxShadow: "none", color:"White" }}
              onClick={() => {
                Page > 1 && setPage(Page - 1)
              }}
            >
              Quay lại
            </Button>

            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              className="ButtonNext"
              style={{ direction: "rtl", boxShadow: "none", color:"White"}}
              onClick={() => {GetTourPage.data?.length!=0 && setPage(Page + 1) }}
            >
              Xem thêm
            </Button>
          </div>
        </div>

      </ConfigProvider>
    </div>
  );
}

export default BookingTour;
