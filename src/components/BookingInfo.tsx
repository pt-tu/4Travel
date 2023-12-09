import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Form, Input, Space, Select, DatePicker } from "antd";

function BookingInfo() {
  // use global color variables
  const listForm = { backgroundColor: "#d9d9d9", padding: 10 };
  return (
    <div className="list">
      <h3>Thông tin hành khách</h3>
      <Form style={listForm} layout="vertical">
        <Form.List name="passengers">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key}>
                  <Form.Item
                    {...restField}
                    label="Họ và tên"
                    name={[name, "name"]}
                    rules={[{ required: true, message: "Nhập họ tên" }]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Giới tính"
                    name={[name, "gender"]}
                    rules={[{ required: true, message: "Nhập giới tính" }]}
                  >
                    <Select />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Ngày sinh"
                    name={[name, "bday"]}
                    rules={[{ required: true, message: "Nhập ngày sinh" }]}
                  >
                    <DatePicker format={"DD/MM/YY"} placeholder="DD/MM/YY" />
                  </Form.Item>
                  <Form.Item
                    {...restField}
                    label="Ghi chú"
                    name={[name, "note"]}
                  >
                    <Input />
                  </Form.Item>
                  <MinusCircleOutlined onClick={() => remove(name)} />
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

export default BookingInfo;
