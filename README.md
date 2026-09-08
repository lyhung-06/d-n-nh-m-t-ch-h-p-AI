# Hệ thống quản lý dự án nhóm - Tích hợp AI

> Hệ thống quản lý dự án nhóm với các tính năng quản lý Project, Task, Member, Dashboard và tích hợp AI hỗ trợ tóm tắt tiến độ.

---

## 📋 MỤC LỤC

- [Giới thiệu](#-giới-thiệu)
- [Tính năng](#-tính-năng)
- [Công nghệ sử dụng](#-công-nghệ-sử-dụng)
- [Cài đặt và chạy](#-cài-đặt-và-chạy)
- [Cấu trúc dự án](#-cấu-trúc-dự-án)
- [Tài khoản demo](#-tài-khoản-demo)
- [API Endpoints](#-api-endpoints)
- [Tính năng AI](#-tính-năng-ai)
- [Xử lý lỗi](#-xử-lý-lỗi)
- [Tác giả](#-tác-giả)
- [Tài liệu tham khảo](#-tài-liệu-tham-khảo)

---

## 🚀 Giới thiệu

Đây là hệ thống **quản lý dự án nhóm** được xây dựng bằng **Node.js**, sử dụng **JSON làm database** (lightweight, không cần cài MySQL). Hệ thống hỗ trợ quản lý:

- **Projects** - Quản lý dự án
- **Tasks** - Quản lý công việc/nhiệm vụ
- **Members** - Quản lý thành viên
- **Dashboard** - Thống kê tiến độ tổng quan
- **AI** - Tích hợp AI tóm tắt tiến độ và hỗ trợ phân công

---

## ✨ Tính năng

| STT | Tính năng | Mô tả |
|-----|-----------|-------|
| 1 | Đăng nhập/Đăng ký | Xác thực người dùng với session |
| 2 | Quản lý Project | CRUD dự án, tính toán tiến độ tự động |
| 3 | Quản lý Task | CRUD nhiệm vụ, lọc theo project/status |
| 4 | Quản lý Member | CRUD thành viên, phân quyền ADMIN/MEMBER |
| 5 | Dashboard | Thống kê tổng quan, tasks quá hạn |
| 6 | Phân quyền | ADMIN và MEMBER với các quyền khác nhau |
| 7 | AI tóm tắt tiến độ | Gửi dữ liệu lên AI để nhận báo cáo tóm tắt |

---

## 🛠 Công nghệ sử dụng

| Thành phần | Công nghệ |
|------------|-----------|
| **Backend** | Node.js + Express |
| **Database** | JSON file (lightweight, tự tạo khi chạy) |
| **Authentication** | Session (express-session) |
| **Mã hóa mật khẩu** | bcryptjs |
| **AI** | Gemini API (hoặc OpenAI) |
| **Quản lý phiên bản** | Git/GitHub |

---

## ⚙️ Cài đặt và chạy

### Yêu cầu hệ thống
- Node.js v16+
- npm hoặc yarn

### Bước 1: Clone hoặc tải dự án
```bash
git clone <repository-url>
cd project-management-ai
```

### Bước 2: Cài đặt dependencies
```bash
npm install
```

### Bước 3: Cấu hình môi trường
Tạo file `.env` trong thư mục gốc (tham khảo `.env.example`):

```env
PORT=3000
SESSION_SECRET=your_secret_key_here
AI_API_KEY=your_api_key_here
AI_MODEL=gemini-pro
```

### Bước 4: Chạy ứng dụng
```bash

npm start

npm run dev
```

### Bước 5: Kiểm tra
Mở trình duyệt và truy cập: `http://localhost:3000`

> **Lưu ý:** Database sẽ tự động được tạo tại `database/database.json` với dữ liệu mẫu khi chạy lần đầu.

---

## 📁 Cấu trúc dự án

```
project-management-ai/
│
├── backend/
│   ├── controllers/
│   │   ├── authController.js       # Xử lý đăng nhập/đăng ký
│   │   ├── projectController.js    # CRUD Project
│   │   ├── taskController.js       # CRUD Task
│   │   ├── memberController.js     # CRUD Member
│   │   ├── dashboardController.js  # Thống kê Dashboard
│   │   └── aiController.js         # Tích hợp AI
│   │
│   ├── models/
│   │   ├── User.js                 # Model User
│   │   ├── Project.js              # Model Project
│   │   └── Task.js                 # Model Task
│   │
│   ├── middleware/
│   │   ├── authMiddleware.js       # Kiểm tra đăng nhập
│   │   └── roleMiddleware.js       # Kiểm tra phân quyền
│   │
│   ├── services/
│   │   ├── aiService.js            # Service gọi API AI
│   │   └── projectService.js       # Tính toán tiến độ
│   │
│   └── routes/
│       └── index.js                # Định tuyến API
│
├── database/
│   └── database.json               # File dữ liệu (tự tạo khi chạy)
│
├── docs/                           # Tài liệu dự án
│   ├── BaoCao_Nhom11.docx
│   └── BaoCao_Nhom11.pptx
│
├── .env.example                    # Biến môi trường mẫu
├── server.js                       # Entry point
├── package.json
└── README.md                       # File này
```

---

## 🔑 Tài khoản demo

| Vai trò | Email | Password |
|---------|-------|----------|
| **ADMIN** (Quản trị viên) | admin@gmail.com | admin123 |
| **MEMBER** (Thành viên) | member@gmail.com | member123 |

---

## 📡 API Endpoints

### 🔐 Xác thực (Auth)

| Method | Endpoint | Mô tả | Body |
|--------|----------|-------|------|
| POST | `/api/auth/login` | Đăng nhập | `{ email, password }` |
| POST | `/api/auth/logout` | Đăng xuất | - |
| GET | `/api/auth/me` | Lấy thông tin user hiện tại | - |
| POST | `/api/auth/register` | Đăng ký tài khoản | `{ name, email, password, role? }` |

### 📊 Dashboard

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/dashboard/summary` | Thống kê tổng quan (projects, tasks, overdue...) |

### 📁 Projects

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/projects` | Lấy danh sách tất cả projects |
| POST | `/api/projects` | Tạo project mới |
| PUT | `/api/projects/:id` | Cập nhật thông tin project |
| DELETE | `/api/projects/:id` | Xóa project |
| POST | `/api/projects/:id/recalculate` | Tính lại tiến độ project |

### 📋 Tasks

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/tasks?projectId=1&status=TODO` | Lấy danh sách tasks (có filter) |
| POST | `/api/tasks` | Tạo task mới |
| PUT | `/api/tasks/:id` | Cập nhật task |
| DELETE | `/api/tasks/:id` | Xóa task |

### 👥 Members

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| GET | `/api/members` | Lấy danh sách thành viên |
| POST | `/api/members` | Tạo thành viên mới |
| PUT | `/api/members/:id` | Cập nhật thành viên |
| DELETE | `/api/members/:id` | Xóa thành viên |

### 🤖 AI

| Method | Endpoint | Mô tả |
|--------|----------|-------|
| POST | `/api/ai/ask` | Gửi câu hỏi đến AI (tóm tắt tiến độ) |

---

## 🤖 Tính năng AI

Hệ thống tích hợp AI để hỗ trợ công việc quản lý dự án.

### AI tóm tắt tiến độ
Gửi dữ liệu Project/Task lên AI, nhận về báo cáo tóm tắt:
- Đánh giá tiến độ tổng quan
- Các vấn đề đang tồn tại
- Rủi ro tiềm ẩn
- Đề xuất công việc cần ưu tiên

**Ví dụ yêu cầu:**
```json
POST /api/ai/ask
{
  "question": "Hãy tóm tắt tiến độ của dự án có ID = 1"
}
```

**Lưu ý:** Kết quả AI chỉ mang tính chất **hỗ trợ tham khảo**, người dùng cần kiểm tra trước khi áp dụng vào các quyết định quan trọng.

---

## ⚠️ Xử lý lỗi

Hệ thống có cơ chế xử lý lỗi cho các trường hợp:

| Tình huống | Phản hồi |
|------------|----------|
| Chưa đăng nhập | `401 Unauthorized` |
| Không có quyền | `403 Forbidden` |
| Email đã tồn tại | `400 Bad Request: Email đã tồn tại` |
| Không tìm thấy dữ liệu | `404 Not Found` |
| Xóa Admin cuối cùng | `400 Bad Request` |
| Lỗi AI API | Thông báo và cho phép thử lại |

---

## 📝 Lưu ý quan trọng

1. **Database JSON**: Dữ liệu được lưu tại `database/database.json`. Nếu muốn reset, chỉ cần xóa file này và chạy lại ứng dụng.

2. **Session**: Dùng express-session, thông tin đăng nhập được lưu trong session.

3. **AI API Key**: Cần cấu hình `AI_API_KEY` trong file `.env` để sử dụng tính năng AI.

4. **Bảo mật**: Không commit file `.env` lên GitHub, chỉ commit `.env.example`.

---

## 👥 Tác giả

| STT | Thành viên | MSSV | Vai trò |
|-----|-----------|------|---------|
| 1 | Lý Văn Hưng | # | Phân tích, thiết kế, phát triển Backend, AI integration, kiểm thử |
| 2 | Hoàng Minh Khánh | - | Tìm hiểu đề tài, phân tích bài toán, thiết kế CSDL, viết báo cáo |

**Giảng viên hướng dẫn:** Nguyễn Thị Tuyển

**Trường:** Đại học CNTT và Truyền thông - Khoa Công nghệ Thông tin

**Thái Nguyên, 2026**

---

## 📚 Tài liệu tham khảo

- [Báo cáo chi tiết](docs/BaoCao_Nhom11.docx)
- [Slide thuyết trình](docs/BaoCao_Nhom11.pptx)
- [Orange Data Mining](https://orangedatamining.com/)
- [Heart Disease Prediction](https://github.com/chayandatta/Heart_disease_prediction)

---

## 📜 License

Dự án được thực hiện cho mục đích học tập tại Trường Đại học CNTT và Truyền thông.

---

© 2026 - NHÓM 11 - Hệ thống quản lý dự án nhóm tích hợp AI