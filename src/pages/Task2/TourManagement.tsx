import React, { useState } from "react";
import { TourManagementCard } from "../../components/Task2Component/TourManagementCard"
import "../../components/Task2Component/TourStyle.css"
import { Button } from 'antd';
import { ArrowRightOutlined, FilterFilled, SearchOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { Input, Space, ConfigProvider } from 'antd';
import useGetTourPage from "../../hooks/TourManagement/useGetTourPage";

function TourManagement() {

  const { Search } = Input;
  const [Page, setPage] = useState<number>(1);
  const [TourName, setTourName] = useState("");
  const GetTourPage = useGetTourPage(Page, "", "", "2000-01-01T00:00:00.001Z", "2099-01-01T00:00:00.001Z", TourName);
  if (GetTourPage.isError) {
    console.log(GetTourPage.error);
  }

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
          onSearch={() => {
            setPage(1);
            GetTourPage.refetch();
          }}
        />
        
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
  </div>;
}

export default TourManagement;
