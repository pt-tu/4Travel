import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Row, Form, Input, Space, Select, DatePicker } from "antd";

function BookingInfo() {
  // use global color variables
  const listForm = { backgroundColor: "#d9d9d9", padding: 10 };
  const padLeftRight = { padding: "0 5px" };
  const padLeft = { paddingLeft: 5 };
  const padRight = { paddingRight: 5 };
  return (
    <div className="list">
      <h3>Thông tin hành khách</h3>
      <Form style={listForm} layout="vertical">
        <Form.List name="passengers">
          {(fields, { add, remove }) => (
            <div>
              {fields.map(({ key, name, ...restField }) => (
                <Space key={key} style={{ display: "grid" }}>
                  <Row>
                    <Col span={7} style={padRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "name"]}
                        rules={[{ required: true, message: "Nhập họ tên" }]}
                        label="Họ và tên"
                      >
                        <Input />
                      </Form.Item>
                    </Col>
                    <Col style={padLeftRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "gender"]}
                        rules={[{ required: true, message: "Nhập giới tính" }]}
                        label="Giới tính"
                      >
                        <Select />
                      </Form.Item>
                    </Col>
                    <Col style={padLeftRight}>
                      <Form.Item
                        {...restField}
                        name={[name, "bday"]}
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
                        name={[name, "note"]}
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

export default BookingInfo;
