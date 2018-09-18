const mysql = require('mysql');
const async = require('async');
const bcrypt = require('bcrypt');
const __DEVELOPMENT__ = process.env.__DEVELOPMENT__;

const pool = mysql.createPool({
  connectionLimit: 100,
  host: __DEVELOPMENT__ ? 'localhost' : 'aa1l0pm8z8qihld.c8rc790xmppq.us-east-2.rds.amazonaws.com',
  user: 'sapy',
  password: __DEVELOPMENT__ ? '' : 'nugget123secretmysql',
  database: 'nugget_db',
  debug: __DEVELOPMENT__ ? false : false
});

const passwordHash = (req) => new Promise((resolve, reject) => {
  if (typeof(req.body.password) === 'undefined') {
    reject('No password provided');
  }
  bcrypt.hash(req.body.password, 10, function (err, hash) { // 10 is salt round
    resolve(hash);
  });
});

const createDBconnection = function(callback) {
  pool.getConnection(function (err, connection) {
    if (err) {
      // if there is error, stop right away.
      // This will stop the async code execution and goes to last function.
      callback(true);
    } else {
      callback(null, connection);
    }
  });
}


const handle_database = function(req, type, callback, params) {
  async.waterfall([
      createDBconnection,
      function (connection, callback) {
        let SQLquery;
            const myqeury = "SELECT user_name as name, user_id, account_type, user_email, user_password from allusers WHERE user_email='" + connection.escape(req.body.email) + "'";
            console.log(myqeury)
        switch (type) {
          case 'login':
            SQLquery = "SELECT user_name as name, user_id, account_type, user_email, user_password from allusers WHERE user_email=" + connection.escape(req.body.email) + "";
            console.log(SQLquery)
            break;
          case 'checkEmail':
            SQLquery = "SELECT * from allusers WHERE user_email=" + connection.escape(req.body.email) + "";
            break;
          case 'register':
            SQLquery = "INSERT into allusers(user_email,user_password,user_name, account_type) VALUES (" + connection.escape(req.body.email) + "," + connection.escape(params.passhash) + "," + connection.escape(req.body.name) + "," + connection.escape(req.body.accounttype) + ")";
            break;
          case 'addStatus':
            SQLquery = 'INSERT into user_status(user_id,user_status) VALUES (' + connection.escape(req.session.key.user_id) + "," + connection.escape(req.body.status) + ")";
            break;
          case 'getStatus':
            SQLquery = 'SELECT * FROM user_status WHERE user_id=' + connection.escape(req.session.key.user_id);
            break;
          default:
            break;
        }
        callback(null, connection, SQLquery);
      },
      function (connection, SQLquery, callback) {
        connection.query(SQLquery, function (err, rows) {
          connection.release();
          if (!err) {
            if (type === 'login') {
              callback(rows.length === 0 ? false : rows[0]);
            } else if (type === 'getStatus') {
              callback(rows.length === 0 ? false : rows);
            } else if (type === 'checkEmail') {
              callback(rows.length === 0 ? false : true);
            } else {
              callback(false);
            }
          } else {
            // if there is error, stop right away.
            // This will stop the async code execution and goes to last function.
            callback(true);
          }
        });
      }
    ],
    function (result) {
      // This function gets call after every async task finished.
      if (typeof(result) === 'boolean' && result === true) {
        callback(null);
      } else {
        callback(result);
      }
    });
}

exports.registerRoute = function(req, res) {
  passwordHash(req).then(passhash => handle_database(req, 'checkEmail', function (response) {
      if (response === null) {
        res.json({ error: true, message: 'This email already exists!' });
      } else {
        handle_database(req, 'register', function (response) {
          if (response === null) {
            res.json({ error: true, message: 'Error while adding user.' });
          } else {
            res.json({ error: false, message: 'Registered successfully.', regSuccess: true });
          }
        }, { passhash });
      }
  }));
}

exports.signinRoute = function(req, res) {
  const errorMsg = {
    error: 'true',
    message: 'Login failed! That email/password does not match our records.'
  };
  handle_database(req, 'login', function (response) {
    if (response === null) {
      res.json({ error: 'true', message: 'Database error occured' });
    } else if (!response) {
        res.json(errorMsg);
      } else {
        bcrypt.compare(req.body.password, response.user_password, function (err, result) {
          if (result) {
            delete response.user_password; 
            req.session.user = response;
            res.json(response);
          } else {
            res.json(errorMsg);
          }
        });
      }
  });
}

exports.candidateLogin = function(req, res) {
  if (!req.body.email) {
    res.json({ error: 'true', message: 'Email Not provided' });
  } else {
    req.session.user = {
      name: req.body.name, 
      user_id: -1, 
      account_type: 2,
      user_email: req.body.email
    };
    res.json(req.session.user);
  }
}

exports.getAuth = function(req, res) {
  res.json(req.session.user || { error: 'true', message: 'Not in session' });
}

exports.logout = function(req, res) {
  if (req.session.user) {
    req.session.destroy(function () {
      res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
}
