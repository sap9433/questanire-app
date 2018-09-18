const moment = require('moment');

const basicChecks = function(req, res){
  const user = req.session.user;
  if(!user){
    return res.json({ error: 'Event posted though no session exists'});
  }
  if(user.account_type === 1){
    return res.json({ error: 'Event posted though employer is looking at page'});
  }
  if(!user.user_email){
    return res.json({ error: 'No user email is in the session'});
  }
  if(!req.session.activetest){
    return res.json({ error: 'Event posted though no activeTest exixts in DB'});
  }
  return false;
}

exports.testStarted = function (req, res, next) {
    res.json({hi: "hi"})
}
