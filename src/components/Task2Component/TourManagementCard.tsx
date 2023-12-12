import React from "react";
import "./TourStyle.css"
import Hanoi from "../../images/hanoi.jpg"
import { Button, ConfigProvider } from 'antd'
export const TourManagementCard = () => {
    return (
        <div className="card GridContainer">
            <ConfigProvider
                theme={{
                    token: {
                        colorPrimary: '#FFB700',
                    },
                }}
            >
                <div>
                    <img className="cardImg" src={Hanoi} alt="Hanoi" />
                </div>
                <div style={{ textAlign: "left", paddingLeft: 10 }}>
                    <h3 className="title">Combo 3N3Đ Hà Nội & Khách sạn 5 Sao (Bao ăn sáng, dịch vụ đưa đón tại sân bay)</h3>
                    <span className="normal">Mã tour: </span>
                    <span className="NameBold">NDDNG2640-011-161123VU</span> <br></br>
                    <span className="normal">Nơi khởi hành: </span>
                    <span className="NameBold">Đà Nẵng</span> <br></br>
                    <span className="normal">Khách sạn: </span>
                    <span className="NameBold">Peridot Grand Luxury Boutique Hotel</span> <br></br>
                </div>
                <div style={{ paddingRight: 10, paddingTop: 110 }}>
                    <Button type="primary" style={{ boxShadow: 'none' }}>
                        Sửa
                    </Button>
                    <Button type="primary" style={{ boxShadow: 'none', marginLeft: 10 }} danger>
                        Xóa
                    </Button>
                </div>
            </ConfigProvider>
        </div>
    )

}