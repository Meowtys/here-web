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
}

export const RELEASES_API_URL = 'https://api.github.com/repos/Meowtys/here-next/releases';
export const GITHUB_REPO_URL = 'https://github.com/Meowtys/here-next';

export const FALLBACK_RELEASE: ReleaseMetadata = {
  version: 'v2.1.0-beta.6',
  name: 'Here! v2.1.0-beta.6',
  buildNumber: 14,
  packageName: 'com.meowtys.here',
  minAndroid: 'Android 7.0+ (API 24+)',
  downloadUrl:
    'https://github.com/Meowtys/here-next/releases/download/v2.1.0-beta.6/here-v2.1.0-beta.6.apk',
  assetName: 'here-v2.1.0-beta.6.apk',
  sizeBytes: 135860469,
  sizeFormatted: '129.6 MB',
  publishedAt: '2026-11-01T19:22:26Z',
  publishedDateFormatted: 'Nov 1, 2026',
  prerelease: true,
  releaseUrl: 'https://github.com/Meowtys/here-next/releases/tag/v2.1.0-beta.6',
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

export function parseReleasePayload(payload: unknown): ReleaseMetadata {
  if (!Array.isArray(payload) || payload.length === 0) {
    return { ...FALLBACK_RELEASE };
  }

  for (const item of payload) {
    if (!item || typeof item !== 'object') continue;
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
        : `https://github.com/Meowtys/here-next/releases/tag/${tagName}`;

    return {
      version: tagName,
      name: releaseName,
      buildNumber: FALLBACK_RELEASE.buildNumber,
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
