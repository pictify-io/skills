---
name: product-image
description: Creating e-commerce product images, catalog cards, comparison graphics, and pricing visuals
metadata:
  tags: product, ecommerce, catalog, pricing, comparison, shop
---

# Product Images

Product images for e-commerce, catalogs, comparison graphics, and pricing displays. These images showcase products with their details and are often generated at scale.

## Before You Start

If the user's request lacks design direction, ask about **visual design choices** before generating. Do not ask about copy — you can write that yourself.

Focus on:
- **Product image asset** — Does the user have a product photo URL to include? This is critical — a product card with a real photo looks completely different from a text-only design.
- **Visual style** — Based on the product type and brand, suggest appropriate aesthetics. A luxury watch needs a different treatment than a SaaS pricing card.
- **Background** — White/clean (standard e-commerce), branded colors, lifestyle context, or something else?
- **What to emphasize** — Price? Features? Comparison against competitors? This shapes the layout.

**When to ask vs. proceed:**
- **Proceed without asking** if the user has specified: the product AND a product image URL (or explicitly said no image). That's enough to make confident design choices.
- **Ask** if the user hasn't mentioned whether they have a product image — this is the single highest-leverage question for product images, since the entire layout depends on it.

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

See [validation-checklist.md](validation-checklist.md) for the full 8-point check.
