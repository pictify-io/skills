---
name: email-header
description: Creating email header and banner images that work across email clients
metadata:
  tags: email, header, banner, newsletter, campaign
---

# Email Header Images

Email headers and banners are images embedded at the top of marketing emails, newsletters, and transactional emails. They have unique constraints because email clients have limited CSS support.

## Before You Start

If the user's request lacks design direction, ask about **visual design choices** before generating. Do not ask about copy — you can write that yourself.

Focus on:
- **Email type** — The visual treatment differs significantly. A flash sale email needs urgency (bold reds/oranges, large discount number); a weekly newsletter header needs brand consistency (logo, muted colors, issue number); a product launch email needs excitement (gradient, product visual, bold headline). Infer from context or ask.
- **Brand assets** — Logo URL? Brand colors? These are especially important for email headers since they represent the brand in the inbox.
- **Dark mode compatibility** — Ask if their audience likely uses dark mode email clients. This affects background color choices (avoid pure white, use light gray instead).
- **Retina** — Should the image be generated at 2x for sharp display on high-DPI screens? Default to yes for consumer-facing emails.

**When to ask vs. proceed:**
- **Proceed without asking** if the user has specified: the email type/purpose AND brand colors or a logo. That's enough to make confident design choices.
- **Ask** if the email type is ambiguous (is it a sale or a newsletter?) or if there's no brand context at all. Ask about brand colors/logo first — it's the highest-leverage missing input for email headers.

## Dimensions

| Type | Width | Height | Notes |
|------|-------|--------|-------|
| Standard email header | 600 | 200 | Safe for all clients |
| Wide email banner | 600 | 300 | More visual impact |
| Full-width hero | 600 | 400 | Large hero image |
| Narrow announcement bar | 600 | 100 | Compact notification |
| Email footer banner | 600 | 150 | Bottom-of-email graphic |

### Why 600px wide?
Most email clients render at 600px content width. Some modern clients support wider, but 600px is the universal safe maximum. Designing at 600px ensures the image displays without horizontal scrolling on all clients including Outlook, Gmail, Apple Mail, and Yahoo Mail.

### Retina consideration
For sharp display on retina/HiDPI screens, generate at 2x (1200x400 for a 600x200 image) and set the `<img>` tag in the email HTML to `width="600"`. The higher-resolution image will render crisply on retina displays and scale down gracefully on standard displays.

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body** (standard email header):
```json
{
  "html": "<your email header HTML>",
  "width": 600,
  "height": 200,
  "fileExtension": "jpg"
}
```

For retina 2x:
```json
{
  "html": "<your email header HTML with 1200px CSS root width>",
  "width": 1200,
  "height": 400,
  "fileExtension": "jpg"
}
```

Use `jpg` format for email images — smaller file size improves email deliverability.

**Response**:
```json
{
  "url": "https://cdn.pictify.io/...",
  "id": "img_abc123"
}
```

For recurring newsletters, build a consistent HTML structure and substitute the issue-specific content (headline, date, issue number) into the HTML string before each `POST /image` call.

## Design Guidelines

### Simplicity is critical
Email images should be simpler than web images:
- **Fewer fonts**: Stick to one font family, two weights max
- **Larger text**: Minimum 20px for body text, 32-48px for headlines (at 600px width)
- **High contrast**: Many users have dark mode enabled in email — test readability on both light and dark backgrounds
- **Minimal gradients**: Keep backgrounds simple. Some email clients don't render complex CSS if the image fails to load and the fallback is shown.

### Content guidelines
- **Above the fold**: The email header is the first thing seen. Communicate the most important message here.
- **One clear message**: "50% OFF SALE" or "New Product Launch" — not both
- **CTA text (not button)**: Since this is an image, any "button" in the header is not clickable separately from the image. Make the CTA text clear so users click the image itself.
- **Alt text**: Always include descriptive alt text on the `<img>` tag in the email HTML. Many email clients block images by default — alt text communicates the message when the image doesn't load.

### Dark mode considerations
- Gmail, Apple Mail, and Outlook all have dark modes that may invert or alter image surroundings
- Use images with their own background (don't rely on the email's background color matching the image edges)
- Avoid pure white (#ffffff) backgrounds on email images — use a very light gray (#f8f8f8) so the image edge is visible in dark mode
- Add a subtle 1px border or slight shadow if the image background could blend into the email background

## Patterns

### Announcement header
- Background color or gradient
- Large headline text (32-48px)
- One line of supporting text (16-20px)
- Company logo (small, top corner)

### Newsletter header
- Consistent branded header used across all newsletters
- Logo + newsletter name + date/issue number
- Keep the HTML structure consistent across issues, only changing the text content

### Promotional banner
- Bold promotional message ("SAVE 30%")
- Product image or lifestyle image
- Expiration date if time-limited
- Use warm colors (red, orange) for urgency

### Event invitation header
- Event name (large)
- Date, time, location
- Speaker photo or event image if available

## Pre-Render Checklist

1. Width is 600px (or 1200px for retina 2x)
2. Text is legible at small sizes (emails are viewed on mobile at ~300px width)
3. Design works on both light and dark backgrounds
4. Image has its own background (not transparent/dependent on email bg)
5. File format is jpg for smaller file size (critical for email deliverability)
6. For retina: verify the image renders correctly at 2x dimensions

See [validation-checklist.md](validation-checklist.md) for the full 8-point check.
