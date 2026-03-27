---
name: fonts-and-typography
description: Loading Google Fonts, font stacks, and typography best practices for Pictify renders
metadata:
  tags: fonts, google-fonts, typography, text, font-loading
---

# Fonts and Typography

## Loading Google Fonts

The ONLY reliable way to load custom fonts in Pictify HTML renders is via a `<link>` tag in the `<head>`:

```html
<head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap" rel="stylesheet">
</head>
```

### Key rules

1. **Always use `<link>` tags, not `@import`** — `@import` in CSS may not resolve before the renderer captures the page.

2. **Specify the weights you need** — Only request the weights you actually use. Each weight adds load time. Use `wght@400;700` syntax for multiple weights.

3. **Add `&display=swap`** — This ensures the font is applied once loaded.

4. **Font family name must match exactly** — CSS `font-family` is case-sensitive and must match the Google Fonts name exactly. `'Inter'` not `'inter'`.

5. **Use a fallback stack** — Always specify fallback fonts: `font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;`

### Loading multiple fonts

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&family=Playfair+Display:wght@700&display=swap" rel="stylesheet">
```

Use `&family=FontName` to chain multiple fonts in a single request.

### Variable fonts

Google Fonts supports variable fonts with weight ranges:

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap" rel="stylesheet">
```

## Recommended Font Pairings

### Professional / Business
- **Headlines**: Inter (700) — Clean, modern, highly legible
- **Body**: Inter (400) — Pairs naturally with itself

### Editorial / Blog
- **Headlines**: Playfair Display (700) — Elegant serif
- **Body**: Source Sans Pro (400) — Readable sans-serif

### Technical / Developer
- **Headlines**: JetBrains Mono (700) — Monospace with character
- **Body**: Inter (400) — Clean companion

### Creative / Bold
- **Headlines**: Space Grotesk (700) — Geometric, distinctive
- **Body**: DM Sans (400) — Soft, friendly

### Startup / Modern
- **Headlines**: Plus Jakarta Sans (700) — Contemporary geometric
- **Body**: Plus Jakarta Sans (400) — Consistent feel

## Typography Scale

For image rendering, use a consistent type scale. These sizes work well at common image dimensions:

### For 1200x630 (OG images, social cards)
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Main headline | 48-64px | 700 | 1.1 |
| Subtitle | 22-28px | 400 | 1.3 |
| Body text | 18-20px | 400 | 1.5 |
| Caption/meta | 14-16px | 400 | 1.4 |
| Tag/label | 12-14px | 600 | 1.0 |

### For 1080x1080 (Square social posts)
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Main headline | 56-80px | 700 | 1.1 |
| Subtitle | 28-36px | 400 | 1.3 |
| Body text | 22-26px | 400 | 1.5 |
| Caption/meta | 16-18px | 400 | 1.4 |

### For 1920x1080 (Presentations)
| Element | Size | Weight | Line Height |
|---------|------|--------|-------------|
| Main headline | 72-96px | 700 | 1.05 |
| Subtitle | 32-40px | 400 | 1.3 |
| Body text | 24-28px | 400 | 1.5 |
| Caption/meta | 18-20px | 400 | 1.4 |

## Typography Tips

### Letter spacing
- Headlines benefit from slight negative tracking: `letter-spacing: -0.02em;`
- Small text (labels, captions) benefits from positive tracking: `letter-spacing: 0.05em;`
- UPPERCASE text needs extra tracking: `letter-spacing: 0.1em;`

### Preventing text overflow
For dynamic content where text length is unknown, always protect against overflow:

```css
.title {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
```

### Color and contrast
- White text on dark backgrounds: use `#ffffff` or `rgba(255,255,255,0.9)` for headlines, `rgba(255,255,255,0.7)` for body text
- Dark text on light backgrounds: use `#1a1a1a` for headlines, `#4a4a4a` for body text
- Never place text directly on a busy image without a gradient overlay or backdrop

### Emoji support
The Pictify renderer supports emoji natively. Emoji can be used in text content without special handling. Note that emoji appearance depends on the renderer's OS (Chromium on Linux) — emoji may render differently than on macOS or Windows.
