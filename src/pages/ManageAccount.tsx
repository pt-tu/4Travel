import React from "react";
import { useState, useEffect } from "react";
import {
  Button,
  ConfigProvider,
  Input,
  Table,
  Space,
  Popconfirm,
  Select,
} from "antd";
import {
  ArrowLeftOutlined,
  DeleteOutlined,
  FormOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "../components/Task2Component/TourStyle.css";
import "../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";
import useGetCustomerList from "../hooks/CustomerManagement/useGetCustomerList";
import useDeleteCustomer from "../hooks/CustomerManagement/useDeleteCustomer";
import useGetUserList from "../hooks/admin/useGetUserList";

function CustomerList() {
  const { Search } = Input;
  const [DeleteID, setDeleteID] = useState("");
  const DeleteMutate = useDeleteCustomer(DeleteID);
  const getuserlist = useGetUserList();
  const userlist: Customer[] = [];
  if (getuserlist.isSuccess) {
    getuserlist.data.map((item: any) =>
      userlist.push({
        id: item.id,
        name: item.raw_user_meta_data.ten,
        role: item.raw_user_meta_data.role,
        email: item.email,
      })
    );
    console.log(userlist);
  }
  if (getuserlist.error) {
    return <></>;
  }
  if (DeleteMutate.isSuccess) {
    window.location.reload();
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
    name: string;
    role: string;
    email: string;
  }
  const columns: ColumnsType<Customer> = [
    {
      title: "Họ tên",
      dataIndex: "name",
      key: "name",
      width: 150,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 100,
    },
    {
      title: "Role",
      key: "id",
      dataIndex: "id",
      width: 100,

      render: (text, record) => (
        <Select style={{ width: "100%" }} defaultValue={record.role} />
        //khi chọn chỉnh sửa sẽ load trang chỉnh sửa, lúc này trang chỉnh sửa input sẽ là dữ liệu của khách hàng được chọn. tham khảo useParams để truyền id khách hàng vào trang chỉnh sửa để query: https://ui.dev/react-router-url-parameters?fbclid=IwAR3grGeq74ae9OoC9xyeMVStoe2agUV-hLT2MnipjCJnK5GyHRXoRvKZEvI, nếu khó quá có thể tách thêm mới khách và chỉnh sửa khách ra 2 page khác nhau
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
      disabled: record.name === "Disabled User", // Column configuration not to be checked
      name: record.name,
    }),
  };

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
            enterButton
            size="large"
            style={{ marginTop: "30px" }}
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
            <h2>DANH SÁCH TÀI KHOẢN</h2>
          </div>
          <Space></Space>
          <Table
            rowSelection={{
              ...rowSelection,
            }}
            columns={columns}
            dataSource={userlist}
            className="tableFilter"
            rowKey="id"
          />
        </div>
      </ConfigProvider>
    </div>
  );
}

export default CustomerList;
