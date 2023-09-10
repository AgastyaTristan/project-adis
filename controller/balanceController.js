const {User, Income, Outcome} = require("../models")

exports.addIncome = (req, res) => {
    try{
        const {username} = req.user
        Income.addIncome(req.user, req.body).then(() => {
            User.Income(req.user, req.body).then(() => {
                User.findOne({include:["Income", "Outcome"]}, {where: {username: username}}).then((data) => {
                    res.json({status: "Successfully Add Income!", data: data});
                }).catch((err) => {
                    res.status(400).json({status: "Failed Add Income", msg: err});
                })
            }).catch((err) => {
                res.status(400).json({status: "Failed Add Income", msg: err});
            })
        }).catch((err) => {
            res.status(400).json({status: "Failed Add Income", msg: err});
        })
    } catch (err) {
        res.status(500).json({status: "Failed Add Income", msg: err});
    }
}

exports.addOutcome = (req, res) => {
    try{
        const {username} = req.user
        Outcome.addOutcome(req.user, req.body).then((data) => {
            console.log(data)
            User.Outcome(req.user, req.body).then(() => {
                User.findOne({include:["Income", "Outcome"]}, {where: {username: username}}).then((data) => {
                    res.json({status: "Successfully Add Outcome!", data: data});
                }).catch((err) => {
                    res.status(400).json({status: "Failed Add Outcome", msg: err});
                })
            }).catch((err) => {
                res.status(400).json({status: "Failed Add Outcome", msg: err});
            })
        }).catch((err) => {
            res.status(400).json({status: "Failed Add Outcome", msg: err});
        })
    } catch (err) {
        res.status(500).json({status: "Failed Add Outcome", msg: err});
    }
}

exports.delIncome = (req, res) => {
    try {
        // const {id} = req.user
        // const {incomeId} = req.params
        
        // User.findOne({include:["Income", "Outcome"]}, {where: {id: id}}).then((user) => {
        //     const delIn = Income.findOne({where: {userId: id, id: incomeId}})
        //     console.log(delIn)
        //     User.update({
        //         balance: user.balance-delIn
        //     }, {where: {username:username}})
        //     Income.destroy({where: {userId: id, id: incomeId}}).then(()=> {
        //         res.json({message: "Delete successs"})
        //     }).catch((err) => {
        //         res.status(400).json({status: "Failed Delete Income", msg: err})
        //     })
        // }).catch((err) => {
        //     res.status(400).json({status: "Failed Delete Income", msg: err});
        // })
        Income.delIncome(req.user, req.params).then(() => {
            res.json({status: "Successfully Delete Income!"});
        }).catch((err) => {
            res.status(400).json({status: "Failed Delete Income", msg: err});
        })
    } catch (err) {
        res.status(500).json({status: "Failed Delete Income", msg: err})
    }
}

exports.delOutcome = (req, res) => {
    try {
        // const {id} = req.user
        // const {outcomeId} = req.params
        
        // User.findOne({include:["Income", "Outcome"]}, {where: {id: id}}).then((user) => {
        //     const delOut = user.Outcome.findOne({where: {id: outcomeId}})
        //     User.update({
        //         balance: user.balance+delOut
        //     }, {where: {username:username}})
        //     Outcome.destroy({where: {userId: id, id: outcomeId}}).then(()=> {
        //         res.json({message: "Delete successs"})
        //     }).catch((err) => {
        //         res.status(400).json({status: "Failed Delete Outcome", msg: err})
        //     })
        // }).catch((err) => {
        //     res.status(400).json({status: "Failed Delete Outcome", msg: err});
        // })
        Outcome.delOutcome(req.user, req.params).then(() => {
            res.json({status: "Successfully Delete Outcome!"});
        }).catch((err) => {
            res.status(400).json({status: "Failed Delete Outcome", msg: err});
        })
    } catch (err) {
        res.status(500).json({status: "Failed Delete Outcome", msg: err})
    }
}