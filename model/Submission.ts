import mongoose, { Document, Model } from "mongoose";

export interface ISubmission extends Document {
  projectName: string;
  description: string;
  category: string[];
  tech: string[];
  builderXUsername: string;
  discordUsername: string;
  tags: string[];
  githubUrl: string;
  liveUrl?: string;
  imageUrl?: string;
  status: "pending" | "reviewed";
  createdAt: Date;
}

const SubmissionSchema = new mongoose.Schema<ISubmission>({
  projectName: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: [String], required: true },
  tech: { type: [String], required: true },
  builderXUsername: { type: String, required: true },
  discordUsername: { type: String, required: true },
  tags: { type: [String], required: true },
  githubUrl: { type: String, required: true },
  liveUrl: { type: String },
  imageUrl: { type: String },
  status: {
    type: String,
    enum: ["pending", "reviewed"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
});

const Submission: Model<ISubmission> =
  mongoose.models.Submission ||
  mongoose.model<ISubmission>("Submission", SubmissionSchema);

export default Submission;
