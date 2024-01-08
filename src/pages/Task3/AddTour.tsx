import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Form.css";
import useCreateTour from "../../hooks/TourManagement/useCreateTour";
import useGetTourByTID from "../../hooks/TourManagement/useGetTourByTID";
import {
  Col,
  Row,
  Button,
  DatePicker,
  Form,
  Input,
  Select,
  Upload,
  message,
  InputNumber,
} from "antd";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import dayjs from "dayjs";

const { TextArea } = Input;

function AddTour() {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const tourid = location.state ? location.state.id ?? "" : "";
  const [name, setname] = useState("");
  const [tourguide_id, settourguide_id] = useState("");
  const [bia, setbia] = useState<Blob | null>(null);
  const [diemdi, setdiemdi] = useState("");
  const [diemden, setdiemden] = useState("");
  const [hotel, sethotel] = useState("");
  const [start, setstart] = useState("");
  const [end, setend] = useState("");
  const [chitiet, setchitiet] = useState("");
  const [price, setprice] = useState(0);

  const createTour = useCreateTour(
    {
      name: name,
      tourguide_id: tourguide_id,
      bia: bia,
      diemdi: diemdi,
      diemden: diemden,
      hotel: hotel,
      start: start,
      end: end,
      chitiet: chitiet,
      price: price,
    },
    tourid
  );

  if (createTour.isSuccess) {
    message.success("Cập nhật thông tin thành công");
    navigate(-1);
    createTour.reset();
  } else if (createTour.error instanceof Error) {
    message.error("Thêm thất bại. Lỗi: " + createTour.error.message);
  }

  const HandleImageChange = (e: any) => {
    const file = e.file;
    setbia(file.originFileObj);
  };

  // prettier-ignore
  const diaDiem = ["An Giang", "Bà Rịa – Vũng Tàu", "Bắc Giang", "Bắc Kạn", "Bạc Liêu", "Bắc Ninh", "Bến Tre", "Bình Định", "Bình Dương", "Bình Phước", "Bình Thuận", "Cà Mau", "Cần Thơ", "Cao Bằng", "Đà Nẵng", "Đắk Lắk", "Đắk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp", "Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hậu Giang", "Hòa Bình", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lâm Đồng", "Lạng Sơn", "Lào Cai", "Long An", "Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh", "Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thành phố Hồ Chí Minh", "Thừa Thiên Huế", "Tiền Giang", "Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"];
  const { Option } = Select;

  const gettour = useGetTourByTID(tourid);

  if (tourid && gettour.error instanceof Error) {
    message.error(gettour.error.message);
  }

  useEffect(() => {
    if (gettour.data) {
      setname(gettour.data.name);
      settourguide_id(gettour.data.tourguide_id);
      setdiemdi(gettour.data.diemdi);
      setdiemden(gettour.data.diemden);
      sethotel(gettour.data.hotel);
      setstart(
        gettour.data.start ? dayjs(gettour.data.start).toISOString() : ""
      );
      setend(gettour.data.end ? dayjs(gettour.data.end).toISOString() : "");
      setchitiet(gettour.data.chitiet);
      setprice(gettour.data.price);

      form.setFieldsValue({
        name: gettour.data.name,
        tgid: gettour.data.tourguide_id,
        tgname: gettour.data.tourguide_name,
        origin: gettour.data.diemdi,
        destination: gettour.data.diemden,
        hotel: gettour.data.hotel,
        start: gettour.data.start ? dayjs(gettour.data.start) : "",
        end: gettour.data.start ? dayjs(gettour.data.end) : "",
        note: gettour.data.chitiet,
        price: gettour.data.price,
      });
    }
  }, [tourid]);

  return (
    <div className="wrapper">
      <Button
        type="text"
        icon={<ArrowLeftOutlined />}
        className="ButtonUp"
        onClick={() => navigate(-1)}
      >
        {" "}
        <b>Quay lại</b>
      </Button>

      <h1 className="pageTitle">Thông tin tour</h1>

      <Form
        form={form}
        labelCol={{ span: 3 }}
        labelAlign="left"
        onFinish={() => createTour.mutate()}
      >
        <Form.Item
          name={"name"}
          label="Tên tour"
          rules={[{ required: true, message: "Nhập tên tour" }]}
        >
          <Input onChange={(e) => setname(e.target.value)} />
        </Form.Item>

        <Form.Item
          name={"tgid"}
          label="Mã hướng dẫn viên"
          rules={[{ required: true, message: "Nhập mã HDV" }]}
        >
          <Input
            className="shortInput"
            onChange={(e) => settourguide_id(e.target.value)}
          />
        </Form.Item>

        <Form.Item name={"tgname"} label="Tên hướng dẫn viên">
          <Input disabled className="shortInput" />
        </Form.Item>

        <Form.Item
          name={"origin"}
          label="Điểm đi"
          rules={[{ required: true, message: "Nhập điểm đi" }]}
        >
          <Select
            showSearch
            placeholder="Địa điểm"
            onChange={(e) => setdiemdi(e)}
          >
            {diaDiem.map((e) => (
              <Option key={e}>{e}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={"destination"}
          label="Điểm đến"
          rules={[{ required: true, message: "Nhập điểm đến" }]}
        >
          <Select
            showSearch
            placeholder="Địa điểm"
            onChange={(e) => setdiemden(e)}
          >
            {diaDiem.map((e) => (
              <Option key={e}>{e}</Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item
          name={"hotel"}
          label="Khách sạn"
          rules={[{ required: true, message: "Nhập khách sạn" }]}
        >
          <Input
            className="shortInput"
            onChange={(e) => sethotel(e.target.value)}
          />
        </Form.Item>

        <Row>
          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"start"}
              label="Thời gian bắt đầu"
              rules={[{ required: true, message: "Nhập thời gian bắt đầu" }]}
            >
              <DatePicker
                placeholder="DD/MM/YY"
                format={"DD/MM/YY"}
                onChange={(e) => setstart(e?.toISOString() ?? "")}
              />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              labelCol={{ span: 6 }}
              name={"end"}
              label="Thời gian kết thúc"
              rules={[{ required: true, message: "Nhập thời gian kết thúc" }]}
            >
              <DatePicker
                placeholder="DD/MM/YY"
                format={"DD/MM/YY"}
                onChange={(e) => setend(e?.toISOString() ?? "")}
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item name={"price"} label="Giá">
          <InputNumber onChange={(e) => setprice(Number(e?.valueOf()) || 0)} />
        </Form.Item>

        <Form.Item name={"note"} label="Ghi chú">
          <TextArea rows={5} onChange={(e) => setchitiet(e.target.value)} />
        </Form.Item>

        <Form.Item name={"bia"} label="Ảnh bìa">
          <Upload
            name="bia"
            listType="picture-card"
            accept=".jpg"
            showUploadList={false}
            onChange={HandleImageChange}
          >
            {bia != null ? (
              <img
                src={URL.createObjectURL(bia)}
                alt="Ảnh bìa tour"
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <div>
                <PlusOutlined />
                <div>Upload</div>
              </div>
            )}
          </Upload>
        </Form.Item>

        <Form.Item className="submitButton">
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddTour;
