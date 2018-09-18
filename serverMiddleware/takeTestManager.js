const moment = require('moment');
const DB = require('./MongoConnect').DB;
const ObjectId = require('mongodb').ObjectID;

//Collection Names 
const testtaken = 'testtaken';
const dragData = 'eventDetailsdragEvent';
const timeSpentStore = 'timeSpentStore';
const cardTimeStore = 'cardTimeStore';


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
    const testid = req.params.testid;
    const activeTest = req.session.activetest; // This is ***not*** testid , but id of the testtaken collection
    if(!req.session.user || !testid){
      return res.json({ error: `No session or test to track your progress, try nuggetai.com/enter/${testid}` });
    }
    //If a test is already active or If employer is at take test page, then dont create take test DB entry
    if( activeTest || req.session.user.account_type === 1){
      return res.json({ success: 'Employer login or test already active ${activeTest}, ${req.session.user.user_email}' });
    }
    DB.then((database) => {
    const collection = database.collection(testtaken);
    const name = req.session.user.name;
    const user_email = req.session.user.user_email;
    // Not sure how this scenario will occur . Just trying to play safe here.
    if(!name || !user_email){
      return res.json({ error: `No name or user details in session. How you reached here ?` });
    }

    // Check if candidate alraedy took the test once . Prohibit him from retaking
    collection.findOne({testid: testid, takenByEmail: user_email}, function (err, list) {
      //Active test for same testid, user, and name found
        const data = list;
      if (data && data.inprogress) {
        const runningTime = moment.duration(moment(new Date()).diff(data.startedAt)).humanize();
        req.session.activetest = data._id.toString();
        return res.json({ success: 'Already started , inprogress test exists' });
      } else {
        let dataToSave = {
          testid: testid,
          takenByName: name,
          takenByEmail: user_email,
          startedAt: new Date(),
          inprogress: true
        };
        if (typeof(collection.length) === 'undefined') dataToSave = [dataToSave];

        collection.insert(dataToSave, function (error, docs) {
            if (docs && docs.insertedCount) {
              req.session.activetest = docs.insertedIds['0'].toString();
              return res.json({ success: 'Started new test' });
            } else {
              return res.json({ error: `Couldn't start test . Refresh the page` });
            }
          });
        }
    });

  }).catch(err => {
    return res.json({ success: false, error: err.message});
  });
}

exports.manageTimer = function(req, res) {
  if (typeof req.session.user === 'undefined') {
    return res.json({ error: 'Trying to get time when no user is in session' });
  }
  const testid = req.params.testid;
  const user_email = req.session.user.user_email;
  const searchCond = {
    testid: testid,
    takenByEmail: user_email,
    inprogress: true
  }; 

  DB.then((database) => {
    const collection = database.collection(testtaken);

    collection.findOne(searchCond, function (err, list) {
      if (list) {
        return res.json({ startedAt: list.startedAt, currentTime: new Date() });
      } else {
        return res.json({ error: `No timer for ${user_email} , ${testid}` });
      }
    });
  }).catch(err => {
    return res.json({ success: false, error: err.message });
  });
}

exports.timeSpentEvent = function(req, res) {
  if(basicChecks(req, res)){
      return false;
  }
  let details = req.body.param;
  if(typeof details === 'undefined' || !Object.keys(details).length ){
    return res.json({ error: 'Chris .. Dont send empty objects please.. ' });
  }
  const activeTest = req.session.activetest;
  DB.then((database) => {
    const collection = database.collection(`${timeSpentStore}${activeTest}`);
    if (typeof(collection.length) === 'undefined') {
        details = [details];
    }
    collection.insert(details, function (error, docs) {
        if (docs && docs.result.ok) {
          return res.json(docs);
        } else {
          return res.json({ success: false, error: error.message });
        }
    });
  }).catch(err => {
    return res.json({ success: false, error: err.message });
  });
}

exports.dragEvent = function(req, res) {
  if(basicChecks(req, res)){
      return false;
  }
  const activeTest = req.session.activetest;
  let details = req.body.param;
  if(typeof details === 'undefined'){
    return res.json({ error: 'Chris .. Dont send empty objects please.. ' });
  }
  DB.then((database) => {
    const collection = database.collection(`${dragData}${activeTest}`);
    if (typeof(collection.length) === 'undefined') {
        details = [details];
    }
    collection.insert(details, function (error, docs) {
        if (docs && docs.result.ok) {
          return res.json(docs);
        } else {
          return res.json({ success: false, error: error.message });
        }
    });
  }).catch(err => {
    return res.json({ success: false, error: err.message });
  });
}

exports.cardTimerEvent = function(req, res) {
  if(basicChecks(req, res)){
      return false;
  }
  let details = req.body.param;
  if(typeof details === 'undefined'){
    return res.json({ error: 'Chris .. Dont send empty objects please.. ' });
  }
  const activeTest = req.session.activetest;
  DB.then((database) => {
    const collection = database.collection(`${cardTimeStore}${activeTest}`);
    if (typeof(collection.length) === 'undefined') {
        details = [details];
    }
    collection.insert(details, function (error, docs) {
        if (docs && docs.result.ok) {
          return res.json(docs);
        } else {
          return res.json({ success: false, error: error.message });
        }
    });
  }).catch(err => {
    return res.json({ success: false, error: err.message });
  });
}

exports.getRawEvents = function(req, res) {
  const testid = req.params.testid;
  const email = req.params.email;
  const eventtype = req.params.eventtype;
  const user = req.session.user;

  if(!user || user.account_type !== 1){
    return res.json({ error: 'Access denied. '});
  }

  DB.then((database) => {
    const collection = database.collection(testtaken);
    collection.findOne({ testid: testid, takenByEmail: email }, function (err, result) {
      const data = result;
      if(typeof data != 'undefined' && data){
        const collectionName = `${eval(eventtype)}${data._id.toString()}`;
        const eventStore = database.collection(collectionName);
        eventStore.find().toArray(function (err, list) {
          return res.json(list);
        });
      } else {
        return res.json({error: 'Assesment start details does not exist'});
      }
    });
  }).catch(err => {
    return res.json({ success: false, error: err.message });
  });
}