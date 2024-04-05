import React, { useState } from "react";
import { TourManagementCard } from "../../components/Task2Component/TourManagementCard"
import "../../components/Task2Component/TourStyle.css"
import { Button } from 'antd';
import { ArrowRightOutlined, FilterFilled, SearchOutlined, ArrowLeftOutlined, PlusOutlined } from '@ant-design/icons';
import { Input, Space, ConfigProvider } from 'antd';
import { Link } from "react-router-dom";

function TourManagement() {

  const { Search } = Input;
  const [Page, setPage] = useState<number>(1);
  const [TourName, setTourName] = useState("");

  return <div>

    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4B268F',
        },
      }}
    >
      <div className="CenterContainer">

        <Search placeholder="Nhập tên tour bạn muốn"
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
              paddingBottom: "30px"
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
        >
          Xem thêm
        </Button>
      </div>
      </div>
      
    </ConfigProvider>
  </div>;
}

export default TourManagement;
