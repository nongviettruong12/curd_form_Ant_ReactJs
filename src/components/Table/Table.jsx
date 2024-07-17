import { ProTable } from "@ant-design/pro-table";
import { Button, Modal } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export const CustomerTable = () => {

  
  const [dataSource, setDataSource] = useState([]);

  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "full_name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      valueType: "number",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      valueType: "email",
    },
    {
      title: "Đánh giá",
      dataIndex: "jugde",
      key: "jugde",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Số điện thoại khác",
      dataIndex: "other_phone",
      key: "other_phone",
    },
    {
      title: "Email khác",
      dataIndex: "other_email",
      key: "other_email",
    },
    {
      title: "Tình trạng",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "Người phụ trách",
      dataIndex: "assign_to",
      key: "assign_to",
    },
    {
      title: "Tên công ty",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Ngành nghề",
      dataIndex: "career",
      key: "career",
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
    },
    {
      title: "Số lượng nhân viên",
      dataIndex: "total_employee",
      key: "total_employee",
    },
    {
      title: "Quốc gia",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Quận/Huyện",
      dataIndex: "district",
      key: "district",
    },
    {
      title: "Tỉnh/Thành",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Địa chỉ nhà",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Action",
      render: (text, record) => (
        <span>
          <Link to={`/update/${record.id}`}>
            <Button type="primary" style={{ marginRight: 8 }}>
              Update
            </Button>
          </Link>
          <Button danger onClick={() => handleDelete(record)}>
            Delete
          </Button>
        </span>
      ),
    },
  ];
  const handleDelete = (record) => {
    Modal.confirm({
      title: `Are you sure you want to delete?`,
      onOk: () => {
        setDataSource((prev) => prev.filter((user) => user.id !== record.id));
      },
    });
  };

  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result);
        console.log("data", result);
      });
  }, []);
  return (
    <ProTable
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 5 }}
      dateFormatter="string"
      headerTitle="Customer Information"
      toolBarRender={() => [
        <Link to={`/add`}>
          <Button key="add" type="primary">
            Add New
          </Button>
        </Link>,
      ]}
    />
  );
};
