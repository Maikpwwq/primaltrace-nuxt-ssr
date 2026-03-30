// Browser-safe stub for end-of-stream.
// The real end-of-stream does process.nextTick.bind(process) at module scope,
// which crashes because the browser process polyfill lacks nextTick.
// This is only used as a transitive dependency by ThirdWeb SDK —
// actual stream ending detection is not needed in the browser.
export default function eos(stream, opts, callback) {
  if (typeof opts === 'function') {
    callback = opts;
    opts = {};
  }
  if (!callback) callback = function () {};
  // No-op in browser — just call back immediately on next tick
  queueMicrotask(function () {
    callback();
  });
  return function () {}; // return a no-op cleanup function
};

export { eos };
