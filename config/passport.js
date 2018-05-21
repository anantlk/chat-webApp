var LocalStrategy = require('passport-local').Strategy;
var User = require('../models/users');

module.exports = (passport) => {
    passport.serializeUser((user, done) => {
        done(null, user.id);
    });
    passport.deserializeUser((id, done) => {
        User.findById(id).exec()
        .then((err,user) => {
            done(err, user);
        })
        .catch(done);
    });



    passport.use('newRegister', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    },
    (req, email, password, done) => {
        process.nextTick(() => {

        // find a user whose email is the same as the forms email
        // we are checking to see if the user trying to login already exists
        User.findOne({ 'email' :  email }).exec().
        .then((user) => {
            // check to see if theres already a user with that email
            if (user) {
                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));
            } 
            else {

                // if there is no user with that email
                // create the user
                var newUser = new User();

                // set the user's local credentials
                newUser.username = req.body.username;
                newUser.email = email;
                newUser.password = newUser.generateHash(password);
                newUser.phone = req.body.phone;
                // save the user
                newUser.save()
                .catch((err) => {
                    if (err)
                        throw err;
                    return done(null, newUser);
                });
            }

        })
        .catch(done);    

        });

    }));
     passport.use('login', new LocalStrategy({
            // by default, local strategy uses username and password, we will override with email
            usernameField : 'email',
            passwordField : 'password',
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        (req, email, password, done) => { // callback with email and password from our form
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