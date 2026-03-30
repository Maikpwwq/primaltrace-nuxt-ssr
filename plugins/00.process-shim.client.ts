// Ensures process.nextTick exists before any ThirdWeb SDK code runs.
// Required because end-of-stream does process.nextTick.bind(process)
// and the vite-plugin-node-polyfills process shim doesn't include nextTick.
export default defineNuxtPlugin({
  name: 'process-nexttick-shim',
  enforce: 'pre',
  setup() {
    if (import.meta.client) {
      const g = globalThis as any;
      if (!g.process) {
        g.process = {};
      }
      if (typeof g.process.nextTick !== 'function') {
        g.process.nextTick = function (fn: Function, ...args: any[]) {
          queueMicrotask(() => fn(...args));
        };
      }
    }
  },
});
