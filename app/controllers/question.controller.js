import Option from "../models/option.model.js";
import Question from "../models/question.model.js";
import mongoose from "mongoose";
/*
CREATE QUESTION
POST /questions/create
*/

export const create = async (req, res) => {
  try {
    //  Validation check
    if (!req.body.title) {
      return res.status(400).json({
        success: false,
        message: "Title is required",
      });
    }

    const question = await Question.create({
      title: req.body.title,
    });

    //  Success
    return res.status(201).json({
      success: true,
      id: question._id,
      title: question.title,
    });
  } catch (err) {
    //  Server error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
VIEW QUESTION WITH OPTIONS
GET /questions/:id
*/

export const show = async (req, res) => {
  try {
    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    const question = await Question.findById(req.params.id).populate("options");

    //  Not Found
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    const formatted = {
      id: question._id,
      title: question.title,
      options: question.options.map((option) => ({
        id: option._id,
        text: option.text,
        votes: option.votes,
        link_to_vote: option.link_to_vote,
      })),
    };

    //  Success
    return res.status(200).json({
      success: true,
      data: formatted,
    });
  } catch (err) {
    //  Invalid ObjectId or Server Error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
DELETE QUESTION
Rule:Cannot delete if any option has votes
*/

export const deleteQuestion = async (req, res) => {
  try {
    const questionId = req.params.id;

    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(questionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    //  Check if question exists
    const question = await Question.findById(questionId);
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    /* Check if any option has votes*/
    const votedOption = await Option.findOne({
      question: questionId,
      votes: { $gt: 0 },
    });

    if (votedOption) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete question because some options have votes",
      });
    }

    /* Delete all options related to the question*/
    await Option.deleteMany({ question: questionId });

    /* Delete the question*/
    await Question.findByIdAndDelete(questionId);

    // Success
    return res.status(200).json({
      success: true,
      message: "Question deleted successfully",
    });
  } catch (err) {
    //  Server error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

/*
ADD OPTION TO QUESTION
POST /questions/:id/options/create
*/

export const createOption = async function (req, res) {
  try {
    const { id } = req.params;

    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid question ID",
      });
    }

    //  Validate input
    if (!req.body.text) {
      return res.status(400).json({
        success: false,
        message: "Option text is required",
      });
    }

    const question = await Question.findById(id);

    //  Not Found
    if (!question) {
      return res.status(404).json({
        success: false,
        message: "Question not found",
      });
    }

    /* Create new option */
    const option = await Option.create({
      text: req.body.text,
      question: id,
    });

    /*  Generate link_to_vote dynamically */
    option.link_to_vote = `${req.protocol}://${req.get("host")}/options/${option._id}/add_vote`;
    await option.save();

    /*  Add option reference inside question */
    question.options.push(option._id);
    await question.save();

    //  Success
    return res.status(201).json({
      success: true,
      data: {
        id: option._id,
        text: option.text,
        votes: option.votes,
        link_to_vote: option.link_to_vote,
      },
    });
  } catch (err) {
    //  Server error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
