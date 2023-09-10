const {User, History} = require("../models")

const format = (user) => {
    const {id, username} = user;

    return {
        id,
        username,
        token: user.generateToken()
    }
}

exports.register = (req, res) => {
    try {
        User.register(req.body)
        .then((data) => {
            History.create({
                  userId: data.id
            }).then((user) => {
                res.json({ status:"Register Success", data: data});
            })
        res.json({ status:"Register Success", data: data});
        })
        .catch((err) => {
            res.status(400).json({status: "Register Failed", msg: err})
        })
        } catch (err) {
            res.status(500).json({status: "Register Failed", msg: err})
        }
}

exports.login = (req, res) => {
    try{
        User.authentication(req.body)
        .then((data) => {
            res.json({ status:"Login Success", data: format(data)});
        })
        .catch((err) => {
            res.status(401).json({status: "Login Failed", msg: err})    
        })
        } catch (err) {
            res.status(500).json({status: "Login Failed", msg: err.message})
        }
}