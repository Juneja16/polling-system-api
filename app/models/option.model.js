import mongoose from "mongoose";

/*
Option Schema

Each option contains:
- text
- number of votes
- reference to the question
- link to vote
*/

const optionSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true
    },

    /*
    Stores number of votes for this option
    */
    votes: {
      type: Number,
      default: 0
    },

    /*
    Reference to the parent question
    */
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question"
    },

    /*
    Dynamic link to add vote
    */
    link_to_vote: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

const Option = mongoose.model("Option", optionSchema);

export default Option;