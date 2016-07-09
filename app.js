var express = require('express'); // Express web server framework
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser());
var nodemailer = require('nodemailer');
var mg = require('nodemailer-mailgun-transport');
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.post('/sendMail', function(req,res){
	var email = req.body.email;
	console.log(email);
	var name = req.body.name;
	var subject = req.body.subject;
	var body = req.body.body;

  	var auth = {
	  auth: {
	    api_key: 'key-5b1126290989e120ab44ce2dfba7a1a2',
	    domain: 'sandbox3040a36c46a447d7a5a7fc808b46256f.mailgun.org'
	  }
	}

	var nodemailerMailgun = nodemailer.createTransport(mg(auth));

	nodemailerMailgun.sendMail({
	  from: name +" <"+email+">",
	  to: "sue.weisberger@gmail.com", // An array if you have multiple recipients.
	  subject: subject,
	  text: body,
	}, function (err, info) {
	  if (err) {
	  	console.log(err);
	    res.send(400);
	  }
	  else {
	    res.redirect("index.html");
	  }
	});

});

app.set('port', (process.env.PORT || 8888));
app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});

// curl -s --user 'api:key-5b1126290989e120ab44ce2dba7a1a2'    
//  https://api.mailgun.net/v3/sandbox3040a36c46a447d7a5a7fc808b46256f.mailgun.org/messages     
//  -F from='Mailgun Sandbox <postmaster@sandbox3040a36c46a447d7a5a7fc808b46256f.mailgun.org>'     
//  -F to='Lee Weisberger <lweisberger5@gmail.com>'     -F subject='Hello Lee Weisberger'     
//  -F text='Congratulations Lee Weisberger, you just sent an email with Mailgun!  You are truly awesome!'
