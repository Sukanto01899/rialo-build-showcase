export function getGitHubRepoFromUrl(url?: string) {
  if (!url) return null;

  const match = url.match(/github\.com[/:]([^/]+)\/([^/.]+)(?:\.git)?/i);
  if (!match) return null;

  const owner = match[1];
  const repo = match[2];
  if (!owner || !repo) return null;

  return { owner, repo };
}
