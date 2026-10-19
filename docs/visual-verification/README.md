# RemoGM visual release verification

Date: October 19, 2026
Production change: PR #5, merge `8d7b60eefd2777ce2016294b97c0f9f251b498b7`.

## Live checks

- `https://remogm.com/` and `https://remogm.com/technology/` returned HTTP 200 and bytes matching the merged source.
- The published WebVTT file returned HTTP 200 and matched the approved V2 captions.
- Desktop Chrome: 1440px viewport requested (1441 CSS pixels reported); no horizontal overflow or broken visible images.
- Video: click-to-play, paused on arrival, native controls, 58-second duration, playback advancing, ready state 4, English track showing and loaded (ready state 2).
- All eight industry selections updated the pressed state and the matching business setup link. Contractor, retail, and manufacturing displayed their supplied image; other industries retained their tailored text.
- Desktop architecture rendered the wide graphic; pause changed both SVG motion states to paused, and resume restored the visible animation while the hidden layout remained paused.
- Architecture explanation expanded successfully.
- Mobile architecture checked at 390px and 320px: stacked composition selected, no horizontal overflow, pause/resume controls working.
- Homepage checked at 320px: uncropped 16:9 player, visible concept label, and no horizontal overflow. Mobile menu closed after navigation; retail image loaded and fit its panel.
- No browser console errors appeared in the checked homepage and Technology sessions.
- Temporary viewport overrides were cleared after the checks.

## Source and media checks

JavaScript syntax and Git whitespace checks passed. Local file paths and unique HTML IDs passed. The supplied video decoded at 1920×1080, and its hash matched the V2 ZIP's website master. All 20 caption cues are ordered and end before 58 seconds. Source uploads were verified against local Git blob and tree hashes.

The managed local preview could not start because its container could not mount proc; live browser checks were completed instead. GitHub Pages' build passed. Its job status was still queued during the final browser checks, while both public pages and captions already matched the released source byte-for-byte.

Screenshots: `remogm-technology-live.jpg` and `remogm-demo-mobile.jpg`.
