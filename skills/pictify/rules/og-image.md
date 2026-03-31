---
name: og-image
description: Creating Open Graph images for link previews shared on Facebook, LinkedIn, Slack, Discord, and other platforms
metadata:
  tags: og, opengraph, link-preview, social, meta, facebook, linkedin, slack, discord
---

# Open Graph (OG) Images

OG images appear when a link is shared on Facebook, LinkedIn, Slack, Discord, iMessage, WhatsApp, and most other platforms. They are the most common use case for HTML-to-image generation.

## Before You Start — Interactive Design Brief

**Always present a design brief with options before generating.** Follow the interactive design brief protocol in [SKILL.md](../SKILL.md). Present decisions in a single scannable message so the user can approve or adjust in one response.

**OG image-specific decisions to present:**
1. **Dimensions** — Default to 1200x630 (universal). Only present alternatives if the user's context suggests a non-standard format (e.g., Twitter `summary` card → 800x800).
2. **Color palette** — Present 2-3 palette options inferred from the content topic, brand, or industry. A developer tutorial → dark/code-themed palettes; a lifestyle blog → warm/airy palettes; a SaaS product → clean gradients with brand colors.
3. **Typography** — Present 2-3 font pairings suited to the tone. Editorial content → serif headlines; tech/SaaS → geometric sans-serif; bold/punchy → heavy weights.
4. **Layout** — Present 2-3 layouts suited to the content:
   - Gradient background + centered text (clean, always readable)
   - Left text / right image split (good when there's a relevant visual)
   - Full-bleed image with text overlay (needs dark gradient for readability)
   - Branded card (logo in corner, title centered, brand colors)
5. **Assets** — Ask if they have a logo URL, brand mark, or image to include. These can't be inferred.

## Dimensions

- **Standard**: 1200 x 630 px (1.91:1 aspect ratio)
- This is universal — all major platforms support it
- Keep key content within the inner 80% (safe zone: 120px margin on each side)

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body**:
```json
{
  "html": "<your HTML string>",
  "width": 1200,
  "height": 630,
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

The `url` is a CDN-backed hosted image URL you can use directly in `<meta property="og:image">` tags.

## Design Guidelines

### Content hierarchy
1. **Primary**: Headline or title — the most important text. Should be readable at small sizes (OG images are often shown at ~600px wide or smaller).
2. **Secondary**: Subtitle, description, or tagline — supporting context.
3. **Tertiary**: Logo, author name, URL, date — brand identification.

### Text sizing
- Headlines: 48-64px at 1200px width. Go larger (64px) for short titles (under 6 words). Go smaller (48px) for longer titles.
- Subtitles: 22-28px
- Clamp long titles to 2-3 lines to prevent overflow

### Visual patterns that work well for OG images
- **Gradient background + centered text**: Clean, fast to generate, always readable
- **Left text / right image split**: Good when there's a relevant visual
- **Full-bleed image with text overlay**: Needs a dark gradient overlay for readability
- **Branded card**: Logo in corner, title centered, brand colors as background

### Branding
- Include a logo or site name so viewers know the source
- Use consistent brand colors across all OG images for recognition
- Place logo in a consistent position (top-left or bottom-left is common)

## Pre-Render Checklist

Before calling the API, verify:
1. Root container has `width: 1200px; height: 630px; position: absolute; top: 0; left: 0;`
2. `body { margin: 0; padding: 0; }`
3. Google Fonts loaded via `<link>` tag
4. Long titles are clamped with `-webkit-line-clamp` or truncated
5. Text is readable at 600px display width (the common embed size)
6. Sufficient contrast between text and background

See [validation-checklist.md](validation-checklist.md) for the full 11-point check.

## Platform-Specific Notes

### Facebook / LinkedIn
- Display at approximately 500-600px wide in feed
- Title text below 48px may be hard to read at display size
- These platforms cache OG images aggressively — if you update the image, you may need to clear their cache (Facebook Sharing Debugger, LinkedIn Post Inspector)

### Twitter
- If using `twitter:card` meta tag with value `summary_large_image`, the 1200x630 format works
- Twitter crops slightly to ~2:1 on mobile — keep content vertically centered in the middle 600px of height
- If `twitter:card` is `summary`, use 800x800 instead (square)

### Slack / Discord
- Render at smaller sizes in chat — prioritize large, bold text
- Discord shows a thin preview; keep the design simple

## Common Mistakes

- **Text too small**: OG images are displayed much smaller than their actual pixel size. Test readability by viewing your design at 50% zoom.
- **Too much content**: OG images should communicate ONE idea. A title and a logo is often enough.
- **No fallback for long titles**: User-generated titles can be any length. Always clamp or truncate.
- **Missing font `<link>` tag**: Results in the wrong font rendering.
