/**
 * Build-time GitHub REST API metadata fetcher with per-build caching
 * and graceful fallback so static builds never fail offline or under rate limits.
 */

export interface GitHubRepoMeta {
  stars: number;
  language: string | null;
  latestReleaseTag: string | null;
  latestReleaseUrl: string | null;
  latestAssetUrl: string | null;
  updatedAt: string | null;
}

const repoCache = new Map<string, Promise<GitHubRepoMeta | null>>();

export function extractGitHubSlug(url?: string): string | null {
  if (!url) return null;
  const match = url.match(/github\.com\/([^/]+\/[^/?#]+)/i);
  return match ? match[1].replace(/\.git$/i, '') : null;
}

function buildHeaders(): Record<string, string> {
  const headers: Record<string, string> = {
    Accept: 'application/vnd.github+json',
    'User-Agent': 'nfgodin-github-io-astro-build',
  };
  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

async function fetchRepoMetaUncached(slug: string): Promise<GitHubRepoMeta | null> {
  try {
    const headers = buildHeaders();
    const repoRes = await fetch(`https://api.github.com/repos/${slug}`, {
      headers,
      signal: AbortSignal.timeout(5000),
    });
    if (!repoRes.ok) return null;
    const repoJson = await repoRes.json();

    let latestReleaseTag: string | null = null;
    let latestReleaseUrl: string | null = null;
    let latestAssetUrl: string | null = null;

    try {
      const relRes = await fetch(`https://api.github.com/repos/${slug}/releases/latest`, {
        headers,
        signal: AbortSignal.timeout(4000),
      });
      if (relRes.ok) {
        const relJson = await relRes.json();
        latestReleaseTag = relJson.tag_name ?? null;
        latestReleaseUrl = relJson.html_url ?? null;
        if (Array.isArray(relJson.assets) && relJson.assets.length > 0) {
          latestAssetUrl = relJson.assets[0].browser_download_url ?? null;
        }
      }
    } catch {
      // No release or timeout — ignore gracefully
    }

    return {
      stars: typeof repoJson.stargazers_count === 'number' ? repoJson.stargazers_count : 0,
      language: repoJson.language ?? null,
      latestReleaseTag,
      latestReleaseUrl,
      latestAssetUrl,
      updatedAt: repoJson.pushed_at ?? repoJson.updated_at ?? null,
    };
  } catch {
    return null;
  }
}

export function getGitHubRepoMeta(githubUrl?: string): Promise<GitHubRepoMeta | null> {
  const slug = extractGitHubSlug(githubUrl);
  if (!slug) return Promise.resolve(null);
  const key = slug.toLowerCase();
  if (!repoCache.has(key)) {
    repoCache.set(key, fetchRepoMetaUncached(slug));
  }
  return repoCache.get(key)!;
}

export async function prefetchGitHubMeta(urls: Array<string | undefined>): Promise<Map<string, GitHubRepoMeta>> {
  const uniqueSlugs = new Set<string>();
  const urlBySlug = new Map<string, string>();
  for (const url of urls) {
    const slug = extractGitHubSlug(url);
    if (slug) {
      const key = slug.toLowerCase();
      uniqueSlugs.add(key);
      urlBySlug.set(key, url!);
    }
  }

  const results = new Map<string, GitHubRepoMeta>();
  await Promise.all(
    Array.from(uniqueSlugs).map(async (key) => {
      const meta = await getGitHubRepoMeta(urlBySlug.get(key));
      if (meta) results.set(key, meta);
    })
  );
  return results;
}
