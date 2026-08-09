---
name: video-templates
description: Generate and render short videos from AI-authored Remotion templates via Pictify's video engine
metadata:
  tags: video, video-templates, remotion, ai-generation, mp4, gif
---

# Video Templates

Pictify renders short videos (product demos, animated social clips, promo loops) from Remotion-based templates. The fastest path from a natural-language brief to a rendered video is: **generate** a template from a prompt, then **render** it.

## Endpoints

| Method | Endpoint | Purpose |
|--------|----------|---------|
| POST | `/video/templates/generate` | AI-author a new template from a text prompt |
| GET | `/video/templates/:uid/variables` | Get a template's variable definitions |
| POST | `/video/templates/:uid/render` | Render the template to mp4 or gif |
| GET | `/video/templates` | List your video templates |
| GET | `/video/templates/:uid` | Fetch a template (includes its generated source) |

For hand-authoring the Remotion scene yourself (raw TSX, timeline-editor JSON) rather than generating from a prompt, use the [Pictify MCP server](https://github.com/pictify-io/mcp)'s `pictify_create_video_template` tool instead of the raw API — the TSX path has a compile/security gate that the MCP tool surfaces cleanly; this rule only covers the generate-then-render flow.

## Generate

```bash
curl -X POST https://api.pictify.io/video/templates/generate \
  -H "Authorization: Bearer $PICTIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "prompt": "A clean product launch teaser: bold headline animating in, then a feature list, dark background with a purple accent",
    "brandColor": "#7c3aed",
    "width": 1080,
    "height": 1080,
    "durationSeconds": 5
  }'
```

**Body**:
- `prompt` (string, required, 1-2000 chars) — describe the video in plain language. Be specific about pacing, text content, and mood; the model writes the actual animation code.
- `brandColor` (string, optional, max 32 chars) — hex color to bias the generated palette toward.
- `width` / `height` (integers, 16-4096, default 1080×1080) — output dimensions.
- `durationSeconds` (number, 1-60, default 5) — target length.

**Response**: `{ template: { uid, name, kind, variableDefinitions, posterUrl, durationInFrames, fps, width, height, status, ... }, previewUrl }`. `previewUrl` is a still frame (not the full video) so you have something to show immediately — render the actual video separately. Save `template.uid`; you need it for the next steps.

This is a slow, metered operation (compiles and does a visual-review pass) — expect it to take a while, and note it spends AI credits separately from render quota.

**Errors**: `503` if AI generation isn't configured on the server. `402` if you're out of AI credits (`code: "ai_quota_exceeded"`) or at your saved-template cap (`code: "template_limit_reached"`). `422` if the generated scene fails to compile — rephrase the prompt and retry.

## Check variables

```bash
curl https://api.pictify.io/video/templates/$UID/variables \
  -H "Authorization: Bearer $PICTIFY_API_KEY"
```

Response: `{ templateUid, templateName, kind, variables: [...], referenced: [...] }`. `variables` is the declared list (name/type/default, same shape as HTML templates — see [rules/html-templates.md](html-templates.md)); `referenced` is what the generated scene actually uses. Not every generated template declares variables — some are static.

## Render

```bash
curl -X POST https://api.pictify.io/video/templates/$UID/render \
  -H "Authorization: Bearer $PICTIFY_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "variables": { "headline": "Ship faster" },
    "format": "mp4"
  }'
```

**Body**: `variables` (object, optional — only needed if the template declares any) and `format` (`"mp4"` or `"gif"`, default `"mp4"`).

**Response**: `{ url, durationInFrames, format }`. `url` is a CDN-hosted video/GIF ready for use.

**Errors**: `402` quota exceeded (`code: "quota_exceeded"`) — video quota returns 402, unlike `POST /image` which returns 429; don't assume the two are consistent. `422` on an invalid variable value or a composition that would render blank (checked and rejected before you're billed). `500` on a generic render failure — safe to retry once. `501` in the rare case the server-side renderer for that template's kind isn't enabled.

## Notes

- Video rendering is slower than image rendering — budget more time per call and avoid tight polling.
- There's no live-preview endpoint for video the way `POST /templates/preview` works for HTML — the `previewUrl` still frame from `generate` is the closest equivalent.
