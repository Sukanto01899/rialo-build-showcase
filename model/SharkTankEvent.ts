import mongoose, { Document, Model } from "mongoose";

export interface ISharkTankEvent extends Document {
  title: string;
  description: string;
  startDate?: Date;
  image?: string;
  hostTwitter?: string;
  hostGithub?: string;
  hostBy?: string;
  websiteLink?: string;
  location?: string;
  status: "upcoming" | "ended";
  createdAt: Date;
}

const SharkTankEventSchema = new mongoose.Schema<ISharkTankEvent>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  startDate: { type: Date },
  image: { type: String },
  hostTwitter: { type: String },
  hostGithub: { type: String },
  hostBy: { type: String },
  websiteLink: { type: String },
  location: { type: String },
  status: {
    type: String,
    enum: ["upcoming", "ended"],
    default: "upcoming",
  },
  createdAt: { type: Date, default: Date.now },
});

const SharkTankEvent: Model<ISharkTankEvent> =
  mongoose.models.SharkTankEvent ||
  mongoose.model<ISharkTankEvent>("SharkTankEvent", SharkTankEventSchema);

export default SharkTankEvent;
