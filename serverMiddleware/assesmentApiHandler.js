const questions = require('./questions.js');
const fs = require('fs');
const _ = require('lodash');

exports.getATest = function (req, res) {
  return res.json(questions);
}

getScore = function(req) {
	req.body.map((ans, ind) => {
		console.log(JSON.stringify(ans));
	})
	
}

exports.answerSubmitted = function (req, res) {
  if( !req.session.user ){
    return res.json({error: true, message: 'You dont have permission to take the test'});
  }
  getScore(req);

  fs.appendFile("./leaderboar.txt", 
  	`${req.session.user.name} | ${req.session.user.user_email} | ${new Date()} |  \n`, 
  	function(err) {
    if(err) {
        return console.log(err);
    }
    return res.json({msg: `${req.session.user.name} Your response is successfully saved`});
  }); 
  
}

