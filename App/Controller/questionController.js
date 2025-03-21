// const Question = require("../models/question");
// const Option = require("../models/option");

const QuestionModel = require("../Model/question");
const OptionModel = require("../Model/option");

// Create a question
const createQuestion = async (req, res) => {
  try {
    const { title } = req.body;
    const question = await QuestionModel.create({ title });
    res.status(201).json(question);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a question
const deleteQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    await QuestionModel.findByIdAndDelete(id);
    await OptionModel.deleteMany({ question_id: id }); // Delete associated options
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// View a question with its options
const getQuestion = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await QuestionModel.findById(id);
    if (!question) return res.status(404).json({ error: "Question not found" });

    const options = await OptionModel.find({ question_id: id });
    const optionsWithLinks = options.map((option) => ({
      id: option._id,
      text: option.text,
      votes: option.votes,
      link_to_vote: `http://localhost:8000/options/${option._id}/add_vote`,
    }));

    res.json({
      id: question._id,
      title: question.title,
      options: optionsWithLinks,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createQuestion, deleteQuestion, getQuestion };
