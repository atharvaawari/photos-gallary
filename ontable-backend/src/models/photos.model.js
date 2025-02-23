import mongoose, { Schema } from "mongoose";

const photoSchema = new Schema(
  {
    photoUrl:{
      type: String,
      required:true,
    },
    user:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  }, { timestamps: true}
);

export const Photo = mongoose.model("Photo", photoSchema);