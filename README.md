# Pictify Skills

Agent skills for [Pictify](https://pictify.io) — generate images from HTML/CSS with AI agents.

OG images, social cards, banners, screenshots, certificates, product images, email headers, and presentation slides — all from natural language.

Works with Claude Code, Cursor, Windsurf, and any agent that supports the [open skills standard](https://skills.sh).

## Install

### Using the skills CLI (recommended)

```bash
npx skills add pictify-io/skills
```

### Direct install via npm

```bash
npx @pictify/agent-skill
```

### Project-local install

```bash
npx @pictify/agent-skill --project
```

### Uninstall

```bash
npx @pictify/agent-skill --uninstall
```

## What it does

Once installed, your AI agent gets design-aware guidance for generating images with the Pictify API. Just ask:

- "Create an OG image for my blog post about serverless functions"
- "Make a Twitter card announcing our new pricing"
- "Screenshot stripe.com at desktop and mobile viewports"
- "Generate a certificate for course completion"
- "Create a product card for our headphones at $149"

The skill handles:

- **Design clarification** — asks about visual style, color palette, and layout before generating, with context-aware suggestions (not generic lists)
- **Pre-render validation** — 8-point checklist that catches wrong dimensions, missing fonts, and broken images before the API call
- **Platform dimensions** — correct sizes for every platform (OG 1200x630, Instagram 1080x1080, Twitter 1200x675, etc.)
- **CSS patterns** — reliable patterns for gradients, flexbox layouts, glassmorphism, text clamping, and more
- **Typography** — Google Fonts loading, font pairings, and type scales for each image size
- **Error handling** — actionable recovery for every API error code

## What's included

| File | Purpose |
|------|---------|
| **Use cases** | |
| `rules/og-image.md` | Open Graph images for link previews |
| `rules/social-card.md` | Twitter, LinkedIn, Facebook, Instagram cards |
| `rules/marketing-banner.md` | Ads, hero images, promotional graphics |
| `rules/screenshot.md` | URL screenshot capture with viewport control |
| `rules/certificate-badge.md` | Certificates, badges, ID cards, event passes |
| `rules/product-image.md` | E-commerce product images, catalogs |
| `rules/email-header.md` | Email banners with dark mode and retina support |
| `rules/presentation-slide.md` | Slides, pitch decks, social carousels |
| **References** | |
| `rules/validation-checklist.md` | Pre-render validation (8-point checklist) |
| `rules/dimensions-reference.md` | Platform dimension presets and safe zones |
| `rules/css-patterns.md` | CSS that renders reliably in Pictify |
| `rules/fonts-and-typography.md` | Font loading, pairings, and type scales |

## Setup

Get your Pictify API key:

1. Sign up at [pictify.io](https://pictify.io)
2. Go to [API Tokens](https://pictify.io/dashboard/api-tokens)
3. Create a token

Set it in your environment:

```bash
export PICTIFY_API_KEY=your_token_here
```

The skill automatically detects the key from the environment. No additional configuration needed.

## How it works

The skill uses the Pictify HTML-to-Image API (`POST https://api.pictify.io/image`). It instructs the AI agent to:

1. Clarify design intent (colors, layout, typography — not copy)
2. Generate HTML/CSS following proven rendering patterns
3. Validate against an 8-point checklist before calling the API
4. Handle errors with specific recovery actions

No MCP server required. The skill makes direct HTTP calls to the Pictify API.

## License

MIT
