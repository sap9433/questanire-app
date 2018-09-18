const DB = require('./MongoConnect').DB;

const ObjectId = require('mongodb').ObjectID;

exports.getalltests = function (req, res) {
  DB.then((database) => {
    const collection = database.collection('assements');
    collection.find().toArray(function (err, list) {
      res.json(list);
    });
  });
}

exports.getATest = function (req, res) {
  DB.then((database) => {
    const collection = database.collection('assements');
    collection.findOne({ _id: ObjectId(req.params.testid) }, function (err, list) {
      res.json(list);
    });
  }).catch(err => {
    res.json({ success: false, error: err.message});
  });
}

exports.postCreatetest = function (req, res) {
  // if( !req.session.user || req.session.user.account_type !== 1 ){
  //   res.json({error: true, message: 'You dont have permission to Create a New Test'});
  // }
 
  DB.then((database) => {
    const collection = database.collection('assements');
    const details = req.body;

    // Insert New record
    if (!details.testid) {
      let dataToSave = { details, createdBy: (req.session.user || {}).user_id };
      if (typeof(collection.length) === 'undefined') {
        dataToSave = [dataToSave];
      }
      collection.insert(dataToSave, function (error, docs) {
        if (docs.result.ok) {
          res.json({ testId: docs.insertedIds['0'], success: true });
        } else {
          res.json({ success: false, error: error.message });
        }
      });
    } else {
      const dataToUpdate = {};
      if (details.cards) {
        dataToUpdate['details.cards'] = details.cards;
      }
      if (details.testName) {
        dataToUpdate['details.testName'] = details.testName;
      }
      if (details.testDesc) {
        dataToUpdate['details.testDesc'] = details.testDesc;
      }
      collection.updateOne({ _id: ObjectId(details.testid) }, { $set: dataToUpdate }, function (error, docs) {
        if (error) {
          res.json({ success: false, error: error.message });
        }
        res.json(docs);
        // if(docs.result.ok){
        //   res.json({testId: docs.insertedIds['0'], success: true});
        // } else{
        //   res.json({success: false, error});
        // }
      });
    }
  }).catch(err => {
    res.json({ success: false, error: err.message });
  });
}


exports.getAllSubmissionsOfATest = function(req, res) {
  const testId = req.params.testid;
  const searchCond = {
    'details.assementId': testId
  };
  DB.then((database) => {
    const collection = database.collection('answersubmissions');
    collection.find(searchCond).toArray(function (err, list) {
      res.json(list);
    });
  }).catch(err => {
    res.json({ success: false, error: err.message });
  });
}


exports.answerSubmitted = function (req, res) {
  // if( !req.session.user || req.session.user.account_type !== 1 ){
  //   res.json({error: true, message: 'You dont have permission to Create a New Test'});
  // }
  DB.then((database) => {
    const collection = database.collection('answersubmissions');
    let dataToSave = {
      details: req.body, 
      takenById: (req.session.user || { user_id: 'Unknown' }).user_id,
      takenByName: (req.session.user || { name: 'No Session' }).name,
      takenByEmail: (req.session.user_email || { user_email: 'no@ses.on' }).user_email,
      submittedAt: new Date()
    };
    if (typeof(collection.length) === 'undefined') dataToSave = [dataToSave];

    collection.insert(dataToSave, function (error, docs) {
      res.json(docs);
    });
  }).catch(err => {
    res.json({ success: false, error: err.message});
  });
}

