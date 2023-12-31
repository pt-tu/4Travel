import { Button, Col, Row } from "antd";
import Search from "antd/es/input/Search";
import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div
      style={{
        height: "18vh",
        backgroundColor: "#4B268F",
      }}
    >
      <Row>
        <Col span={2}>
          <Link to="/">
            <h1 style={{ color: "white", marginLeft: 20, marginTop: 10 }}>
              4T
            </h1>
          </Link>
        </Col>
        <Col offset={6} span={8}>
          <Search style={{ width: "100%", color: "white", marginTop: 15 }} />
        </Col>
        <Col
          span={8}
          style={{
            marginTop: 15,
            display: "flex",
            justifyContent: "end",
          }}
        >
          <Link to="/dang-ky">
            <Button
              style={{
                color: "#4B268F",
                width: 100,
                fontSize: 12,
                fontWeight: "bold",
              }}
            >
              ĐĂNG KÝ
            </Button>
          </Link>
          <Link to="/dang-nhap">
            <Button
              style={{
                marginLeft: 30,
                fontWeight: "bold",
                width: 100,
                color: "#4B268F",
                fontSize: 12,
                marginRight: 50,
              }}
            >
              ĐĂNG NHẬP
            </Button>
          </Link>
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "start", marginLeft: 30 }}>
        <Link to="/">
          <Button className="navbutton">TRANG CHỦ</Button>
        </Link>
        <Link to="/dat-tour">
          <Button className="navbutton">ĐẶT TOUR</Button>
        </Link>
        <Link to="/danh-sach-khach-hang">
          <Button className="navbutton">KHÁCH HÀNG</Button>
        </Link>
        <Link to="/quan-ly-tour">
          <Button className="navbutton">QUẢN LÝ TOUR</Button>
        </Link>
        <Link to="/danh-sach-nguon-luc">
          <Button className="navbutton">THIẾT BỊ</Button>
        </Link>
        <Link to="">
          <Button className="navbutton">HÓA ĐƠN</Button>
        </Link>
        <Link to="">
          <Button className="navbutton">BÁO CÁO</Button>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
