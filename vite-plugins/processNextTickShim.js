// Shim for process.nextTick — required by end-of-stream and other Node.js
// packages in the ThirdWeb SDK dependency tree.
// The vite-plugin-node-polyfills provides a `process` object but it does NOT
// include nextTick. This plugin injects a minimal nextTick shim at the top
// of every client bundle entry.

/** @returns {import('vite').Plugin} */
export default function processNextTickShim() {
  return {
    name: 'process-nexttick-shim',
    enforce: /** @type {const} */ ('pre'),
    transformIndexHtml(html) {
      return {
        html,
        tags: [
          {
            tag: 'script',
            attrs: { type: 'module' },
            children: `
              if (typeof globalThis.process === 'undefined') {
                globalThis.process = {};
              }
              if (typeof globalThis.process.nextTick !== 'function') {
                globalThis.process.nextTick = function(fn) {
                  var args = Array.prototype.slice.call(arguments, 1);
                  queueMicrotask(function() { fn.apply(null, args); });
                };
              }
            `,
            injectTo: 'head-prepend',
          },
        ],
      };
    },
  };
}
