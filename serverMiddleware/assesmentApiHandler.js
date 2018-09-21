const questions = require('./questions.js')['questions'];
const fs = require('fs');
const _ = require('lodash');

exports.getATest = function (req, res) {
  const testId = req.params.testid;
  const user = req.session.user;
  if( !user || user.account_type !== 2 ){
    return res.json([{ text: 'You need to log in as test taker to see this page'}]);
  }
  return res.json(_.take(_.shuffle(questions), testId));
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
  const user = req.session.user;
  if( !user || user.account_type !== 2 ){
    return res.json({error: true, message: 'You dont have permission to taketest'});
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
  const user = req.session.user;
  if( !user || user.account_type !== 1 ){
    return res.json({error: true, message: 'You dont have permission to fetch leader board'});
  }
  fs.readFile('./leaderboar.txt', 'utf8', function(err, contents) {
    let allUser = contents.split('\n');
    allUser.splice(-1,1);
    return res.json({msg: allUser});
  });
}

exports.getDownload = function (req, res) {
  const user = req.session.user;
  if( !user || user.account_type !== 1 ){
    return res.json({error: true, message: 'You dont have permission to download'});
  }
  const file = './leaderboar.txt';
  return res.download(file); // Set disposition and send it.
}

exports.deleteboard = function (req, res) {
  const user = req.session.user;
  if( !user || user.account_type !== 1 ){
    return res.json({error: true, message: 'You dont have permission to delete'});
  }
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


