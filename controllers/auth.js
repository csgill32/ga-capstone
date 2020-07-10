const db = require("../models");
const bcrypt = require("bcryptjs");

const register = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email });
        // check to see if email address has already been registered
        if (foundUser)
            return res.status(400).json({
                status: 400,
                message: "Email address has already been registered.",
            });
        // encryt password
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(req.body.password, salt);
        const createdUser = await db.User.create({ ...req.body, password: hash });

        return res
            .status(201)
            .json({ status: 201, message: "User Registration Successful", createdUser });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};

const login = async (req, res) => {
    try {
        const foundUser = await db.User.findOne({ email: req.body.email }).select(
            "+password" // don't show the password
        );
        // check for registered email address
        if (!foundUser) {
            return res
                .status(400)
                .json({ status: 400, message: "Username or password is incorrect" });
        }
        // check for correct password
        const isMatch = await bcrypt.compare(req.body.password, foundUser.password);

        if (isMatch) {
            req.session.currentUser = {
                id: foundUser._id,
            };
            return res
                .status(201)
                .json({ status: 200, message: "Login Successful", foundUser });
        } else {
            // the password provided does not match the password on file.
            return res.status(400).json({
                status: 400,
                message: "Username or password is incorrect",
            });
        }
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};

const profile = async (req, res) => {
    try {
        const foundUser = await db.User.findById(req.session.currentUser.id);

        res.json({ user: foundUser });
    } catch (error) {
        return res.status(500).json({
            status: 500,
            message: "Something went wrong. Please try again",
        });
    }
};


module.exports = {
    register,
    login,
    profile,
};
