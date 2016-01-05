'use strict';

var path = process.cwd();
var ClickHandler = require(path + '/app/controllers/clickHandler.server.js');
var Poll = require("../models/poll.js");
var ObjectId = require('mongoose').Types.ObjectId;

module.exports = function(app, passport) {

	function isLoggedIn(req, res, next) {
		if (req.isAuthenticated()) {
			return next();
		}
		else {
			res.redirect('/login');
		}
	}

	var clickHandler = new ClickHandler();

	app.route('/')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/index.html');
		});

	app.route('/login')
		.get(function(req, res) {
			res.render('login');
			//res.sendFile(path + '/public/login.html');
		});

	app.route('/logout')
		.get(function(req, res) {
			req.logout();
			res.redirect('/login');
		});

	app.route('/profile')
		.get(isLoggedIn, function(req, res) {
			res.sendFile(path + '/public/profile.html');
		});

	app.route('/dashboard')
		.get(isLoggedIn, function(req, res) {
			res.render('dashboard');
		});

	app.route('/addPoll')
		.post(isLoggedIn, function(req, res) {
			var poll = new Poll();
			var votes = req.body.options.map(function() {
				return 0;
			});
			poll.username = req.user.github.username;
			poll.votes = votes;
			poll.question = req.body.question;
			poll.options = req.body.options;
			poll.save(function(err) {
				if (err) {
					res.render('error');
				}
				else {
					res.redirect('polls');
				}
			});
		});

	app.route('/polls')
		.get(isLoggedIn, function(req, res) {
			Poll.
			find({
				username: req.user.github.username
			}).exec(function(err, polls) {
				if (err) {
					res.render('error');
				}
				else {
					//console.log("Polls", polls);
					res.render('polls', {'polls': polls});
				}
			});
		});

	app.route('/api/:id')
		.get(isLoggedIn, function(req, res) {
			res.json(req.user.github);
		});
	
	app.route('/deletePoll/:id')
		.get(isLoggedIn, function(req, res) {
			//console.log(req.params.id);
			Poll.findByIdAndRemove(req.params.id, function(err){
				if(err){
					res.redirect('/polls');
				}else{
					res.redirect('/polls');
				}	
			});
		});	

	app.route('/auth/github')
		.get(passport.authenticate('github'));

	app.route('/auth/github/callback')
		.get(passport.authenticate('github', {
			successRedirect: '/dashboard',
			failureRedirect: '/login'
		}));

	app.route('/api/:id/clicks')
		.get(isLoggedIn, clickHandler.getClicks)
		.post(isLoggedIn, clickHandler.addClick)
		.delete(isLoggedIn, clickHandler.resetClicks);
};
