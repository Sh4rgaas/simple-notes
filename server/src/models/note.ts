import { INote } from "./../types/note";
import { model, Schema } from "mongoose";

const noteSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    status: {
      type: Boolean,
      required: true,
    },
  },
  { timestamps: true }
)

export default model<INote>("Note", noteSchema)