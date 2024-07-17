import {
  ProForm,
  ProFormText,
  ProFormDatePicker,
  ProFormSelect,
  ProFormTextArea,
  ProFormDigit,
} from "@ant-design/pro-form";
import './Form.css'

const FormLayout = () => {

  const handleSubmit = async (data) => {
    try {
      const response = await fetch("http://localhost:3000/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      console.log(response);
      alert("add successfuly");
      window.location = "http://localhost:5173";
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <ProForm onFinish={handleSubmit} layout="vertical" title="Add form">
      <h2 className="center">Form nhập thông tin khách hàng tiềm năng</h2>
      <div className="flex">
        <div className="label_1">
          <h2>Thông tin khách hàng tiềm năng</h2>
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
        </div>
        <div className="label_2">
          <div className="columnThree">
            <h2>Thông tin công ty</h2>
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
        </div>
        <div className="label_3">
          <div className="columnFive">
            <h3>Thông tin địa chỉ</h3>
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
        </div>
      </div>
    </ProForm>
  );
};
export default FormLayout;
