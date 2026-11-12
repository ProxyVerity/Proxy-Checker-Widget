# ProxyVerity Proxy Checker Widget

An embeddable proxy checker: one `<script>` tag puts a working checker on your
page. Your visitors paste proxies, we check them on our side, and the results
open on a page they can bookmark or share. Free, no account, and nothing to
install on your server.

**Build your snippet:** <https://proxyverity.github.io/Proxy-Checker-Widget/>
— pick the theme and colours, see the real widget change as you do, copy the
tag.

**Reference documentation:** <https://proxyverity.com/proxy-checker-widget/>
**Hosted checker:** <https://proxyverity.com/proxy-checker/>

---

## Quick start

```html
<script src="https://api.proxyverity.com/widget/embed.js"
        async
        data-width="100%"
        data-height="520"
        data-theme="light"></script>
```

The widget appears where the tag is, followed by a short credit line. That
line is the condition of use — see below.

## The credit line

The widget adds this underneath itself, in your page:

> Proxy checker by [ProxyVerity](https://proxyverity.com/)

**Keeping it visible is the condition of use.** The widget is free and the
credit is what it costs. It is a plain line of text with a plain link, and it
inherits your page's colour and typeface, so it reads as part of your design
rather than a sticker on top of it. `data-credit` and `data-credit-align` move
it where you want it.

What you may not do is hide it, shrink it below legibility, or make it
transparent. You could, in two lines of CSS — we are asking, not preventing.
It is also what Google expects of an attribution link, so a hidden one is a
problem for both of us.

The credit's text and destination are not configurable, and will not become
configurable.

## Options

| Attribute | Values | Default | Effect |
|---|---|---|---|
| `data-width` | any CSS width; a bare number means px | `100%` | container width |
| `data-height` | px or percent | `520` | starting height; the widget then resizes itself |
| `data-theme` | `light`, `dark`, `auto` | `light` | `auto` follows the visitor's OS setting |
| `data-accent` | `#rgb`, `#rrggbb` | `#2563eb` | button and links |
| `data-bg` | `#rgb`, `#rrggbb`, `transparent` | theme's | background |
| `data-fg` | `#rgb`, `#rrggbb` | theme's | main text |
| `data-border` | `#rgb`, `#rrggbb` | theme's | field and panel borders |
| `data-radius` | `0`–`24` | `6` | corner radius in px |
| `data-font` | `system`, `sans`, `serif`, `mono` | `sans` | typeface |
| `data-threshold` | integer | `50` | lists this size or smaller go in one request |
| `data-chunk-size` | integer | `50` | proxies per request for longer lists |
| `data-open-results` | `1`, `0` | `0` | `1` opens the results page in a new tab |
| `data-credit` | `below`, `above` | `below` | which side of the widget the credit sits on |
| `data-credit-align` | `left`, `center`, `right` | `left` | credit alignment |

Colours must be hex — `#ff8800` or `#f80`. Named colours and `rgb()` are not
accepted, and anything unreadable is replaced by the theme's own value, so a
typo leaves you with a working widget rather than a broken one.

`data-font` defaults to `sans` (Arial), which is what the widget has always
used. `system` uses the visitor's own interface font and usually blends in
better; it is recommended for new embeds rather than imposed on existing ones.

## Matching a design

The widget runs in an iframe, so your stylesheet cannot reach inside it —
these attributes are how your styling gets in.

```html
<script src="https://api.proxyverity.com/widget/embed.js"
        async
        data-theme="auto"
        data-accent="#ff8800"
        data-bg="transparent"
        data-radius="14"
        data-font="system"></script>
```

`data-bg="transparent"` lets your page show through instead of a white panel
sitting on it, which usually looks best on a coloured or patterned background.

Two things look after themselves: `data-theme="auto"` follows the visitor's
light or dark system setting, and the button's label colour is computed from
your accent, so a pale accent gets dark text instead of unreadable white.

## How it works

1. The tag loads a small loader script, which inserts a sandboxed iframe plus
   the credit line.
2. Visitors enter proxies as `IP:Port`, optionally with a protocol prefix.
   Lists of `data-threshold` or fewer go in one request; longer ones are sent
   in batches of `data-chunk-size`, about one a second, with progress shown.
3. Checking happens on our servers, so your visitors' browsers never connect
   to the proxies they are testing.
4. Results open on `/result.php?hash=…`, which has its own address. The widget
   does not render results row by row.
5. The iframe reports only its own height back to your page, over
   `postMessage`. Your page sends it nothing and never handles the proxy data.

If a visitor goes faster than the service allows they see a short wait message
and the widget retries by itself.

## Support

Questions and problems: <https://proxyverity.com/>
