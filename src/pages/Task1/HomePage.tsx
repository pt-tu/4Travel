import React from "react";
import "./HomePage.css"
import Logo4T from "../../images/logo4T.png";
import BackgroundBitexco from "../../images/background Bitexco.png"
import FTRAVEL from "../../images/4 TRAVEL.png"

export default function HomePage() {
  return (
    <div
      id="HomePageRoot"
      className="DivHomePage">

      <div className="DivHeader">

        <div className="Div3ElementsHeader">

          <div className="DivLogo">
            <img
              src={Logo4T}
              alt="Logo"
              className="LogoImg" />
          </div>

          <div className="DivInput">
            <input className="InputEnterPlace"
              type="text"
              placeholder="Nhập điểm đến bạn muốn" />
          </div>

          <div className="DivTwoBtn">
            <nav className="NavTwoBtn">
              <button className="BtnHightlightBackGround BtnSignUp">
                ĐĂNG KÝ
              </button>
              <button className="BtnHightlightBackGround BtnLogin">
                ĐĂNG NHẬP
              </button>
            </nav>
          </div>

        </div>

        <div className="DivSeventBtn">
          <nav className="NavSevenBtn">

            <button className="BtnHightlightBorder BtnHomePage">
              TRANG CHỦ
            </button>
            <button className="BtnHightlightBorder BtnBookTour">
              ĐẶT TOUR
            </button>
            <button className="BtnHightlightBorder BtnCustomer">
              KHÁCH HÀNG
            </button>
            <button className="BtnHightlightBorder BtnManageTour">
              QUẢN LÝ TOUR
            </button>
            <button className="BtnHightlightBorder BtnDevices">
              THIẾT BỊ
            </button>
            <button className="BtnHightlightBorder BtnInvoice">
              HOÁ ĐƠN
            </button>
            <button className="BtnHightlightBorder BtnReport">
              BÁO CÁO
            </button>
          </nav>
        </div>

      </div>

      <div className="DivSecondHeader">

        <div className="DivBG">
          <img
            src={BackgroundBitexco}
            alt="BG"
            className="BGImg"/>

            <div className="Div2">
          <img
            src={FTRAVEL}
            alt="BG1"
            className="BGImg1"/>
        </div>

        </div>


          <div className="Div4TRAVEL">4 TRAVEL</div>
          <div className="DivLongText">
            Giúp kỳ nghỉ của bạn ý nghĩa và trọn vẹn hơn
          </div>
          <button className="BtnBookTour">
            ĐẶT TOUR NGAY
          </button>
        
      </div>
  </div>
     
  )
}