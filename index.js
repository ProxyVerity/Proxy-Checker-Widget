/**
 * proxyverity-widget — a thin wrapper around the hosted ProxyVerity proxy
 * checker widget.
 *
 * This package contains no checking logic and no copy of the loader. It builds
 * the same <script> tag you would paste by hand and lets the hosted loader at
 * api.proxyverity.com do the rest, so a change on our side reaches you without
 * a release on yours.
 *
 * Docs: https://proxyverity.com/proxy-checker-widget/
 * Snippet builder: https://proxyverity.github.io/Proxy-Checker-Widget/
 */

/** URL of the hosted loader. */
export const EMBED_SRC = 'https://api.proxyverity.com/widget/embed.js';

/**
 * Option name -> data attribute. Anything not listed here is ignored, so a
 * typo cannot silently become an attribute the loader does not understand.
 *
 * The credit's anchor text and destination are deliberately absent: they are
 * fixed in the loader and are not configurable here or anywhere else.
 */
const ATTRIBUTES = {
  width: 'data-width',
  height: 'data-height',
  theme: 'data-theme',
  accent: 'data-accent',
  bg: 'data-bg',
  fg: 'data-fg',
  border: 'data-border',
  radius: 'data-radius',
  font: 'data-font',
  threshold: 'data-threshold',
  chunkSize: 'data-chunk-size',
  openResults: 'data-open-results',
  credit: 'data-credit',
  creditAlign: 'data-credit-align',
};

/**
 * Values are passed through untouched. They are validated server-side, where
 * an invalid one falls back to the theme's default without an error. Checking
 * them again here would mean two sets of rules that can disagree.
 */
function applyOptions(script, options) {
  for (const [key, attribute] of Object.entries(ATTRIBUTES)) {
    const value = options[key];
    if (value === undefined || value === null || value === '') continue;
    script.setAttribute(attribute, String(value));
  }
}

/**
 * Build the <script> element without inserting it. Useful when you want to
 * place it yourself, or to inspect what would be inserted.
 *
 * @param {Object} [options] see ATTRIBUTES above
 * @returns {HTMLScriptElement}
 */
export function createEmbedScript(options = {}) {
  const script = document.createElement('script');
  script.src = EMBED_SRC;
  script.async = true;
  applyOptions(script, options);
  return script;
}

/**
 * Insert the widget into the page.
 *
 * The loader places the widget immediately after its own <script> tag, so the
 * tag is appended inside `target` and the widget appears there.
 *
 * @param {Element|string} [target] element or CSS selector; defaults to <body>
 * @param {Object} [options] see ATTRIBUTES above
 * @returns {HTMLScriptElement} the inserted script element
 */
export function mount(target, options = {}) {
  if (typeof document === 'undefined') {
    throw new Error(
      'proxyverity-widget: mount() needs a DOM. Call it in the browser, not during server rendering.'
    );
  }

  // mount({ theme: 'dark' }) — target omitted, options passed first.
  if (target && typeof target === 'object' && !(target instanceof Element)) {
    options = target;
    target = undefined;
  }

  const element =
    typeof target === 'string' ? document.querySelector(target) : target || document.body;

  if (!element) {
    throw new Error(`proxyverity-widget: no element matched ${JSON.stringify(target)}`);
  }

  const script = createEmbedScript(options);
  element.appendChild(script);
  return script;
}

/**
 * The snippet as a string, for server-side rendering or for pasting into a
 * template. Attribute values are escaped for an HTML attribute context.
 *
 * @param {Object} [options] see ATTRIBUTES above
 * @returns {string}
 */
export function embedTag(options = {}) {
  const escape = (value) =>
    String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

  const attributes = Object.entries(ATTRIBUTES)
    .filter(([key]) => {
      const value = options[key];
      return value !== undefined && value !== null && value !== '';
    })
    .map(([key, attribute]) => `\n        ${attribute}="${escape(options[key])}"`)
    .join('');

  return `<script src="${EMBED_SRC}"\n        async${attributes}></script>`;
}

export default { EMBED_SRC, createEmbedScript, mount, embedTag };
