# OSV brand loop videos

Short muted image→video loops from brand stills (Higgsfield **kling3_0_turbo**, ~5s).
Encoded H.264, no audio, `+faststart`, under ~2 MB each for web heroes / lookbook tiles.

| File | Source still | Motion |
|------|--------------|--------|
| `hero-cover.mp4` | hero-cover.png | Hair drift + breathe zoom |
| `portrait-blood.mp4` | portrait-blood.png | Subtle breath / blood gleam |
| `armor-lamb.mp4` | armor-lamb.png | Soft push-in, wool / metal shimmer |
| `black-cat.mp4` | black-cat.png | Fur breath, eye gleam |
| `gothic-tower.mp4` | gothic-tower.png | Rising fog |
| `hero-pier.mp4` | hero-pier.png | Fog drift + flag flutter |
| `anime-chrome-nun.mp4` | anime-chrome-nun.png | Chrome specular crawl |
| `anime-red-liquid.mp4` | anime-red-liquid.png | Viscous red shimmer |
| `dark-knight.mp4` | dark-knight.png | Slow push-in |
| `battlefield-banners.mp4` | battlefield-banners.png | Banner flutter / smoke |

## Generation notes (2026-08-02)

- Model: `kling3_0_turbo` · duration 5s · start_image from brand stills
- Post: `ffmpeg` libx264 CRF 23, mute (`-an`), scale ≤1280, `+faststart`
- Native fallback still uses poster PNGs via `LoopVideo.tsx`
