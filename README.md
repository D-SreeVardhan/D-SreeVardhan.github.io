# Portfolio

**Live at [d-sreevardhan.github.io](https://d-sreevardhan.github.io)**

A static personal site for Sree Vardhan Desu. No build step, no dependencies, no framework.

```
index.html     Content and structure
styles.css     Design system and layout
main.js        Active section highlight in the aside nav
favicon.svg    Mark
resume.pdf     Copy of the built résumé
```

## Design

Hybrid of two patterns that show up on strong AI/ML portfolios:

1. **Sticky left identity + scrolling content** — the scan layout popularised by
   [Brittany Chiang](https://brittanychiang.com). Name, pitch, section nav, and
   links stay put; About / Work / Research / Toolkit scroll on the right.
2. **Outcome-first project cards** — the production-AI case-study shape used by
   sites like [Leonardo Urena](https://www.leonardo-urena.com). Each project opens
   with the result, then a metric strip, then numbered architecture steps, then
   an honest limitation note.

Kept oxblood (`#6e1b21`) and EB Garamond so the site still matches the printed
résumé and does not read as a dark-teal Chiang clone.

## Run locally

```bash
cd portfolio && python3 -m http.server 8000
```

## Publishing updates

This directory is a git repository published to GitHub Pages from
[`D-SreeVardhan/D-SreeVardhan.github.io`](https://github.com/D-SreeVardhan/D-SreeVardhan.github.io).

```bash
cd portfolio
git add -A && git commit -m "update: <what changed>"
git push
```

Rebuild takes under a minute. Check status:

```bash
gh api repos/D-SreeVardhan/D-SreeVardhan.github.io/pages/builds/latest --jq '{status, error: .error.message}'
curl -sS -o /dev/null -w '%{http_code}\n' https://d-sreevardhan.github.io/
```

## Keeping the résumé in sync

```bash
cp ../resume/resume.pdf resume.pdf
```
