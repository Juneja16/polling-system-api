import express from "express";
import { addVote, deleteOption } from "../controllers/option.controller.js";

const router = express.Router();

/*Add vote*/
router.post("/:id/add_vote", addVote);

/*Delete option*/
router.delete("/:id/delete", deleteOption);

export default router;
