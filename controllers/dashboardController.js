const P=require('../models/Project'),T=require('../models/Task'),U=require('../models/User');

function isOverdue(t){
  return t.status !== 'DONE' && t.deadline && new Date(t.deadline + 'T23:59:59') < new Date();
}

exports.summary=(q,s)=>{
  const p=P.all(), t=T.all(), members=U.all();
  const overdueTasks=t.filter(isOverdue).map(x=>({
    ...x,
    project:P.find(x.projectId),
    assignee:U.find(x.assigneeId)
  })).sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));

  s.json({
    stats:{
      projects:p.length,
      tasks:t.length,
      done:t.filter(x=>x.status==='DONE').length,
      overdue:overdueTasks.length,
      members:members.length,
      progress:p.length?Math.round(p.reduce((a,x)=>a+x.progress,0)/p.length):0
    },
    overdueTasks,
    projects:p,
    tasks:t,
    members
  });
};
