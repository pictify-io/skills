---
name: product-image
description: Creating e-commerce product images, catalog cards, comparison graphics, and pricing visuals
metadata:
  tags: product, ecommerce, catalog, pricing, comparison, shop
---

# Product Images

Product images for e-commerce, catalogs, comparison graphics, and pricing displays. These images showcase products with their details and are often generated at scale.

## Before You Start — Interactive Design Brief

**Always present a design brief with options before generating.** Follow the interactive design brief protocol in [SKILL.md](../SKILL.md). Present decisions in a single scannable message so the user can approve or adjust in one response.

**Product image-specific decisions to present:**
1. **Image type and dimensions** — Present relevant options: single product card (800x800), comparison grid (1200x800), catalog card (600x800), feature highlight (1200x630). Infer from context.
2. **Visual style** — Present 2-3 style directions inferred from the product type. A luxury product → dark, premium, minimal; a SaaS pricing card → clean, modern, trust-building; a consumer product → bright, approachable, lifestyle-oriented.
3. **Background** — Present options: white/clean (standard e-commerce), branded colors, gradient, or lifestyle context.
4. **Color palette** — Present 2-3 palette options suited to the product category and brand.
5. **Typography** — Present 2-3 font pairings. Product names need strong, readable fonts; pricing needs clear numerical fonts; feature text needs clean body fonts.
6. **Content emphasis** — Present what to highlight: price-first layout, features-first layout, or image-dominant layout. This shapes the hierarchy.
7. **Assets** — Ask for product photo URL(s) and logo. Product images dramatically change the layout, so this is critical.

## Dimensions

| Type | Width | Height | Use Case |
|------|-------|--------|----------|
| Product card | 800 | 800 | Square product listing |
| Product hero | 1200 | 800 | Featured product showcase |
| Comparison graphic | 1200 | 1200 | Side-by-side products |
| Price tag / label | 400 | 200 | Overlay graphic |
| Catalog grid item | 600 | 600 | Smaller grid listing |
| Product social card | 1200 | 630 | Sharing a product on social media |

## API Call

**Endpoint**: `POST https://api.pictify.io/image`

**Request body** (example for product card):
```json
{
  "html": "<your product card HTML>",
  "width": 800,
  "height": 800,
  "fileExtension": "png"
}
```

For generating multiple product images, make separate `POST /image` calls, substituting the product-specific content into the HTML string before each call.

**Response**:
```json
{
  "url": "https://cdn.pictify.io/...",
  "id": "img_abc123"
}
```

## Design Guidelines

### Product cards
- **Clean background**: White or light gray works for most e-commerce contexts. Colored backgrounds work for brand-specific contexts.
- **Product image dominant**: If including a product photo URL, make it the largest element (60-70% of the card area)
- **Price prominent**: Price should be immediately visible. Use a larger font size and bold weight.
- **Key details**: Product name, price, one-line description. Don't overload with specs.

### Comparison graphics
- **Side-by-side layout**: Two or three columns, one product per column
- **Consistent alignment**: Same vertical position for name, image, price, and features across all columns
- **Highlight differences**: Use color or checkmarks to show which product has which features
- **Winner indicator**: If comparing, make the recommended product visually distinct (larger, highlighted border, "BEST VALUE" badge)

### Pricing displays
- **Current price large and bold**: This is the most important number
- **Original price with strikethrough**: Show savings clearly
- **Discount badge**: "20% OFF" or "SAVE $50" in a contrasting color
- **CTA**: "Shop Now", "Add to Cart" — even in static images, it reinforces the action

### Handling product images in HTML

When the design includes a product photo, reference it as a background image or `<img>` tag with the product image URL:

```html
<img src="https://example.com/product.jpg" style="max-width: 100%; max-height: 400px; object-fit: contain;" />
```

Or as a background:
```html
<div style="background-image: url('https://example.com/product.jpg'); background-size: contain; background-position: center; background-repeat: no-repeat;">
</div>
```

**Important**: The image URL must be publicly accessible. Pictify's renderer fetches the image at render time. If the URL is behind auth or returns a 404, it will render as broken.

## Pre-Render Checklist

1. Product image URL is publicly accessible (test in a browser)
2. Price formatting is correct (currency symbol, decimal places)
3. Product name handles variable lengths (clamp long names)
4. Background is clean and doesn't compete with the product
5. All external image URLs resolve correctly

See [validation-checklist.md](validation-checklist.md) for the full 11-point check.
