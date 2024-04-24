import { useState } from "react";
import { TourHistory } from "../../components/Task2Component/TourHistory";
import "../../components/Task2Component/TourStyle.css";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, ConfigProvider } from "antd";

function BookingTourHistory() {
  const { Search } = Input;
  const [Page, setPage] = useState(1);
  const [TourName, setTourName] = useState("");
  const BookingPageData = {
    data: [
      {
        tour: {
          id: "1",
          bia: "https://cdn3.ivivu.com/2022/06/du-lich-an-giang-b.jpg",
          name: "Tour 1",
          diemdi: "Hà Nội",
        },
        customer: {
          id: "1",
          property1: "Value1",
          property2: "Value2",
          property3: "Value3",
          name: "Customer 1",
        },
        hanhkhach: 5,
      },
      {
        tour: {
          id: "2",
          bia: "https://imagevietnam.vnanet.vn//MediaUpload/Org/2023/12/07/vung-tau-17-15-41-55.jpg",
          name: "Tour 2",
          diemdi: "Hồ Chí Minh",
        },
        customer: {
          id: "2",
          property1: "Value1",
          property2: "Value2",
          property3: "Value3",
          name: "Customer 2",
        },
        hanhkhach: 3,
      },
      {
        tour: {
          id: "3",
          bia: "https://upload.wikimedia.org/wikipedia/commons/0/04/%C4%90%C6%B0%E1%BB%9Dng_ph%E1%BB%91_th%C3%A0nh_ph%E1%BB%91_B%E1%BA%AFc_Giang.jpg",
          name: "Tour 3",
          diemdi: "Đà Nẵng",
        },
        customer: {
          id: "3",
          property1: "Value1",
          property2: "Value2",
          property3: "Value3",
          name: "Customer 3",
        },
        hanhkhach: 4,
      },
      // ... add more data as needed
    ],
  };

  return (
    <div>
      <ConfigProvider theme={{ token: { colorPrimary: "#4B268F" } }}>
        <div className="CenterContainer">
          <Search
            placeholder="Nhập tên, mã tour hoặc khách hàng bạn muốn"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            style={{ marginTop: "30px" }}
            onChange={(e) => setTourName(e.target.value)}
          />
          {BookingPageData.data?.map((item) => {
            if (item.tour == null) return;
            const customer = Object.values(item.customer);
            const tour = Object.values(item.tour);

            return (
              <TourHistory
                name={tour[2]}
                tour_id={tour[0]}
                diemdi={tour[3]}
                hoten={customer[4]}
                bia={tour[1]}
                hanhkhach={item.hanhkhach}
                customer={customer}
              />
            );
          })}
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
              disabled={Page == 1}
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

export default BookingTourHistory;
