import express from "express";
import {
  create,
  createOption,
  deleteQuestion,
  show,
} from "../controllers/question.controller.js";

const router = express.Router();

/*
Create question
*/
router.post("/create", create);

/*Add option to question*/
router.post("/:id/options/create", createOption);

/*Delete question*/
router.delete("/:id/delete", deleteQuestion);

/*View question*/
router.get("/:id", show);

export default router;
