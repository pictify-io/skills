---
name: certificate-badge
description: Creating certificates, badges, ID cards, event passes, and award graphics
metadata:
  tags: certificate, badge, id-card, event-pass, award, credential
---

# Certificates, Badges & ID Cards

Formal documents and credentials rendered as images. These have specific layout conventions.

## Before You Start — Interactive Design Brief

**Always present a design brief with options before generating.** Follow the interactive design brief protocol in [SKILL.md](../SKILL.md). Present decisions in a single scannable message so the user can approve or adjust in one response.

**Certificate/badge-specific decisions to present:**
1. **Credential type** — If ambiguous, present options: certificate, badge, ID card, event pass. Each has a different layout convention.
2. **Orientation and dimensions** — Present landscape vs. portrait with a recommendation based on the credential type (certificates → landscape, ID cards → portrait, badges → square).
3. **Formality and style** — Present 2-3 style directions inferred from the context. A university certificate → classic/formal (serif fonts, borders, gold accents); a bootcamp certificate → modern/tech (clean sans-serif, minimal, bold accents); a fun team badge → playful (rounded shapes, bright colors).
4. **Color palette** — Present 2-3 palette options suited to the formality level and organization type.
5. **Typography** — Present 2-3 font pairings matching the formality. Formal → serif headlines (Playfair Display, Lora) with sans-serif body; modern → geometric sans-serif throughout; playful → rounded/friendly fonts.
6. **Assets** — Ask for logo URL, seal/emblem image, recipient photo, or signature image. These can't be inferred and significantly affect the layout.

## Dimensions

| Type | Width | Height | Orientation |
|------|-------|--------|-------------|
| Certificate (landscape) | 1920 | 1358 | Landscape (A4 proportioned) |
| Certificate (portrait) | 1358 | 1920 | Portrait (A4 proportioned) |
| Badge / avatar | 400 | 400 | Square |
| ID card | 1012 | 638 | Landscape (CR80 card) |
| Event pass (mobile) | 1080 | 1920 | Portrait (phone screen) |
| Event badge (printable) | 1012 | 1518 | Portrait (4x6 inch at 254 DPI) |

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

```json
{
  "html": "<your certificate HTML>",
  "width": 1920,
  "height": 1358,
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

For generating multiple certificates with different recipient data, make separate `POST /image` calls, substituting the recipient-specific content into the HTML string before each call.

## Design Guidelines

### Certificates
- **Formal tone**: Serif fonts for titles (Playfair Display, Lora), sans-serif for body (Inter, Source Sans Pro)
- **Border or frame**: A decorative border signals "official document." Can be a simple double-line border, ornamental corners, or a full frame.
- **Hierarchy**: Title of the certificate → recipient name (largest text) → description of achievement → date → signatures/seals
- **Whitespace**: Certificates need generous margins and spacing. They should feel open and prestigious, not cramped.
- **Seal or logo**: Place an organizational seal, logo, or stamp for authenticity. Bottom-center or bottom-right.

### Badges
- **Circular or rounded**: Badges typically use circular or rounded-square shapes
- **Icon or initials**: Center a recognizable icon or the person's initials
- **Minimal text**: Name or title only. Badges are small — don't overload them.
- **High contrast**: Must be recognizable at small sizes (40-80px display)

### ID Cards
- **Standard layout**: Photo left, details right (or photo top, details bottom)
- **Required fields**: Name, title/role, organization, photo, ID number
- **Machine-readable elements**: Barcode or QR code area if needed (render as an image within the HTML)
- **Front and back**: Consider generating two images if both sides are needed

### Event Passes
- **Mobile-first**: If the pass will be shown on a phone, design at 1080x1920
- **QR code prominent**: Event check-in requires a scannable code — make it large and high-contrast
- **Key info visible**: Event name, attendee name, date, venue — must be readable without zooming
- **Brand colors**: Match the event's visual identity

## Pre-Render Checklist

1. Root container matches target dimensions
2. Recipient name area handles long names (clamp or reduce font size)
3. Fonts are formal and appropriate (serif for titles)
4. Sufficient margins (at least 5% on each side)
5. Logo/seal is positioned consistently
6. All external image URLs (photos, logos) are publicly accessible

See [validation-checklist.md](validation-checklist.md) for the full 11-point check.
