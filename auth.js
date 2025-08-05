// Passpost.js
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; // Passpost-local:This is a username & Password strategy of authenticating users

const Person = require('./models/person');

// Verification function
passport.use(new LocalStrategy(async(USERNAME, password, done)=>{  // done callback should always be the last parameter
    // authentication logic here
    try{
        console.log('Received credencials:', USERNAME, password);
        const user = await Person.findOne({username: USERNAME});

        // If authentication fails: done(null, false, {message: 'some message'})
        if(!user)
            return done(null, false, {message: 'Incorrect username'});    // Done takes three parameters: done(error, user, info)

        const isPasswordMatch = await user.comparePassword(password);

        if(isPasswordMatch){
            return done(null, user);
        } 
        else{
            return done(null, false, {message: 'Incorrect password.'});
        }
        // If authentication successful: done(null, user)
    }
    catch(err){
        return done(err);
    }
}));

module.exports = passport; // Export configured passport