import React from "react";
import { TourHistory } from "../../components/Task2Component/TourHistory";
import "../../components/Task2Component/TourStyle.css";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  FilterFilled,
  ReloadOutlined,
} from "@ant-design/icons";
import { Input, Space, ConfigProvider, DatePicker, Select } from "antd";
function BookingTourHistory() {
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
          <Search
            placeholder="Nhập tên, mã tour hoặc khách hàng bạn muốn"
            className="SearchBar"
            allowClear
            enterButton
            size="large"
            style={{marginTop: "30px"}}
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
          </div>
          <TourHistory></TourHistory>
          <TourHistory></TourHistory>
          <TourHistory></TourHistory>
          <TourHistory></TourHistory>
          <TourHistory></TourHistory>
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

export default BookingTourHistory;
