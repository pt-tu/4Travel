import React from "react";
import { TourManagementCard } from "../../components/Task2Component/TourManagementCard"
import "../../components/Task2Component/TourStyle.css"
import { Button } from 'antd';
import { ArrowRightOutlined, FilterFilled, ReloadOutlined } from '@ant-design/icons';
import { Input, Space, ConfigProvider, DatePicker, Select } from 'antd';


function TourManagement() {

  const { Search } = Input;

  return <div>

    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#4B268F',
        },
      }}
    >
      <div className="CenterContainer">

        <Search placeholder="Nhập tên, mã tour hoặc khách hàng bạn muốn" className="SearchBar" allowClear enterButton size="large" />
        <div style={{ width: '80%', display: 'flex', justifyContent: "space-between" }}>
          <Button icon={<FilterFilled />} className="ButtonUp"> Lọc</Button>

        </div>
        <TourManagementCard></TourManagementCard>
        <TourManagementCard></TourManagementCard>
        <TourManagementCard></TourManagementCard>
        <TourManagementCard></TourManagementCard>
        <TourManagementCard></TourManagementCard>
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', width: '90%', marginTop: 50 }}>
        <Button type="primary" icon={<ArrowRightOutlined />} className="ButtonNext" style={{ direction: 'rtl', boxShadow: 'none' }}>
          Xem thêm
        </Button>
      </div>
    </ConfigProvider>
  </div>;
}

export default TourManagement;
