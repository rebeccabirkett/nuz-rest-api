const bcrypt = require("bcrypt");

const hashPassword = async (req, res, next) => {
    if ("password" in req.body) {
        req.body.password = await bcrypt.hash(req.body.password, 12);
    }
    next();
};

module.exports = {
    hashPassword
};