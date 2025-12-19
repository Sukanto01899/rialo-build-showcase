const baseUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000");

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
  const url = `${baseUrl}/api/projects${queryString ? `?${queryString}` : ""}`;

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
  const res = await fetch(`${baseUrl}/api/projects/${slug}`, {
    cache: "no-store",
  });

  if (!res.ok) return null;
  return res.json();
}
