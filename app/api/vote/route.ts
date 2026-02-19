import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";
import { authOptions } from "@/lib/auth";
import dbConnect from "@/lib/db";
import VoteIdea from "@/model/VoteIdea";
import Vote from "@/model/Vote";
import {
  getCurrentWeekKeyUtc,
  hasRoleBoost,
  isWithinVotingWindowUtc,
} from "@/lib/vote";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  const discordId = session?.user?.id;
  if (!discordId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!isWithinVotingWindowUtc(new Date())) {
    return NextResponse.json(
      { error: "Voting is closed" },
      { status: 400 }
    );
  }

  const data = await req.json();
  const ideaId = data.ideaId as string | undefined;
  if (!ideaId) {
    return NextResponse.json({ error: "Idea id required" }, { status: 400 });
  }

  await dbConnect();
  const weekKey = getCurrentWeekKeyUtc();
  const idea = await VoteIdea.findById(ideaId);
  if (!idea || !idea.active || idea.weekKey !== weekKey) {
    return NextResponse.json({ error: "Invalid idea" }, { status: 400 });
  }

  const existing = await Vote.findOne({ discordId, weekKey });
  if (existing) {
    return NextResponse.json({ error: "Already voted" }, { status: 400 });
  }

  const boost = await hasRoleBoost(discordId);
  const weight = boost ? 2 : 1;

  await Vote.create({
    ideaId: idea._id,
    weekKey,
    discordId,
    weight,
  });

  const updated = await VoteIdea.findByIdAndUpdate(
    idea._id,
    { $inc: { votes: 1, weightedVotes: weight } },
    { new: true }
  );

  return NextResponse.json({
    success: true,
    idea: updated,
    weight,
  });
}
