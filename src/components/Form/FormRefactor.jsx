import React, { useEffect, useState } from "react";
import { Form, Input, Button, Select, InputNumber, Col, message } from "antd";
import { ProFormDatePicker } from "@ant-design/pro-components";
import { data } from "../../../thuc_tap";
import { useParams, useNavigate } from "react-router-dom";
import "./Form.css";

const { Option } = Select;

const renderField = ({
  label,
  fieldCode,
  dataType,
  fieldRequired,
  fieldMultiSelect,
  fieldReadOnly,
  listValue,
}) => {
  const commonProps = {
    key: fieldCode,
    label: label,
    name: fieldCode,
    rules: [{ required: fieldRequired, message: `${label} is required` }],
    className: "form-item",
  };

  switch (dataType) {
    case "string":
      return (
        <Form.Item {...commonProps}>
          <Input disabled={fieldReadOnly} />
        </Form.Item>
      );
    case "user":
    case "list":
      return (
        <Form.Item {...commonProps}>
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
          {...commonProps}
          disabled={fieldReadOnly}
          dataFormat="YYYY-MM-DD"
        />
      );
    case "email":
      return (
        <Form.Item
          {...commonProps}
          rules={[
            { required: fieldRequired, message: `${label} is required` },
            { type: "email", message: "Invalid email" },
          ]}
        >
          <Input disabled={fieldReadOnly} />
        </Form.Item>
      );
    case "number":
      return (
        <Form.Item {...commonProps}>
          <InputNumber disabled={fieldReadOnly} />
        </Form.Item>
      );
    default:
      return null;
  }
};

const renderCol = (col) => (
  <Col span={12} key={col.id} className="form-col">
    {col.fieldList.map(renderField)}
  </Col>
);

const renderRow = (row) => (
  <div key={row.id} className="form-row">
    {row.colList.map(renderCol)}
  </div>
);

const renderGroup = (group) => (
  <div key={group.id} className="form-group">
    <h3 className="form-title">{group.label}</h3>
    {group.rowList.map(renderRow)}
  </div>
);

export const CustomerForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form] = Form.useForm();
  const [values, setValues] = useState(null);

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3000/user/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setValues(data);
          form.setFieldsValue(data);
        });
    }
  }, [id, form]);

  const handleSubmit = async (values) => {
    try {
      const url = id ? `http://localhost:3000/user/${id}` : "http://localhost:3000/user";
      const method = id ? "PUT" : "POST";
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

      message.success(id ? 'Updated successfully' : 'Added successfully');
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error submitting form:", error);
      message.error("Error submitting form");
    }
  };

  if (id && !values) return "Loading...";

  return (
    <>
      <h2 className="label_content">{data.label}</h2>
      <div className="form-container">
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
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
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default CustomerForm;
