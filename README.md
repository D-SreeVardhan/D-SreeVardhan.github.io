# Portfolio

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

## Deploy to GitHub Pages

Create a repository named `D-SreeVardhan.github.io` — for that exact name GitHub publishes at
`https://d-sreevardhan.github.io` with no project path.

```bash
cd portfolio
git init -b main
git add .
git commit -m "feat: portfolio site"
git remote add origin https://github.com/D-SreeVardhan/D-SreeVardhan.github.io.git
git push -u origin main
```

Then in the repository, open Settings → Pages and set the source to deploy from the `main` branch,
root folder. The first publish takes a minute or two.

Any static host works the same way: Netlify, Vercel, and Cloudflare Pages will all serve this
directory as-is with no build command.

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
