const deploymentUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  process.env.NEXT_PUBLIC_VERCEL_URL ||
  process.env.VERCEL_URL;

const baseUrl = deploymentUrl
  ? deploymentUrl.startsWith("http")
    ? deploymentUrl
    : `https://${deploymentUrl}`
  : "";

type ProjectQuery = {
  query?: string;
  category?: string;
  page?: number;
  limit?: number;
};

type ProjectsResponse = {
  projects: unknown[];
  total: number;
  page: number;
  limit: number;
};

export async function getAllProjects(params?: ProjectQuery) {
  const searchParams = new URLSearchParams();
  if (params?.query) searchParams.set("q", params.query);
  if (params?.category) searchParams.set("category", params.category);
  if (params?.page) searchParams.set("page", String(params.page));
  if (params?.limit) searchParams.set("limit", String(params.limit));
  const queryString = searchParams.toString();
  const origin = baseUrl.replace(/\/$/, "");
  const url = `${origin}/api/projects${queryString ? `?${queryString}` : ""}`;

  const res = await fetch(url, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  const data = (await res.json()) as ProjectsResponse | unknown[];
  if (Array.isArray(data)) {
    return {
      projects: data,
      total: data.length,
      page: params?.page ?? 1,
      limit: params?.limit ?? data.length,
    };
  }
  return data;
}

export async function getProject(slug: string) {
  const origin = baseUrl.replace(/\/$/, "");
  const res = await fetch(`${origin}/api/projects/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
