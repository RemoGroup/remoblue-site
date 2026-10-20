# RemoGM™ marketing site

Static HTML, CSS, and JavaScript published through GitHub Pages at https://remogm.com. No build or dependencies required.

## RemoGM positioning

The homepage introduces RemoGM, includes the owner-provided general-manager definition with an adapted-from Investopedia link, and presents eight illustrative industry packages. Industry examples are marked as examples; configured pilot availability is explained before commitment. No customer outcomes or testimonials are fabricated.

## Humanoid vision

The hero uses the owner-selected RemoGM humanoid artwork and the live-text tagline “Start training your humanoid today.” The adjacent copy and dedicated vision section distinguish current configured digital responsibilities from future compatible-hardware integrations. Teaching company knowledge is not represented as physical robotics training. The humanoid and its dashboard are conceptual artwork.

`assets/remogm-humanoid-v1.webp` and its mobile companion are optimized encodings of the approved image, with no creative changes. The original image was edited with the built-in image-generation tool: preserve the owner’s robot, replace the chest screen with RemoGM, and show daily priorities plus Products, Customers, Marketing, Team, Operations, and Money.

## Files

- `index.html`: homepage, industry selector, six responsibilities, setup, pricing explanation, FAQ.
- `site.css`: shared responsive styles.
- `site.js`: navigation, industry examples, and local email-draft preparation.
- `book.html`: demo request via the published contact address, `remo@remogroup.ai`.
- `privacy/`, `terms/`: existing published legal pages.

## Demo requests

This static site has no submission backend or booking calendar. The visitor prepares a request locally, then sends it in their email app. The page explicitly states that preparing the draft does not send it or reserve a time. A copy fallback and direct email link are provided. The selected industry carries through in the URL. No customer details are stored by the form, put in the page URL, or sent by JavaScript.

## Verification and deployment

Run `node --check site.js`, check local links and anchors, and verify desktop/mobile rendering, all industry choices, request preselection, and draft preparation in the browser. Keep `CNAME` and `.nojekyll` intact. Push the reviewed changes to the existing publishing branch and verify the GitHub Pages deployment and public assets.

## Phone-to-humanoid hero

`hero-morph.js` restores the original code-rendered phone concept as RemoGM. A twenty-second repeating cycle places the phone over the chest bezel in the approved artwork, holds on the humanoid for ten seconds, then brings the phone back out. Both ends of the loop share the same phone pose, avoiding a visible reset. It uses the native Web Animations API; the existing WebP images are reused, with no video or animation dependencies. The phone mockup and humanoid are illustrative.

Pause/resume and replay controls are keyboard-accessible. The loop starts when its stage is visible, pauses offscreen or in a background tab, and preserves its position while recalculating chest alignment on resize. Reduced motion, disabled JavaScript, and `?motion=off` use the static phone-and-humanoid composition. The visible Still view link uses that same fallback. Main messaging and calls to action remain stationary.

## Technology overview

`technology/index.html` publishes the public architecture direction at `/technology/` (`/technology` redirects to the directory). `technology.css` contains its responsive presentation; the page uses the shared navigation script and approved humanoid asset. The homepage and demo request link to it, and the sitemap includes its canonical URL.

The October 18, 2026 progress statement comes from the owner's confirmation that humanoid engineering coordination with a manufacturer is underway. It does not name a manufacturer, claim a formal partnership, or assert hardware validation. Later milestones and the retail scenario are explicitly prospective. Controls are design requirements; the relationship between RemoGM and RemoBOTx is proposed. The page contains no private interfaces, prompts, credentials, or partner documents. Update dated milestones only when supporting evidence is available.

## Product film, industry scenes, and architecture (October 19, 2026)

The homepage includes the approved 58-second V2 contractor concept film immediately after the hero. The uncaptioned MP4, matching V2 WebVTT captions, and V2 poster are served locally from `assets/`. The player is click-to-play, preserves the full 16:9 frame, defaults to English captions, and uses `preload="none"`. A visible concept/sample-data label and an expandable transcript accompany the film. The MP4 matches the website master in the owner's V2 Drive package.

The industry selector starts with Contractors and shows a matching scene for all eight selections: real estate, mortgage lending, contractors, ecommerce, retail, law firms, accounting firms, and manufacturing. Every scene is a 1600 × 1000 WebP paired with its sample briefing and descriptive alt text. Explicit industry URL parameters and business setup links still work. Illustrative scenes are labeled; these are not customer testimonials or engineering evidence.

The Technology page embeds the supplied desktop and stacked mobile architecture SVGs. `architecture.css` scopes their styling and selects the mobile composition below 1050px of diagram width. `architecture.js` provides pause/resume, honors reduced motion, and pauses animation offscreen or in background tabs. The no-JavaScript view remains still and readable. Expandable descriptions explain the public layers, owner authority, and separation between business coordination and robot controls. Editable animated and static source exports live in `assets/architecture/`.

The initial assets were provided in the owner's RemoGM Google Drive folder (video V2 package and three WebP industry scenes) and attached `RemoGM_Architecture_Review_Package.zip`. Five additional industry scenes were created with the built-in image-generation tool and approved for placement by the owner on October 19. They use the same navy and warm-neutral photographic style; only size normalization and WebP encoding were applied after generation. Existing engineering progress statements remain dated October 18; development imagery will be added when actual evidence is supplied.


## Professional expertise presentation (October 20, 2026)

`/your-gm/` presents the owner-approved completed-product vision under “Consider it handled.” Seven professional roles explain ownership, judgment, and coordinated execution: executive leadership, marketing, financial oversight, operations, purchasing/inventory, customer relationships/calling, and people coordination. Sample briefings and the second-location story are illustrative presentation content, not live business activity. Professional roles describe AI expertise; licensed advice and final authority stay with the appropriate person.

`capabilities.css` owns the navy/ivory/gold editorial design and the prominent homepage discovery panel. `capabilities.js` progressively enhances real role anchors with deep-link/history support and filters the locally hosted integration logo wall. Without JavaScript every role and connection remains visible. This page adds no integration adapters, customer actions, or account permissions. Logo provenance is recorded in `assets/integrations/sources.json`.

Validate JS syntax, internal links and fragments, every role/filter, direct role links, mobile navigation, reduced motion, no-JS content, and desktop/mobile rendering. Publish via the existing GitHub Pages `main:/` source.
