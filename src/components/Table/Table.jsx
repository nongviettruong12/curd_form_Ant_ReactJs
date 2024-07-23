import { ProTable } from "@ant-design/pro-table";
import { Button, Modal, Space } from "antd";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Table.css";
import { message } from "antd";
import { data } from "../../../thuc_tap";
export const CustomerTable = () => {
  const getListValues = () => {
    const values = [];
    data.displayConfig.groupList.forEach((group) => {
      group.rowList.forEach((row) => {
        row.colList.forEach((col) => {
          col.fieldList.forEach((field) => {
            if (field.listValue) {
              values.push(...field.listValue);
            }
          });
        });
      });
    });
    return values;
  };
  const listValues = getListValues(data);
  // console.log("adu", listValues);

  const [dataSource, setDataSource] = useState([]);
  const columns = [
    {
      title: "id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "full_name",
      key: "full_name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "birthday",
      key: "birthday",
      valueType: "dateTime",
      format: 'YYYY-MM-DD HH:mm:ss',
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
      valueType: "string",
      render: (data, record) => {
        if (Array.isArray(record?.jugde)) {
          const jugdes = record.jugde.map((jugde) => {
            const result = listValues.find((item) => {
              return item.value.includes(jugde);
            });
            return result;
          });
          return (
            <Space>{jugdes.map((record) => record.label).join(", ")}</Space>
          );
        } else {
          return <Space>Failed</Space>;
        }
      },
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
      render: (data, record) => {
        return <span>{record.gender === 'female' ? 'Nữ' : 'Nam'}</span>
      },
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
      render: (data, record) => {
        return <span>{record.status === 'new' ? 'Mới' : 'Đã liên hệ'}</span>
      },
    },
    {
      title: "Người phụ trách",
      dataIndex: "assign_to",
      key: "assign_to",
      render: (_, record) => {
        switch (record.assign_to) {
          case '123123123':
            return 'Đạt 09'
          case '351421412':
            return 'Trung Đại Ca'
          case '351421416':
            return 'ThangDT'
          case '351421419':
            return 'Cường Đzai 1102'
        }
      },
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
      render: (data, record) => {
        switch (record.career) {
          case 'transfer':
            return 'Vận tải'
          case 'logistic':
            return 'Chuỗi cung ứng hàng hóa'
          case 'construction':
            return 'Xây dựng'
        }
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (data, record) => {
        switch (record.department) {
          case 'media':
            return 'Phòng truyền thông'
          case 'tester':
            return 'Phòng đảm bảo chất lượng'
          case 'dev':
            return 'Phòng phát triển'
        }
      },
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
      render: (data, record) => {
        switch (record.country) {
          case 'vn':
            return 'Việt Nam'
          case 'us':
            return 'Mỹ'
          case 'uk':
            return 'Anh'
        }
      },
    },
    {
      title: "Quận/Huyện",
      dataIndex: "district",
      key: "district",
      render: (data, record) => {
        switch (record.country) {
          case 'dd':
            return 'Đống Đa'
          case 'tx':
            return 'Thanh Xuân'
          case 'bd':
            return 'Ba Đình'
            case 'hm':
            return 'Hoàng Mai'
        }
      },
    },
    {
      title: "Tỉnh/Thành",
      dataIndex: "city",
      key: "city",
      render: (data, record) => {
        return <span>{record.city === 'hn' ? 'Hà Nội' : 'TP Hồ Chí Minh'}</span>
      },
    },
    {
      title: "Địa chỉ nhà",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Hành động",
      render: (text, record) => (
        <div className="flex_button">
          <Link to={`/update/${record.id}`}>
            <Button type="primary">Sửa</Button>
          </Link>
          <Button danger onClick={() => handleDelete(record)}>
            Xóa
          </Button>
        </div>
      ),
    },
  ];
  const handleDelete = (record) => {
    Modal.confirm({
      title: `Are you sure you want to delete?`,
      onOk: () => {
        setDataSource((prev) => prev.filter((user) => user.id !== record.id));
        message.success("xoa thanh cong");
      },
    });
  };
  useEffect(() => {
    fetch("http://localhost:3000/user")
      .then((res) => res.json())
      .then((result) => {
        setDataSource(result);
        // console.log("data", result);
      });
  }, []);
  return (
    <ProTable
      className="table_scroll"
      columns={columns}
      dataSource={dataSource}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 5 }}
      dateFormatter="number"
      headerTitle="Quản lý khách hàng tiềm năng"
      toolBarRender={() => [
        <Link to={`/add`}>
          <Button key="add" type="primary">
            Thêm mới
          </Button>
        </Link>,
      ]}
      scroll={{ x: 1 }}
    />
  );
};
