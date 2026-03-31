---
name: pictify
description: Generate images from HTML/CSS using Pictify — OG images, social cards, banners, screenshots, certificates, product images, email headers, and presentation slides. Includes pre-render validation, platform dimension presets, CSS patterns, and design guidance. Use when the user mentions 'pictify,' 'html to image,' 'generate image,' 'create image,' 'og image,' 'social card,' 'banner image,' or 'screenshot.'
metadata:
  tags: pictify, html-to-image, image-generation, og-image, social-card, banner, screenshot, certificate, generate-image
---

## When to use

Use this skill whenever you are generating images from HTML/CSS or URL screenshots using the Pictify API.

## API Overview

**Base URL**: `https://api.pictify.io`
**Authentication**: Bearer token via `Authorization: Bearer $PICTIFY_API_KEY` header
**Content-Type**: `application/json`

**API key resolution** — check in this order:
1. Check if `PICTIFY_API_KEY` is set in the environment (`echo $PICTIFY_API_KEY`). If present, use it directly — no need to ask the user.
2. If not in the environment, ask the user for their API key.
3. If they don't have one, direct them to:
   - Sign up at https://pictify.io
   - Go to https://pictify.io/dashboard/api-tokens
   - Create and copy a token

### Endpoint

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/image` | Generate image from HTML/CSS or a URL screenshot |

### Request body

```json
{
  "html": "<your HTML string>",
  "width": 1200,
  "height": 630,
  "fileExtension": "png"
}
```

### Example curl call

```bash
curl -X POST https://api.pictify.io/image \
  -H "Authorization: Bearer $PICTIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<html><head><link href=\"https://fonts.googleapis.com/css2?family=Inter:wght@700&display=swap\" rel=\"stylesheet\"></head><body style=\"margin:0;padding:0;\"><div style=\"position:absolute;top:0;left:0;width:1200px;height:630px;background:#1a1a2e;display:flex;align-items:center;justify-content:center;\"><h1 style=\"font-family:Inter,sans-serif;color:#fff;font-size:64px;\">Hello World</h1></div></body></html>",
    "width": 1200,
    "height": 630,
    "fileExtension": "png"
  }'
```

**Parameters**:
- `html` (string) — HTML/CSS content to render. Include inline CSS or `<style>` tags. Mutually exclusive with `url`.
- `url` (string) — Public URL to screenshot. Mutually exclusive with `html`.
- `width` (number, 1-4000, default 1200) — Image width in pixels.
- `height` (number, 1-4000, default 630) — Image height in pixels.
- `fileExtension` (string, default "png") — Output format: `png`, `jpeg`, or `webp`.
- `selector` (string, optional) — CSS selector to capture a specific element instead of the full page.

### Response

```json
{
  "url": "https://cdn.pictify.io/...",
  "id": "img_abc123"
}
```

The `url` is a CDN-backed hosted image URL ready for use.

## Critical rule

ALWAYS read [rules/validation-checklist.md](rules/validation-checklist.md) and run through the pre-flight checklist before every API call. This prevents the #1 failure: images rendering at wrong dimensions.

## How to use

Read the relevant rule file for your use case, then read the shared reference files for CSS and font guidance.

### Use-case rules

- [rules/og-image.md](rules/og-image.md) - Open Graph images for link previews (1200x630)
- [rules/social-card.md](rules/social-card.md) - Twitter, LinkedIn, Facebook, Instagram cards with platform-specific dimensions
- [rules/marketing-banner.md](rules/marketing-banner.md) - Promotional banners, ad creatives, hero images
- [rules/screenshot.md](rules/screenshot.md) - URL screenshot capture with viewport control
- [rules/certificate-badge.md](rules/certificate-badge.md) - Certificates, badges, ID cards, event passes
- [rules/product-image.md](rules/product-image.md) - E-commerce product images, catalog cards, comparison graphics
- [rules/email-header.md](rules/email-header.md) - Email header and banner images with email-client constraints
- [rules/presentation-slide.md](rules/presentation-slide.md) - Presentation slides, pitch deck visuals, keynote-style graphics

### Reference rules

- [rules/validation-checklist.md](rules/validation-checklist.md) - Pre-render validation checklist (READ THIS BEFORE EVERY RENDER)
- [rules/dimensions-reference.md](rules/dimensions-reference.md) - Platform dimension presets and safe zones
- [rules/css-patterns.md](rules/css-patterns.md) - CSS patterns that render reliably in Pictify's renderer
- [rules/fonts-and-typography.md](rules/fonts-and-typography.md) - Google Fonts loading, font stacks, and typography tips

## API Error Handling

When `POST /image` returns an error, take the following action:

| Status | Meaning | What to do |
|--------|---------|------------|
| 400 | Invalid request | Read the `detail` and `errors` fields from the response body. They describe exactly what's wrong (e.g., "width must be between 1 and 4000"). Fix the request and retry. |
| 401 | Invalid or expired API key | Tell the user their API key is invalid. Direct them to https://pictify.io/dashboard/api-tokens to create a new one. Do not retry. |
| 402 | Plan quota exceeded | Tell the user they've hit their plan's render limit. They can wait for the quota to reset or upgrade their plan at https://pictify.io/dashboard. Do not retry. |
| 408 | Request timeout | The HTML was too complex or external assets took too long to load. Simplify the HTML (remove external images, reduce DOM complexity), then retry once. |
| 429 | Rate limited | Wait the number of seconds in the `Retry-After` response header, then retry the same request. If no header, wait 5 seconds. |
| 5xx | Server error | Retry up to 2 times with increasing delays (2 seconds, then 4 seconds). If still failing after retries, tell the user the service is temporarily unavailable and to try again later. |
