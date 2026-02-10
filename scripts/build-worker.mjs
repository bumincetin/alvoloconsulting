
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const workerPath = '.open-next-v2/worker.js';
const content = fs.readFileSync(workerPath, 'utf8');

// Patch the file to comment out unused exports that cause build failures
const patched = content.replace(
    /export \{ (DOQueueHandler|DOShardedTagCache|BucketCachePurge) \} from/g,
    '// export { $1 } from'
);

fs.writeFileSync(workerPath, patched);

console.log('Patched worker.js');

// Bundle with esbuild
try {
    execSync(
        'npx esbuild .open-next-v2/worker.js --bundle --outfile=.open-next-v2/assets/_worker.js --target=esnext --format=esm --platform=node --external:cloudflare:* --external:workerd:*',
        { stdio: 'inherit' }
    );
    console.log('Bundled _worker.js successfully');
} catch (e) {
    console.error('Bundling failed', e);
    process.exit(1);
}
