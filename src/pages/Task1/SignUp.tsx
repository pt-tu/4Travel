import React from "react";
import '../Task1/Style.css'
import Logo4T from "../../images/logo4T.png"

export default function SignUp() {
  return (
    <div className="SignUpPage">
      <header className="Background">
        <img
          src= {Logo4T}
          alt="Logo"
          className="LogoImg"
        />
      </header>

      <main className="MainForm">

        <div className="SignUpField">
        <h1 className="H1Travel">4TRAVEL</h1>

          <div className="SignUpLabelAndInputField">

          <label className="LabelEmail">
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

          <label className="LabelReEnterPassword">
            <span className="SpanReEnterPassword">Nhập Lại Mật Khẩu</span>
            <div></div>
            <input
              type="password"
              className="InputReEnterPassword"
              placeholder="Xác nhận mật khẩu"
            />
          </label>

          </div>

        <button
          className="BtnSignUp">
          Đăng Ký
        </button>

        <div className="HasAccount">
        <a href="#" className="anchorHasAccount">Đã có tài khoản?</a>
        </div>

        </div>
      </main>
    </div>
  );
}