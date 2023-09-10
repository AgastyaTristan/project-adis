const passport = require("passport");
const {User} = require("../models")
const {Strategy: JwtStrategy, ExtractJwt} = require("passport-jwt");
const options = {
    jwtFromRequest: ExtractJwt.fromHeader("authorization"),
    secretOrKey: "This is my secret",
}

passport.use(
    new JwtStrategy(options, async(payload, done) => {
        User.findByPk(payload.id)
        .then((user) => done(null, user))
        .catch((err) => done(err, false))
    }))

module.exports = passport;