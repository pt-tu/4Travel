import React, { useState } from "react";
import { TourManagementCard } from "../../components/Task2Component/TourManagementCard";
import "../../components/Task2Component/TourStyle.css";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  FilterFilled,
  SearchOutlined,
  ArrowLeftOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import { Input, Space, ConfigProvider } from "antd";
import { Link } from "react-router-dom";

function TourManagement() {
  const { Search } = Input;
  const [Page, setPage] = useState<number>(1);
  const [TourName, setTourName] = useState("");
  const GetTourPage = {
    data: [
      {
        id: "1",
        name: "Tour 1",
        diemdi: "Hà Nội",
        diemden: "An Giang",
        startDate: "2022-01-01T00:00:00.001Z",
        endDate: "2022-01-10T00:00:00.001Z",
        isVis: true,
        hotel: "Hotel 1",
        bia: "https://cdn3.ivivu.com/2022/06/du-lich-an-giang-b.jpg",
        price: "1000",
      },
      {
        id: "2",
        name: "Tour 2",
        diemdi: "Hồ Chí Minh",
        diemden: "Bà Rịa – Vũng Tàu",
        startDate: "2022-02-01T00:00:00.001Z",
        endDate: "2022-02-10T00:00:00.001Z",
        isVis: false,
        hotel: "Hotel 2",
        bia: "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/12/07/vung-tau-17-15-41-55.jpg",
        price: "2000",
      },
      {
        id: "3",
        name: "Tour 3",
        diemdi: "Đà Nẵng",
        diemden: "Bắc Giang",
        startDate: "2022-03-01T00:00:00.001Z",
        endDate: "2022-03-10T00:00:00.001Z",
        isVis: true,
        hotel: "Hotel 3",
        bia: "https://upload.wikimedia.org/wikipedia/commons/0/04/%C4%90%C6%B0%E1%BB%9Dng_ph%E1%BB%91_th%C3%A0nh_ph%E1%BB%91_B%E1%BA%AFc_Giang.jpg",
        price: "3000",
      },
      // Add more tour page objects as needed
    ],
  };

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
          <Search
            placeholder="Nhập tên tour bạn muốn"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            style={{ marginTop: "30px" }}
            onChange={(e) => setTourName(e.target.value)}
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
              paddingBottom: "30px",
            }}
          >
            <Link to="/">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="ButtonUp"
              >
                {" "}
                <b>Quay lại</b>
              </Button>
            </Link>
            <Link to="/them-moi-tour">
              <Button icon={<PlusOutlined />} className="ButtonUp"></Button>
            </Link>
          </div>
          {GetTourPage.data?.map((item) => (
            <TourManagementCard
              name={item.name}
              id={item.id}
              diemdi={item.diemdi}
              hotel={item.hotel}
              bia={item.bia}
              price={item.price}
            ></TourManagementCard>
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
                Page > 1 && setPage(Page - 1);
              }}
              disabled={Page === 1}
            >
              Quay lại
            </Button>

            <Button
              type="primary"
              icon={<ArrowRightOutlined />}
              className="ButtonNext"
              style={{ direction: "rtl", boxShadow: "none", color: "White" }}
            >
              Xem thêm
            </Button>
          </div>
        </div>
      </ConfigProvider>
    </div>
  );
}

export default TourManagement;
