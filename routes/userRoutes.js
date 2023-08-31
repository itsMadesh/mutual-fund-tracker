const express = require('express');
const router = express.Router();

const userController = require("../controllers/userController");
const userMiddleware = require("../middlewares/userMiddleware");

router.post("/signup",userMiddleware.isValidData,userController.signup);
router.post("/login",userMiddleware.isValidUser,userController.login);
router.put("/favourites",userMiddleware.verifyUser,userController.addToFav);
router.get("/favourites",userMiddleware.verifyUser,userController.getFav);
router.put("/target",userMiddleware.verifyUser,userController.setTarget);

module.exports=router;