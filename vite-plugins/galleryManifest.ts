import fs from 'node:fs';
import path from 'node:path';
import type { Plugin } from 'vite';

const VIRTUAL_MODULE_ID = 'virtual:gallery-manifest';
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID;
const IMAGE_EXT = /\.(jpe?g|png|webp|gif)$/i;

function sortFilenames(a: string, b: string): number {
  const numA = parseInt(a, 10);
  const numB = parseInt(b, 10);
  if (!Number.isNaN(numA) && !Number.isNaN(numB)) return numA - numB;
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function scanGalleryManifest(galleryRoot: string): Record<string, string[]> {
  if (!fs.existsSync(galleryRoot)) return {};

  const manifest: Record<string, string[]> = {};

  for (const entry of fs.readdirSync(galleryRoot, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;

    const folderPath = path.join(galleryRoot, entry.name);
    const images = fs
      .readdirSync(folderPath)
      .filter((file) => IMAGE_EXT.test(file))
      .sort(sortFilenames);

    if (images.length > 0) {
      manifest[entry.name] = images;
    }
  }

  return manifest;
}

export function galleryManifestPlugin(): Plugin {
  let galleryRoot = '';

  const loadManifest = () => {
    const manifest = scanGalleryManifest(galleryRoot);
    return `export default ${JSON.stringify(manifest)}`;
  };

  return {
    name: 'gallery-manifest',
    configResolved(config) {
      galleryRoot = path.resolve(config.root, 'public', 'gallery');
    },
    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) return RESOLVED_VIRTUAL_MODULE_ID;
    },
    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) return loadManifest();
    },
    configureServer(server) {
      server.watcher.add(path.join(galleryRoot, '**'));
      const invalidate = (file: string) => {
        if (!file.includes(path.join('public', 'gallery'))) return;
        const mod = server.moduleGraph.getModuleById(RESOLVED_VIRTUAL_MODULE_ID);
        if (mod) {
          server.moduleGraph.invalidateModule(mod);
          server.ws.send({ type: 'full-reload' });
        }
      };
      server.watcher.on('add', invalidate);
      server.watcher.on('unlink', invalidate);
      server.watcher.on('change', invalidate);
    },
  };
}
