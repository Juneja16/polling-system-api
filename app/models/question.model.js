import mongoose from "mongoose";

/* Each question contains:
     - title
      - array of option references
*/

const questionSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    options: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Option",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Question = mongoose.model("Question", questionSchema);

export default Question;
