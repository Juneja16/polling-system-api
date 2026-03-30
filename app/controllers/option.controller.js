import Option from "../models/option.model.js";
import Question from "../models/question.model.js";
/*
ADD VOTE
POST /options/:id/add_vote
*/

import mongoose from "mongoose";

export const addVote = async (req, res) => {
  try {
    const optionId = req.params.id;

    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(optionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid option ID",
      });
    }

    /* Atomic vote increment*/
    const option = await Option.findByIdAndUpdate(
      optionId,
      { $inc: { votes: 1 } },
      { new: true },
    );

    //  Not Found
    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    //  Success
    return res.status(200).json({
      success: true,
      message: "Vote added",
      total_votes: option.votes,
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
DELETE OPTION
Rule:
Option cannot be deleted if votes > 0
*/

export const deleteOption = async (req, res) => {
  try {
    const optionId = req.params.id;

    //  Validate ObjectId
    if (!mongoose.Types.ObjectId.isValid(optionId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid option ID",
      });
    }

    const option = await Option.findById(optionId);

    //  Not Found
    if (!option) {
      return res.status(404).json({
        success: false,
        message: "Option not found",
      });
    }

    //  If Option have Votes
    if (option.votes > 0) {
      return res.status(400).json({
        success: false,
        message: "Cannot delete option because it has votes",
      });
    }

    /* Remove option reference from question*/
    await Question.findByIdAndUpdate(option.question, {
      $pull: { options: option._id },
    });

    /* Delete option*/
    await Option.findByIdAndDelete(optionId);

    // Success
    return res.status(200).json({
      success: true,
      message: "Option deleted successfully",
    });
  } catch (err) {
    //  Server error
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
