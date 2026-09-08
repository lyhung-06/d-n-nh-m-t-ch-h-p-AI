# QUY TRÌNH & NHẬT KÝ LÀM VIỆC CÙNG AI
## Dự án: Hệ Thống Quản Lý Dự Án Nhóm Tích Hợp AI

---

## 1. HƯỚNG DẪN & QUY TẮC GHI NHẬT KÝ

### 1.1. Khi nào ghi chép Nhật ký AI?
1. **Thiết kế hệ thống & CSDL**: Khi sử dụng AI để thiết kế schema, xác định quan hệ bảng.
2. **Xây dựng API & Controller**: Khi sử dụng AI để tạo CRUD, xử lý nghiệp vụ.
3. **Giải quyết lỗi**: Khi tham vấn AI để sửa lỗi và tối ưu code.
4. **Xây dựng tính năng AI**: Thiết kế Prompt, tích hợp AI vào hệ thống.

### 1.2. Nguyên tắc sử dụng AI
- **Không đưa thông tin bảo mật** (mật khẩu, secret key) vào prompt.
- **Kiểm tra kỹ code** do AI sinh ra trước khi áp dụng.
- **Ghi lại prompt và kết quả** để minh chứng.

---

## 2. KHUNG MẪU NHẬT KÝ

```markdown
### [MÃ_LOG]: [Tiêu đề]
- **Ngày**: YYYY-MM-DD
- **Kỹ sư**: [Tên]
- **Phân hệ**: [Tên phân hệ]
- **Mô hình AI**: [Tên AI]
- **Mục tiêu**: [Mô tả]

#### 1. Prompt gửi đi
> [Nội dung prompt]

#### 2. Phản hồi từ AI
- [Tóm tắt giải pháp]

#### 3. Đánh giá & Chỉnh sửa
- **Điểm tốt**: [...]
- **Lỗ hổng**: [...]
- **Tinh chỉnh**: [...]

#### 4. Kết quả áp dụng
- [File/đoạn code áp dụng]
```

---

## 3. NHẬT KÝ ĐÃ THỰC HIỆN

### [LOG-001]: Thiết kế CSDL và cấu trúc dự án
- **Ngày**: 2026-08-15
- **Kỹ sư**: Lý Văn Hưng
- **Phân hệ**: Database & Architecture
- **Mô hình AI**: ChatGPT-4 / Gemini
- **Mục tiêu**: Thiết kế cấu trúc thư mục và database cho hệ thống

#### 1. Prompt gửi đi:
> "Thiết kế CSDL cho hệ thống quản lý dự án nhóm với các bảng Users, Projects, Tasks, ProjectMembers, Sprints."

#### 2. Phản hồi từ AI:
- Đề xuất 5 bảng chính với quan hệ
- Gợi ý cấu trúc MVC cho Backend

#### 3. Đánh giá & Chỉnh sửa:
- **Điểm tốt**: Cấu trúc rõ ràng, quan hệ đầy đủ
- **Lỗ hổng**: Thiếu bảng Comments, Documents, AI_History
- **Tinh chỉnh**: Chuyển sang JSON database, bổ sung các bảng còn thiếu

#### 4. Kết quả áp dụng:
- File: `database/database.json`
- Cấu trúc: `backend/controllers`, `models`, `routes`, `middleware`, `services`

---

### [LOG-002]: Xây dựng chức năng đăng nhập và phân quyền
- **Ngày**: 2026-08-20
- **Kỹ sư**: Lý Văn Hưng
- **Phân hệ**: Authentication
- **Mô hình AI**: ChatGPT-4
- **Mục tiêu**: Xây dựng API đăng nhập và phân quyền ADMIN/MEMBER

#### 1. Prompt gửi đi:
> "Viết controller đăng nhập dùng session và bcrypt, middleware kiểm tra quyền ADMIN/MEMBER."

#### 2. Phản hồi từ AI:
```javascript
exports.login = (req, res) => {
  const user = User.findByEmail(req.body.email);
  if (!user) return res.status(401).json({ message: 'Email không tồn tại' });
  if (!bcrypt.compareSync(req.body.password, user.password)) {
    return res.status(401).json({ message: 'Mật khẩu không đúng' });
  }
  req.session.user = user;
  res.json({ user });
};
```

#### 3. Đánh giá & Chỉnh sửa:
- **Điểm tốt**: Code đúng cấu trúc, xử lý session tốt
- **Lỗ hổng**: Chưa validation email, chưa kiểm tra active
- **Tinh chỉnh**: Thêm validation, kiểm tra trạng thái tài khoản

#### 4. Kết quả áp dụng:
- File: `authController.js`, `authMiddleware.js`, `roleMiddleware.js`

---

### [LOG-003]: Xây dựng CRUD Project và Task
- **Ngày**: 2026-08-22
- **Kỹ sư**: Lý Văn Hưng
- **Phân hệ**: Project & Task Management
- **Mô hình AI**: Gemini / ChatGPT-4
- **Mục tiêu**: Xây dựng API CRUD và filter cho Project, Task

#### 1. Prompt gửi đi:
> "Viết controller CRUD cho Project và Task, hỗ trợ lọc theo projectId, status. Khi cập nhật task, tự động recalculate tiến độ project."

#### 2. Phản hồi từ AI:
```javascript
exports.list = (req, res) => {
  let tasks = Task.all();
  if (req.query.projectId) tasks = tasks.filter(t => t.projectId == req.query.projectId);
  if (req.query.status) tasks = tasks.filter(t => t.status === req.query.status);
  res.json(tasks);
};
```

#### 3. Đánh giá & Chỉnh sửa:
- **Điểm tốt**: CRUD đúng, filter tốt
- **Lỗ hổng**: Chưa kiểm tra assignee thuộc project
- **Tinh chỉnh**: Thêm kiểm tra assignee, progress 0-100%

#### 4. Kết quả áp dụng:
- File: `projectController.js`, `taskController.js`

---

### [LOG-004]: Thiết kế Prompt cho AI tóm tắt tiến độ
- **Ngày**: 2026-08-25
- **Kỹ sư**: Lý Văn Hưng
- **Phân hệ**: AI Core
- **Mô hình AI**: Gemini
- **Mục tiêu**: Thiết kế System Prompt cho AI tóm tắt tiến độ

#### 1. Prompt gửi đi:
> "Thiết kế System Prompt cho AI tóm tắt tiến độ, yêu cầu không tự tạo dữ liệu, chỉ phân tích dữ liệu có sẵn."

#### 2. Phản hồi từ AI:
```
System Prompt:
Bạn là trợ lý quản lý dự án. Chỉ phân tích dựa trên dữ liệu Project được cung cấp. 
Không tự tạo thành viên, Task, Deadline hoặc số liệu tiến độ không có trong dữ liệu đầu vào. 
Nếu dữ liệu không đủ, hãy thông báo dữ liệu chưa đủ.
```

#### 3. Đánh giá & Chỉnh sửa:
- **Điểm tốt**: Prompt rõ ràng, kiểm soát hallucination
- **Lỗ hổng**: Chưa có output format cụ thể
- **Tinh chỉnh**: Thêm output JSON: `{ progress_status, problems, risk_level, recommendations }`

#### 4. Kết quả áp dụng:
- File: `aiService.js`

---

### [LOG-005]: Tích hợp AI Service và Dashboard
- **Ngày**: 2026-08-28
- **Kỹ sư**: Lý Văn Hưng
- **Phân hệ**: AI Core & Dashboard
- **Mô hình AI**: Gemini / ChatGPT-4
- **Mục tiêu**: Tích hợp AI Service và xây dựng Dashboard thống kê

#### 1. Prompt gửi đi:
> "Viết service gọi Gemini API và controller Dashboard thống kê tổng quan."

#### 2. Phản hồi từ AI:
- Code gọi Gemini API với retry
- Dashboard tính: tổng project, task, task quá hạn, tiến độ

#### 3. Đánh giá & Chỉnh sửa:
- **Điểm tốt**: Cấu trúc đúng, xử lý async tốt
- **Lỗ hổng**: Chưa có retry, chưa kiểm tra output
- **Tinh chỉnh**: Thêm retry, kiểm tra output JSON hợp lệ

#### 4. Kết quả áp dụng:
- File: `aiService.js`, `aiController.js`, `dashboardController.js`

---

### [LOG-006]: Xử lý lỗi và viết test case
- **Ngày**: 2026-09-01
- **Kỹ sư**: Lý Văn Hưng & Hoàng Minh Khánh
- **Phân hệ**: Toàn bộ hệ thống
- **Mô hình AI**: ChatGPT-4
- **Mục tiêu**: Xây dựng cơ chế xử lý lỗi và test case

#### 1. Prompt gửi đi:
> "Viết middleware xử lý lỗi tập trung và đề xuất test case cho hệ thống."

#### 2. Phản hồi từ AI:
- Middleware xử lý lỗi: 400, 401, 403, 404, 500
- Đề xuất 16 test case cho các chức năng

#### 3. Đánh giá & Chỉnh sửa:
- **Điểm tốt**: Cấu trúc rõ ràng
- **Lỗ hổng**: Chưa có test AI
- **Tinh chỉnh**: Thêm test AI (lỗi API, hallucination)

#### 4. Kết quả áp dụng:
- Xử lý lỗi trong từng controller
- Bảng test case trong báo cáo mục 11.11

---

## 4. TỔNG KẾT

| **STT** | **Giai đoạn** | **Số lần dùng AI** |
|---------|---------------|-------------------|
| 1 | Phân tích & Thiết kế | 4 |
| 2 | Lập trình | 6 |
| 3 | AI Prompt | 2 |
| 4 | Debug & Testing | 3 |

**Tổng cộng:** 15 lần sử dụng AI

---



**Người thực hiện:**
- Lý Văn Hưng
- Hoàng Minh Khánh