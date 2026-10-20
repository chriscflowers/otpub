# Aviator demos & research (GitHub Pages)

## What's in the folder
| File | Purpose |
|---|---|
| `index.html` | Landing page: demos + latest research |
| `research.html` | Searchable, filterable research library |
| `note.html` | Displays one note from `notes/` |
| `notes/*.md` | Your published notes (copied from Obsidian) |
| `research-data.js` | The list of notes the pages read. **Generated, don't hand-edit.** |
| `build_index.py` | Script that regenerates `research-data.js` from your notes |
| `style.css`, `site.js` | Shared styling and card code |
| `aviator-microsite.html` | The demo (your `cr.html`, renamed) |
| `.nojekyll` | Tells GitHub Pages to serve files as-is. Keep it. |

**Keep all of these files together in the same folder.** If a page loses `style.css`, `site.js` or `research-data.js`, it will look broken.

## One-time setup
1. Install Python 3 from https://www.python.org/downloads (on Windows, tick "Add Python to PATH").
2. Install Git from https://git-scm.com/downloads.
3. Check both work. Open a terminal (Terminal on Mac, PowerShell on Windows) and run:
   `python --version` and `git --version`
   (On Mac/Linux, use `python3` if `python` isn't found.)

## Publish a note from Obsidian
1. Give the note properties at the top: `title`, `summary`, `topic`, `tags`, `date` (YYYY-MM-DD), `status`.
   Add `publish: false` to exclude a note.
2. Copy the `.md` file into the `notes/` folder. Use a lowercase-with-dashes filename.
3. In a terminal, go to the site folder and run: `python build_index.py`
   It prints "Wrote N entries" and updates `research-data.js`.
4. Preview locally (below), then commit and push (below).

`[[Wikilinks]]` between notes resolve by note title. Images embedded with `![[image.png]]` must be copied into `notes/attachments/`.
Not supported: Obsidian callouts, Dataview, embedded notes.

## Preview on your computer
Run `python -m http.server` in the site folder, then open http://localhost:8000. Stop it with Ctrl+C.
Notes only load through a server like this; double-clicking `note.html` will not work.

## Put it on GitHub Pages
1. Create a new repository on github.com.
2. In the site folder, run:
   ```
   git init
   git add .
   git commit -m "Initial site"
   git branch -M main
   git remote add origin https://github.com/YOUR-NAME/YOUR-REPO.git
   git push -u origin main
   ```
3. On GitHub: Settings → Pages → Source: "Deploy from a branch", branch `main`, folder `/ (root)`.
4. After a minute your site is at https://YOUR-NAME.github.io/YOUR-REPO/

For later updates: add notes, run `python build_index.py`, then `git add .`, `git commit -m "Add notes"`, `git push`.

## Troubleshooting
- **Page looks unstyled or a card list is missing:** a file is missing or in the wrong folder. Press F12 in your browser, open the Console tab, and look for red "404" or "not defined" messages.
- **"Note not found":** the filename in `notes/` doesn't match, or you didn't re-run `build_index.py`.
- **A [[wikilink]] doesn't resolve:** the linked note's `title` must match the link text, and that note must be in `notes/`.
