const questions = require('./questions.js')['questions'];
const fs = require('fs');
const _ = require('lodash');

exports.getATest = function (req, res) {
  return res.json(questions);
}

getScore = function(req) {
  const questionCount = req.body.ans.length;
  const time = req.body.time;
  let marks = 0;

	req.body.ans.map((ans, ind) => {
	    const isMatch = _.find(questions, {text: ans.text, ans: [ans.ans]});
        marks += isMatch ? (1.0/questionCount) : 0;
	})
	return [marks.toFixed(2), time ,(marks * 1000 - req.body.time).toFixed(2)];
}

exports.answerSubmitted = function (req, res) {
  if( !req.session.user ){
    return res.json({error: true, message: 'You dont have permission to take the test'});
  }
  const marks = getScore(req);

  fs.appendFile("./leaderboar.txt", 
  	`${req.session.user.name}|${req.session.user.user_email}|${new Date()}|${marks[0]}|${marks[1]}|${marks[2]}\n`, 
  	function(err) {
    if(err) {
        return res.json({error: true});
    }
    return res.json({msg: true});
  }); 
}

exports.getLeaderBoard = function (req, res) {
  fs.readFile('./leaderboar.txt', 'utf8', function(err, contents) {
    let allUser = contents.split('\n');
    allUser.splice(-1,1);
    return res.json({msg: allUser});
  });
}

exports.getDownload = function (req, res) {
  const file = './leaderboar.txt';
  return res.download(file); // Set disposition and send it.
}

exports.deleteboard = function (req, res) {
  const newName = new Date().toISOString();
  fs.rename('./leaderboar.txt', `./leaderboar_${newName}.txt`, function(err) {
    if ( err ){
      return res.json({msg: 'Cant refresh file'});
    } else{
       fs.closeSync(fs.openSync('./leaderboar.txt', 'w'));
       return res.json({msg: 'File successfully deleted'});
    }
  });
}


