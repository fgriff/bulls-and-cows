import { copyFile, mkdir } from 'node:fs/promises';

const INDEX_HTML_SOURCE = 'index.html';
const INDEX_HTML_DEST = 'dist/index.html';

const STYLES_SOURCE = 'src/app/styles.css';
const STYLES_DEST = 'dist/styles.css';

const FAVICON_SOURCE = 'src/assets/favicon.png';
const FAVICON_DEST = 'dist/favicon.png';

try {
  await copyFile(INDEX_HTML_SOURCE, INDEX_HTML_DEST);

  await copyFile(STYLES_SOURCE, STYLES_DEST);

  await mkdir('dist/assets', { recursive: true });

  await copyFile(FAVICON_SOURCE, FAVICON_DEST);
} catch {
  process.exit(1);
}
