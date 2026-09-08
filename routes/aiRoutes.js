const r=require('express').Router(),c=require('../controllers/aiController'),{requireAuth}=require('../middleware/authMiddleware');r.use(requireAuth);r.post('/ask',c.ask);module.exports=r;
