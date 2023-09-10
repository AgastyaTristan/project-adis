const {User} = require("../models")

exports.showAll = (req, res) => {
    try{
    User.findAll({include:["Income", "Outcome"]}).then((data) => {
        res.json({status: "Successfully Show All Data", data: data});
    }).catch((err) => {
        res.status(400).json({status: "Failed Show Data", msg: err});
    })
    } catch (err) {
        res.status(500).json({status: "Failed Show Data", msg: err});
    }
}

exports.showId = (req, res) => {
    try{
        const {id} = req.params
        User.findOne({include:["Income", "Outcome"]}, {where: {id: id}}).then((user) => {
            res.json({message: "User finded", data: user})
        }).catch((err) => {
            res.status(400).json({status: "Failed Show User", msg: err});
        })
    } catch (err) {
        res.status(500).json({status: "Failed Show User", msg: err});
    }
}

exports.deleteacc = (req, res) => {
    try {
        const User = req.user.username;
        User.destroy({where: {username: User}})
        .then(() => {
            res.json({message: "Delete Success"});
        })
        .catch((err)=> {
            res.status(400).json({message: "Delete failed", msg: err});
        })
    } catch (err) {
        res.status(500).json({message: "Delete failed", msg: err});
    }
}

exports.userUpdate = (req, res) => {
    try {
        User.userUpdate(req.user, req.body)
        .then((data) => {
            res.json({message: "Update Success", data: data});
        })
        .catch((err)=> {
            res.status(400).json({message: "Update failed", msg: err});
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Update failed", msg: err});
    }
}

exports.setGoal = (req, res) => {
    try {
        User.setGoal(req.user, req.body)
        .then((data) => {
            res.json({message: "Set Success", data: data});
        })
        .catch((err)=> {
            res.status(400).json({message: "Set failed", msg: err});
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({message: "Set failed", msg: err});
    }
}