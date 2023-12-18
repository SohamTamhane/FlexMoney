const express = require("express");
const router = express.Router();

const {signup, login, getUser} = require("../controller/Auth");
const {isUser, isAdmin} = require("../middleware/auth");
const {admission} = require("../controller/Book");

router.post('/login', login);
router.post('/signup', signup);
router.post('/admission', isUser, admission);
router.post('/user', isUser, getUser);

module.exports = router;