exports.requireAuth=(req,res,next)=>req.session.user?next():res.status(401).json({message:'Bạn chưa đăng nhập.'});
