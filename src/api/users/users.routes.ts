import { Router } from "express";
import usersControllers from "./users.controllers";
import { loginSchema, registerSchema } from "./users.schemas";
import validate from "../../middleware/validate";
import {
  checkIfAdmin,
  checkIfAuthenticated,
} from "../../middleware/check-auth";
import upload from "../../middleware/multer";

const userRouter = Router();

userRouter.get("/users", checkIfAdmin, usersControllers.getAllUsers);
userRouter.post(
  "/register",
  validate(registerSchema),
  usersControllers.registerUser
);
userRouter.post("/login", validate(loginSchema), usersControllers.loginUser);
userRouter.post("/logout", usersControllers.logoutUser);
userRouter.delete("/user", checkIfAdmin, usersControllers.softDeleteUser);
userRouter.delete(
  "/users",
  checkIfAdmin,
  usersControllers.softDeleteMultipleUsers
);
userRouter.get("/isAuth", usersControllers.checkIfAuthenticated);
userRouter.put("/user", checkIfAuthenticated, usersControllers.updateUser);
// upload image
userRouter.post(
  "/upload",
  upload.single("image"),
  usersControllers.uploadImage
);
export default userRouter;
