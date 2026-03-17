import express from "express";
import { allUser, deleteUser, getProfile, isAuth, login, logout, register } from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.post("/register", register);
userRouter.post("/login", login);
userRouter.get("/is-auth", authUser, isAuth);
userRouter.get("/logout", authUser, logout);
userRouter.get("/alluser", authUser, allUser);
userRouter.get("/profile", authUser, getProfile);
userRouter.delete("/:id", authUser, deleteUser);


export default userRouter;
