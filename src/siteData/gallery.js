// ── Gallery ──────────────────────────────────
// Images are read from public/gallery/<folder>/ at build & dev time.
// Delete a file from public/gallery and it disappears from the site automatically.

import galleryManifest from 'virtual:gallery-manifest';

const KNOWN_ACTIVITIES = [
  {
    folder: 'meeting',
    label: 'MEETING',
    subtitle: '',
    sortOrder: 1,
  },
  {
    folder: '08 April',
    label: '08 // APR',
    subtitle: '',
    sortOrder: 2,
  },
  {
    folder: '12 Feb',
    label: '12 // FEB',
    subtitle: '',
    sortOrder: 3,
  },
  {
    folder: '14 Jan',
    label: '14 // JAN',
    subtitle: '',
    sortOrder: 4,
  },
  {
    folder: 'Telescope',
    label: 'TELESCOPE',
    subtitle: '',
    sortOrder: 5,
  },
];

function formatFolderLabel(folder) {
  const dateMatch = folder.match(/^(\d{1,2})\s*([a-zA-Z]+)$/i);
  if (dateMatch) {
    return `${dateMatch[1].padStart(2, '0')} // ${dateMatch[2].slice(0, 3).toUpperCase()}`;
  }
  return folder.toUpperCase();
}

function getDynamicActivities() {
  const known = new Set(KNOWN_ACTIVITIES.map((a) => a.folder.toLowerCase()));
  return Object.keys(galleryManifest)
    .filter((folder) => !known.has(folder.toLowerCase()) && (galleryManifest[folder]?.length ?? 0) > 0)
    .map((folder, idx) => ({
      folder,
      label: formatFolderLabel(folder),
      subtitle: '',
      sortOrder: 100 + idx,
    }));
}

export const GALLERY_ACTIVITIES = [...KNOWN_ACTIVITIES, ...getDynamicActivities()];

/**
 * Optional image subheadings configuration map.
 * Map specific image paths or filenames to custom subheading strings (e.g. meeting dates).
 *
 * Keys can be:
 * - Full path: '/gallery/meeting/03 june.jpg'
 * - Relative folder path: 'meeting/03 june.jpg'
 * - Filename only: '03 june.jpg'
 *
 * If an image is not listed in this map, its subheading remains completely blank.
 */
export const IMAGE_SUBHEADINGS = {
  '/gallery/meeting/03 june.jpg': '03 // JUNE',
  '/gallery/meeting/06 may.jpg': '06 // MAY',
};

function gallerySrc(folder, filename) {
  return `/gallery/${folder}/${filename}`;
}

function getActivityFilenames(activity) {
  return galleryManifest[activity.folder] ?? [];
}

function buildActivityImages(activity) {
  return getActivityFilenames(activity).map((filename) => {
    const src = gallerySrc(activity.folder, filename);
    const subheading =
      IMAGE_SUBHEADINGS[src] ??
      IMAGE_SUBHEADINGS[`${activity.folder}/${filename}`] ??
      IMAGE_SUBHEADINGS[filename] ??
      undefined;

    return {
      category: activity.folder,
      activityLabel: activity.label,
      src,
      subheading,
    };
  });
}

/** Pick up to `maxTotal` images across recent activities, 2–3 per activity. */
function buildAllLogsPreview(maxTotal = 12) {
  const sorted = [...GALLERY_ACTIVITIES].sort((a, b) => a.sortOrder - b.sortOrder);
  const baseCount = Math.floor(maxTotal / sorted.length);
  const remainder = maxTotal % sorted.length;
  const used = new Map(sorted.map((a) => [a.folder, 0]));

  const result = [];
  for (let i = 0; i < sorted.length && result.length < maxTotal; i++) {
    const activity = sorted[i];
    const take = Math.min(baseCount + (i < remainder ? 1 : 0), 3, getActivityFilenames(activity).length);
    const images = buildActivityImages(activity).slice(0, take);
    result.push(...images);
    used.set(activity.folder, take);
  }

  for (const activity of sorted) {
    if (result.length >= maxTotal) break;
    const already = used.get(activity.folder) ?? 0;
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
  { folder: 'ALL', label: 'ALL LOGS' },
  ...GALLERY_ACTIVITIES.filter((a) => getActivityFilenames(a).length > 0).map(({ folder, label, subtitle }) => ({
    folder,
    label,
    subtitle,
  })),
];
