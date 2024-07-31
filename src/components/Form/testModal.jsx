import { ProForm } from "@ant-design/pro-components";
import React, { useEffect, useState } from "react";
import {
  Form,
  Input,
  Button,
  Select,
  InputNumber,
  Col,
  message,
  Spin,
} from "antd";
import { ProFormDatePicker } from "@ant-design/pro-components";
import { data } from "../../../thuc_tap";
import { useNavigate, useParams } from "react-router-dom";
import "./Form.css";
const { Option } = Select;

const checkDuplicateEmail = async (email, currentId) => {
  try {
    const response = await fetch("http://localhost:3000/user");
    const data = await response.json();
    return data.some((user) => user.email === email && user.id !== currentId);
  } catch (error) {
    console.error("Error checking duplicate email:", error);
    return false;
  }
};

const renderField = (field) => {
  const {
    label,
    fieldCode,
    dataType,
    fieldRequired,
    fieldMultiSelect,
    fieldReadOnly,
    listValue,
  } = field;

  const { id } = useParams();

  switch (dataType) {
    case "string":
      return (
        <Form.Item
          key={fieldCode}
          label={label}
          name={fieldCode}
          rules={[{ required: fieldRequired, message: `${label} is required` }]}
          className="form-item"
        >
          <Input disabled={id && fieldReadOnly} />
        </Form.Item>
      );
    case "user":
      return (
        <Form.Item
          key={fieldCode}
          label={label}
          name={fieldCode}
          rules={[{ required: fieldRequired, message: `${label} is required` }]}
          className="form-item"
        >
          <Select
            mode={fieldMultiSelect ? "multiple" : null}
            disabled={fieldReadOnly}
            onSelect={handleSelect}
          >
            {listValue.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    case "date":
      return (
        <ProFormDatePicker
          format="YYYY-MM-DD HH:mm:ss"
          fieldProps={{ format: "YYYY-MM-DD HH:mm:ss" }}
          key={fieldCode}
          label={label}
          name={fieldCode}
          rules={[{ required: fieldRequired, message: `${label} is required` }]}
          disabled={fieldReadOnly}
          className="form-item"
        />
      );
    case "email":
      return (
        <Form.Item
          key={fieldCode}
          label={label}
          name={fieldCode}
          
          rules={[
            { required: fieldRequired, message: `${label} is required` },
            { type: "email", message: "Invalid email" },
          ]}
          className="form-item"
        >
          <Input disabled={fieldReadOnly} />
        </Form.Item>
      );
    case "list":
      return (
        <Form.Item
          key={fieldCode}
          label={label}
          name={fieldCode}
          rules={[{ required: fieldRequired, message: `${label} is required` }]}
          className="form-item"
        >
          <Select
            mode={fieldMultiSelect ? "multiple" : Array}
            disabled={fieldReadOnly}
            onSelect={handleSelect}
          >
            {listValue.map((item) => (
              <Option key={item.value} value={item.value}>
                {item.label}
              </Option>
            ))}
          </Select>
        </Form.Item>
      );
    case "number":
      return (
        <Form.Item
          key={fieldCode}
          label={label}
          name={fieldCode}
          rules={[{ required: fieldRequired, message: `${label} is required` }]}
          className="form-item"
        >
          <InputNumber disabled={fieldReadOnly} />
        </Form.Item>
      );
    default:
      return null;
  }
};

const renderCol = (col) => {
  return (
    <Col span={12} key={col.id} className="form-col">
      {col.fieldList.map((field) => renderField(field))}
    </Col>
  );
};

const renderRow = (row) => {
  return (
    <div key={row.id} className="form-row">
      {row.colList.map((col) => renderCol(col))}
    </div>
  );
};

const renderGroup = (group) => {
  return (
    <div key={group.id} className="form-group">
      <h3 className="form-title">{group.label}</h3>
      {group.rowList.map((row) => renderRow(row))}
    </div>
  );
};

const waitTime = (time = 100) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(true);
    }, time);
  });
};

const handleSelect = () => {
  const selectDropdown = document.querySelector('.ant-select-dropdown');
  if (selectDropdown) {
    selectDropdown.classList.add('ant-select-dropdown-hidden');
  }
};

const TestModal = ({ record, isAdding, closeModal }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [values, setValues] = useState(null);
  // const [loading, setLoading] = useState(false)
  useEffect(() => {
    if (record && !isAdding) {
        setValues(record);
        form.setFieldsValue(record);
    } else {
        form.resetFields();
    }
}, [record, isAdding, form]);
  const handleSubmit = async (values) => {
    try {
      const duplicate = await checkDuplicateEmail(values.email, record?.id);
      console.log("Duplicate email", values.email);
      if (duplicate) {
        message.error("Email đã tồn tại");
        return;
      }
      const url = isAdding
            ? "http://localhost:3000/user"
            : `http://localhost:3000/user/${record?.id}`;
        const method = isAdding ? "POST" : "PUT";
        
        await waitTime(2000);
        const response = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        });

        if (!response.ok) {
            throw new Error("Failed to submit form");
        }

        message.success(isAdding ? "Added successfully" : "Updated successfully");
        setTimeout(() => {
            window.location.reload();
            navigate("/");
        }, 2000);
    } catch (error) {
        console.error("Error submitting form:", error);
        message.error("Error submitting form");
    }
  };

  if (id && !values) return <Spin>loading</Spin>;
  return (
    <>
      <ProForm
        form={form}
        autoFocusFirstInput
        onFinish={handleSubmit}
       
        initialValues={values}
        modalProps={{
          destroyOnClose: true,
        onCancel: closeModal,
        }}
        // submitTimeout={2000}
      >
        <h2 className="label_content">{data.label}</h2>
        <div className="form-container">
          <div className="group-wrapper">
            <div className="group-row">
              {renderGroup(data.displayConfig.groupList[0])}
              {renderGroup(data.displayConfig.groupList[1])}
            </div>
            <div className="">
              {renderGroup(data.displayConfig.groupList[2])}
            </div>
          </div>
        </div>
      </ProForm>
    </>
  );
};
export default TestModal;
