// ── Gallery ──────────────────────────────────
// Images are read from public/gallery/<folder>/ at build & dev time.
// Delete a file from public/gallery and it disappears from the site automatically.

import galleryManifest from 'virtual:gallery-manifest';

const KNOWN_ACTIVITIES = [
  {
    folder: 'meeting',
    label: 'General MEETINGS',
    subtitle: '',
    sortOrder: 5,
  },
  {
    folder: '14 Jan',
    label: '14-JAN-2026',
    subtitle: 'Club Orientation',
    sortOrder: 1,
  },
  {
    folder: '12 Feb',
    label: '12-FEB-2026',
    subtitle: 'Gravitational Waves',
    sortOrder: 2,
  },
  {
    folder: '08 April',
    label: '08-APR-2026',
    subtitle: 'Staring the Starlight',
    sortOrder: 3,
  },

  {
    folder: 'Telescope',
    label: 'Making of TELESCOPE',
    subtitle: '',
    sortOrder: 4,
  },
  {
    folder: '07 Oct',
    label: '07-OCT-2026',
    subtitle: 'Talk By BANAMITA SARKAR',
    sortOrder: 6,
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
      sortOrder: -1 - idx,
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
  const sorted = [...GALLERY_ACTIVITIES].sort((a, b) => b.sortOrder - a.sortOrder);
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
