---
name: html-templates
description: Create and render reusable Handlebars HTML templates via Pictify's template engine
metadata:
  tags: templates, handlebars, html-engine, reusable, variables, dynamic
---

# HTML Templates (Handlebars Engine)

`engine: "html"` is the only template engine to create new templates with — always send it explicitly. Pictify retired the visual canvas editor (`engine: "fabric"` / `fabricJSData`); the API still reads existing fabric templates for backward compatibility, but don't create new ones that way.

`engine` is **immutable after create** — fork the template if you need to change it.

This rule covers `POST /templates`. For one-shot ad-hoc image generation, keep using `POST /image` (see [SKILL.md](../SKILL.md)). For video templates, see [rules/video-templates.md](video-templates.md).

## Why use a template instead of `POST /image`

Use a template when:
- The same design will be rendered many times with different values (personalized cards, batch jobs, OG images per blog post).
- You want a stable URL/UID to reference from your app.
- You need typed variables, defaults, or `{{#each}}` over an array.

Use `POST /image` for one-off renders or when the HTML is unique per call.

## Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/templates` | Create an `engine: "html"` template |
| GET | `/templates/:uid` | Fetch a template (returns `engine`, `html`, `variableDefinitions`, `jsEnabled`, `strictVariables`) |
| GET | `/templates/:uid/variables` | Get just the variable definitions |
| PUT | `/templates/:uid` | Update html / variableDefinitions / dimensions / flags |
| POST | `/templates/:uid/render` | Render with variable values (returns hosted CDN URL) |
| POST | `/templates/preview` | Live preview from in-flight HTML — returns a base64 dataUrl, no quota consumed |

## Create payload

```json
{
  "name": "Blog OG Image",
  "engine": "html",
  "html": "<!doctype html>...",
  "width": 1200,
  "height": 630,
  "variableDefinitions": [
    { "name": "title", "type": "text", "defaultValue": "Untitled" },
    { "name": "author", "type": "text" },
    { "name": "tags", "type": "array", "defaultValue": [] }
  ],
  "jsEnabled": false,
  "strictVariables": false,
  "outputFormat": "image"
}
```

### Field rules

- `engine: "html"` — required for the HTML path. Inferred from presence of `html` if omitted.
- `html` — body of the template, max **500 KB**. See "Authoring rules" below.
- `jsEnabled` (default `false`) — allow JavaScript during the Puppeteer render. Leave off unless your design genuinely depends on client-side scripting; the renderer captures a static image either way.
- `strictVariables` (default `false`) — when `true`, referencing an undeclared root-level variable throws at render time. Leave off for the common `{{#if optional}}{{optional}}{{/if}}` pattern.
- `variableDefinitions` — explicit, typed declarations. Any `{{identifier}}` referenced in the HTML body but missing from this list is **auto-added on save** as `{ type: 'text', defaultValue: '' }`. The response includes `addedVariables: [...]` so you know what was added.

### Variable types

| Type | Use for | Render-time value |
|------|---------|-------------------|
| `text` | Plain strings | string |
| `image` | Image URLs (used in `<img src="{{url}}">`) | string |
| `color` | Hex colors | string |
| `number` | Numbers | number |
| `boolean` | Truthy/falsy flags | boolean |
| `array` | `{{#each items}}` loop targets | JSON array (must be array, not null) |
| `object` | Nested-path access like `{{user.name}}` | JSON object (must be non-array, non-null) |

The renderer does **not** validate a sent value against its declared type — `variableDefinitions` types are a declaration for tooling (and for the `{{#each}}` iteration-cap accounting), not an enforced runtime contract. Sending a string where `array` was declared doesn't error: Handlebars' `{{#each}}` simply skips non-array/non-object contexts, so that block silently renders empty. Validate value shapes on your side before sending them.

## Authoring rules — what the engine accepts

The engine is Handlebars 4.7 with a hardened helper safelist. Misuse causes `HELPER_NOT_ALLOWED` or compile errors at render time.

### Allowed Handlebars syntax

- `{{name}}` — escaped interpolation. Default for user-supplied text.
- `{{{name}}}` — raw (unescaped) HTML. Only use for variables that are explicitly trusted markup; default to `{{name}}`.
- `{{#if x}} … {{/if}}` — **truthy-only** check on a single value. There are no comparison helpers.
- `{{#unless x}} … {{/unless}}`
- `{{#each items}} … {{/each}}` — loop over an array (`items` must be declared `type: "array"`). Inside the block:
  - `{{this}}` or `{{this.field}}` — current item
  - `{{@index}}` — 0-based position
  - `{{@first}}` / `{{@last}}` — booleans
- `{{#with obj}} … {{/with}}` — scope into a nested object

### Safelisted helpers (exhaustive — 45)

Any helper name not on this list throws `HELPER_NOT_ALLOWED`.

```
length, isEmpty, isNotEmpty, isDefined, isUndefined,
isArray, isString, isNumber, isBoolean, isObject,
contains, first, last, indexOf, join, slice,
lowercase, uppercase, capitalize, titleCase, trim, truncate,
padStart, padEnd, replace, split, startsWith, endsWith,
round, floor, ceil, abs, min, max, sum, average,
currency, number, percent, date, time,
default, coalesce, json, parseJson
```

### What Handlebars does NOT have

These are common reach-for patterns that **do not work** — pre-compute the values before sending them in the variable payload.

- **No arithmetic helpers**: `{{multiply x 2}}`, `{{add a b}}`, `{{x * 2}}` — none of these work. There are no math operators in Handlebars itself, and Pictify's safelist intentionally omits arithmetic helpers. Pre-compute and pass the result (e.g. send `priceWithTax` already calculated).
- **No comparison helpers**: `{{eq a b}}`, `{{lt a b}}`, `{{gt a b}}`, `{{and a b}}`, `{{or a b}}`. `{{#if x}}` is a truthy check on one value. For comparisons, pre-compute a boolean variable.
- **No `<style>` tags, no `<link>` to external CSS, no `@import`** — inline styles only. This matches the `POST /image` rules; the same Puppeteer renderer is used.
- **No `<script>` tags** unless `jsEnabled: true` (and even then, prefer pre-rendering server-side).
- **No partials**, no custom helpers beyond the safelist.

### Helper call syntax

Helpers are called as `{{helperName value ...args}}` — the **first token** is the helper, the rest are positional args. A common mistake is using a variable name as a helper:

```handlebars
{{!-- WRONG: tries to call a helper named "price" --}}
{{price amount}}

{{!-- RIGHT: plain interpolation --}}
{{amount}}

{{!-- RIGHT: format with the currency helper --}}
{{currency amount "USD"}}
```

Subexpressions use parentheses:

```handlebars
{{truncate (trim title) 80}}
{{currency (sum lineItems) "USD"}}
```

### Worked example

```html
<!doctype html>
<html>
<head>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap" rel="stylesheet">
</head>
<body style="margin:0;padding:0;">
  <div style="position:absolute;top:0;left:0;width:1200px;height:630px;background:{{default brandColor '#1f2937'}};font-family:Inter,sans-serif;color:#fff;padding:64px;box-sizing:border-box;">
    <div style="font-size:24px;opacity:0.7;">{{uppercase category}}</div>
    <h1 style="font-size:64px;font-weight:700;margin:24px 0;">{{truncate title 80}}</h1>
    <div style="font-size:20px;">By {{author}} · {{date publishedAt "short"}}</div>

    {{#if tags}}
      <div style="margin-top:48px;display:flex;gap:8px;flex-wrap:wrap;">
        {{#each tags}}
          <span style="background:rgba(255,255,255,0.15);padding:8px 16px;border-radius:999px;font-size:16px;">{{this}}</span>
        {{/each}}
      </div>
    {{/if}}
  </div>
</body>
</html>
```

`variableDefinitions`:

```json
[
  { "name": "title", "type": "text" },
  { "name": "author", "type": "text" },
  { "name": "category", "type": "text", "defaultValue": "Article" },
  { "name": "publishedAt", "type": "text" },
  { "name": "brandColor", "type": "color" },
  { "name": "tags", "type": "array", "defaultValue": [] }
]
```

## Render

```bash
curl -X POST https://api.pictify.io/templates/$UID/render \
  -H "Authorization: Bearer $PICTIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "variables": {
      "title": "Shipping Handlebars Templates",
      "author": "Pictify Team",
      "category": "Engineering",
      "publishedAt": "2026-04-23",
      "brandColor": "#0f172a",
      "tags": ["handlebars", "templates", "ssr"]
    },
    "format": "png"
  }'
```

Response: `{ results: [{ url, width, height, format, name, layout }], totalRendered, templateUid }`. The `url` is a CDN-hosted image.

## Live preview

While iterating on the HTML body, hit `POST /templates/preview` instead of saving + rendering each time:

```json
POST /templates/preview
{
  "html": "<your in-flight html>",
  "variableDefinitions": [...],
  "variables": { "title": "Preview" },
  "width": 1200,
  "height": 630,
  "format": "png",
  "jsEnabled": false,
  "strictVariables": false
}
```

Response: `{ dataUrl, width, height, format, renderId, timings, totalMs }`. The `dataUrl` is a base64 `data:image/png;base64,…` URL ready to drop into an `<img src>`. **Quota is not consumed**, so this is the right endpoint for editor loops. Rate limit: 60/minute per session.

## Error codes you will hit

| Code | Cause | Fix |
|------|-------|-----|
| `HELPER_NOT_ALLOWED` | Called a helper outside the safelist | Remove or replace with a safelisted helper. Pre-compute arithmetic/comparisons in the payload. |
| `RAW_HTML_NOT_ALLOWED` | Used `{{{var}}}` on a variable not marked as raw | Switch to `{{var}}` or declare the variable as raw-trusted. |
| `TEMPLATE_TOO_LARGE` | HTML body exceeds 500 KB | Trim the body — usually means inlined images; switch to `<img src="{{url}}">` with image-type variables. Returns **413**, not 422. |
| `HANDLEBARS_COMPILE_ERROR` | Syntax error (unclosed `{{#each}}`, etc.) | The error includes line info from the engine. Fix and retry. |
| `VARIABLE_REQUIRED` | A `variableDefinitions` entry has `validation.required: true` and the value is missing/null/empty at render | Provide the variable, or drop the `required` flag if it's genuinely optional. |
| `UNDEFINED_VARIABLE` | `strictVariables: true` and a root-level identifier in the HTML has no matching key in the render payload | Either provide the variable or turn `strictVariables` off. Only root-level identifiers are checked — names inside `{{#each}}`/`{{#with}}` blocks resolve against the block's item, not the root. |
| `ITERATION_LIMIT_EXCEEDED` | `{{#each}}` iterated past the per-render budget | Trim the array before sending or paginate. |

There's no dedicated "type mismatch" error — see the note under Variable types above; a wrong-shaped value for an `array`/`object` variable renders silently empty rather than erroring.

Compile/validation errors return HTTP 422 (except `TEMPLATE_TOO_LARGE`, which is 413) with `{ error, code, context }`.
