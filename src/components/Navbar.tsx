import { Button, Col, Dropdown, MenuProps, Row } from "antd";
import Search from "antd/es/input/Search";
import path from "path";
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import useUser from "../hooks/accountsystem/useUser";
import { MdOutlineArrowDropDown } from "react-icons/md";
import useLogOut from "../hooks/accountsystem/useLogout";

function Navbar() {
  const logout = useLogOut();

  const style: React.CSSProperties = {
    fontSize: 14,
    display: "flex",
    flexDirection: "row",
    color: "black",
    justifyContent: "center",
  };
  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <Link style={style} to="/trang-ca-nhan">
          <p>Trang cá nhân</p>
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <Link style={style} to="/reset-password">
          <p>Đổi mật khẩu</p>
        </Link>
      ),
    },
    {
      key: "3",
      label: (
        <div
          style={style}
          onClick={() => {
            logout.mutate();
          }}
        >
          <p>Đăng xuất</p>
        </div>
      ),
    },
  ];
  const user = useUser();
  const [p, setPath] = useState("");
  const loca = useLocation();
  React.useEffect(() => {
    // Google Analytics
    setPath(window.location.pathname);
  }, [loca]);
  if (p == "/dang-ky" || p == "/dang-nhap" || p == "/quen-mat-khau") {
    return (
      <div
        style={{
          height: "11vh",
          backgroundColor: "#4B268F",
        }}
      >
        <Row>
          <Col span={2}>
            <Link to="/">
              <h1
                style={{
                  color: "white",
                  marginLeft: 0,
                  marginTop: 10,

                  fontSize: 30,
                }}
              >
                4T
              </h1>
            </Link>
          </Col>
          <Col offset={6} span={8}></Col>
          <Col
            span={8}
            style={{
              marginTop: 15,
              display: "flex",
              justifyContent: "end",
            }}
          ></Col>
        </Row>
      </div>
    );
  }
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
          {user.data == null ? (
            <>
              {" "}
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
            </>
          ) : (
            <Dropdown menu={{ items }} trigger={["click"]}>
              <div style={{ display: "flex", marginRight: 35 }}>
                <p
                  style={{
                    color: "white",
                  }}
                >
                  Xin chào {user.data.user_metadata.ten}
                </p>
                <button
                  style={{
                    marginLeft: 3,

                    backgroundColor: "transparent",
                    border: "none",
                  }}
                >
                  <MdOutlineArrowDropDown
                    style={{ color: "white", fontSize: 20 }}
                  />
                </button>
              </div>
            </Dropdown>
          )}
        </Col>
      </Row>
      <div style={{ display: "flex", justifyContent: "start", marginLeft: 30 }}>
        <Link to="/">
          <Button className={p === "/" ? "navbutton active" : "navbutton"}>
            TRANG CHỦ
          </Button>
        </Link>
        <Link to="/dat-tour">
          <Button
            className={p === "/dat-tour" ? "navbutton active" : "navbutton"}
          >
            ĐẶT TOUR
          </Button>
        </Link>
        {user.data?.user_metadata.role == "staff" ? (
          <>
            {" "}
            <Link to="/danh-sach-khach-hang">
              <Button
                className={
                  p === "/danh-sach-khach-hang"
                    ? "navbutton active"
                    : "navbutton"
                }
              >
                KHÁCH HÀNG
              </Button>
            </Link>
            <Link to="/quan-ly-tour">
              <Button
                className={
                  p === "/quan-ly-tour" ? "navbutton active" : "navbutton"
                }
              >
                QUẢN LÝ TOUR
              </Button>
            </Link>
            <Link to="/danh-sach-nguon-luc">
              <Button
                className={
                  p === "/danh-sach-nguon-luc"
                    ? "navbutton active"
                    : "navbutton"
                }
              >
                THIẾT BỊ
              </Button>
            </Link>
            <Link to="/booking-can-thanh-toan">
              <Button
                className={
                  p === "/booking-can-thanh-toan"
                    ? "navbutton active"
                    : "navbutton"
                }
              >
                HÓA ĐƠN
              </Button>
            </Link>
            <Link to="/bao-cao">
              <Button
                className={p === "/bao-cao" ? "navbutton active" : "navbutton"}
              >
                BÁO CÁO
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}
        {user.data?.user_metadata.role == "admin" ? (
          <>
            {" "}
            <Link to="/danh-sach-khach-hang">
              <Button
                className={
                  p === "/danh-sach-khach-hang"
                    ? "navbutton active"
                    : "navbutton"
                }
              >
                KHÁCH HÀNG
              </Button>
            </Link>
            <Link to="/quan-ly-tour">
              <Button
                className={
                  p === "/quan-ly-tour" ? "navbutton active" : "navbutton"
                }
              >
                QUẢN LÝ TOUR
              </Button>
            </Link>
            <Link to="/danh-sach-nguon-luc">
              <Button
                className={
                  p === "/danh-sach-nguon-luc"
                    ? "navbutton active"
                    : "navbutton"
                }
              >
                THIẾT BỊ
              </Button>
            </Link>
            <Link to="/booking-can-thanh-toan">
              <Button
                className={
                  p === "/booking-can-thanh-toan"
                    ? "navbutton active"
                    : "navbutton"
                }
              >
                HÓA ĐƠN
              </Button>
            </Link>
            <Link to="/bao-cao">
              <Button
                className={p === "/bao-cao" ? "navbutton active" : "navbutton"}
              >
                BÁO CÁO
              </Button>
            </Link>
            <Link to="/quan-ly-tai-khoan">
              <Button
                className={
                  p === "/quan-ly-tai-khoan" ? "navbutton active" : "navbutton"
                }
              >
                QUẢN TRỊ
              </Button>
            </Link>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default Navbar;
