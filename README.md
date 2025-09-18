# ProxyLib Widget

An embeddable proxy checker widget that allows websites to integrate ProxyLib's proxy testing functionality directly into their pages.

## Overview

The ProxyLib Widget is a lightweight, embeddable solution that provides a seamless way for users to check proxy server functionality without leaving your website. It consists of a JavaScript embed script and a PHP-based widget interface that communicates with the ProxyLib backend.

## Features

- **Easy Integration**: Single script tag embedding
- **Responsive Design**: Adapts to different screen sizes and container widths
- **Theme Support**: Light and dark themes
- **Batch Processing**: Handles large proxy lists automatically
- **Real-time Results**: Dynamic result display with progress tracking
- **Iframe Security**: Sandboxed iframe with secure communication
- **Mobile Optimized**: Touch-friendly interface for mobile devices

## Quick Start

### Basic Embedding

Add this script tag to your HTML page:

```html
<script src="https://panel.proxylib.com/widget/embed.js"></script>
```

### Recommended Configuration

```html
<script src="https://panel.proxylib.com/widget/embed.js"
        async
        data-width="100%"
        data-height="520"
        data-theme="light"></script>
```

### Complete Configuration

```html
<script src="https://panel.proxylib.com/widget/embed.js"
        async
        data-width="100%"
        data-height="520"
        data-theme="light"
        data-threshold="50"
        data-chunk-size="50"
        data-open-results="0"></script>
```

## Configuration Options

The widget supports several data attributes for customization:

| Attribute | Type | Default | Description |
|-----------|------|---------|-------------|
| `data-width` | string | `"100%"` | Widget width (CSS units or percentage) |
| `data-height` | string | `"520"` | Widget height in pixels |
| `data-theme` | string | `"light"` | Theme: `"light"` or `"dark"` |
| `data-threshold` | number | `50` | Max proxies for direct processing (larger lists are chunked) |
| `data-chunk-size` | number | `50` | Number of proxies per chunk for large lists |
| `data-open-results` | number | `1` | Open results in new tab (`1`) or same frame (`0`) |

## Themes

### Light Theme
- Clean, bright interface
- Suitable for most websites
- Default theme

### Dark Theme
- Dark background with light text
- Ideal for dark-themed websites
- Set with `data-theme="dark"`

## How It Works

1. **Embed**: The JavaScript embed script creates an iframe containing the widget
2. **Input**: Users enter proxy lists in `IP:Port` format (with optional protocol prefixes)
3. **Processing**:
   - Small lists (≤ threshold): Processed immediately
   - Large lists: Split into chunks and processed sequentially
4. **Results**: Links to result pages are displayed within the widget
5. **Communication**: Secure postMessage communication between iframe and parent

## Technical Details

### Security Features

- **Iframe Sandbox**: Restricts widget capabilities for security
- **Referrer Policy**: `no-referrer` to protect privacy
- **Origin Validation**: Ensures secure cross-frame communication
- **Token-based Communication**: Prevents message hijacking

### Auto-Resizing

The widget automatically adjusts its height based on content using:
- `ResizeObserver` API for modern browsers
- `MutationObserver` for content changes
- Fallback event listeners for compatibility

## Browser Support

- **Modern Browsers**: Full functionality with all features
- **Legacy Support**: Graceful degradation for older browsers
- **Mobile**: Optimized touch interface and responsive design

## Support

For support and documentation, visit [ProxyLib.com](https://proxylib.com)
