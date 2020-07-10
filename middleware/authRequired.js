module.exports = function (req, res, next) {
    if (!req.session.currentUser) {
        return res
            .status(400)
            .json({ status: 400, message: "Username or password is incorrect" });
    }
    next();
};