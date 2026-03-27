---
name: dimensions-reference
description: Platform dimension presets and safe zones for common image types
metadata:
  tags: dimensions, sizes, platforms, og, twitter, instagram, linkedin, facebook
---

# Dimension Reference

Standard dimensions for common image use cases. Always set these as both the CSS root element dimensions AND the `width`/`height` parameters in the `POST /image` API request body.

## Social Media & Link Previews

| Use Case | Width | Height | Aspect Ratio | Notes |
|----------|-------|--------|--------------|-------|
| Open Graph (OG) image | 1200 | 630 | 1.91:1 | Universal link preview — Facebook, LinkedIn, Slack, Discord, iMessage |
| Twitter card (summary_large_image) | 1200 | 630 | 1.91:1 | Same as OG. Twitter crops to 2:1 on mobile — keep key content in center 1200x600 area |
| Twitter card (summary) | 800 | 800 | 1:1 | Small square card used when meta tag is `summary` |
| LinkedIn post image | 1200 | 627 | 1.91:1 | Nearly identical to OG |
| LinkedIn company banner | 1128 | 191 | 5.9:1 | Narrow banner format |
| Facebook shared image | 1200 | 630 | 1.91:1 | Same as OG |
| Facebook cover photo | 820 | 312 | 2.63:1 | Desktop; crops differently on mobile |

## Instagram

| Use Case | Width | Height | Aspect Ratio | Notes |
|----------|-------|--------|--------------|-------|
| Instagram square post | 1080 | 1080 | 1:1 | Classic format |
| Instagram portrait post | 1080 | 1350 | 4:5 | Best engagement ratio |
| Instagram landscape post | 1080 | 566 | 1.91:1 | Least common |
| Instagram story | 1080 | 1920 | 9:16 | Full screen vertical |
| Instagram carousel | 1080 | 1080 | 1:1 | Per-slide dimensions |

## Presentation & Documents

| Use Case | Width | Height | Aspect Ratio | Notes |
|----------|-------|--------|--------------|-------|
| Presentation slide (16:9) | 1920 | 1080 | 16:9 | Standard widescreen |
| Presentation slide (4:3) | 1024 | 768 | 4:3 | Legacy format |

## Marketing & Advertising

| Use Case | Width | Height | Aspect Ratio | Notes |
|----------|-------|--------|--------------|-------|
| Email header | 600 | 200 | 3:1 | Safe for most email clients |
| Email hero banner | 600 | 300 | 2:1 | Wider banner |
| Banner ad (leaderboard) | 728 | 90 | 8.1:1 | IAB standard |
| Banner ad (medium rectangle) | 300 | 250 | 1.2:1 | IAB standard |
| Banner ad (skyscraper) | 160 | 600 | 1:3.75 | IAB standard |
| Banner ad (large rectangle) | 336 | 280 | 1.2:1 | IAB standard |
| YouTube thumbnail | 1280 | 720 | 16:9 | High resolution recommended |
| Pinterest pin | 1000 | 1500 | 2:3 | Tall format performs best |

## Certificates & Badges

| Use Case | Width | Height | Aspect Ratio | Notes |
|----------|-------|--------|--------------|-------|
| Certificate (landscape) | 1920 | 1358 | ~1.41:1 | A4-proportioned landscape |
| Certificate (portrait) | 1358 | 1920 | ~1:1.41 | A4-proportioned portrait |
| Badge / avatar | 400 | 400 | 1:1 | Square, keep content centered |
| ID card | 1012 | 638 | ~1.59:1 | Standard CR80 card proportions |
| Event pass | 1080 | 1920 | 9:16 | Mobile wallet proportioned |

## E-Commerce

| Use Case | Width | Height | Aspect Ratio | Notes |
|----------|-------|--------|--------------|-------|
| Product card | 800 | 800 | 1:1 | Square product images |
| Product hero | 1200 | 800 | 3:2 | Wider product showcase |
| Comparison graphic | 1200 | 1200 | 1:1 | Side-by-side products |
| Price tag / label | 400 | 200 | 2:1 | Small overlay graphics |

## Safe Zone Guidance

For images displayed across platforms, keep critical content (text, logos) within the inner 80% of the image. The outer 10% on each side may be cropped or obscured by platform UI elements.

```
  +----------------------------------------------+
  |  10% margin — may be cropped                  |
  |  +--------------------------------------+     |
  |  |                                      |     |
  |  |    SAFE ZONE (inner 80%)             |     |
  |  |    Place all text, logos, and         |     |
  |  |    critical content here              |     |
  |  |                                      |     |
  |  +--------------------------------------+     |
  |                                                |
  +----------------------------------------------+
```

## API Limits

- **Minimum**: 1x1 px
- **Maximum**: 4000x4000 px
- If you need dimensions larger than 4000px, consider generating at a smaller size and upscaling, or splitting into tiles.
