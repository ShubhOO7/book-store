const express = require('express');
const User = require("../model/User");
const router = express.Router();
const userController = require('../controllers/user-controller');


router.get("/:email", userController.getUser);
router.get("/:name", userController.findUser);
router.post("/", userController.addUser);

module.exports = router ;
