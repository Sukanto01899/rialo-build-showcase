const DISCORD_GUILD_ID = process.env.DISCORD_GUILD_ID || "";
const DISCORD_ROLE_ID = process.env.DISCORD_ROLE_ID || "";
const DISCORD_BOT_TOKEN = process.env.DISCORD_BOT_TOKEN || "";

export const getVotingWeekStartUtc = (date = new Date()) => {
  const utc = new Date(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate())
  );
  const day = utc.getUTCDay(); // 0=Sun
  const diff = (day - 4 + 7) % 7; // Thursday=4
  utc.setUTCDate(utc.getUTCDate() - diff);
  utc.setUTCHours(0, 0, 0, 0);
  return utc;
};

export const formatWeekKey = (date: Date) => {
  const year = date.getUTCFullYear();
  const month = String(date.getUTCMonth() + 1).padStart(2, "0");
  const day = String(date.getUTCDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

export const getCurrentWeekKeyUtc = (date = new Date()) =>
  formatWeekKey(getVotingWeekStartUtc(date));

export const getPreviousWeekKeyUtc = (date = new Date()) => {
  const start = getVotingWeekStartUtc(date);
  start.setUTCDate(start.getUTCDate() - 7);
  return formatWeekKey(start);
};

export const isWithinVotingWindowUtc = (date = new Date()) => {
  const start = getVotingWeekStartUtc(date);
  const end = new Date(start);
  end.setUTCDate(end.getUTCDate() + 7);
  end.setUTCMilliseconds(end.getUTCMilliseconds() - 1);
  return date >= start && date <= end;
};

export const hasRoleBoost = async (discordId: string) => {
  if (!DISCORD_GUILD_ID || !DISCORD_ROLE_ID || !DISCORD_BOT_TOKEN) {
    return false;
  }

  try {
    const res = await fetch(
      `https://discord.com/api/v10/guilds/${DISCORD_GUILD_ID}/members/${discordId}`,
      {
        headers: {
          Authorization: `Bot ${DISCORD_BOT_TOKEN}`,
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return false;
    const data = (await res.json()) as { roles?: string[] };
    return Array.isArray(data.roles) && data.roles.includes(DISCORD_ROLE_ID);
  } catch {
    return false;
  }
};
