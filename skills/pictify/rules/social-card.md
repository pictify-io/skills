---
name: social-card
description: Creating social media card images for Twitter, LinkedIn, Facebook, and Instagram with platform-specific dimensions
metadata:
  tags: social, twitter, linkedin, facebook, instagram, card, post
---

# Social Media Cards

Social cards are images designed for specific social media platforms. Unlike OG images (which are auto-embedded from link metadata), social cards are images directly uploaded or attached to posts.

## Before You Start — Interactive Design Brief

**Always present a design brief with options before generating.** Follow the interactive design brief protocol in [SKILL.md](../SKILL.md). Present decisions in a single scannable message so the user can approve or adjust in one response.

**Social card-specific decisions to present:**
1. **Platform and format** — This determines dimensions. Present the relevant options from the dimensions table below. Infer from context when possible (e.g., "LinkedIn carousel" → 1080x1080) but always confirm.
2. **Color palette** — Present 2-3 palette options inferred from the brand, content type, and platform norms. A fintech quote card → subdued blues; a fitness brand → bold, high-energy colors; a developer tool → dark backgrounds with syntax-highlight accents.
3. **Typography** — Present 2-3 font pairings suited to the tone. Bold and attention-grabbing vs. refined and minimal vs. techy and modern.
4. **Layout** — Present 2-3 layout directions suited to the content type:
   - Quote card → large centered text with attribution
   - Data point card → dominant number with context below
   - Announcement card → label + headline + one-liner stack
   - Tip/how-to → numbered step with icon
5. **Assets** — Ask if they have a logo, headshot, product image, or brand mark to include.

## Platform Dimensions

| Platform | Format | Width | Height | Ratio |
|----------|--------|-------|--------|-------|
| Twitter/X post | Landscape | 1200 | 675 | 16:9 |
| Twitter/X post | Square | 1200 | 1200 | 1:1 |
| LinkedIn post | Landscape | 1200 | 627 | 1.91:1 |
| LinkedIn post | Square | 1200 | 1200 | 1:1 |
| Facebook post | Landscape | 1200 | 630 | 1.91:1 |
| Facebook post | Square | 1200 | 1200 | 1:1 |
| Instagram post | Square | 1080 | 1080 | 1:1 |
| Instagram post | Portrait | 1080 | 1350 | 4:5 |
| Instagram story | Vertical | 1080 | 1920 | 9:16 |
| Pinterest pin | Vertical | 1000 | 1500 | 2:3 |

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body** (example for Instagram square):
```json
{
  "html": "<your HTML string>",
  "width": 1080,
  "height": 1080,
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

Adjust `width` and `height` to match the target platform from the table above. The CSS root container dimensions MUST match.

## Design Guidelines

### Platform-agnostic principles
- **Bold, minimal text**: Social feeds are noisy. Your card needs to stand out with 3-7 words max in the headline.
- **High contrast**: Ensure text pops against the background. Dark on light or light on dark.
- **One focal point**: Don't try to communicate multiple ideas in one card.
- **Brand consistency**: Use consistent colors, fonts, and logo placement across cards.

### Twitter/X specific
- Images auto-crop in the timeline — keep content centered
- Threads can use multiple images — consider a consistent visual style across a thread
- Alt text is important for accessibility; include a description when posting

### LinkedIn specific
- Professional tone — avoid overly casual or meme-style designs
- Document/carousel posts (multi-image) perform well — consider generating a series
- Company logos and headshots build trust

### Instagram specific
- **Square (1080x1080)**: Classic, works everywhere
- **Portrait (1080x1350)**: Takes up more feed real estate, higher engagement
- **Story (1080x1920)**: Full-screen, immersive. Keep text in the center 60% height (top and bottom are obscured by platform UI)
- Carousel posts: first slide must hook; subsequent slides tell the story

### Multi-platform generation
When creating the same content for multiple platforms, make separate `POST /image` calls with different dimensions and adjusted layouts. The content stays the same; only dimensions and layout adjust.

## Content Patterns

### Quote card
- Large quote text (28-40px)
- Author attribution below
- Subtle background (gradient or solid)
- Works well on all platforms

### Statistic / data point
- One big number (72-96px)
- Brief context below (20-24px)
- Brand colors as background

### Announcement / news
- "NEW" or "ANNOUNCING" label (small, uppercase, 12-14px)
- Feature or product name (large, 48-64px)
- One-line description (20-24px)

### Tip / how-to
- Numbered tip or step
- Short actionable text
- Icon or illustration if available

### Before/after
- Split layout (two columns or top/bottom)
- Clear labels for each half
- Visual contrast between the two states

## Pre-Render Checklist

1. Root container dimensions match the target platform exactly
2. Text is readable at 50% of actual size (mobile display size)
3. Critical content is centered (platforms crop edges differently)
4. For Instagram stories: key content is in the vertical center 60%
5. Fonts loaded via `<link>` tag

See [validation-checklist.md](validation-checklist.md) for the full 11-point check.
