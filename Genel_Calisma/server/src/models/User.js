import mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  profile_photo: {
    type: String,
    required: false,
  },
  events: [
    {
      type: Schema.Types.ObjectId,
      ref: "Event",
    },
  ],
  locations: [
    {
      type: Schema.Types.ObjectId,
      ref: "Location",
    },
  ],
  participants: [
    {
      type: Schema.Types.ObjectId,
      ref: "Participant",
    },
  ],
});

export default mongoose.model("User", UserSchema);
