import express from "express"
import { getOneUser, getUserTask, getUsers, registerUser, signInUser } from "../controller/authController"


const router = express.Router()

router.route("/register").post(registerUser);
router.route("/sign-in-user").post(signInUser);
router.route("/get-all-users").get(getUsers);
router.route("/:userID/find-one").get(getOneUser);
router.route("/:userID/get-user-tasks").get(getUserTask);

export default router