const express = require("express");
const path = require('path');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');

const authApi = require('./serverMiddleware/authApiHandler.js');
const assesmentApi = require('./serverMiddleware/assesmentApiHandler.js');
const takeTestManager = require('./serverMiddleware/takeTestManager.js');


const __DEVELOPMENT__ = process.env.__DEVELOPMENT__;

const app = express();

app.use(compression());

app.set("port", process.env.PORT || 8081);

app.use(session({
  secret: 'nugget123secretsession1',
  name: 'tmstmp',
  resave: false,
  saveUninitialized: false
}));

// Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work
app.use(bodyParser.json());

// Express only serves static assets in production


app.post('/api/signin', authApi.signinRoute);
app.post('/api/candidatelogin', authApi.candidateLogin);
app.get('/api/getauth', authApi.getAuth);
app.get('/api/logout', authApi.logout);
app.get('/api/gettest/:testid', assesmentApi.getATest);
app.post('/api/answer/submit', assesmentApi.answerSubmitted);

app.use(express.static(path.join(__dirname, 'client', 'build')));
app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
 });


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
