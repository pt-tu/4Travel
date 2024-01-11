import React from "react";
import "./HomePage.css";

import DLMienTrung from "../../images/bn_231101_DL AmThucMienTrung_1.webp";
import DLMienBac from "../../images/bn_231019_BannerWeb_MienBac-04.webp";
import DLDubai from "../../images/bn_230928_Dubai 412x309px.webp";
import TPHCM from "../../images/hcm city.jpg";
import VungTau from "../../images/bds-vungtau-1514295777.jpg";
import HaNoi from "../../images/hanoi.jpg";
import DaLat from "../../images/Da-Lat-City.jpg";
import HoiAn from "../../images/hoian.jpg";
import SixIcons from "../../images/6Icons.png";
import { Button, Col, Input, Row } from "antd";
import { Link, useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();
  const bgitem: React.CSSProperties = {
    width: "100%",
    height: 250,
  };
  const textitem: React.CSSProperties = {
    position: "absolute",
    color: "white",
    fontSize: 18,
    paddingLeft: 12,
    marginTop: 12,
    textShadow: "0px 0px 3px #000",
    fontWeight: 600,
  };
  return (
    <div>
      <div>
        <div className="DivBG">
          <h1
            style={{
              color: "white",
              margin: 0,
              marginTop: 35,
              fontSize: 30,
              marginBottom: 0,
            }}
          >
            4 TRAVEL
          </h1>
          <h2
            style={{
              color: "white",
              marginTop: 30,
              marginBottom: 0,
              fontSize: 18,
            }}
          >
            Giúp kỳ nghỉ của bạn ý nghĩa và trọn vẹn
          </h2>

          <Link to="/dat-tour">
            <Button
              style={{
                marginTop: 30,
                fontSize: 15,
                backgroundColor: "#4B268F",
                color: "white",
                border: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 20,
                borderRadius: 10,
              }}
            >
              ĐẶT TOUR NGAY
            </Button>
          </Link>
        </div>

        <div style={{ marginLeft: 35, marginRight: 35 }}>
          <h2 style={{ fontSize: 18, textAlign: "start" }}>ƯU ĐÃI CHO BẠN</h2>

          <Row
            gutter={12}
            style={{
              display: "flex",
              alignItems: "start",
            }}
          >
            <Col span={8}>
              <img src={DLMienTrung} style={{ width: "100%" }} />
            </Col>
            <Col span={8}>
              <img src={DLMienBac} style={{ width: "100%" }} />
            </Col>
            <Col span={8}>
              <img src={DLDubai} style={{ width: "100%" }} />
            </Col>
          </Row>

          <h2 style={{ fontSize: 18, textAlign: "start" }}>
            ĐỊA ĐIỂM PHỔ BIẾN
          </h2>

          <Row gutter={12}>
            <Col span={12}>
              <div
                className="clickable"
                onClick={() =>
                  navigate("/dat-tour", { state: { diemden: "Hồ Chí Minh" } })
                }
              >
                <p style={textitem}>Thành phố Hồ Chí Minh</p>
                <img src={TPHCM} style={bgitem} />
              </div>
            </Col>
            <Col span={12}>
              <div
                className="clickable"
                onClick={() =>
                  navigate("/dat-tour", { state: { diemden: "Vũng Tàu" } })
                }
              >
                <p style={textitem}>Vũng Tàu</p>
                <img src={VungTau} style={bgitem} />
              </div>
            </Col>
          </Row>
          <Row gutter={12} style={{ marginTop: 15 }}>
            <Col span={8}>
              <div
                className="clickable"
                onClick={() =>
                  navigate("/dat-tour", { state: { diemden: "Hà Nội" } })
                }
              >
                <p style={textitem}>Hà Nội</p>
                <img src={HaNoi} style={bgitem} />
              </div>
            </Col>
            <Col span={8}>
              <div
                className="clickable"
                onClick={() =>
                  navigate("/dat-tour", { state: { diemden: "Đà Lạt" } })
                }
              >
                <p style={textitem}>Đà Lạt</p>
                <img src={DaLat} style={bgitem} />
              </div>
            </Col>
            <Col span={8}>
              <div
                className="clickable"
                onClick={() =>
                  navigate("/dat-tour", { state: { diemden: "Hội An" } })
                }
              >
                <p style={textitem}>Hội An</p>
                <img src={HoiAn} style={bgitem} />
              </div>
            </Col>
          </Row>

          <h2 style={{ fontSize: 18, textAlign: "start" }}>
            VÌ SAO NÊN CHỌN 4TRAVEL
          </h2>

          <div>
            <img src={SixIcons} alt="Deal" style={{ width: "100%" }} />
          </div>
        </div>
        <div style={{ height: "25vh", backgroundColor: "#4B268F" }}>
          <p style={{ color: "#4B268F" }}>a</p>
          <div style={{ color: "white", marginBottom: 20 }}>
            ĐỂ LẠI EMAIL CỦA BẠN ĐỂ NHẬN THÔNG BÁO VỀ KHUYẾN MÃI CỦA CHÚNG TÔI
          </div>

          <div
            style={{
              display: "flex",
              width: "40vw",
              margin: "0 auto",
            }}
          >
            <Input
              className="InputLastEmail"
              type="text"
              placeholder="EMAIL CỦA BẠN"
              style={{ marginRight: 20, borderRadius: 0 }}
            />
            <div>
              <Button
                style={{
                  borderRadius: 0,
                  backgroundColor: "#7200E4",
                  width: 120,
                  border: "none",
                  color: "white",
                }}
              >
                ĐĂNG KÝ
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
