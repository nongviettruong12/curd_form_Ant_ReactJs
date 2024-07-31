// import React, { useEffect, useState } from "react";
// import {
//   Form,
//   Input,
//   Button,
//   Select,
//   InputNumber,
//   Col,
//   message,
//   Spin,
// } from "antd";
// import { ProFormDatePicker } from "@ant-design/pro-components";
// import { data } from "../../../thuc_tap";
// import { useParams, useNavigate } from "react-router-dom";
// import "./Form.css";
// const { Option } = Select;

// const checkEmailExists = async (email) => {
//   // console.log('check',email);
//   const response = await fetch(`http://localhost:3000/user?email=${email}`);
//   console.log('res', response);
//   const result = await response.json();
//   return result.exists; // Giả sử API trả về { exists: true/false }
// };
// const validateEmail = async (_, value) => {
//   const exists = await checkEmailExists(value);
//   if (exists) {
//     return Promise.reject(new Error("this email is already use"));
//   }
//   return Promise.resolve();
// };

// const checkPhoneNumberExists = async (phone) => {
//   const response = await fetch(
//     `http://localhost:3000/user?phone=${phone}`
//   );
//   const result = await response.json();
//   return result.exists; // Giả sử API trả về { exists: true/false }
// };

// const validatePhoneNumber = async (_, value) => {
//   const exists = await checkPhoneNumberExists(value);
//   if (exists) {
//     return Promise.reject(new Error("this phone number is already use"));
//   }
//   return Promise.resolve();
// };

// const renderField = (field) => {
//   const {
//     label,
//     fieldCode,
//     dataType,
//     fieldRequired,
//     fieldMultiSelect,
//     fieldReadOnly,
//     listValue,
//   } = field;

//   const { id } = useParams();

//   switch (dataType) {
//     case "string":
//       return (
//         <Form.Item
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` },
//             { validator: validatePhoneNumber, message:`phone number already used`}
//           ]}
//           className="form-item"
//         >
//           <Input disabled={id && fieldReadOnly} />
//         </Form.Item>
//       );
//     case "user":
//       return (
//         <Form.Item
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` }]}
//           className="form-item"
//         >
//           <Select
//             mode={fieldMultiSelect ? "multiple" : null}
//             disabled={fieldReadOnly}
//           >
//             {listValue.map((item) => (
//               <Option key={item.value} value={item.value}>
//                 {item.label}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       );
//     case "date":
//       return (
//         <ProFormDatePicker
//           format="YYYY-MM-DD HH:mm:ss"
//           fieldProps={{ format: "YYYY-MM-DD HH:mm:ss" }}
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` }]}
//           disabled={fieldReadOnly}
//           className="form-item"
//         />
//       );
//     case "email":
//       return (
//         <Form.Item
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[
//             { required: fieldRequired, message: `${label} is required` },
//             { type: "email", message: "Invalid email" },
//             { validator: validateEmail },
//           ]}
//           className="form-item"
//         >
//           <Input disabled={fieldReadOnly} />
//         </Form.Item>
//       );
//     case "list":
//       return (
//         <Form.Item
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` }]}
//           className="form-item"
//         >
//           <Select
//             mode={fieldMultiSelect ? "multiple" : Array}
//             disabled={fieldReadOnly}
//           >
//             {listValue.map((item) => (
//               <Option key={item.value} value={item.value}>
//                 {item.label}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>
//       );
//     case "number":
//       return (
//         <Form.Item
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` }]}
//           className="form-item"
//         >
//           <InputNumber disabled={fieldReadOnly} />
//         </Form.Item>
//       );
//     default:
//       return null;
//   }
// };

// const renderCol = (col) => {
//   return (
//     <Col span={12} key={col.id} className="form-col">
//       {col.fieldList.map((field) => renderField(field))}
//     </Col>
//   );
// };

// const renderRow = (row) => {
//   return (
//     <div key={row.id} className="form-row">
//       {row.colList.map((col) => renderCol(col))}
//     </div>
//   );
// };

// const renderGroup = (group) => {
//   return (
//     <div key={group.id} className="form-group">
//       <h3 className="form-title">{group.label}</h3>
//       {group.rowList.map((row) => renderRow(row))}
//     </div>
//   );
// };

// export const CustomerForm = () => {
//   const navigate = useNavigate();
//   const { id } = useParams();
//   const [form] = Form.useForm();
//   const [values, setValues] = useState(null);

//   useEffect(() => {
//     if (id) {
//       fetch(`http://localhost:3000/user/${id}`)
//         .then((res) => res.json())
//         .then((data) => {
//           setValues(data);
//           form.setFieldsValue(data);
//         });
//     }
//   }, [id, form]);

//   const handleSubmit = async (values) => {
//     try {
//       const url = id
//         ? `http://localhost:3000/user/${id}`
//         : "http://localhost:3000/user";
//       const method = id ? "PUT" : "POST";
//       const response = await fetch(url, {
//         method,
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });

//       if (!response.ok) {
//         throw new Error("Failed to submit form");
//       }

//       message.success(id ? "Updated successfully" : "Added successfully");
//       <Spin>loading...</Spin>;
//       setTimeout(() => {
//         navigate("/");
//       }, 2000);
//     } catch (error) {
//       console.error("Error submitting form:", error);
//       message.error("Error submitting form");
//     }
//   };

//   if (id && !values) return <Spin>loading</Spin>;

//   return (
//     <>
//       <h2 className="label_content">{data.label}</h2>
//       <div className="form-container">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
//           initialValues={values}
//         >
//           <div className="group-wrapper">
//             <div className="group-row">
//               {renderGroup(data.displayConfig.groupList[0])}
//               {renderGroup(data.displayConfig.groupList[1])}
//             </div>
//             <div className="">
//               {renderGroup(data.displayConfig.groupList[2])}
//             </div>
//           </div>
//           <Form.Item>
//             <Button type="primary" htmlType="submit" className="submit-button">
//               Gửi
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default CustomerForm;
