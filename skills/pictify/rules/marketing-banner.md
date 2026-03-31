---
name: marketing-banner
description: Creating promotional banners, ad creatives, hero images, and CTA-driven marketing graphics
metadata:
  tags: banner, marketing, ad, creative, hero, promotion, cta, advertising
---

# Marketing Banners

Marketing banners include ad creatives, promotional graphics, hero images, sale announcements, and any image designed to drive a specific action.

## Before You Start — Interactive Design Brief

**Always present a design brief with options before generating.** Follow the interactive design brief protocol in [SKILL.md](../SKILL.md). Present decisions in a single scannable message so the user can approve or adjust in one response.

**Marketing banner-specific decisions to present:**
1. **Display location and dimensions** — Present relevant size options from the dimensions table below. If the user hasn't specified where the banner will be used, present the most common options grouped by category (web ads, website hero, social/YouTube).
2. **Visual tone** — Present 2-3 tone directions inferred from the promotion type. A sale/discount banner → urgency (bold reds/oranges, large discount number); a brand awareness banner → polish and sophistication; a product launch → excitement (gradients, bold headline).
3. **Color palette** — Present 2-3 palette options. Apply color psychology relevant to marketing: red/orange for urgency, blue for trust, green for growth, black for luxury. Match to the promotion's intent.
4. **Typography** — Present 2-3 font pairings suited to the banner type. Ad banners need heavy, impactful fonts; hero banners can be more refined.
5. **Layout** — Present 2-3 layout approaches suited to the banner dimensions:
   - Wide banners → horizontal split (image left + text right) or text over full-width image
   - Square/rectangle → centered vertical stack (headline → graphic → CTA)
   - Vertical → stacked (logo → headline → image → CTA)
6. **Assets** — Ask for product screenshot/photo URL, logo URL, and any brand guidelines they want to match.

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

See [validation-checklist.md](validation-checklist.md) for the full 11-point check.
