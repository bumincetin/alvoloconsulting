
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const workerPath = '.open-next/worker.js';
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
        'npx esbuild .open-next/worker.js --bundle --outfile=.open-next/assets/_worker.js --target=esnext --format=esm --platform=neutral --main-fields=browser,module,main --conditions=worker,browser --inject:./scripts/polyfill.js --external:node:* --external:cloudflare:* --external:workerd:* --external:async_hooks --external:fs --external:path --external:os --external:url --external:vm --external:stream --external:events --external:util --external:buffer --external:string_decoder --external:querystring --external:http --external:https --external:net --external:tls --external:crypto --external:zlib --external:child_process --external:worker_threads --external:diagnostics_channel --external:perf_hooks --external:dgram --external:dns --external:console --external:process',
        { stdio: 'inherit' }
    );
    console.log('Bundled _worker.js successfully');
} catch (e) {
    console.error('Bundling failed', e);
    process.exit(1);
}
