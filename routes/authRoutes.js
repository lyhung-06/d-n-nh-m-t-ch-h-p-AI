const r=require('express').Router(),c=require('../controllers/authController');r.post('/login',c.login);r.post('/logout',c.logout);r.post('/register',c.register);r.get('/me',c.me);module.exports=r;
