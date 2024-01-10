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
import useUser from "../../hooks/accountsystem/useUser";
import useGetBookingPage from "../../hooks/BookingManagement/useGetBookingPage";

function BookingTourHistory() {
  const { Search } = Input;
  const User = useUser();
  const [Page, setPage] = useState(1);
  const [TourName, setTourName] = useState("");
  const BookingPageData = useGetBookingPage(Page, TourName);

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
            onSearch={() => {
              setPage(1);
              BookingPageData.refetch();
            }}
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
              onClick={() => {
                BookingPageData.data?.length !== 0 && setPage(Page + 1);
              }}
              disabled={(BookingPageData.data?.length ?? 0) < 5}
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
