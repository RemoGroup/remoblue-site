# RemoBlue marketing site

Static HTML, CSS, and JavaScript published through GitHub Pages at https://remoblue.com. No build or dependencies required.

## RemoGM positioning

The homepage introduces RemoGM, includes the owner-provided general-manager definition with an adapted-from Investopedia link, and presents eight illustrative industry packages. Industry examples are marked as examples; configured pilot availability is explained before commitment. No customer outcomes or testimonials are fabricated.

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
