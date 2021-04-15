const {Router} = require("express");

const {
    getAllUsers,
    addUser,
    updateUser,
    deleteUser,
    login,
    profile,
} = require("../controllers/users");

const {hashPassword} = require("../middleware");

const userRouter = Router();

userRouter.get("/user", getAllUsers);
userRouter.post("/user", hashPassword, addUser);
userRouter.patch("/user/:id", hashPassword, updateUser);
userRouter.delete("/user/:id", deleteUser);
userRouter.post("/user/login", login);
userRouter.get("/user/profile", profile);

module.exports = {
    userRouter,
};