// import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

// export interface IProject extends Document {
//   projectId: string;
//   name: string;
//   description: string;
//   like: number;
//   views: number;
//   image: string;
//   technology: string[];
//   verified: boolean;
//   github_url: string;
//   live_url: string;
//   builder: ObjectId;
// }

// const ProjectSchema = new Schema<IProject>({
//   fid: { type: Number, unique: true, required: true, index: true },
//   username: { type: String, required: true },
//   totalCoins: { type: Number, default: 0, index: true },
//   level: { type: Number, default: 1 },
//   tapPower: { type: Number, default: 1 },
//   energy: { type: Number, default: 100 },
//   maxEnergy: { type: Number, default: 500 },
//   lastSync: { type: Date, default: Date.now },
//   totalTaps: { type: Number, default: 0 },
//   createdAt: { type: Date, default: Date.now, index: true },
//   updatedAt: { type: Date, default: Date.now },
// });

// const User: Model<IProject> =
//   mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
// export default User;
