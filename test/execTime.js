const { PerformanceObserver, performance } = require('perf_hooks');

const obs = new PerformanceObserver((items) => {
  console.log(`Execution took ${items.getEntries()[0].duration} ms.`);
  performance.clearMarks();
});
obs.observe({ entryTypes: ['measure'] });

main()

async function main() {

}