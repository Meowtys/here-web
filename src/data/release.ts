export interface ReleaseMetadata {
  version: string;
  name: string;
  buildNumber: number;
  packageName: string;
  minAndroid: string;
  downloadUrl: string;
  assetName: string;
  sizeBytes: number;
  sizeFormatted: string;
  publishedAt: string;
  publishedDateFormatted: string;
  prerelease: boolean;
  releaseUrl: string;
  latestReleaseUrl: string;
  checksumSha256: string;
}

export const RELEASES_API_URL = 'https://api.github.com/repos/Meowtys/here-releases/releases';
export const GITHUB_REPO_URL = 'https://github.com/Meowtys/here-releases';
export const LATEST_RELEASE_URL = 'https://github.com/Meowtys/here-releases/releases/latest';

export const FALLBACK_RELEASE: ReleaseMetadata = {
  version: 'v2.1.1-beta',
  name: 'Here! v2.1.1-beta (Build 16)',
  buildNumber: 16,
  packageName: 'com.meowtys.here',
  minAndroid: 'Android 7.0+ (API 24+)',
  downloadUrl:
    'https://github.com/Meowtys/here-releases/releases/download/v2.1.1-beta/here-v2.1.1-beta.apk',
  assetName: 'here-v2.1.1-beta.apk',
  sizeBytes: 137728538,
  sizeFormatted: '131.3 MB',
  publishedAt: '2026-11-03T17:20:20Z',
  publishedDateFormatted: 'Nov 3, 2026',
  prerelease: true,
  releaseUrl: 'https://github.com/Meowtys/here-releases/releases/tag/v2.1.1-beta',
  latestReleaseUrl: 'https://github.com/Meowtys/here-releases/releases/latest',
  checksumSha256: 'd29f175c4923222754d3e08f382e4ef4dfb55dd89a5a8f0098a2ee964bafaa6d',
};

export function formatBytesToMB(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes <= 0) {
    return FALLBACK_RELEASE.sizeFormatted;
  }
  const mb = bytes / (1024 * 1024);
  return `${mb.toFixed(1)} MB`;
}

export function formatReleaseDate(isoDate: string): string {
  if (!isoDate) return FALLBACK_RELEASE.publishedDateFormatted;
  const parsed = new Date(isoDate);
  if (Number.isNaN(parsed.getTime())) {
    return FALLBACK_RELEASE.publishedDateFormatted;
  }
  return parsed.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    timeZone: 'UTC',
  });
}

export function parseBuildNumber(name: string, fallback: number = FALLBACK_RELEASE.buildNumber): number {
  const match = /\(Build\s+(\d+)\)/i.exec(name);
  if (!match) return fallback;
  const parsed = Number.parseInt(match[1], 10);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : fallback;
}

export function parseChecksum(body?: string, digest?: string): string {
  if (digest && typeof digest === 'string') {
    const cleanDigest = digest.replace(/^sha256:/i, '').trim();
    if (/^[a-f0-9]{64}$/i.test(cleanDigest)) return cleanDigest.toLowerCase();
  }
  if (body && typeof body === 'string') {
    const match = /SHA-256:\s*([a-f0-9]{64})/i.exec(body);
    if (match) return match[1].toLowerCase();
  }
  return FALLBACK_RELEASE.checksumSha256;
}

export function parseReleasePayload(payload: unknown): ReleaseMetadata {
  if (!Array.isArray(payload) || payload.length === 0) {
    return { ...FALLBACK_RELEASE };
  }

  for (const item of payload) {
    if (!item || typeof item !== 'object') continue;
    if ((item as Record<string, unknown>).draft === true) continue;

    const assets = Array.isArray((item as Record<string, unknown>).assets)
      ? ((item as Record<string, unknown>).assets as Array<Record<string, unknown>>)
      : [];

    const apkAsset = assets.find(
      (asset) =>
        asset &&
        typeof asset.name === 'string' &&
        asset.name.toLowerCase().endsWith('.apk') &&
        typeof asset.browser_download_url === 'string' &&
        asset.browser_download_url.length > 0
    );

    if (!apkAsset) continue;

    const tagName =
      typeof (item as Record<string, unknown>).tag_name === 'string' &&
      ((item as Record<string, unknown>).tag_name as string).trim().length > 0
        ? ((item as Record<string, unknown>).tag_name as string).trim()
        : FALLBACK_RELEASE.version;

    const releaseName =
      typeof (item as Record<string, unknown>).name === 'string' &&
      ((item as Record<string, unknown>).name as string).trim().length > 0
        ? ((item as Record<string, unknown>).name as string).trim()
        : `Here! ${tagName}`;

    const buildNumber = parseBuildNumber(releaseName, FALLBACK_RELEASE.buildNumber);

    const sizeBytes =
      typeof apkAsset.size === 'number' && apkAsset.size > 0
        ? apkAsset.size
        : FALLBACK_RELEASE.sizeBytes;

    const publishedAt =
      typeof (item as Record<string, unknown>).published_at === 'string'
        ? ((item as Record<string, unknown>).published_at as string)
        : FALLBACK_RELEASE.publishedAt;

    const htmlUrl =
      typeof (item as Record<string, unknown>).html_url === 'string'
        ? ((item as Record<string, unknown>).html_url as string)
        : `https://github.com/Meowtys/here-releases/releases/tag/${tagName}`;

    const checksumSha256 = parseChecksum(
      typeof (item as Record<string, unknown>).body === 'string'
        ? ((item as Record<string, unknown>).body as string)
        : undefined,
      typeof apkAsset.digest === 'string' ? (apkAsset.digest as string) : undefined
    );

    return {
      version: tagName,
      name: releaseName,
      buildNumber,
      packageName: FALLBACK_RELEASE.packageName,
      minAndroid: FALLBACK_RELEASE.minAndroid,
      downloadUrl: apkAsset.browser_download_url as string,
      assetName: apkAsset.name as string,
      sizeBytes,
      sizeFormatted: formatBytesToMB(sizeBytes),
      publishedAt,
      publishedDateFormatted: formatReleaseDate(publishedAt),
      prerelease: Boolean((item as Record<string, unknown>).prerelease ?? true),
      releaseUrl: htmlUrl,
      latestReleaseUrl: LATEST_RELEASE_URL,
      checksumSha256,
    };
  }

  return { ...FALLBACK_RELEASE };
}

export async function fetchLatestRelease(
  fetchImpl: typeof fetch = fetch
): Promise<ReleaseMetadata> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);
    const response = await fetchImpl(RELEASES_API_URL, {
      headers: {
        Accept: 'application/vnd.github+json',
        'User-Agent': 'here-web-portal',
      },
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (!response.ok) {
      return { ...FALLBACK_RELEASE };
    }
    const data = await response.json();
    return parseReleasePayload(data);
  } catch {
    return { ...FALLBACK_RELEASE };
  }
}
