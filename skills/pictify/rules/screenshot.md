---
name: screenshot
description: Capturing URL screenshots with viewport control using Pictify
metadata:
  tags: screenshot, url, webpage, capture, viewport
---

# URL Screenshots

Pictify can capture screenshots of live web pages by passing a `url` parameter instead of `html`. The renderer loads the page in a headless Chromium browser and captures it.

## Before You Start — Interactive Design Brief

**Always present options before capturing.** Follow the interactive design brief protocol in [SKILL.md](../SKILL.md). Present decisions in a single scannable message so the user can approve or adjust in one response.

**Screenshot-specific decisions to present:**
1. **URL** — Confirm the URL to capture. If missing, ask for it. Must be publicly accessible (not localhost, not behind login).
2. **Device viewport** — Present options with dimensions:
   - Desktop (1440x900) — recommended for most pages
   - Tablet (768x1024) — good for responsive testing
   - Mobile (375x812) — iPhone-sized viewport
   Suggest the most relevant option based on context (e.g., responsive landing page → offer both desktop and mobile).
3. **Capture area** — Present options:
   - Above-the-fold (default height) — captures what's visible without scrolling
   - Specific section — if they mention a section, confirm the CSS selector to use
   - Full viewport — larger height to capture more content
4. **Output format** — Default to PNG. Present JPEG/WebP as alternatives if file size matters.

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body**:
```json
{
  "url": "https://example.com",
  "width": 1440,
  "height": 900,
  "fileExtension": "png"
}
```

**Response**:
```json
{
  "url": "https://cdn.pictify.io/...",
  "id": "img_abc123"
}
```

### Parameters

- `url`: The full URL (must be publicly accessible via `http://` or `https://`). **Mutually exclusive** with `html`.
- `width`: Sets the viewport width — the page will render at this width (1-4000px)
- `height`: Sets the viewport height — the capture will include this much of the page (1-4000px)
- `selector`: Optional CSS selector to capture only a specific element on the page
- `fileExtension`: `png` (default), `jpeg`, or `webp`

## Key Constraints

### URL must be publicly accessible
The Pictify renderer runs on a remote server. It cannot access:
- `localhost` or `127.0.0.1` URLs
- URLs behind authentication (login walls)
- URLs behind firewalls or VPNs
- URLs that require cookies or session state
- Private network addresses (192.168.x.x, 10.x.x.x)

If the URL is not public, use the `html` parameter with the page's HTML content instead.

### JavaScript rendering
The renderer waits for the page to load before capturing. Single-page apps (React, Vue, etc.) that render via JavaScript are supported — the renderer waits for the initial render to complete. However, content that loads asynchronously after initial render (lazy-loaded images, infinite scroll content) may not be captured.

### Width controls the viewport
The `width` parameter acts as the browser viewport width. Responsive websites will adapt their layout to this width:
- `width: 1440` — Desktop layout
- `width: 1024` — Tablet layout
- `width: 375` — Mobile layout

### Height controls the capture area
The `height` parameter determines how much of the page is captured vertically. If the page is longer than the height, only the top portion is captured (no scrolling).

## Common Screenshot Sizes

| Use Case | Width | Height | Notes |
|----------|-------|--------|-------|
| Desktop full page (above fold) | 1440 | 900 | Standard desktop viewport |
| Desktop wide | 1920 | 1080 | Full HD viewport |
| Tablet | 1024 | 768 | iPad-like viewport |
| Mobile | 375 | 812 | iPhone-like viewport |
| Product screenshot for marketing | 1200 | 800 | Good for embedding in presentations |
| App store / preview | 1280 | 800 | Common for product hunt, app listings |

## Using the `selector` Parameter

To capture a specific element instead of the full page:

```json
{
  "url": "https://example.com",
  "width": 1440,
  "height": 900,
  "selector": ".hero-section",
  "fileExtension": "png"
}
```

- `selector: ".hero-section"` — Captures only the hero section
- `selector: "#pricing"` — Captures only the pricing table
- `selector: ".card:first-child"` — Captures the first card element

When using `selector`:
- The output image dimensions match the selected element's rendered size, regardless of the `width`/`height` params
- The element must be visible (not `display: none` or off-screen)

## Common Mistakes

- **Non-public URL**: The #1 error. If you get a blank or error image, verify the URL is publicly accessible.
- **Cookie/auth walls**: Pages behind login screens will capture the login page, not the intended content.
- **Dynamic content not loaded**: Content that loads after user interaction (click to expand, scroll to load) will not be in the screenshot.
- **Wrong viewport width**: A mobile-responsive site at `width: 1440` looks very different from `width: 375`. Choose the viewport that matches your intended display.
