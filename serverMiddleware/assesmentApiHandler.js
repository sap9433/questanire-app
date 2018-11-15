const questions = require('./questions.js')['questions'];
const fs = require('fs');
const _ = require('lodash');

exports.getATest = function (req, res) {
  const testId = req.params.testid;
  const user = req.session.user;
  if( !user ){
    return res.json([{ text: 'You need to log in to see this page'}]);
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
  // First val is time/qstn . Which is better if small . 2nd val is marks out of 100
	return [(time/questionCount).toFixed(2), marks.toFixed(2)];
}

exports.answerSubmitted = function (req, res) {
  const user = req.session.user;
  if( !user || user.account_type !== 2 ){
    return res.json({error: true, message: 'You dont have permission to taketest'});
  }
  const marks = getScore(req);

  fs.appendFile("./leaderboar.txt", 
  	`${user.name}|${user.user_email}|${new Date()}|${marks[0]}|${marks[1]}|${user.company}|${user.phone}|${user.investorname}|${user.fundamount}|${user.nextfunding}|${user.nextfundingdate}|${user.capsolution}\n`, 
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
    let leaderboard = allUser.map((row) => {
      row = row.split('|');
      return {
        data: row, 
        val: -1 * parseFloat(row.slice(-9,-8)[0]), //Actual marks out of 100. Want descending order hence -ve
        time: parseFloat(row.slice(-8, -7)[0]) // This is time taken per qstn
      };
    });
    leaderboard = _.sortBy(leaderboard, ['val', 'time']);
    return res.json({msg: _.slice(leaderboard, 0, 10)});
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
  fs.rename('./leaderboar.txt', `./leaderboar_${newName}.csv`, function(err) {
    if ( err ){
      return res.json({msg: 'Cant refresh file'});
    } else{
       fs.closeSync(fs.openSync('./leaderboar.txt', 'w'));
       return res.download(`./leaderboar_${newName}.csv`);
    }
  });
}


