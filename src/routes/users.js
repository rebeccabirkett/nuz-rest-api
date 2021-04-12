const { Router } = require("express");
const { getAllPosts, addUser, updateUser, deleteUser } = require("../controllers/users");

const userRouter = Router()

userRouter.get("/user", getAllPosts);
userRouter.post("/user", addUser);
userRouter.patch("/user/:id", updateUser);
userRouter.delete("/user/:id", deleteUser);

module.exports = {
    userRouter
}