const router = require("express").Router();
const user = require("../controller/userController");
const restrict = require("../middleware/restrict")

router.get("/findall", user.showAll)
router.get("/:id", user.showId)
router.delete("/deleteacc",restrict, user.deleteacc)
router.put("/updateacc", restrict, user.userUpdate)
router.put("/setGoal", restrict, user.setGoal)

module.exports = router;