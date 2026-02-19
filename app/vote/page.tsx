import dbConnect from "@/lib/db";
import { Metadata } from "next";
import VoteIdea from "@/model/VoteIdea";
import Vote from "@/model/Vote";
import VoteIdeasClient from "@/components/vote/VoteIdeasClient";
import {
  getCurrentWeekKeyUtc,
  getPreviousWeekKeyUtc,
} from "@/lib/vote";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Weekly Vote | Rialo Builder Hub",
  description: "Vote for the next Shark Tank idea.",
};

export const dynamic = "force-dynamic";

async function ensureWinnerSelected(weekKey: string) {
  const existingWinner = await VoteIdea.findOne({
    weekKey,
    isWinner: true,
  });
  if (existingWinner) return;

  const top = await VoteIdea.find({ weekKey })
    .sort({ weightedVotes: -1, votes: -1, createdAt: 1 })
    .limit(1);
  if (!top.length) return;

  await VoteIdea.findByIdAndUpdate(top[0]._id, {
    isWinner: true,
    winnerAt: new Date(),
  });
}

export default async function VotePage() {
  await dbConnect();
  const session = await getServerSession(authOptions);
  const weekKey = getCurrentWeekKeyUtc();
  const prevWeekKey = getPreviousWeekKeyUtc();

  await ensureWinnerSelected(prevWeekKey);

  const ideas = await VoteIdea.find({ weekKey, active: true })
    .sort({ weightedVotes: -1, votes: -1, createdAt: 1 })
    .lean();

  let votedIdeaId: string | null = null;
  if (session?.user?.id) {
    const existing = await Vote.findOne({
      discordId: session.user.id,
      weekKey,
    }).lean();
    if (existing) {
      votedIdeaId = String(existing.ideaId);
    }
  }

  const safeIdeas = ideas.map((idea) => ({
    ...idea,
    _id: String(idea._id),
  }));

  return (
    <div className="mx-auto w-full max-w-6xl px-4 md:px-6 lg:px-8 pt-24 pb-14 space-y-10">
      <section className="hero min-h-[32vh] rounded-3xl pattern-background">
        <div className="hero-overlay rounded-3xl"></div>
        <div className="hero-content text-center text-base-content">
          <div className="max-w-2xl space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-base-300/60 bg-base-100/70 px-4 py-2 text-xs uppercase tracking-[0.2em] text-base-content/70">
              Shark Tank Voting
            </div>
            <h1 className="text-3xl font-semibold md:text-4xl lg:text-5xl">
              Vote for Next Week
            </h1>
            <p className="text-sm text-base-content/70 md:text-base">
              Submit your vote for the next Shark Tank idea. Voting resets each
              Thursday (UTC).
            </p>
          </div>
        </div>
      </section>

      <VoteIdeasClient ideas={safeIdeas} weekKey={weekKey} votedIdeaId={votedIdeaId} />
    </div>
  );
}
