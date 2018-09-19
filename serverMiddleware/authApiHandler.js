const __DEVELOPMENT__ = process.env.__DEVELOPMENT__;

exports.signinRoute = function(req, res) {
    const errorMsg = {
        error: 'true',
        message: 'Login failed! That email/password does not match our records.'
    };

    if(req.body.password === 'certent' && req.body.user_email === 'certent@certent.com'){
      const user = {
            name: 'Certent',
            user_id: 1,
            account_type: 1,
            user_email: 'certent@certent.com'
      };
      req.session.user = user;
      res.json(user);
    } else {
      res.json(errorMsg);
    }
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
        req.session.destroy(function() {
            res.redirect('/');
        });
    } else {
        res.redirect('/');
    }
}