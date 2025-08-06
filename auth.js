const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy; 

const Person = require('./models/Person');

// Verification function for Passport's Local Strategy
passport.use(new LocalStrategy(async (username, password, done) => {
    try {
        // Find the user by username
        const user = await Person.findOne({ username: username });

        // If the user is not found
        if (!user) {
            return done(null, false, { message: 'Incorrect username.' });
        }

        // Compare the provided password with the stored hashed password
        const isPasswordMatch = await user.comparePassword(password);

        if (isPasswordMatch) {
            // If the password matches, authentication is successful
            return done(null, user);
        } 
        else {
            // If the password does not match
            return done(null, false, { message: 'Incorrect password.' });
        }
    } 
    catch (err) {
        // If there's an error during the process
        return done(err);
    }
}));

// Export the configured passport
module.exports = passport;