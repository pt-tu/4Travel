import React from "react";
import "./HomePage.css"
import Logo4T from "../../images/logo4T.png";
import BackgroundBitexco from "../../images/background Bitexco.png"
import FTRAVEL from "../../images/4 TRAVEL.png"
import LONGTEXT from "../../images/Long text.png"
import LocationIcon from "../../images/OIP-removebg-preview (1) 3.png"
import DLMienTrung from "../../images/bn_231101_DL AmThucMienTrung_1.webp"
import DLMienBac from "../../images/bn_231019_BannerWeb_MienBac-04.webp"
import DLDubai from "../../images/bn_230928_Dubai 412x309px.webp"
import TPHCM from "../../images/hcm city.jpg"
import VungTau from "../../images/bds-vungtau-1514295777.jpg"
import HaNoi from "../../images/hanoi.jpg"
import DaLat from "../../images/Da-Lat-City.jpg"
import HoiAn from "../../images/hoian.jpg"


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
            alt="BG0"
            className="BGImg" />

          <div className="Div4TRAVEL">
            <img
              src={FTRAVEL}
              alt="BG1"
              className="FTRAVELImg" />
          </div>

          <div className="DivLongText">
            <img
              src={LONGTEXT}
              alt="BG2"
              className="LONGTEXTImg" />
          </div>

          <div className="DivBtnBookTourNow">
            <button className="BtnHightlightBorder BtnBookTourNow">
              ĐẶT TOUR NGAY
            </button>
          </div>

        </div>

        <div className="Div">

          <div className="flex flex-wrap justify-center gap-4 bg-[#ffb700] p-4 rounded-md mx-4 mt-4">
            <div className="bg-white flex items-center gap-3 p-2 rounded">
              <img
                src={LocationIcon}
                alt="Location"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700">Điểm đi</span>
            </div>
            <div className="bg-white flex items-center gap-3 p-2 rounded">
              <img
                src={LocationIcon}
                alt="Location"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700">Điểm đến</span>
            </div>
            <div className="bg-white flex items-center gap-3 p-2 rounded">
              <img
                src="https://file.rendit.io/n/uSj9qCGf6kwGD6YR3pAl.png"
                alt="Calendar"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700">Ngày bắt đầu</span>
            </div>
            <div className="bg-white flex items-center gap-3 p-2 rounded">
              <img
                src="https://file.rendit.io/n/uSj9qCGf6kwGD6YR3pAl.png"
                alt="Calendar"
                className="w-5 h-5"
              />
              <span className="font-semibold text-gray-700">Ngày kết thúc</span>
            </div>
            <button className="py-2 px-6 bg-[#4b268f] text-white rounded-lg font-bold">
              Tìm kiếm
            </button>
          </div>

          <section className="Section1">
            <h2 className="text-2xl font-semibold">ƯU ĐÃI CHO BẠN</h2>
            <div className="DivThreeImages">
              <img
                src={DLMienTrung}
                alt="Deal"
                className="Sec1Img1"
              />
              <img
                src={DLMienBac}
                alt="Deal"
                className="Sec1Img2"
              />
              <img
                src={DLDubai}
                alt="Deal"
                className="Sec1Img3"
              />
            </div>
          </section>

          <section className="Section2">
            <h2 className="H2IntroText">
              ĐỊA ĐIỂM PHỔ BIẾN
            </h2>
            <div className="Div5Images">

              <div className="DivImg1AndImg2">
                <div className="DivImg1">
                  <img
                    src={TPHCM}
                    alt="Deal"
                    className="Sec2Img Sec2Img1" />
                  <h2 className="H2IntroImg H2IntroImg1">
                    Thành phố Hồ Chí Minh
                  </h2>
                </div>

                <div className="DivImg2">
                  <img
                    src={VungTau}
                    alt="Deal"
                    className="Sec2Img Sec2Img2" />
                  <h2 className="H2IntroImg H2IntroImg2">
                    Vũng Tàu
                  </h2>
                </div>
              </div>

              <div className="DivImg3To5">

                <div className="DivImg3">
                  <img
                    src={HaNoi}
                    alt="Deal"
                    className="Sec2Img Sec2Img3" />
                  <h2 className="H2IntroImg H2IntroImg3">
                    Hà Nội
                  </h2>
                </div>

                <div className="DivImg4">
                  <img
                    src={DaLat}
                    alt="Deal"
                    className="Sec2Img Sec2Img4" />
                  <h2 className="H2IntroImg H2IntroImg4">
                    Đà Lạt
                  </h2>
                </div>

                <div className="DivImg5">
                  <img
                    src={HoiAn}
                    alt="Deal"
                    className="Sec2Img Sec2Img5" />
                  <h2 className="H2IntroImg H2IntroImg5">
                    Hội An
                  </h2>
                </div>

              </div>

            </div>
          </section>
        </div>
      </div>

    </div>

  )
}