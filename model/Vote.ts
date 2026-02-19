import mongoose, { Document, Model } from "mongoose";

export interface IVote extends Document {
  ideaId: mongoose.Types.ObjectId;
  weekKey: string;
  discordId: string;
  weight: number;
  createdAt: Date;
}

const VoteSchema = new mongoose.Schema<IVote>({
  ideaId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "VoteIdea",
    required: true,
  },
  weekKey: { type: String, required: true, index: true },
  discordId: { type: String, required: true, index: true },
  weight: { type: Number, default: 1 },
  createdAt: { type: Date, default: Date.now },
});

VoteSchema.index({ discordId: 1, weekKey: 1 }, { unique: true });

const Vote: Model<IVote> =
  mongoose.models.Vote || mongoose.model<IVote>("Vote", VoteSchema);

export default Vote;
