const express = require("express");
const router = express.Router();

// Import controllers
const {
  createQuestion,
  deleteQuestion,
  getQuestion,
} = require("../Controller/questionController");
const {
  createOption,
  deleteOption,
  addVote,
} = require("../Controller/optionController");

router.post("/create", createQuestion);
router.post("/:id/options/create", createOption);
router.delete("/:id/delete", deleteQuestion);
router.delete("/options/:id/delete", deleteOption);
router.post("/options/:id/add_vote", addVote);
router.get("/:id", getQuestion);

module.exports = router;
