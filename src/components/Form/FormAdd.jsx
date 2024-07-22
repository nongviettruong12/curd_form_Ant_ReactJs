// import { Form, Input, Button, Select, InputNumber} from "antd";
// import { ProFormDatePicker } from "@ant-design/pro-components";
// import { data } from "../../../thuc_tap";
// import { Col } from "antd";
// import "./Form.css";
// import React from "react";
// import { message } from "antd";
// const { Option } = Select;
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

//   switch (dataType) {
//     case "string":
//       return (
//         <Form.Item
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` }]}
//           className="form-item"
//         >
//           <Input disabled={false} />
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
//           key={fieldCode}
//           label={label}
//           name={fieldCode}
//           rules={[{ required: fieldRequired, message: `${label} is required` }]}
//           disabled={fieldReadOnly}
//           dataFormat="YYYY-MM-DD"
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

// export const CustomerFormAdd = () => {
//   const [form] = Form.useForm();
  

  
//   const handleSubmit = async (values) => {
//     try {
//       const res = await fetch("http://localhost:3000/user", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(values),
//       });
//       message.success('them moi thanh cong')
//       console.log("Form Values:", res);
//       setTimeout(() => {
//         window.location = "http://localhost:5173";
//       }, 2000);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <>
   
//       <h2 className="label_content">{data.label}</h2>
//       <div className="form-container">
//         <Form
//           form={form}
//           layout="vertical"
//           onFinish={handleSubmit}
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
//             <Button type="primary" htmlType="submit" className="submit-button" >
//               Gửi
//             </Button>
//           </Form.Item>
//         </Form>
//       </div>
//     </>
//   );
// };

// export default CustomerFormAdd;
