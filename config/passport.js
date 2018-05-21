var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id, (err, user) => {
            done(err, user);
        });
    });



    passport.use('newRegister', new LocalStrategy({
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true
    },
    (req, email, password, done) => {
        process.nextTick(() => {
        User.findOne({ 'email' :  email }, (err, user) => {
            if (err)
                return done(err);
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } else {
                var newUser = new User();
                newUser.username = req.body.username;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.phone = req.body.phone;
                newUser.save((err) => {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        });    

        });

    }));
     passport.use('login', new LocalStrategy({
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true 
        },
        (req, email, password, done) => {
            User.findOne({ 'email' :  email }, (err, user) => {
                if (err)
                    return done(err);
                if (!user)
                    return done(null, false, req.flash('loginMessage', 'No user found.'));
                if (!user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.')); 
                return done(null, user);
            });

        }));
};