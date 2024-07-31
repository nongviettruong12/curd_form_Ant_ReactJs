import TestModal from "../Form/testModal";
import { ProTable } from "@ant-design/pro-table";
import { Button, Modal, Space } from "antd";
import { useEffect, useState,useRef } from "react";
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
  const actionRef = useRef()
  const listValues = getListValues(data);
  const [dataSource, setDataSource] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [isModalVisible,setIsModalVisible] = useState(false)
  const [editingRecord, setEditingRecord] = useState(null);
  const handleEdit = (record) => {
    setEditingRecord(record);
    setIsModalVisible(true);
    setIsAdding(false);  
};

  const handleAdd = () => {
    setEditingRecord(null);  
    setIsModalVisible(true);
    setIsAdding(true);  
};
  

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
      format: "YYYY-MM-DD HH:mm:ss",
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
        return <span>{record.gender === "female" ? "Nữ" : "Nam"}</span>;
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
        return <span>{record.status === "new" ? "Mới" : "Đã liên hệ"}</span>;
      },
    },
    {
      title: "Người phụ trách",
      dataIndex: "assign_to",
      key: "assign_to",
      render: (_, record) => {
        switch (record.assign_to) {
          case "123123123":
            return "Đạt 09";
          case "351421412":
            return "Trung Đại Ca";
          case "351421416":
            return "ThangDT";
          case "351421419":
            return "Cường Đzai 1102";
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
          case "transfer":
            return "Vận tải";
          case "logistic":
            return "Chuỗi cung ứng hàng hóa";
          case "construction":
            return "Xây dựng";
        }
      },
    },
    {
      title: "Phòng ban",
      dataIndex: "department",
      key: "department",
      render: (data, record) => {
        switch (record.department) {
          case "media":
            return "Phòng truyền thông";
          case "tester":
            return "Phòng đảm bảo chất lượng";
          case "dev":
            return "Phòng phát triển";
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
          case "vn":
            return "Việt Nam";
          case "us":
            return "Mỹ";
          case "uk":
            return "Anh";
        }
      },
    },
    {
      title: "Quận/Huyện",
      dataIndex: "district",
      key: "district",
      render: (data, record) => {
        switch (record.country) {
          case "dd":
            return "Đống Đa";
          case "tx":
            return "Thanh Xuân";
          case "bd":
            return "Ba Đình";
          case "hm":
            return "Hoàng Mai";
        }
      },
    },
    {
      title: "Tỉnh/Thành",
      dataIndex: "city",
      key: "city",
      render: (data, record) => {
        return (
          <span>{record.city === "hn" ? "Hà Nội" : "TP Hồ Chí Minh"}</span>
        );
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
          <Button type="primary" onClick={()=>handleEdit(record)}>
          sua
          </Button>
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
        setLoading(true);
        setDataSource((prev) => prev.filter((user) => user.id !== record.id));
        setLoading(false);
        message.success("xoa thanh cong");
      },
    });
  };
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      fetch("http://localhost:3000/user")
        .then((res) => res.json())
        .then((result) => {
          setDataSource(result);
          setLoading(false);
        });
    }, 2000);
  }, []);
  return (
    <div>
    <ProTable
      className="table_scroll"
      columns={columns}
      dataSource={dataSource}
      actionRef={actionRef}
      loading={loading}
      rowKey="id"
      search={false}
      pagination={{ pageSize: 6 }}
      dateFormatter="number"
      headerTitle="Quản lý khách hàng tiềm năng"
      toolBarRender={() => 
      <Button type="primary" onClick={handleAdd}> 
      thêm mới
  </Button>}
      scroll={{ x: 1 }}
    />
    <Modal
    open={isModalVisible}
    onCancel={() => setIsModalVisible(false)}
    footer={null}
>
    <TestModal 
        record={editingRecord}
        isAdding={isAdding} 
        closeModal={() => setIsModalVisible(false)}
    />
</Modal>
</div>
  );
};
