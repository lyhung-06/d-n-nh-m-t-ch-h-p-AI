
const A = require('../services/aiService');

exports.ask = async (q, s) => {
    try {
        const answer = await A.ask(q.body.question);

        s.json({
            answer
        });

    } catch (error) {
        console.error(error);

        s.status(500).json({
            answer: '❌ Lỗi khi xử lý yêu cầu AI.'
        });
    }
};

