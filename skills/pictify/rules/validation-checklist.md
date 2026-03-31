---
name: validation-checklist
description: Pre-render validation checklist to run before every Pictify image generation API call
metadata:
  tags: validation, checklist, pre-flight, quality, dimensions
---

# Pre-Render Validation Checklist

Run through this checklist BEFORE every `POST /image` call. These checks catch the most common rendering failures.

## The 11-Point Pre-Flight Check

Before calling the Pictify API with HTML, verify ALL of these:

1. **Root element has explicit width and height in px** — The renderer captures the element's actual rendered size, NOT the viewport. Without explicit dimensions on the root container, the output image will clip to the content's natural height. This is the #1 cause of wrong-sized images.

2. **Root element uses `position: absolute; top: 0; left: 0;`** — This anchors the container to the top-left corner of the render viewport. Without it, default flow positioning may add unexpected offset.

3. **`body` has `margin: 0; padding: 0;`** — Browsers apply default margins to `<body>`. If not reset, the rendered image will have unwanted whitespace at the top and left.

4. **CSS width/height on root match the `width` and `height` in the API request body** — If your root div is `1200px x 630px` but you send `"width": 800, "height": 400` in the JSON body, the image will be cropped. These MUST match.

5. **Google Fonts are loaded via `<link>` tag in `<head>`** — Fonts must be loaded before the renderer captures the page. Use `<link href="https://fonts.googleapis.com/css2?family=FontName:wght@400;700&display=swap" rel="stylesheet">`. Without this, the renderer falls back to a default sans-serif font.

6. **No external images that could 404** — If your HTML references an image URL that returns a 404, it will render as a broken image icon. Use reliable CDNs or inline base64 for small icons. If using user-provided image URLs, the skill cannot guarantee they will resolve.

7. **No CSS that depends on viewport units** — `vw`, `vh`, `vmin`, `vmax` may behave unpredictably. Use fixed `px` values instead. Percentages relative to a fixed-size parent are fine.

8. **Width and height are within API limits (1-4000px each)** — The API rejects dimensions outside this range with a 400 error.

9. **No `<script>` tags — JavaScript is NOT executed** — The renderer captures a static HTML/CSS render only. Any content that depends on JavaScript (DOM manipulation, framework rendering, dynamic data fetching) will not appear in the output. All content must be expressed in HTML and CSS alone.

10. **Use inline SVG icons instead of emojis** — Emoji rendering varies across operating systems and renderers, often producing low-resolution, inconsistent, or missing glyphs. Use inline `<svg>` elements or icon libraries (e.g., Heroicons, Lucide, Font Awesome via CDN) instead. SVGs render crisply at any size and look consistent across all environments.

11. **Design language matches the given context** — The visual style (colors, typography, spacing, imagery, tone) must be appropriate for the subject matter, industry, and audience. A fintech dashboard image needs clean lines, muted blues, and professional sans-serif fonts — not playful gradients and rounded comic-style type. A children's education certificate needs warm colors and friendly shapes — not a dark corporate palette. Before rendering, verify: Does the color palette fit the industry/brand? Does the typography match the formality level? Does the overall visual tone align with the audience and purpose?
    - **If the user mentions a brand** (e.g., "Stripe", "Notion", "Nike"), adopt that brand's design language — its color palette, typography style, spacing conventions, and visual tone. Research or infer the brand's aesthetic and apply it consistently. A "Stripe-style" image means clean whites, blue-purple accents, rounded UI elements, and Inter/system fonts. A "Nike-style" banner means bold black-and-white contrasts, Futura-like condensed type, and high-energy imagery.
    - **If the user provides explicit brand assets** (colors, logo URL, fonts, reference images, mood keywords), those take highest priority and override all defaults.
    - **If no brand or visual direction is given**, ask the user for their preference before proceeding. Ask a single, focused question: "What brand or visual style should this follow?" — offer 2-3 contextually relevant suggestions based on the content (e.g., for a SaaS pricing card: "Should this follow your brand's style, or would you prefer a clean minimal look like Stripe/Linear?"). Do not fall back to a generic template without asking.

## Common Rendering Gotchas

### Image clips to content height
**Symptom**: You request 1200x630 but get 1200x200.
**Cause**: The root element has no explicit height, so the renderer captures only the content's natural height.
**Fix**: Set explicit `height` on the root container matching the `height` in the request body.

### Fonts render as default sans-serif
**Symptom**: Your custom font doesn't appear in the output.
**Cause**: Google Font `<link>` tag is missing or malformed.
**Fix**: Add `<link>` tag in `<head>` with `&display=swap`. Verify the font family name matches exactly in CSS (case-sensitive).

### White border around the image
**Symptom**: Thin white bars on top and left of the rendered image.
**Cause**: Default `<body>` margins not reset.
**Fix**: Add `body { margin: 0; padding: 0; }`.

### Content overflows the container
**Symptom**: Text or elements extend beyond the image boundary and are cut off.
**Cause**: Content exceeds the fixed container dimensions without overflow handling.
**Fix**: Add `overflow: hidden;` to the root container. For text, use `text-overflow: ellipsis;` with `white-space: nowrap;` or limit line count with `-webkit-line-clamp`.

### Flexbox/Grid layout not rendering
**Symptom**: Elements stack vertically instead of laying out as expected.
**Cause**: Missing `display: flex` or `display: grid` on the container.
**Fix**: The Pictify renderer supports modern CSS including Flexbox and Grid. Ensure the display property is set on the correct container element.

## Validation for URL Screenshots

When using `POST /image` with `url` instead of `html`:

1. **URL must be publicly accessible** — The renderer runs on a remote server. It cannot access localhost, authenticated pages, VPN-protected URLs, or private network addresses.

2. **Choose viewport width carefully** — The `width` parameter acts as the browser viewport width. Responsive sites render differently at 1440px (desktop) vs 375px (mobile).

3. **Height controls capture area** — Only the visible portion within the `height` is captured. Content below is not scrolled to.

4. **`selector` overrides output dimensions** — When using the `selector` parameter, the output image dimensions match the selected element's actual rendered size, NOT the `width`/`height` values in the request body. Do not expect a specific output size when using `selector`.
