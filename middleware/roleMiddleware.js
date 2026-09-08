exports.requireRole=(...roles)=>(req,res,next)=>roles.includes(req.session.user?.role)?next():res.status(403).json({message:'Bạn không có quyền.'});
