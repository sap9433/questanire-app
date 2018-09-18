const questions = require('./questions.js');

exports.getATest = function (req, res) {
  res.json(questions);
}

exports.answerSubmitted = function (req, res) {
  if( !req.session.user || req.session.user.account_type !== 1 ){
    res.json({error: true, message: 'You dont have permission to Create a New Test'});
  }
  res.json({hi: 'hi'})
}

