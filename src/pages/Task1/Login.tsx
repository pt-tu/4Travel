import React from "react";
import '../Task1/Style.css';
import Logo4T from "../../images/logo4T.png";

export default function Login() {
  return (
    <div className="LoginPage">
      <header className="Background">
        <img
          src= {Logo4T}
          alt="Logo"
          className="LogoImg"
        />
      </header>

      <main className="MainForm">

        <div className="LoginField">
        <h1 className="H1Travel">4TRAVEL</h1>

          <label className="EmailField">
            <span className="SpanEmail">Email</span>
            <div></div>
            <input
              type="email"
              className="InputEmail"
              placeholder="Nhập địa chỉ Email"
            />
          </label>

          <label className="LabelPassword">
            <span className="SpanPassword">Mật Khẩu</span>
            <div></div>
            <input
              type="password"
              className="InputPassword"
              placeholder="Nhập mật khẩu"
            />
          </label>

        <button
          className="BtnLogin">
          Đăng Nhập
        </button>

        <div className="ForgotPass">
          <a href="#" className="anchorForgotPass">Quên Mật Khẩu?</a>
        </div>
        <div>
        <a href="#" className="anchorHaventHaveUsername">Chưa có tài khoản?</a>
        </div>

        </div>
      </main>
    </div>
  );
}