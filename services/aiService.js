const { GoogleGenAI } = require('@google/genai');

const Project = require('../models/Project');
const Task = require('../models/Task');
const User = require('../models/User');

const apiKey = process.env.GEMINI_API_KEY;
const modelName = process.env.GEMINI_MODEL || 'gemini-3.7-flash';

const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

exports.ask = async (question) => {
    try {
        const projects = Project.all();
        const tasks = Task.all();
        const users = User.all();

        const openTasks = tasks.filter(
            task => task.status !== 'DONE'
        );

        const lateTasks = openTasks.filter(
            task =>
                task.deadline &&
                new Date(task.deadline) < new Date()
        );

        const highPriorityTasks = openTasks.filter(
            task => task.priority === 'HIGH'
        );

        const completedTasks = tasks.filter(
            task => task.status === 'DONE'
        );

        const userMap = {};
        users.forEach(user => {
            userMap[user.id] = user.name;
        });

        const projectData = {
            statistics: {
                totalProjects: projects.length,
                totalTasks: tasks.length,
                totalUsers: users.length,
                openTasks: openTasks.length,
                completedTasks: completedTasks.length,
                lateTasks: lateTasks.length,
                highPriorityTasks: highPriorityTasks.length
            },

            tasks: tasks.map(task => ({
                id: task.id,
                title: task.title,
                status: task.status,
                priority: task.priority,
                deadline: task.deadline,
                assigneeId: task.assigneeId,
                assigneeName: userMap[task.assigneeId] || 'Chưa phân công'
            })),

            projects: projects.map(project => ({
                id: project.id,
                name: project.name,
                description: project.description,
                status: project.status
            })),

            users: users.map(user => ({
                id: user.id,
                name: user.name
            }))
        };

        if (!ai) {
            return fallbackAnalysis(projectData);
        }

        const systemPrompt = `
Bạn là AI Assistant hỗ trợ quản lý dự án nhóm.

Chỉ sử dụng dữ liệu được cung cấp.
Không được tự bịa dữ liệu.
Nếu dữ liệu không đủ, phải nói rõ.
Không được tự ý thay đổi dữ liệu hệ thống.
Chỉ phân tích và đưa ra đề xuất.
Trả lời bằng tiếng Việt, rõ ràng và ngắn gọn.
        `;

        const userPrompt = `
Câu hỏi của người dùng:
${question || 'Hãy phân tích tổng quan tình hình dự án hiện tại.'}

Dữ liệu hệ thống:
${JSON.stringify(projectData, null, 2)}

Hãy trả lời câu hỏi dựa trên dữ liệu trên.

Nếu là câu hỏi tổng quan, hãy trình bày:
1. Tình trạng hiện tại
2. Vấn đề cần chú ý
3. Đề xuất xử lý

Nếu là câu hỏi cụ thể, trả lời trực tiếp và không đưa thêm thông tin không cần thiết.
        `;

        const response = await ai.models.generateContent({
            model: modelName,
            contents: userPrompt,
            config: {
                systemInstruction: systemPrompt,
                temperature: 0.3
            }
        });

        return response.text || fallbackAnalysis(projectData);

    } catch (error) {
        console.error('Gemini AI Error:', error);

        try {
            const projects = Project.all();
            const tasks = Task.all();
            const users = User.all();

            const openTasks = tasks.filter(
                task => task.status !== 'DONE'
            );

            const lateTasks = openTasks.filter(
                task =>
                    task.deadline &&
                    new Date(task.deadline) < new Date()
            );

            const highPriorityTasks = openTasks.filter(
                task => task.priority === 'HIGH'
            );

            const data = {
                totalProjects: projects.length,
                totalTasks: tasks.length,
                totalUsers: users.length,
                openTasks: openTasks.length,
                completedTasks: tasks.filter(
                    task => task.status === 'DONE'
                ).length,
                lateTasks: lateTasks.length,
                highPriorityTasks: highPriorityTasks.length
            };

            return fallbackAnalysis({
                statistics: data
            });

        } catch (fallbackError) {
            return 'Không thể phân tích dữ liệu dự án.';
        }
    }
};

function fallbackAnalysis(data) {
    const stats = data.statistics;

    return `
🤖 AI ASSISTANT

Gemini AI hiện không khả dụng.
Hệ thống sử dụng phân tích cơ bản.

📊 Tổng quan:
- Dự án: ${stats.totalProjects}
- Nhiệm vụ: ${stats.totalTasks}
- Thành viên: ${stats.totalUsers}
- Chưa hoàn thành: ${stats.openTasks}
- Đã hoàn thành: ${stats.completedTasks}
- Quá hạn: ${stats.lateTasks}
- Ưu tiên cao: ${stats.highPriorityTasks}
    `.trim();
}