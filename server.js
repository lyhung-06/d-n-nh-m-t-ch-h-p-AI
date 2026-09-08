require('dotenv').config();
const express = require('express');
const session = require('express-session');
const path = require('path');
const database = require('./config/database');

const app = express();
const PORT = process.env.PORT || 3000;

// Khởi tạo database JSON demo khi server chạy lần đầu.
database.read();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(session({
  secret: process.env.SESSION_SECRET || 'project-manager-ai-demo-secret',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 24 * 60 * 60 * 1000 }
}));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/projects', require('./routes/projectRoutes'));
app.use('/api/tasks', require('./routes/taskRoutes'));
app.use('/api/members', require('./routes/memberRoutes'));
app.use('/api/ai', require('./routes/aiRoutes'));
app.use('/api/dashboard', require('./routes/dashboardRoutes'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.use((req, res) => {
  res.status(404).json({ message: 'Không tìm thấy tài nguyên.' });
});

app.listen(PORT, () => {
  console.log(`Project Manager AI đang chạy tại http://localhost:${PORT}`);
});
