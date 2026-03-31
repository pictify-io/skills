---
name: certificate-badge
description: Creating certificates, badges, ID cards, event passes, and award graphics
metadata:
  tags: certificate, badge, id-card, event-pass, award, credential
---

# Certificates, Badges & ID Cards

Formal documents and credentials rendered as images. These have specific layout conventions.

## Before You Start

If the user's request lacks design direction, ask about **visual design choices** before generating. Do not ask about copy — you can write that yourself.

Focus on:
- **Formality level** — Based on the context (academic degree vs. workshop completion vs. fun team badge), suggest an appropriate visual tone. A university certificate needs a different aesthetic than a hackathon badge.
- **Visual elements** — Does the user have a logo URL, seal image, or photo to include? Ask for any image assets they want embedded.
- **Color and style** — Suggest contextually appropriate directions based on the credential type and organization. Don't offer generic options.
- **Orientation** — If not obvious from context, ask whether landscape or portrait fits better.

**When to ask vs. proceed:**
- **Proceed without asking** if the user has specified: the credential type AND the context/organization. The formality and style can be confidently inferred — e.g., "certificate for completing our Python bootcamp" → modern tech-education style.
- **Ask** if the user has image assets (logo, seal, photo) they want included — these can't be inferred. Also ask if the credential type is ambiguous (badge vs. certificate vs. ID card).

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

See [validation-checklist.md](validation-checklist.md) for the full 9-point check.
