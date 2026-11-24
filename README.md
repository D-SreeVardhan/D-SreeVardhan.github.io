# Portfolio

**Live at [d-sreevardhan.github.io](https://d-sreevardhan.github.io)**

A static personal site for Sree Vardhan Desu. No build step, no dependencies, no framework —
four files that a browser can open directly.

```
index.html     Content and structure
styles.css     Design system and layout
main.js        Progressive enhancement only (scroll reveal, active section)
favicon.svg    Mark
resume.pdf     Copy of the built résumé, linked from the page
```

## Run it locally

Open `index.html` in a browser, or serve it:

```bash
cd portfolio && python3 -m http.server 8000
```

## Publishing updates

This directory is a git repository published to GitHub Pages from
[`D-SreeVardhan/D-SreeVardhan.github.io`](https://github.com/D-SreeVardhan/D-SreeVardhan.github.io),
branch `main`, root folder. Because the repository is named `<username>.github.io`, it serves at
the apex `d-sreevardhan.github.io` with no project path.

To publish a change:

```bash
cd portfolio
git add -A && git commit -m "update: <what changed>"
git push
```

The rebuild takes under a minute. Check it from the command line:

```bash
gh api repos/D-SreeVardhan/D-SreeVardhan.github.io/pages/builds/latest --jq '{status, error: .error.message}'
curl -sS -o /dev/null -w '%{http_code}\n' https://d-sreevardhan.github.io/
```

Pages serves static files only, which is why it is free with no sleep or cold starts — the usual
catch with free dynamic hosting tiers. The trade-off is that there is no server-side code here,
which this site does not need.

### Custom domain

If you buy a domain later, add a `CNAME` file containing the bare domain, point a DNS `ALIAS`
or `A` record at GitHub's Pages IPs, and enable "Enforce HTTPS" in the repository settings.

## Design notes

The site deliberately shares an identity with the printed résumé: EB Garamond, an oxblood accent
(`#6e1b21`), and warm paper rather than white. It avoids the default tech-portfolio conventions —
cool blues, gradient hero sections, glassmorphism, card grids — in favour of an editorial layout
with a section index, numbered project entries, and a small hand-built diagram per project.

Specifics worth preserving if you edit it:

- **One accent, used sparingly.** Oxblood marks the name, section numbers, metrics, and links.
  Adding a second accent colour would dilute it.
- **Dark mode is a palette swap**, driven by `prefers-color-scheme` through CSS custom properties.
  There is no toggle and no JavaScript involved.
- **JavaScript is additive.** The reveal animation applies its hiding class from JavaScript, never
  from the markup, so content can never end up permanently invisible if the script fails. Both
  enhancements are skipped entirely under `prefers-reduced-motion`.
- **Accessibility.** Semantic landmarks, a skip link, visible focus rings, and the section index
  marked with `aria-current` as you scroll.

## Keeping the résumé in sync

`resume.pdf` is a copy. After rebuilding the LaTeX résumé, refresh it:

```bash
cp ../resume/resume.pdf resume.pdf
```
