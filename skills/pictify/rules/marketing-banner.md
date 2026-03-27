---
name: marketing-banner
description: Creating promotional banners, ad creatives, hero images, and CTA-driven marketing graphics
metadata:
  tags: banner, marketing, ad, creative, hero, promotion, cta, advertising
---

# Marketing Banners

Marketing banners include ad creatives, promotional graphics, hero images, sale announcements, and any image designed to drive a specific action.

## Before You Start

If the user's request lacks design direction, ask about **visual design choices** before generating. Do not ask about copy — you can write that yourself.

Focus on:
- **Where it will be displayed** — This determines dimensions. Website hero? Sidebar ad? YouTube thumbnail? If unclear, ask.
- **Visual tone** — Based on the promotion or product, suggest contextually appropriate color and style directions. A sale banner needs urgency; a brand awareness banner needs polish.
- **Product visual or imagery** — Does the user have a product screenshot, photo, or illustration URL to include? If so, ask for it. If not, design with text and shapes only.
- **Brand identity** — Do they have brand colors, a logo URL, or existing style guidelines to match?

**When to ask vs. proceed:**
- **Proceed without asking** if the user has specified: where the banner will be displayed (determines dimensions) AND the promotion/message AND any visual direction (brand colors, tone words, imagery). That's enough.
- **Ask** if the display location is missing (dimensions depend on it) or if there's zero brand/visual context. Ask about the single most impactful missing input — display location first, then brand identity.

## Common Dimensions

| Type | Width | Height | Use Case |
|------|-------|--------|----------|
| Leaderboard | 728 | 90 | Website banner ad (IAB) |
| Medium rectangle | 300 | 250 | Sidebar ad (IAB) |
| Large rectangle | 336 | 280 | In-content ad (IAB) |
| Skyscraper | 160 | 600 | Sidebar vertical (IAB) |
| Wide skyscraper | 300 | 600 | Sidebar vertical (IAB) |
| Hero banner | 1440 | 500 | Website hero section |
| Full-width banner | 1200 | 400 | Website promotional strip |
| YouTube thumbnail | 1280 | 720 | Video thumbnail |
| Event cover | 1920 | 1080 | Event page header |

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body** (example for hero banner):
```json
{
  "html": "<your HTML string>",
  "width": 1440,
  "height": 500,
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

For generating multiple banner sizes from the same content, make separate `POST /image` calls with different dimensions and adjusted layouts.

## Design Guidelines

### Visual hierarchy for marketing
1. **Hook** — What catches the eye first? (Image, large text, or a number)
2. **Value proposition** — What does the viewer get? (1-2 sentences max)
3. **CTA** — What should they do? (Button-like element or action text)
4. **Brand** — Who is this from? (Logo, brand name)

### CTA design
- Make the CTA visually distinct (different color, button shape, contrast)
- Use action-oriented text: "Get Started", "Save 50%", "Try Free"
- Place CTA where the eye naturally lands (bottom-right for LTR languages, or centered below the main text)

### Color psychology for marketing
- **Red/Orange**: Urgency, sales, limited time offers
- **Blue**: Trust, reliability, professional services
- **Green**: Growth, health, sustainability, money/savings
- **Purple**: Premium, creative, luxury
- **Yellow/Gold**: Optimism, attention, deals
- **Black/Dark**: Sophistication, luxury, tech

### Text rules for banners
- **Headlines**: 6 words or fewer for ad banners. Can be longer for hero images.
- **Body text**: One sentence max for ad banners. Keep it punchy.
- **Font size**: Headline must be legible at the actual display size (banners are often shown at exact pixel dimensions, unlike social images that scale)
- **Contrast**: WCAG AA contrast ratio minimum. White text on dark, dark text on light.

### For ad creatives specifically
- Follow platform ad policies (no misleading imagery, accurate claims)
- Include required disclaimers if applicable
- Test readability at actual display size — a 300x250 banner is SMALL
- Use the `selector` param to render only the ad element if your HTML contains multiple sizes

## Layout Patterns

### For wide banners (leaderboard, hero)
- Horizontal layout: image left + text right, or text over full-width image
- Keep text in the left 60% (LTR) — the right side often gets obscured by close buttons or overlay UI

### For square/rectangle banners (medium rectangle, large rectangle)
- Centered layout works best
- Stack vertically: headline → image/graphic → CTA
- Keep padding generous — small banners look cramped easily

### For vertical banners (skyscraper)
- Stack vertically: logo → headline → image → CTA
- Each element should have clear separation
- Avoid horizontal text layouts — they won't fit

## Pre-Render Checklist

1. Root container dimensions match the target banner size exactly
2. CTA is visually distinct and legible at actual display size
3. Text is minimal and punchy, font loaded
4. Brand logo/name is present
5. For ad banners: confirm the design looks good at 1:1 scale (not zoomed in)

See [validation-checklist.md](validation-checklist.md) for the full 8-point check.
