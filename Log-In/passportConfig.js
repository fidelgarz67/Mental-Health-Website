const localStrat = require('passport-local').Strategy
const bcrypt = require('bcrypt')


function initial(passport, getUserbyEmail, getUserbyId ){
    const authenticateUser = async (email, password, finsihed) =>{
        const user = getUserbyEmail(email)
        //ensure the email and id are correct
        if (user == null){
            return finsihed(null, false, {
                message: 'User does not exist with that email.'})
        }
        //check the password
        try {
            if(await bcrypt.compare(password, user.password)){
                //we have a succ user log in
                return finsihed(null, user)
            } else {
                return finsihed(null, false, {
                    message: 'Password is incorrect'})
            }
        } catch (error){
            return finsihed(error)
        }
    }

    passport.use(new localStrat({usernameField: 'email'}, authenticateUser))
    //Success log in means we want a object of the user and its id this was we should be able to use it throughout the website
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
      return done(null, getUserbyId(id))
        })
}

//we want to be able to us inital in our server
module.exports = initial