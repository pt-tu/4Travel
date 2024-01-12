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
  message,
  Modal,
} from "antd";

import {
  ArrowLeftOutlined,
  DeleteOutlined,
  ExclamationCircleFilled,
  FormOutlined,
  PlusOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import type { ColumnsType } from "antd/es/table";
import "../components/Task2Component/TourStyle.css";
import "../components/Task2Component/CustomerDevice.css";
import { Link } from "react-router-dom";
import useGetCustomerList from "../hooks/CustomerManagement/useGetCustomerList";
import useDeleteCustomer from "../hooks/CustomerManagement/useDeleteCustomer";
import useGetUserList from "../hooks/admin/useGetUserList";
import useUpdateRoleByUID from "../hooks/admin/useUpdateRoleByUID";

function CustomerList() {
  const { confirm } = Modal;
  const { Search } = Input;
  const [DeleteID, setDeleteID] = useState(
    "9318b50c-e847-4d14-ae4e-4cf717ab7402"
  );
  const [name, setName] = useState("");
  const DeleteMutate = useDeleteCustomer(DeleteID);
  const getuserlist = useGetUserList(name);
  const [role, setrole] = useState<any>();
  const [uid, setuid] = useState();
  const updaterole = useUpdateRoleByUID(uid, role);
  const userlist: Customer[] = [];
  if (getuserlist.isSuccess) {
    getuserlist.data.map((item: any) => {
      if (item.raw_user_meta_data.ten.includes(name))
        userlist.push({
          id: item.id,
          name: item.raw_user_meta_data.ten,
          role: item.raw_user_meta_data.role,
          email: item.email,
        });
    });
  }

  if (getuserlist.error) {
    console.log(getuserlist.error);
    return <></>;
  }
  if (DeleteMutate.isSuccess) {
    window.location.reload();
  }
  if (updaterole.isLoading) {
    console.log("load");
  }
  if (updaterole.isSuccess) {
    console.log("done");
  }

  const handleSelectChange = (selectedValues: any, uid: any) => {
    setrole(selectedValues); // Cập nhật state genre khi có giá trị được chọn
    setuid(uid);
    console.log(uid);
  };

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
    role: any;
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
        <Select
          style={{ width: "100%" }}
          defaultValue={record.role}
          onChange={(e) => {
            handleSelectChange(e, record.id);
            confirm({
              title: "Bạn muốn cập nhật role?",
              icon: <ExclamationCircleFilled />,
              content:
                "Bạn có chắc mình muốn thay đổi role của " + record.name + "?",
              okText: "Xác nhận",
              okType: "danger",
              cancelText: "Hủy bỏ",
              onOk() {
                updaterole.mutate();
              },
              onCancel() {
                console.log("Cancel");
              },
            });
          }}
          options={[
            { value: "staff", label: "staff" },
            { value: "user", label: "user" },
            { value: "admin", label: "admin" },
          ]}
        />
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
            enterButton={<SearchOutlined style={{ color: "White" }} />}
            size="large"
            style={{ marginTop: "30px" }}
            onChange={(e) => setName(e.target.value)}
            onSearch={() => {
              getuserlist.refetch();
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
