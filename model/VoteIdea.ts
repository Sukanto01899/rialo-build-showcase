import mongoose, { Document, Model } from "mongoose";

export interface IVoteIdea extends Document {
  title: string;
  description: string;
  weekKey: string;
  active: boolean;
  votes: number;
  weightedVotes: number;
  isWinner: boolean;
  winnerAt?: Date;
  createdAt: Date;
}

const VoteIdeaSchema = new mongoose.Schema<IVoteIdea>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  weekKey: { type: String, required: true, index: true },
  active: { type: Boolean, default: true },
  votes: { type: Number, default: 0 },
  weightedVotes: { type: Number, default: 0 },
  isWinner: { type: Boolean, default: false },
  winnerAt: { type: Date },
  createdAt: { type: Date, default: Date.now },
});

const VoteIdea: Model<IVoteIdea> =
  mongoose.models.VoteIdea || mongoose.model<IVoteIdea>("VoteIdea", VoteIdeaSchema);

export default VoteIdea;
