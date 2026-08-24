import http from 'http';

interface BenchmarkOptions {
  hostname: string;
  port: number;
  path: string;
  totalRequests: number;
  concurrency: number;
}

async function runBenchmark(options: BenchmarkOptions): Promise<void> {
  const { hostname, port, path, totalRequests, concurrency } = options;
  let completed = 0;
  let successful = 0;
  let failed = 0;

  const startTime = Date.now();

  function makeRequest(): Promise<void> {
    return new Promise((resolve) => {
      const req = http.request(
        {
          hostname,
          port,
          path,
          method: 'GET',
          timeout: 5000,
        },
        (res) => {
          res.on('data', () => {}); // Consume response data stream
          res.on('end', () => {
            if (res.statusCode && res.statusCode >= 200 && res.statusCode < 400) {
              successful++;
            } else {
              failed++;
            }
            completed++;
            resolve();
          });
        }
      );

      req.on('error', () => {
        failed++;
        completed++;
        resolve();
      });

      req.on('timeout', () => {
        req.destroy();
        failed++;
        completed++;
        resolve();
      });

      req.end();
    });
  }

  async function worker(): Promise<void> {
    while (completed < totalRequests) {
      await makeRequest();
    }
  }

  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);

  const durationSec = (Date.now() - startTime) / 1000;
  console.log(`--- Benchmark Results ---`);
  console.log(`Total Requests: ${completed}`);
  console.log(`Successful: ${successful}`);
  console.log(`Failed/Timed out: ${failed}`);
  console.log(`Duration: ${durationSec.toFixed(2)}s`);
  console.log(`Requests/sec: ${(completed / durationSec).toFixed(2)}`);
}

// Example usage against a local development server
runBenchmark({
  hostname: 'localhost',
  port: 3000,
  path: '/api/health',
  totalRequests: 100,
  concurrency: 5,
});