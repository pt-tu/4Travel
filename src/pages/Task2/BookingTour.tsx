import { useEffect, useState } from "react";
import { TourBooking } from "../../components/Task2Component/TourBooking";
import "../../components/Task2Component/TourStyle.css";
import location from "../../images/location.png";
import { Button } from "antd";
import {
  ArrowRightOutlined,
  HistoryOutlined,
  ArrowLeftOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { Input, ConfigProvider, DatePicker, Select } from "antd";
import { Link, useLocation } from "react-router-dom";
function BookingTour() {
  const data = useLocation(); // usually I call this location but it's already used in this module
  const { Search } = Input;
  const { Option } = Select;
  const [Page, setPage] = useState<number>(1);
  const [diemdi, setdiemdi] = useState("");
  const [diemden, setdiemden] = useState(
    data.state ? data.state.diemden : undefined
  );
  const [ngaydi, setngaydi] = useState("2000-01-01T00:00:00.001Z");
  const [ngayve, setngayve] = useState("2099-01-01T00:00:00.001Z");
  const [TourName, setTourName] = useState(
    data.state ? data.state.name ?? "" : ""
  );
  // prettier-ignore
  const diaDiem = ["An Giang", "Bà Rịa – Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hồ Chí Minh", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"];
  var isVis = true;

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
                  showSearch
                  allowClear
                  bordered={false}
                  placeholder="Điểm đi"
                  onChange={(value) => {
                    setdiemdi(value ?? "");
                  }}
                >
                  {diaDiem.map((e) => (
                    <Option key={e}>{e}</Option>
                  ))}
                </Select>
                <ArrowRightOutlined></ArrowRightOutlined>
                <img
                  src={location}
                  alt="location"
                  style={{ height: 30, width: 25, marginLeft: 20 }}
                />
                <Select
                  size="large"
                  className="Selector"
                  showSearch
                  allowClear
                  bordered={false}
                  placeholder="Điểm đến"
                  value={diemden}
                  onChange={(value) => {
                    setdiemden(value ?? undefined);
                  }}
                >
                  {diaDiem.map((e) => (
                    <Option key={e}>{e}</Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="fitterDiv">
              <DatePicker.RangePicker
                className="fitter"
                placeholder={["Từ ngày", "Đến ngày"]}
                onChange={(date) => {
                  setngaydi(
                    date
                      ? date[0]
                        ? date[0].toISOString() ?? "2000-01-01T00:00:00.001Z"
                        : "2000-01-01T00:00:00.001Z"
                      : "2000-01-01T00:00:00.001Z"
                  );
                  setngayve(
                    date
                      ? date[1]
                        ? date[1].toISOString() ?? "2099-01-01T00:00:00.001Z"
                        : "2099-01-01T00:00:00.001Z"
                      : "2099-01-01T00:00:00.001Z"
                  ); // If date is null, set to max date possible
                }}
              ></DatePicker.RangePicker>
            </div>
          </div>
          <Search
            placeholder="Nhập tên tour bạn muốn"
            className="SearchBar"
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            allowClear
            value={TourName}
            onChange={(e) => setTourName(e.target.value)}
            onSearch={() => {
              setPage(1);
            }}
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "flex-end",
            }}
          >
            <Link
              to="/lich-su-dat"
              style={{ display: isVis ? "block" : "none" }}
            >
              <Button
                icon={<HistoryOutlined />}
                style={{ visibility: isVis ? "visible" : "hidden" }}
                className="ButtonUp"
                disabled={!isVis}
              ></Button>
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
                Page > 1 && setPage(Page - 1);
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
    </div>
  );
}

export default BookingTour;
