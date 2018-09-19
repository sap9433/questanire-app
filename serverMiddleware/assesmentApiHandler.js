const questions = require('./questions.js')['questions'];
const fs = require('fs');
const _ = require('lodash');

exports.getATest = function (req, res) {
  return res.json(questions);
}

getScore = function(req) {
  const questionCount = req.body.length;
  let marks = 0;

	req.body.map((ans, ind) => {
	    const isMatch = _.find(questions, {text: ans.text, ans: [ans.ans]});
        marks += isMatch ? (1.0/questionCount) : 0;
	})
	return marks;
}

exports.answerSubmitted = function (req, res) {
  if( !req.session.user ){
    return res.json({error: true, message: 'You dont have permission to take the test'});
  }
  const marks = getScore(req);

  fs.appendFile("./leaderboar.txt", 
  	`${req.session.user.name} | ${req.session.user.user_email} | ${new Date()} |  ${marks} \n`, 
  	function(err) {
    if(err) {
        return console.log(err);
    }
    return res.json({msg: `${req.session.user.name} Your response is successfully saved`});
  }); 
  
}

