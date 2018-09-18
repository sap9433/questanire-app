const express = require("express");
const path = require('path');
const compression = require('compression');
const session = require('express-session');
const bodyParser = require('body-parser');

const authApi = require('./serverMiddleware/authApiHandler.js');
const assesmentApi = require('./serverMiddleware/assesmentApiHandler.js');
const takeTestManager = require('./serverMiddleware/takeTestManager.js');

const redisStore =  require('connect-redis')(session);

const __DEVELOPMENT__ = process.env.__DEVELOPMENT__;

const app = express();

app.use(compression());

app.set("port", process.env.PORT || 8081);

app.use(session({
  secret: 'nugget123secretsession1',
  name: 'tmstmp',
  // create new redis store
  store: new redisStore({
    host:  __DEVELOPMENT__ ? '127.0.0.1' : 'prod-redis-fresh.buu8uw.0001.use2.cache.amazonaws.com',
    port: 6379
  }),
  resave: false,
  saveUninitialized: false
}));

// Since version 1.5.0, the cookie-parser middleware no longer needs to be used for this module to work
app.use(bodyParser.json());

// Express only serves static assets in production


const COLUMNS = [
  "carbohydrate_g",
  "protein_g",
  "fa_sat_g",
  "fa_mono_g",
  "fa_poly_g",
  "kcal",
  "description"
];

app.post('/api/signin', authApi.signinRoute);
app.post('/api/candidatelogin', authApi.candidateLogin);
app.get('/api/getauth', authApi.getAuth);
app.post('/api/register', authApi.registerRoute);

app.get('/api/logout', authApi.logout);

app.get('/api/getalltests', assesmentApi.getalltests);

// save new Test
app.post('/api/createtest/new', assesmentApi.postCreatetest);

// Get new Test
app.get('/api/gettest/:testid', assesmentApi.getATest);
app.get('/api/submissions/:testid', assesmentApi.getAllSubmissionsOfATest);

app.post('/api/answer/submit', assesmentApi.answerSubmitted);

app.get('/api/timer/:testid', takeTestManager.manageTimer);

//If he is opening Taketest page and a candidate . Create a mongo entry that test started.
app.get('/api/start-test/:testid', takeTestManager.testStarted);

app.post('/api/time-spent-event', takeTestManager.timeSpentEvent);
// We need to refactor this right now all unknows events are dumped here
app.post(['/api/drag-event','/api/section-words-event', '/api/keyword-event', '/api/first-typing-event', '/api/revision-event', '/api/analysis-event'], takeTestManager.dragEvent);
app.post('/api/card-timer-event', takeTestManager.cardTimerEvent);

app.get('/api/seeraw/:testid/:email/:eventtype', takeTestManager.getRawEvents);

app.use(express.static(path.join(__dirname, 'client', 'build')));

app.get('*', function (req, res) {
   res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
 });


app.listen(app.get("port"), () => {
  console.log(`Find the server at: http://localhost:${app.get("port")}/`); // eslint-disable-line no-console
});
