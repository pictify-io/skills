---
name: presentation-slide
description: Creating presentation slides, pitch deck visuals, and keynote-style graphics
metadata:
  tags: presentation, slide, pitch-deck, keynote, powerpoint, deck
---

# Presentation Slides

Generate individual presentation slides as images. Useful for pitch decks, conference talks, course materials, and social media carousels (slide-style posts on LinkedIn and Instagram).

## Before You Start

If the user's request lacks design direction, ask about **visual design choices** before generating. Do not ask about copy — you can write that yourself.

Focus on:
- **Light or dark theme** — Dark backgrounds project better on screens; light backgrounds print better. Suggest based on context (conference talk → dark, printed handout → light).
- **Color scheme** — Based on the topic and audience, suggest an appropriate palette. A startup pitch deck has a different energy than an academic lecture.
- **Aspect ratio** — 16:9 is standard. Ask only if the user's context suggests otherwise (e.g., social media carousel → 1:1).
- **Slide type** — Is this a title slide, content slide, data slide, quote slide, or section divider? Different types need different layouts. Infer from context when possible.

**When to ask vs. proceed:**
- **Proceed without asking** if the user has specified: the topic/content AND any visual direction (dark/light, color scheme, or mood). Default to dark theme at 1920x1080 if no visual preference is given — it's the safest default for screen presentations.
- **Ask** if the user gives only a topic with zero visual context AND you can't confidently infer the right style (e.g., "make me a slide" with no topic). Ask about light/dark theme — it's the single highest-leverage design decision for slides.

## Dimensions

| Type | Width | Height | Ratio | Notes |
|------|-------|--------|-------|-------|
| Standard widescreen | 1920 | 1080 | 16:9 | Default for modern presentations |
| Legacy standard | 1024 | 768 | 4:3 | Older projectors, some embedded contexts |
| Ultra-wide | 2560 | 1080 | 21:9 | Conference screens |
| Social carousel slide | 1080 | 1080 | 1:1 | LinkedIn/Instagram carousel |

**Default to 1920x1080** unless the user specifies otherwise.

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body**:
```json
{
  "html": "<your slide HTML>",
  "width": 1920,
  "height": 1080,
  "fileExtension": "png"
}
```

For generating a series of slides, make separate `POST /image` calls for each slide, substituting the slide-specific content (headline, body, slide number) into the HTML string before each call.

**Response**:
```json
{
  "url": "https://cdn.pictify.io/...",
  "id": "img_abc123"
}
```

## Design Guidelines

### Content per slide
- **One idea per slide**: A slide should communicate exactly one concept
- **6 words or fewer for headlines**: If the audience needs to read your slide, you've lost them
- **Minimal body text**: Bullet points should be brief (5-7 words each), maximum 3-5 bullets
- **Visual > text**: Prefer diagrams, charts, images, and icons over paragraphs

### Typography for presentations
- **Headlines**: 72-96px, bold (700 weight), tight line height (1.05-1.1)
- **Body/bullets**: 28-36px, regular (400 weight), comfortable line height (1.4)
- **Captions/labels**: 20-24px, regular or medium weight
- **Use Sans-serif fonts**: Inter, Plus Jakarta Sans, or DM Sans render cleanly at presentation scale

### Layout patterns

**Title slide**: Company/presentation name large and centered or left-aligned. Subtitle or speaker name below. Date or event name in bottom corner. Logo in top or bottom corner.

**Content slide**: Headline top-left at 48-72px. Body left-aligned or split into columns below. Visual/graphic on the right side or bottom. Page number bottom-right at 16-18px.

**Data/chart slide**: Headline summarizing the takeaway (not "Q3 Revenue" but "Revenue grew 40% in Q3"). Chart or data visualization dominant (60-70% of slide area). Source/footnote bottom-left.

**Quote slide**: Large quote text centered at 40-56px, italic or light weight. Attribution below at 24px. Minimal background.

**Section divider**: Bold section title centered at 72-96px. Optional subtitle at 28-36px. Full-bleed background color.

### Color schemes for presentations
- **Dark background (recommended for screens)**: Dark navy/charcoal (#1a1a2e, #0f172a) with white text. High contrast, easy on the eyes in dim rooms.
- **Light background**: White or light gray (#f8fafc) with dark text. Better for printed handouts.
- **Accent color**: One or two accent colors for highlights, graphs, and emphasis. Keep consistent throughout the deck.

### Consistency across slides
When generating multiple slides for a deck:
- Use the same font family, size scale, and color palette
- Keep logo, page number, and navigation elements in the same position
- Use the same background treatment (solid, gradient, or image)
- Use the same HTML structure for all slides, only changing the text content

## Pre-Render Checklist

1. Dimensions are exactly 1920x1080 (or specified alternative)
2. Text is legible when projected (minimum 28px for body text at 1920px width)
3. One idea per slide — not overloaded
4. Consistent design language across all slides in the deck
5. High contrast between text and background
6. Headlines are short (6 words or fewer)

See [validation-checklist.md](validation-checklist.md) for the full 8-point check.
