---
name: css-patterns
description: CSS patterns that render reliably in Pictify's headless browser renderer
metadata:
  tags: css, styling, patterns, gradients, shadows, flexbox, grid
---

# CSS Patterns for Pictify

Pictify renders HTML in a headless Chromium browser. Modern CSS features are fully supported. These patterns are reliable and produce professional results.

## Root Container Pattern

Every HTML-to-image render MUST use this root container pattern:

```css
body {
  margin: 0;
  padding: 0;
  font-family: 'Inter', sans-serif;
}

.container {
  position: absolute;
  top: 0;
  left: 0;
  width: 1200px;   /* Match API width param */
  height: 630px;   /* Match API height param */
  overflow: hidden;
}
```

This is non-negotiable. Without `position: absolute` and explicit pixel dimensions, the rendered image will not match the requested size.

## Layout Patterns

### Centered Content (Flexbox)

```css
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
}
```

### Two-Column Split

```css
.container {
  display: flex;
}
.left {
  flex: 1;
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.right {
  flex: 1;
  background-size: cover;
  background-position: center;
}
```

### Grid Layout

```css
.container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto 1fr auto;
  gap: 20px;
  padding: 40px;
}
```

### Bottom-Aligned Footer Bar

```css
.container {
  display: flex;
  flex-direction: column;
}
.content {
  flex: 1;
  padding: 60px;
}
.footer {
  padding: 20px 60px;
  background: rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: space-between;
}
```

## Background Patterns

### Solid Color
```css
background: #1a1a2e;
```

### Linear Gradient
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Radial Gradient
```css
background: radial-gradient(ellipse at 30% 50%, #1a1a3e 0%, #0a0a1a 100%);
```

### Multi-Stop Gradient
```css
background: linear-gradient(135deg, #f093fb 0%, #f5576c 50%, #4facfe 100%);
```

### Gradient with Noise Texture
```css
.container {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}
/* Subtle dot pattern overlay */
.container::after {
  content: '';
  position: absolute;
  inset: 0;
  background-image: radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px);
  background-size: 20px 20px;
}
```

### Mesh Gradient (Multiple Radials)
```css
background:
  radial-gradient(at 20% 30%, #7c3aed 0%, transparent 50%),
  radial-gradient(at 80% 70%, #2563eb 0%, transparent 50%),
  radial-gradient(at 50% 50%, #7c3aed 0%, transparent 70%),
  #0f172a;
```

## Typography Patterns

### Large Headline with Subtitle
```css
.headline {
  font-size: 64px;
  font-weight: 700;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: #ffffff;
}
.subtitle {
  font-size: 24px;
  font-weight: 400;
  line-height: 1.4;
  color: rgba(255, 255, 255, 0.7);
  margin-top: 16px;
}
```

### Text Clamping (Prevent Overflow)
```css
.title {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
```

### Gradient Text
```css
.gradient-text {
  background: linear-gradient(90deg, #667eea, #764ba2);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

## Visual Effects

### Box Shadow (Elevation)
```css
box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
```

### Border with Subtle Glow
```css
border: 1px solid rgba(255, 255, 255, 0.1);
box-shadow: 0 0 30px rgba(100, 100, 255, 0.1);
```

### Rounded Corners
```css
border-radius: 16px;
```

### Glass Effect (Glassmorphism)
```css
.glass {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 16px;
}
```

### Image Overlay (Darken for Text Readability)
```css
.image-bg {
  background-image: url('...');
  background-size: cover;
  background-position: center;
  position: relative;
}
.image-bg::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.7));
}
.image-bg .content {
  position: relative;
  z-index: 1;
}
```

## What to Avoid

### Viewport-relative units
`vw`, `vh`, `vmin`, `vmax` — behavior is unpredictable. Use `px` or `%` relative to a fixed-size parent.

### CSS animations and transitions
Static image renders capture a single frame. CSS `@keyframes`, `transition`, and `animation` properties have no effect on the output.

### External stylesheets other than Google Fonts
Only Google Fonts via `<link>` tag is reliable. Other external stylesheets may not load in time before the renderer captures. Inline all CSS in `<style>` tags.

### `@import` for fonts
Use `<link>` tags in `<head>`, not `@import` in CSS. `@import` may not resolve before render capture.

### `<script>` tags
JavaScript is not executed. All content must be rendered by HTML and CSS alone.
