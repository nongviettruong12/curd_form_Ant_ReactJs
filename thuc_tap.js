// Cho trước 1 form có cấu trúc được xác định sẵn (form này cần phải lấy thông qua api để có thể hiển thị được).
// Giả sử sau khi gọi api ta được dữ liệu form được lưu vào biến "data" có cấu trúc như sau:

export const data = {
  id: 1,
  label: "Form nhập thông tin khách hàng tiềm năng",
  displayConfig: {
    id: 11,
    groupList: [
      // Nhóm thông tin
      {
        id: 111,
        label: "Thông tin khách hàng tiềm năng",
        rowList: [
          // Danh sách hàng thuộc nhóm thông tin
          {
            id: 1111,
            label: "Dòng 1",
            colList: [
              // Danh sách cột thuộc hàng
              {
                id: 11111,
                label: "Cột 1",
                fieldList: [
                  // Danh sách các trường của cột
                  {
                    id: 111111,
                    label: "Họ và tên",
                    fieldCode: "full_name",
                    dataType: "string",
                    fieldRequired: true, // Để xác định xem trường này có bắt buộc không
                    fieldMultiSelect: false, // Để xác định xem trường này có được chọn nhiều giá trị không (áp dụng với các trường dạng kiểu danh sách chọn)
                    fieldReadOnly: false, // Để xác định trường này chỉ được xem hay được thao tác
                  },
                  {
                    id: 111112,
                    label: "Ngày sinh",
                    fieldCode: "birthday",
                    dataType: "date",
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 111113,
                    label: "Số điện thoại",
                    fieldCode: "phone",
                    dataType: "string",
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: true,
                  },
                  {
                    id: 111114,
                    label: "Email",
                    fieldCode: "email",
                    dataType: "email",
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 111115,
                    label: "Đánh giá",
                    fieldCode: "jugde",
                    dataType: "list",
                    listValue: [
                      { value: "handsome", label: "Đẹp trai" },
                      { value: "ugly", label: "Xấu trai" },
                      { value: "idiot", label: "Nhìn trông đần" },
                    ],
                    fieldRequired: true,
                    fieldMultiSelect: true,
                    fieldReadOnly: false,
                  },
                ],
              },
              {
                id: 11112,
                label: "Cột 2",
                fieldList: [
                  {
                    id: 111121,
                    label: "Giới tính",
                    fieldCode: "gender",
                    dataType: "list",
                    listValue: [
                      { value: "male", label: "Nam" },
                      { value: "female", label: "Nữ" },
                    ],
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 111122,
                    label: "Số điện thoại khác",
                    fieldCode: "other_phone",
                    dataType: "string",
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 111123,
                    label: "Email khác",
                    fieldCode: "other_email",
                    dataType: "email",
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 111124,
                    label: "Tình trạng",
                    fieldCode: "status",
                    dataType: "list",
                    listValue: [
                      { value: "new", label: "Mới" },
                      { value: "contact", label: "Đã liên hệ" },
                    ],
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 111125,
                    label: "Người phụ trách khách hàng",
                    fieldCode: "assign_to",
                    dataType: "user",
                    listValue: [
                      { value: "123123123", label: "Đạt 09" },
                      { value: "351421412", label: "Trung Đại Ca" },
                      { value: "351421416", label: "ThangDT" },
                      { value: "351421419", label: "Cường Đzai 1102" },
                    ],
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: 222,
        label: "Thông tin công ty",
        rowList: [
          // Danh sách hàng thuộc nhóm thông tin
          {
            id: 2222,
            label: "Dòng 1",
            colList: [
              // Danh sách cột thuộc hàng
              {
                id: 22221,
                label: "Cột 1",
                fieldList: [
                  // Danh sách các trường của cột
                  {
                    id: 222211,
                    label: "Tên công ty",
                    fieldCode: "company_name",
                    dataType: "string",
                    fieldRequired: true, // Để xác định xem trường này có bắt buộc không
                    fieldMultiSelect: false, // Để xác định xem trường này có được chọn nhiều giá trị không (áp dụng với các trường dạng kiểu danh sách chọn)
                    fieldReadOnly: false, // Để xác định trường này chỉ được xem hay được thao tác (chỉ áp dụng với form sửa)
                  },
                  {
                    id: 222212,
                    label: "Ngành nghề",
                    fieldCode: "career",
                    dataType: "list",
                    listValue: [
                      { value: "transfer", label: "Vận tải" },
                      { value: "logistic", label: "Chuỗi cung ứng hàng hóa" },
                      { value: "construction", label: "Xây dựng" },
                    ],
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                ],
              },
              {
                id: 22222,
                label: "Cột 2",
                fieldList: [
                  {
                    id: 222221,
                    label: "Phòng ban",
                    fieldCode: "department",
                    dataType: "list",
                    listValue: [
                      { value: "media", label: "Phòng truyền thông" },
                      { value: "tester", label: "Phòng đảm bảo chất lượng" },
                      { value: "dev", label: "Phòng phát triển" },
                    ],
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 222222,
                    label: "Số lượng nhân viên",
                    fieldCode: "total_employee",
                    dataType: "number",
                    fieldRequired: false,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                ],
              },
            ],
          },
        ],
      },

      {
        id: 333,
        label: "Thông tin địa chỉ",
        rowList: [
          // Danh sách hàng thuộc nhóm thông tin
          {
            id: 3333,
            label: "Dòng 1",
            colList: [
              // Danh sách cột thuộc hàng
              {
                id: 33331,
                label: "Cột 1",
                fieldList: [
                  // Danh sách các trường của cột
                  {
                    id: 333311,
                    label: "Quốc gia",
                    fieldCode: "country",
                    dataType: "list",
                    listValue: [
                      { value: "vn", label: "Việt Nam" },
                      { value: "us", label: "Mỹ" },
                      { value: "uk", label: "Anh" },
                    ],
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 333312,
                    label: "Quận/ Huyện",
                    fieldCode: "district",
                    dataType: "list",
                    listValue: [
                      { value: "dd", label: "Đống Đa" },
                      { value: "tx", label: "Thanh Xuân" },
                      { value: "bd", label: "Ba Đình" },
                      { value: "hm", label: "Hoàng Mai" },
                    ],
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                ],
              },
              {
                id: 33332,
                label: "Cột 2",
                fieldList: [
                  {
                    id: 333321,
                    label: "Tỉnh/ thành",
                    fieldCode: "city",
                    dataType: "list",
                    listValue: [
                      { value: "hn", label: "Hà Nội" },
                      { value: "hcm", label: "TP Hồ Chí Minh" },
                    ],
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                  {
                    id: 333322,
                    label: "Địa chỉ nhà",
                    fieldCode: "address",
                    dataType: "string",
                    fieldRequired: true,
                    fieldMultiSelect: false,
                    fieldReadOnly: false,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};

/**
 * Yêu cầu nghiệp vụ:
 * 1. Tạo ra form với cấu hình (cấu trúc) đã cho trước ở trên với mục đích thêm khách hàng tiềm năng của 1 công ty:
 *  Lưu ý:
 *    - Xem hình minh họa cấu trúc của form ở file ảnh (form_structure.png)
 *    - Form gồm các kiểu dữ liệu (dataType): string, number, list, email // Riêng với trường email yêu cầu mặc định luôn được validate theo regex
 *    - Đối với các từng kiểu dữ liệu yêu cầu hiển thị ra ô input tương ứng (Ví dụ kiểu dữ liệu string thì ô input chỉ cho nhập text, còn kiểu list thì sẽ hiển thị select dropdown)
 *    - Đối với các property như là fieldRequired (để xác định trường là bắt buộc nhập), fieldMultiSelect (cho phép kiểu list được chọn nhiều giá trị), fieldReadOnly (trường chỉ được phép xem, chỉ áp dụng đối với form sửa) cũng đều được thể hiện trong form
 *    - Công nghệ sử dụng: Yêu cầu hiển thị cấu hình theo 2 cách:
 *          + Cách 1: chỉ sử dụng các component của Ant Design bản thường (https://ant.design/components/overview/)
 *          + Cách 2: chỉ sử dụng các component của ProComponent (bản nâng cấp của Ant Design) (https://procomponents.ant.design/en-US/components)
 *
 *
 * 2. Tạo 1 table để hiện thị dữ liệu sau khi tạo (Yêu cầu dùng table của Ant Design bản thường)
 * 3. Làm chức năng sửa (cũng hiển thị ra form như trên rồi tự động điền dữ liệu)
 * 4. Làm chức năng xóa
 *
 * Yêu cầu kỹ thuật:
 * 1. Tách component 1 cách hợp lý (Không nên viết tất cả vào 1 component)
 * 2. Trình bày code dễ nhìn
 * 3. Đặt tên biến, tên hàm toàn bộ bằng tiếng anh, đặt tên dễ hiểu để người sau nhìn vào code biết biến hay hàm dùng để làm gì
 * 4. Không viết chung css vào file chứa component (tách riếng fiel css rồi import vào)
 * 5. Khi css thì cần đặt class rồi css ở file css external, lưu ý KHÔNG viết css inline (vì trông code rất xấu và khó nhìn)
 * 6. Chia code làm các khu vực: khu vực dành riêng để viết khai báo state, khu vực useEffect, khu vực viết function,...
 */
