---
name: pictify
description: Generate images and short videos from HTML/CSS or a text prompt using Pictify — OG images, social cards, banners, screenshots, certificates, product images, email headers, presentation slides, reusable Handlebars HTML templates, and AI-generated video templates. Includes pre-render validation, platform dimension presets, CSS patterns, and design guidance. Use when the user mentions 'pictify,' 'html to image,' 'generate image,' 'create image,' 'og image,' 'social card,' 'banner image,' 'screenshot,' 'pictify template,' 'handlebars template,' or 'pictify video.'
metadata:
  tags: pictify, html-to-image, image-generation, og-image, social-card, banner, screenshot, certificate, generate-image, handlebars, templates, video
---

## When to use

Use this skill whenever you are generating images or short videos from HTML/CSS, URL screenshots, or a text prompt using the Pictify API.

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

### Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/image` | One-shot image from HTML/CSS or a URL screenshot |
| POST | `/templates` | Create a reusable HTML/Handlebars template (`engine: "html"`) |
| POST | `/templates/:uid/render` | Render a saved template with variable values |
| POST | `/templates/preview` | Live preview from in-flight HTML body (no quota consumed) |
| POST | `/video/templates/generate` | AI-author a video template from a text prompt |
| POST | `/video/templates/:uid/render` | Render a video template to mp4 or gif |

Use `POST /image` for one-off image renders. Use the HTML template endpoints when the same design will be rendered repeatedly with different values (personalized cards, batch jobs, OG images per blog post) — see [rules/html-templates.md](rules/html-templates.md). For video, see [rules/video-templates.md](rules/video-templates.md).

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
- `width` (number, default 1280) — Image width in pixels. Set explicitly for anything other than a generic screenshot — e.g. 1200 for standard OG images.
- `height` (number, default 720) — Image height in pixels. Set explicitly to match your target platform's dimensions.
- `fileExtension` (string, default "png") — Output format: `png`, `jpeg` (or `jpg`), or `webp`.
- `selector` (string, optional) — CSS selector to capture a specific element instead of the full page.

### Response

```json
{
  "url": "https://cdn.pictify.io/...",
  "id": "img_abc123",
  "createdAt": "2026-08-09T12:00:00.000Z"
}
```

The `url` is a CDN-backed hosted image URL ready for use.

## Critical rules

### 1. Pre-flight validation
ALWAYS read [rules/validation-checklist.md](rules/validation-checklist.md) and run through the pre-flight checklist before every API call. This prevents the #1 failure: images rendering at wrong dimensions.

### 2. Interactive design brief — ALWAYS collect before rendering

**Never generate an image without first presenting design decisions to the user.** The goal is to get the desired output in one render, not iterate through trial and error. Before every image generation, present the user with a structured design brief containing options for each decision.

**How to present options:**
- For each design decision, present 2-3 contextually relevant options (not generic lists). Infer these from the user's request, the use case, industry, and audience.
- Use a clear, scannable format. Group decisions logically.
- Include a recommended option with a brief reason why, so the user can quickly approve or override.
- The user should be able to respond in one message (e.g., "go with your recommendations" or "option B for color, option A for everything else").

**What to always cover (adapt to use case):**
1. **Dimensions / format** — Present the right preset(s) for the use case. If the platform is ambiguous, present platform options with their dimensions.
2. **Design language / brand** — If a brand is mentioned, confirm the inferred brand style. If not, present 2-3 style directions derived from the context (e.g., "minimal SaaS" vs. "bold startup" vs. "editorial"). Ask the user which direction to follow.
3. **Color palette** — Present 2-3 palette options inferred from the brand, industry, or mood. Show specific hex colors when possible.
4. **Typography** — Present 2-3 font pairings appropriate to the tone (e.g., "Inter + Inter = clean/modern" vs. "Playfair Display + Source Sans Pro = editorial").
5. **Layout** — Present 2-3 layout approaches suited to the content type (e.g., "centered text on gradient" vs. "left text / right image split").
6. **Visual elements** — Ask about assets: logo URLs, product images, photos, icons. These can't be inferred.

**What NOT to ask about:**
- Copy / text content — write this yourself from the user's input.
- Technical rendering details (CSS, HTML structure, API params) — handle these silently.

**Example interaction format:**
```
Here's the design brief for your OG image. Pick your preferences or say "go with recommendations":

📐 Dimensions: 1200 x 630px (standard OG — works on all platforms)

🎨 Color palette:
  → A. Deep navy + electric blue accent (recommended — matches fintech/trust tone)
  → B. White + soft gray with blue accent (lighter, more approachable)
  → C. Dark charcoal + green accent (growth/money angle)

🔤 Typography:
  → A. Inter 700 / Inter 400 (recommended — clean, modern, highly legible)
  → B. Space Grotesk 700 / Inter 400 (techy, distinctive)

🖼 Layout:
  → A. Centered headline + subtitle over gradient (recommended — clean, bold)
  → B. Left-aligned text + abstract shape accents on right

🏷 Assets needed:
  → Do you have a logo URL to include? (optional — I'll design without one if not)
```

**When the user provides enough direction to skip some decisions** (e.g., they specify brand colors and say "minimal"), confirm your interpretation briefly and only present options for remaining open decisions. Do not re-ask about things the user has already answered.

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
- [rules/html-templates.md](rules/html-templates.md) - Reusable Handlebars HTML templates with `{{#each}}`, `{{#if}}`, helper safelist, and live preview
- [rules/video-templates.md](rules/video-templates.md) - AI-generated video templates: generate from a prompt, then render to mp4/gif

### Reference rules

- [rules/validation-checklist.md](rules/validation-checklist.md) - Pre-render validation checklist (READ THIS BEFORE EVERY RENDER)
- [rules/dimensions-reference.md](rules/dimensions-reference.md) - Platform dimension presets and safe zones
- [rules/css-patterns.md](rules/css-patterns.md) - CSS patterns that render reliably in Pictify's renderer
- [rules/fonts-and-typography.md](rules/fonts-and-typography.md) - Google Fonts loading, font stacks, and typography tips

## API Error Handling

When `POST /image` returns an error, take the following action:

The response body on error is `{ error, code, retriable }` — `error` is a human-readable message, `code` is the machine-readable reason.

| Status | Meaning | What to do |
|--------|---------|------------|
| 400 | Invalid request | Read the `error` field — it describes exactly what's wrong. Fix the request and retry. |
| 401 | Invalid or missing API key | Tell the user their API key is invalid. Direct them to https://pictify.io/dashboard/api-tokens to create a new one. Do not retry. |
| 429 | Plan/team render quota exceeded (`code: "quota_exceeded"`, or `"spending_cap_reached"` if overages are on but capped) | Tell the user they've hit their render limit for the billing cycle. They can wait for it to reset or upgrade their plan at https://pictify.io/dashboard. There's no `Retry-After` header for this — it's a quota limit, not a short-window throttle. Do not retry. |
| 503 | Renderer temporarily exhausted or a retriable failure (`retriable: true`) | Retry up to 2 times with increasing delays (2 seconds, then 4 seconds). |
| 504 | Render timed out | The HTML was too complex or external assets (fonts, images) took too long to load. Simplify the HTML (remove external images, reduce DOM complexity), then retry once. |
| 5xx (other) | Server error | Retry up to 2 times with increasing delays (2 seconds, then 4 seconds). If still failing, tell the user the service is temporarily unavailable and to try again later. |
