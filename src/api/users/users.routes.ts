import { Router } from "express";
import usersControllers from "./users.controllers";
import { loginSchema, registerSchema } from "./users.schemas";
import validate from "../../middleware/validate";

const userRouter = Router();

userRouter.get("/users", usersControllers.getAllUsers);
userRouter.post("/register", validate(registerSchema) , usersControllers.registerUser);
userRouter.post("/login", validate(loginSchema) , usersControllers.loginUser);
userRouter.post("/logout" , usersControllers.logoutUser);
userRouter.delete("/user", usersControllers.softDeleteUser);
userRouter.delete('/users', usersControllers.softDeleteMultipleUsers);
userRouter.get('/isAuth', usersControllers.checkIfAuthenticated);
export default userRouter;