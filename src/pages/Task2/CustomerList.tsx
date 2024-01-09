import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Table,
  Space,
  Popconfirm,
  message,
} from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
  SearchOutlined
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "../../components/Task2Component/TourStyle.css";
import "../../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";
import useGetCustomerList from "../../hooks/CustomerManagement/useGetCustomerList";
import useDeleteCustomer from "../../hooks/CustomerManagement/useDeleteCustomer";

function CustomerList() {
  const { Search } = Input;
  const [DeleteID, setDeleteID] = useState("");
  const [cccd,setcccd]= useState("")
  const CustomerList1 = useGetCustomerList(cccd);
  const DeleteMutate = useDeleteCustomer(DeleteID);
  if (DeleteMutate.isSuccess) {
    message.success("Xoá thành công");
    window.location.reload();
  }
  if (DeleteMutate.isError && DeleteMutate.error instanceof Error) {
    message.error("Xoá thất bại. Lỗi: " + DeleteMutate.error.message);
  }

  /* //Test useState hook to re-render list after delete 
  const [CustomerListData, setCustomerListData] = useState<Customer[] | null>(null);
  useEffect(() => {
    GetCustomerList();
  }, [])
  async function GetCustomerList()  {
    const { data } = await supabase
      .from("customer")
      .select();
      setCustomerListData(data);
  }*/

  const DeleteUser = () => {
    DeleteMutate.mutate();
    //CustomerList1.refetch();
    //setCustomerListData(CustomerList1);
  };
  interface Customer {
    id: string;
    hoten: string;
    cccd: string;
    sdt: string;
    email: string;
    ngaysinh: string;
    diachi: string;
    ghichu: string;
    yeucau: string;
  }
  const columns: ColumnsType<Customer> = [
    {
      title: "Họ tên",
      dataIndex: "hoten",
      key: "hoten",
    },
    {
      title: "CMND/CCCD",
      dataIndex: "cccd",
      key: "cccd",
    },
    {
      title: "Địa chỉ",
      dataIndex: "diachi",
      key: "diachi",
    },
    {
      title: "Số điện thoại",
      dataIndex: "sdt",
      key: "sdt",
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (text, record) => (
        <Link to={"/them-moi-khach-hang"} state={{ id: record.id }}>
          <Button icon={<FormOutlined />}></Button>
        </Link>
        //khi chọn chỉnh sửa sẽ load trang chỉnh sửa, lúc này trang chỉnh sửa input sẽ là dữ liệu của khách hàng được chọn. tham khảo useParams để truyền id khách hàng vào trang chỉnh sửa để query: https://ui.dev/react-router-url-parameters?fbclid=IwAR3grGeq74ae9OoC9xyeMVStoe2agUV-hLT2MnipjCJnK5GyHRXoRvKZEvI, nếu khó quá có thể tách thêm mới khách và chỉnh sửa khách ra 2 page khác nhau
      ),
    },
    {
      title: "",
      key: "id",
      dataIndex: "id",
      width: 50,
      render: (text, record) => (
        <Popconfirm
          title="Xác nhận?"
          description={"Xóa người dùng " + record.hoten}
          onConfirm={() => setDeleteID(record.id)}
        >
          <Button icon={<DeleteOutlined />} danger />
        </Popconfirm>
      ),
    },
  ];

  const rowSelection = {
    onChange: (selectedRowKeys: React.Key[], selectedRows: Customer[]) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        "selectedRows: ",
        selectedRows
      );
    },
    getCheckboxProps: (record: Customer) => ({
      disabled: record.hoten === "Disabled User", // Column configuration not to be checked
      name: record.hoten,
    }),
  };

  useEffect(() => {
    if (DeleteID) DeleteMutate.mutate();
  }, [DeleteID]);

  return (
    <div>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#4B268F",
          },
        }}
      >
        <div className="CenterContainer">
          <Search
            placeholder="Nhập tên, mã tour hoặc khách hàng bạn muốn"
            className="SearchBar"
            allowClear
            enterButton={<SearchOutlined style={{ color: "White" }} />}

            size="large"
            style={{ marginTop: "30px" }}
            onChange={(e) => setcccd(e.target.value)}
            onSearch={() => {
              CustomerList1.refetch();
            }}
          />
          <div
            style={{
              width: "80%",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Link to="/">
              <Button
                type="text"
                icon={<ArrowLeftOutlined />}
                className="ButtonUp"
              >
                {" "}
                <b>Quay lại</b>
              </Button>
            </Link>
            <Link to="/them-moi-khach-hang">
              <Button icon={<PlusOutlined />} className="ButtonUp"></Button>
            </Link>
          </div>
          <div>
            <h2>DANH SÁCH KHÁCH HÀNG</h2>
          </div>
          <Space></Space>
          <Table
            columns={columns}
            dataSource={CustomerList1.data}
            className="tableFilter"
            rowKey="id"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default CustomerList;
