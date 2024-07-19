import React from "react";
import { data } from "../../../thuc_tap";
import { Form, Input, Button,  Select, InputNumber,Col } from "antd";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProFormDatePicker} from "@ant-design/pro-form";
import "./Form.css";
import { message } from "antd";
const { Option } = Select;
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
          <Input disabled={false} />
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
          key={fieldCode}
          label={label}
          name={fieldCode}
          rules={[{ required: fieldRequired, message: `${label} is required` }]}
          disabled={fieldReadOnly}
          dataFormat="YYYY-MM-DD"
          className="form-item"
        ></ProFormDatePicker>
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
            mode={fieldMultiSelect ? "multiple" : null}
            disabled={fieldReadOnly}
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

export const FormLayoutUpdate = () => {
  const navigate = useNavigate();
  const [values, setValues] = useState(null);
  const { id } = useParams();

  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/${id}`)
        .then((res) => res.json())
        .then((values) => {
          setValues(values);
          console.log("gg", values);
        });
    }
  }, [id]);

  const updateUser = async (id, data) => {
    try {
      const response = await fetch(`http://localhost:3000/user/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      message.success('sua thanh cong')
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  if (!values) return "Loading...";

  return (
    <div>
      <>
      <h2 className="label_content">{data.label}</h2>
      <div className="form-container">
        <Form
          form={form}
          onFinish={async (formValues) => {
            await updateUser(id, formValues);
            setTimeout(() =>{
              navigate("/");
            }, 2000);
          }}
          layout="vertical"
          title="Add form"
          initialValues={values}  
        >
          <div className="group-wrapper">
            <div className="group-row">
              {renderGroup(data.displayConfig.groupList[0])}
              {renderGroup(data.displayConfig.groupList[1])}
            </div>
            <div className="">
              {renderGroup(data.displayConfig.groupList[2])}
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit" className="submit-button">
              Gửi
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
    </div>
  );
};

export default FormLayoutUpdate;
