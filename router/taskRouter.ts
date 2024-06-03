import express from "express"
import { createTask, getAllTask } from "../controller/taskController";



const router = express.Router()

router.route("/:userID/create-task").post(createTask);
router.route("/all-tasks").get(getAllTask);

export default router