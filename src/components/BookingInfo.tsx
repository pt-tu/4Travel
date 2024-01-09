import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Row,
  Form,
  Input,
  Space,
  Select,
  DatePicker,
  FormInstance,
} from "antd";
import { useWatch } from "antd/es/form/Form";
import React, { useEffect } from "react";
import { useImperativeHandle, useRef } from "react";

function BookingInfo(props: any, ref: React.Ref<FormInstance | undefined>) {
  // This is confusing, but for now it's the only way to get the form instance
  const [form] = Form.useForm(); // Form instance used inside this component to get validation status
  const bookingInfo = useRef<FormInstance>(); // Form instance referenced by parent component to trigger form validation
  const hanhkhach = useWatch("passengers", form);

  useImperativeHandle(ref, () => bookingInfo.current);
  // use global color variables
  const listForm = { backgroundColor: "#d9d9d9", padding: 10 };
  const padLeftRight = { padding: "0 5px" };
  const padLeft = { paddingLeft: 5 };
  const padRight = { paddingRight: 5 };
  const { Option } = Select;

  useEffect(() => {
    props.sethanhkhach(hanhkhach);
  }, [hanhkhach]);

  function HandleSubmit() {
    const validationerror = form
      .getFieldsError()
      .filter(({ errors }) => errors.length).length;
    if (!!validationerror) {
      return;
    } else {
      props.onBookingInfoFinish();
    }
  }

  useEffect(() => {
    if (props.hanhkhach) form.setFieldValue("passengers", props.hanhkhach);
  }, [props.hanhkhach]);

  return (
    <div className="list">
      <h3>Thông tin hành khách</h3>
      <Form
        form={form}
        ref={bookingInfo as React.Ref<FormInstance>}
        style={listForm}
        onFinish={HandleSubmit}
        layout="vertical"
        initialValues={{ passengers: props.hanhkhach }}
      >
        <Form.List name="passengers">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "grid" }}>
                  <Row>
                    <Col span={7} style={padRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "hoten"]}
                        rules={[{ required: true, message: "Nhập họ tên" }]}
                        label="Họ và tên"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col style={padLeftRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "gioitinh"]}
                        rules={[{ required: true, message: "Nhập giới tính" }]}
                        label="Giới tính"
                      >
                        <Select>
                          <Option value="Nam">Nam</Option>
                          <Option value="Nữ">Nữ</Option>
                        </Select>
                      </Form.Item>
                    </Col>
                    <Col style={padLeftRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "ngaysinh"]}
                        rules={[{ required: true, message: "Nhập ngày sinh" }]}
                        label="Ngày sinh"
                      >
                        <DatePicker
                          format={"DD/MM/YY"}
                          placeholder="DD/MM/YY"
                        />
                      </Form.Item>
                    </Col>
                    <Col flex={"auto"} style={padLeftRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "ghichu"]}
                        label="Ghi chú"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <MinusCircleOutlined
                      style={padLeft}
                      onClick={() => remove(name)}
                    />
                  </Row>
                </Space>
              ))}
              <Form.Item>
                <Button
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Thêm hành khách
                </Button>
              </Form.Item>
            </div>
          )}
        </Form.List>
      </Form>
    </div>
  );
}

export default React.forwardRef(BookingInfo);
