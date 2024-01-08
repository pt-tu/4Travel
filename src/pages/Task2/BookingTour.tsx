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
import useUser from "../../hooks/accountsystem/useUser";
function BookingTour() {
  const { Search } = Input;
  const [Page, setPage] = useState<number>(1);
  const [diemdi, setdiemdi] = useState("");
  const [diemden, setdiemden] = useState("");
  const [ngaydi, setngaydi] = useState("2000-01-01T00:00:00.001Z");
  const [ngayve, setngayve] = useState("2099-01-01T00:00:00.001Z");
  const [TourName, setTourName] = useState("");
  const GetTourPage = useGetTourPage(Page, diemdi, diemden, ngaydi, ngayve, TourName);
  const userAccount= useUser();
  var isVis=false;

  if(userAccount.data?.user_metadata.role=="user"){
    isVis=true;
  }
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
                  style={{ marginRight: 20 }}
                  bordered={false}
                  options={[
                    { value: "Đà Nẵng", label: "Đà Nẵng" },
                    { value: "Hà Nội", label: "Hà Nội" },
                    { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
                  ]}
                  placeholder="Điểm đi"
                  onChange={(value: string) => {
                    setdiemdi(value);
                  }}
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
                  bordered={false}
                  options={[
                    { value: "Đà Nẵng", label: "Đà Nẵng" },
                    { value: "Hà Nội", label: "Hà Nội" },
                    { value: "Hồ Chí Minh", label: "Hồ Chí Minh" },
                  ]}
                  placeholder="Điểm đến"
                  onChange={(value: string) => {
                    setdiemden(value);
                  }}
                />
              </div>
            </div>
            <div className="fitterDiv">
              <DatePicker.RangePicker className="fitter"
                onChange={(date: any) => {
                  setngaydi(date[0]?.toISOString() ?? "");
                  setngayve(date[1]?.toISOString() ?? "");
                }}
              ></DatePicker.RangePicker>
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
                color: "White"
              }}
              onClick={() => {
                setPage(1);
                GetTourPage.refetch();
              }}
            >
              <b>Tìm kiếm</b>
            </Button>
          </div>
          <Search
            placeholder="Nhập tên tour bạn muốn"
            className="SearchBar"
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            allowClear
            onChange={(e) => setTourName(e.target.value)}
            onSearch={() => {
              setPage(1);
              GetTourPage.refetch();
            }}
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            
            <Link to="/lich-su-dat" style={{display: isVis ? 'block' : 'none'}}>
              <Button icon={<HistoryOutlined />} style={{visibility: isVis ? 'visible' : 'hidden'  }} 
              className="ButtonUp" disabled={!isVis}>

              </Button>
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
              style={{ boxShadow: "none", color: "White" }}
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
              style={{ direction: "rtl", boxShadow: "none", color: "White" }}
              onClick={() => { GetTourPage.data?.length !== 0 && setPage(Page + 1) }}
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
