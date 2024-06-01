import express, { Router } from "express"
import { getOneUser, getUsers, registerUser, signInUser } from "../controller/authController"


const router:Router = express.Router()

router.route("/register-user").post(registerUser);
router.route("/sign-in-user").post(signInUser);
router.route("/get-all-users").post(getUsers);
router.route("/:UserID/find-one").get(getOneUser);

export default router