import { generateUniqueSlug } from "@/lib/slugify";
import mongoose, { Document, Model, ObjectId, Schema } from "mongoose";

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  thumbnail: string;
  gitRepo: string;
  liveLink: String;
  verified: boolean;
  httpsEnabled: boolean;
  views: number;
  loves: number;
  lovedBy: string[];
  viewedBy: string[];
  builder: {
    name: string;
    email: string;
    username: string;
    image: string;
    xLink: string;
    about: string;
  };
  status: "pending" | "approved" | "rejected";
  category: string[];
  tech: string[];
  createdAt: Date;
}

const ProjectSchema = new mongoose.Schema<IProject>({
  title: String,
  slug: String,
  description: String,
  thumbnail: String,
  gitRepo: String,
  liveLink: String,

  // Verification
  verified: { type: Boolean, default: false },
  httpsEnabled: { type: Boolean, default: false },

  // Stats
  views: { type: Number, default: 0 },
  loves: { type: Number, default: 0 },
  lovedBy: { type: [String], default: [] },
  viewedBy: { type: [String], default: [] },

  // Builder Info
  builder: {
    name: String,
    email: String,
    username: String,
    image: String,
    xLink: String,
    about: String,
  },

  // Status
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending",
  },

  category: [String],
  tech: [String],

  createdAt: { type: Date, default: Date.now },
});

// Pre-save hook to generate unique slug
ProjectSchema.pre<IProject>("save", async function () {
  if (this.isNew || this.isModified("title")) {
    let slug = generateUniqueSlug(this.title);

    // Check if slug already exists
    let slugExists = await mongoose.models.Project.findOne({ slug });

    // Keep generating until we find a unique slug
    while (slugExists) {
      slug = generateUniqueSlug(this.title);
      slugExists = await mongoose.models.Project.findOne({ slug });
    }

    this.slug = slug;
  }
});

const Project: Model<IProject> =
  mongoose.models.Project || mongoose.model<IProject>("Project", ProjectSchema);
export default Project;
