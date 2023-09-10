const router = require("express").Router();
const balance = require("../controller/balanceController");
const restrict = require("../middleware/restrict")

router.post("/income", restrict, balance.addIncome)
router.post("/outcome", restrict, balance.addOutcome)
router.delete("/income/:incomeId", restrict, balance.delIncome)
router.delete("/outcome/:outcomeId", restrict, balance.delOutcome)

module.exports = router;