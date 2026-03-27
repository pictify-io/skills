---
name: social-card
description: Creating social media card images for Twitter, LinkedIn, Facebook, and Instagram with platform-specific dimensions
metadata:
  tags: social, twitter, linkedin, facebook, instagram, card, post
---

# Social Media Cards

Social cards are images designed for specific social media platforms. Unlike OG images (which are auto-embedded from link metadata), social cards are images directly uploaded or attached to posts.

## Before You Start

If the user's request lacks design direction, ask about **visual design choices** before generating. Do not ask about copy — you can write that yourself.

Focus on:
- **Target platform and format** — This determines dimensions. If unclear, ask which platform and format. Reason from context: "LinkedIn carousel" means square 1080x1080; "Twitter announcement" means landscape 1200x675.
- **Color palette / mood** — Suggest contextually relevant palettes. A fintech quote card needs subdued blues and sharp type; a fitness brand announcement needs bold, high-energy colors; a developer tool tip card works with dark backgrounds and syntax-highlight accent colors.
- **Layout style** — Based on content type, propose 2-3 layout directions. A quote card needs large centered text with attribution; a data point card needs a dominant number with context below; an announcement card needs a label + headline + one-liner stack.
- **Typography feel** — Should it feel bold and attention-grabbing or refined and minimal?

**When to ask vs. proceed:**
- **Proceed without asking** if the user has specified: the platform AND the content/message AND any visual direction. That's enough.
- **Ask** if the platform is missing (dimensions depend on it) or if the user gives zero visual direction. Ask about the single most impactful missing input — usually the platform/format first, then color palette if that's already clear.

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

See [validation-checklist.md](validation-checklist.md) for the full 8-point check.
