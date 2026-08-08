# Option D Films — site

A single-page, dark/cinematic site built in plain HTML/CSS/JS — no build step,
no framework. Free to host on GitHub Pages with your own domain.

## Files

- `index.html` — all content. Search for `REPLACE` to find every spot to edit
  (company name, tagline, film titles, embed links, email, socials).
- `styles.css` — all styling. Colors, fonts, and spacing are defined once at
  the top under `:root` — change a value there and it updates everywhere.
- `script.js` — nav scroll behavior, mobile menu, footer year. Nothing to edit
  here unless you're changing behavior.
- `CNAME` — tells GitHub Pages which custom domain to serve. Replace the
  placeholder with your real domain before you push.

## 1. Swap in your films

For each film, duplicate one `<article class="reel">...</article>` block in
`index.html`. To get an embed URL:

- **YouTube**: open the video → Share → Embed → copy the URL inside `src="..."`.
  It looks like `https://www.youtube.com/embed/VIDEO_ID`.
- **Vimeo**: open the video → Share → Embed → copy the URL inside `src="..."`.
  It looks like `https://player.vimeo.com/video/VIDEO_ID`.

Paste that URL into the `src` of the matching `<iframe>`.

## 2. Put it on GitHub Pages

1. Create a new **public** GitHub repository (e.g. `night-reel-films`).
2. Upload `index.html`, `styles.css`, `script.js`, and `CNAME` to the root of
   the repo (drag-and-drop on github.com works fine, or `git push`).
3. In the repo: **Settings → Pages → Build and deployment → Source** → set to
   `Deploy from a branch`, branch `main`, folder `/ (root)`. Save.
4. GitHub will build a URL like `https://yourusername.github.io/night-reel-films`
   — confirm the site loads there before moving to your domain.

## 3. Point your own domain at it

You said you already own the domain — two steps:

1. **Edit `CNAME`** in the repo so it contains just your domain, e.g.:
   ```
   optiondfilms.com
   ```
2. **At your domain registrar** (wherever you bought the domain — Namecheap,
   GoDaddy, Cloudflare, Google Domains, etc.), add DNS records:
   - If using the root domain (`optiondfilms.com`): add four **A records**
     pointing to GitHub's IPs:
     ```
     185.199.108.153
     185.199.109.153
     185.199.110.153
     185.199.111.153
     ```
   - If using a subdomain like `www.optiondfilms.com`: add a **CNAME
     record** pointing to `yourusername.github.io`.
   - Most people set up both: root domain via A records, plus `www` via
     CNAME, then in GitHub Pages settings check "Enforce HTTPS" once it's
     available (can take up to 24 hours after DNS propagates).
3. Back in **Settings → Pages**, enter your custom domain in the "Custom
   domain" field and save — GitHub will verify it against the DNS records
   above and issue an HTTPS certificate automatically.

DNS changes can take anywhere from a few minutes to ~24 hours to propagate.

## 4. Adding more pages later

The site is one page now, but it's structured so growing it is low-effort:

- Copy `index.html` to a new file, e.g. `films.html` or `contact.html`.
- Keep the same `<header class="nav">...</header>` and `<footer>` blocks in
  the new file so navigation stays consistent — just update the `<nav>` links
  to point to `films.html#...` etc. instead of `#...`.
- Both files can keep sharing `styles.css` and `script.js` — no duplication
  needed there.
- If the site grows past 3–4 pages, it's worth asking me to convert the
  shared header/footer into a small include so you're not hand-editing every
  file — but for a handful of pages, copy-paste is genuinely fine.
