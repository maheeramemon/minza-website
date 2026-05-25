# Setting up the Minza site on a new computer

Follow these steps to get the Minza website running on a different computer (laptop, work machine, etc.). Estimated time: **20 minutes**.

## 1. Install prerequisites

You need three things installed on the new machine. Install them in this order:

1. **Node.js** (the runtime that powers the site)
   - Download from <https://nodejs.org> — pick the **LTS** version
   - Run the installer with default options
   - Verify in a terminal: `node --version` should print something like `v24.x.x`

2. **Git** (to download the code from GitHub)
   - Windows: <https://git-scm.com/download/win>
   - macOS: comes with Xcode Command Line Tools (`xcode-select --install`)
   - Verify: `git --version`

3. **A code editor (optional but recommended)**
   - VS Code is free: <https://code.visualstudio.com>

## 2. Clone the repo

Open a terminal (Windows: Git Bash or PowerShell) and run:

```bash
cd Desktop                # or wherever you want the project to live
git clone https://github.com/maheeramemon/minza-website.git
cd minza-website
```

This downloads the entire site into a folder called `minza-website/`.

## 3. Install dependencies

Inside the project folder:

```bash
npm install
```

This downloads everything the site needs (Next.js, Tailwind, etc.) into a `node_modules/` folder. Takes ~1 minute. You'll only do this once per machine.

## 4. Set up the environment file

The Web3Forms key (which powers the inquiry form) is intentionally kept out of GitHub. Recreate it manually:

1. Create a new file in the project root called `.env.local` (note the leading dot)
2. Paste this single line into it:

   ```
   NEXT_PUBLIC_WEB3FORMS_KEY=6588a662-4ec7-43ca-a9b2-e9bc304cb0f6
   ```

3. Save the file.

> The key above is the same one used in production. It's safe to share between machines; it's a public key that only routes form submissions to `naziaj2012@gmail.com`. Don't put it on GitHub.

## 5. Run the site locally

```bash
npm run dev
```

After ~5 seconds, the terminal will say:

```
✓ Ready in 415ms
- Local:    http://localhost:3010
```

Open `http://localhost:3010` in any browser. The site will look exactly like minzabynj.com, but edits you make to product files will show up immediately without redeploying.

To stop the dev server: press `Ctrl+C` in the terminal.

## 6. Configure Git for pushing changes (only if you'll commit from this machine)

If you want to push changes to GitHub from the new computer:

```bash
git config user.name "Maheera Memon"
git config user.email "maheeramemon@users.noreply.github.com"
```

(This only affects this project, not your other Git work.)

The first time you `git push`, Git will prompt you to authenticate to GitHub via your browser — sign in to the `maheeramemon` account.

## 7. Optional: Install Claude Code on the new machine

If you want to use Claude Code (the AI assistant we've been working with) on the new machine:

1. Visit <https://claude.com/claude-code> and follow the install instructions for your OS
2. In the project folder, run `claude` and it'll attach to this project with all the context

---

## Common tasks (cheat sheet)

| Task | Command |
|---|---|
| Start dev server | `npm run dev` |
| Stop dev server | `Ctrl+C` in the terminal |
| Pull latest changes from GitHub | `git pull` |
| See what's changed locally | `git status` |
| Get an updated catalog.csv | `npm run dev` once will refresh from `data/products/*.json` |
| Build for production locally | `npm run build` |

## Folder reference

| Folder | What it holds |
|---|---|
| `data/products/` | One JSON file per product — edit a name, price, description here |
| `public/images/products/` | The actual photo files for each product |
| `data/catalog.csv` | Auto-generated catalog log — don't hand-edit |
| `data/instagram.json` | The 6 Instagram tiles on the homepage |
| `src/app/` | The pages (home, catalog, about, contact, etc.) |
| `src/components/` | Reusable UI pieces (Header, Footer, ProductCard, etc.) |
| `.env.local` | Local-only environment variables (Web3Forms key) — **don't commit this** |

## Trouble?

- `npm: command not found` → Node.js didn't install correctly, redo step 1
- `Permission denied` on push → Git couldn't authenticate to GitHub, try `gh auth login` if you have GitHub CLI installed, or just re-clone with HTTPS
- Site loads but inquiry form doesn't send → `.env.local` is missing or has the wrong key; redo step 4

If anything else breaks, take a screenshot of the error and ask Claude.
