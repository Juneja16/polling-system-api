const OptionModel = require("../Model/option");

// Create an option for a question
const createOption = async (req, res) => {
  try {
    const { id } = req.params; // question_id
    const { text } = req.body;
    const option = await OptionModel.create({ text, question_id: id });
    res.status(201).json(option);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete an option
const deleteOption = async (req, res) => {
  try {
    const { id } = req.params;
    await OptionModel.findByIdAndDelete(id);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Add a vote to an option
const addVote = async (req, res) => {
  try {
    const { id } = req.params;
    const option = await OptionModel.findById(id);
    if (!option) return res.status(404).json({ error: "Option not found" });

    option.votes += 1;
    await option.save();
    res.json({ votes: option.votes });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { createOption, deleteOption, addVote };
