import {
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
} from "@ant-design/pro-form";
import './Form.css'
import { Row, Col } from 'antd'
import { useEffect, useState } from "react";
import { useParams,useNavigate } from "react-router-dom";
const FormLayoutUpdate = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(null);
  const { id } = useParams();
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
      if (!response.ok) {
        throw new Error("Failed to update user");
      }
      return response.json();
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  

  if (!values) return 'Loading...';

  return (
    <ProForm
    onFinish={async (formValues) => {
      await updateUser(id, formValues);
      alert("Updated user successfully")
      navigate("/")
    }}
      layout="vertical"
      title="Add form"
      initialValues={values}
    >
      <h2 className="center">Form sửa  thông tin khách hàng tiềm năng</h2>
      <div className="flex">
        <div className="label_1">
          <h2 className="center">Thông tin khách hàng tiềm năng</h2>
          <Row gutter={[16,16]}>
              <Col span={12}>
              <div className="columnOne">
            <ProFormText
              name="name"
              label="Name"
              placeholder="nhập tên"
              rules={[
                { required: true, message: "Name is required" },
                { whitespace: true },
                { min: 3, message: "please enter your name" },
              ]}
              hasFeedback
            />
            <ProFormDatePicker
              name="birthday"
              label="Birthday"
              placeholder="nhập ngày tháng năm sinh"
              rules={[{ required: false }]}
            />
            <ProFormText
              name="phone"
              label="Phone"
              placeholder="nhập số điện thoại"
              disabled={true}
              rules={[
                { required: true, message: "Phone number is required" },
                { min: 8, max: 11, message: "please enter your phone number" },
              ]}
              hasFeedback
            />
            <ProFormText
              name="email"
              label="Email"
              placeholder="Enter your email"
              rules={[
                { required: true, message: "Email is required" },
                { type: "email", message: "Invalid email" },
              ]}
              hasFeedback
            />
            <ProFormSelect
              name="jugde"
              label="Đánh giá"
              placeholder="Enter rating"
              options={[
                { value: "handsome", label: "Đẹp trai" },
                { value: "ugly", label: "Xấu trai" },
                { value: "idiot", label: "Nhìn trông đần" },
              ]}
              rules={[{ required: true, message: "please choose" }]}
              hasFeedback
            />
          </div>
              </Col>
              <Col span={12}>
              <div className="columnTwo">
            <ProFormSelect
              name="gender"
              label="Giới tính"
              placeholder="Select gender"
              options={[
                { value: "male", label: "Nam" },
                { value: "female", label: "Nữ" },
              ]}
              rules={[{ required: false, message: "" }]}
            />
            <ProFormText
              name="other_phone"
              label="Số điện thoại khác"
              placeholder="số điện thoại khác"
            />
            <ProFormText
              name="other_email"
              label="Email khác"
              placeholder="email khác"
            />
            <ProFormSelect
              name="status"
              label="Tình trạng"
              placeholder="Enter status"
              options={[
                { value: "new", label: "Mới" },
                { value: "contact", label: "Đã liên hệ" },
              ]}
              rules={[{ required: true, message: "please choose" }]}
            />
            <ProFormSelect
              name="assign_to"
              label="Người phụ trách khách hàng"
              placeholder="Enter manager's name"
              options={[
                { value: "123123123", label: "Đạt 09" },
                { value: "351421412", label: "Trung Đại Ca" },
                { value: "351421416", label: "ThangDT" },
                { value: "351421419", label: "Cường Đzai 1102" },
              ]}
              rules={[{ required: true, message: "please choose" }]}
            />
          </div>
              </Col>
          </Row>
          <Row gutter={[16,16]}>
              <Col span={12}>
              </Col>
          </Row>
        </div>
        <div className="label_2">
          <h2 className="center">Thông tin công ty</h2>
          <Row gutter={[16,16]}>
              <Col span={12}>
              <div className="columnThree">
            
            <ProFormText
              name="company_name"
              label="Tên công ty"
              placeholder="vui lòng nhập tên công ty"
              rules={[{ required: true, message: "please enter company name" }]}
            />
            <ProFormSelect
              name="career"
              label="Ngành nghề"
              placeholder="vui lòng chọn ngành nghề"
              options={[
                { value: "transfer", label: "Vận tải" },
                { value: "logistic", label: "Chuỗi cung ứng hàng hóa" },
                { value: "construction", label: "Xây dựng" },
              ]}
            />
          </div>
              </Col>
              <Col span={12}>
              <div className="columnFour">
            <ProFormSelect
              name="department"
              label="Phòng ban"
              placeholder="Enter department"
              options={[
                { value: "media", label: "Phòng truyền thông" },
                { value: "tester", label: "Phòng đảm bảo chất lượng" },
                { value: "dev", label: "Phòng phát triển" },
              ]}
            />
            <ProFormDigit
              name="total_employee"
              label="Số lượng nhân viên"
              placeholder="vui lòng nhập số lượng nhân viên"
            />
          </div>
              </Col>
          </Row>
        </div>
        <div className="label_3">
           <h3 className="center">Thông tin địa chỉ</h3>
          <Row gutter={[16,16]}>
              <Col span={12}>
              <div className="columnFive">
           
            <ProFormSelect
              name="country"
              label="Quốc gia"
              placeholder="vui lòng chọn quốc gia"
              options={[
                { value: "vn", label: "Việt Nam" },
                { value: "us", label: "Mỹ" },
                { value: "uk", label: "Anh" },
              ]}
              rules={[{ required: true, message: "please enter country" }]}
            />
            <ProFormSelect
              name="district"
              label="Quận/Huyện"
              placeholder="vui lòng chọn quận huyện"
              options={[
                { value: "dd", label: "Đống Đa" },
                { value: "tx", label: "Thanh Xuân" },
                { value: "bd", label: "Ba Đình" },
                { value: "hm", label: "Hoàng Mai" },
              ]}
              rules={[{ required: true, message: "please enter district" }]}
            />
          </div>
              </Col>
              <Col span={12}>
              <div className="columnSix">
            <ProFormSelect
              name="city"
              label="Tỉnh/Thành"
              placeholder="Enter city"
              options={[
                { value: "hn", label: "Hà Nội" },
                { value: "hcm", label: "TP Hồ Chí Minh" },
              ]}
              rules={[{ required: true, message: "please enter city" }]}
            />
            <ProFormTextArea
              name="address"
              label="Địa chỉ nhà"
              placeholder="Enter home address"
              rules={[{ required: true, message: "please enter address" }]}
            />
          </div>
              </Col>
          </Row>
         
         
        </div>
      </div>
    </ProForm>
  );
};
export default FormLayoutUpdate;
