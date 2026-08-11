// ── Gallery ──────────────────────────────────
// Images are read from public/gallery/<folder>/ at build & dev time.
// Delete a file from public/gallery and it disappears from the site automatically.

import galleryManifest from 'virtual:gallery-manifest';

const GALLERY_ACTIVITIES = [
  {
    key: 'MEETING',
    folder: 'meeting',
    label: 'MEETING',
    sortOrder: 5,
  },
  {
    key: 'APR_08',
    folder: '08 April',
    label: '08 // APR',
    sortOrder: 4,
  },
  {
    key: 'FEB_12',
    folder: '12 Feb',
    label: '12 // FEB',
    sortOrder: 3,
  },
  {
    key: 'JAN_14',
    folder: '14 Jan',
    label: '14 // JAN',
    sortOrder: 2,
  },
  {
    key: 'TELESCOPE',
    folder: 'Telescope',
    label: 'TELESCOPE',
    sortOrder: 1,
  },
];

function gallerySrc(folder, filename) {
  return `/gallery/${folder}/${filename}`;
}

function getActivityFilenames(activity) {
  return galleryManifest[activity.folder] ?? [];
}

function buildActivityImages(activity) {
  return getActivityFilenames(activity).map((filename) => ({
    category: activity.key,
    activityLabel: activity.label,
    src: gallerySrc(activity.folder, filename),
  }));
}

/** Pick up to `maxTotal` images across recent activities, 2–3 per activity. */
function buildAllLogsPreview(maxTotal = 12) {
  const sorted = [...GALLERY_ACTIVITIES].sort((a, b) => b.sortOrder - a.sortOrder);
  const baseCount = Math.floor(maxTotal / sorted.length);
  const remainder = maxTotal % sorted.length;
  const used = new Map(sorted.map((a) => [a.key, 0]));

  const result = [];
  for (let i = 0; i < sorted.length && result.length < maxTotal; i++) {
    const activity = sorted[i];
    const take = Math.min(baseCount + (i < remainder ? 1 : 0), 3, getActivityFilenames(activity).length);
    const images = buildActivityImages(activity).slice(0, take);
    result.push(...images);
    used.set(activity.key, take);
  }

  for (const activity of sorted) {
    if (result.length >= maxTotal) break;
    const already = used.get(activity.key) ?? 0;
    const remaining = buildActivityImages(activity).slice(already, already + 3);
    for (const image of remaining) {
      if (result.length >= maxTotal) break;
      result.push(image);
    }
  }

  return result;
}

export const GALLERY_IMAGES = GALLERY_ACTIVITIES.flatMap(buildActivityImages);

export const ALL_LOGS_PREVIEW = buildAllLogsPreview(12);

export const FILTER_TABS = [
  { key: 'ALL', label: 'ALL LOGS' },
  ...GALLERY_ACTIVITIES.filter((a) => getActivityFilenames(a).length > 0).map(({ key, label }) => ({
    key,
    label,
  })),
];
