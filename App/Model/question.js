const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

const QuestionModel = mongoose.model("Question", questionSchema);
module.exports = QuestionModel;
