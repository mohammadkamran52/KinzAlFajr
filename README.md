# Kinz Al Fajr Technical Services website

A static website (no backend, no database, no login) built with React, Vite and Tailwind CSS. It has a light and dark theme, and the quote form opens WhatsApp with the message ready to send.

**The one rule:** all the words, numbers and links on the site live in `src/data/`. To change content, you only edit files in that folder. You never need to touch the other code.

---

## 1. Run the site on your computer

Open a terminal **inside the project folder** (the folder that contains `package.json`).

```bash
npm install        # only the first time, or after someone adds a package
npm run dev        # starts the site; open the address it prints (usually http://localhost:5173)
```

Stop it with `Ctrl + C`. While it runs, every file you save updates the browser by itself.

---

## 2. Where to change things

| I want to change... | Edit this file |
|---|---|
| Company name, phone numbers, WhatsApp, email, address, opening hours, map, social links | `src/data/company.js` |
| Vision, mission, values | `src/data/company.js` |
| Menu links and the "Get a quote" button text | `src/data/navigation.js` |
| Page titles, page headings, intro texts, home hero text, the call-to-action band | `src/data/pages.js` |
| The company story on "Who we are" | `src/data/pages.js` (the `story` list under `whoWeAre`) |
| Services (text, "what's included", which show on Home) | `src/data/services.js` |
| People, roles, leader statements | `src/data/team.js` |
| Client testimonials | `src/data/testimonials.js` |
| Colours and fonts | `src/index.css` (colours) and `index.html` (font link) |

After editing, save the file and check the browser. If the page goes blank or shows an error, you probably deleted a comma, quote or bracket. Undo the last change (`Ctrl + Z`) and try again.

---

## 3. Common jobs

### Change a phone number or WhatsApp number
Open `src/data/company.js`. The site has two contacts:

| Field | Meaning | Example |
|---|---|---|
| `phone` | Dubai number, as you want it shown | `"+971 55 922 5591"` |
| `phoneLabel` | Word shown next to it | `"Dubai"` |
| `whatsapp` | Dubai WhatsApp, **digits only**, with country code | `"971559225591"` |
| `phone2` | India number, as you want it shown | `"+91 96672 26511"` |
| `phone2Label` | Word shown next to it | `"India"` |
| `whatsapp2` | India WhatsApp, **digits only**, with country code | `"919667226511"` |

Spaces in `phone` and `phone2` are fine; they are removed automatically when someone taps to call. The quote form on the Contact page always sends to the **Dubai** WhatsApp (`whatsapp`).

To hide the second contact completely, set `phone2` and `whatsapp2` to `""`.

### Add opening hours, a map or social links
- `hours`: type the text, for example `"Saturday to Thursday, 8:00 to 18:00"`. Empty means hidden.
- `mapEmbedUrl`: in Google Maps choose Share, then Embed a map, and copy only the address inside `src="..."`. Empty means no map.
- `social`: paste the full profile link for each network. Empty ones are hidden.

### Add a new service
1. In `src/data/services.js`, copy one whole `{ ... },` block and paste it at the position where it should appear.
2. Give it a new, unique `id` in lowercase with hyphens, for example `"waterproofing"`.
3. Fill in `title`, `shortDescription`, `fullDescription` and `includes` (4 to 6 short items). Describe the work in general terms; do not promise brands, warranties or timelines you cannot back up.
4. Set `featured: true` if it should also appear on the Home page.

The Services page, footer links and the quote form's service list update by themselves.

### Add a team member or a leader
In `src/data/team.js`, copy one block and fill in `id`, `name`, `role`, `department`. Set `isLeader: true` only for the four leadership cards on "Who we are" (those also need a `statement`). Everyone appears on the Team page, grouped by `department`.

### Add a client testimonial
The testimonials list is **empty on purpose**, and while it is empty the testimonial sections stay hidden. Add an entry only when a real client has agreed to it. A template is written as a comment at the top of `src/data/testimonials.js`.

### Add or replace pictures
Put the files in the `public/images/` folders, then write the path in the data file.

| Picture | Save as | Then set |
|---|---|---|
| Logo for light theme | `public/images/brand/logo-for-light.svg` | already set in `company.logo` |
| Logo for dark theme | `public/images/brand/logo-for-dark.svg` | already set in `company.logo` |
| Logo mark (square) | `public/images/brand/logo-mark.svg` | already set in `company.logo` |
| Service photo, 800 x 600 | `public/images/services/<service-id>.jpg` | `image: "/images/services/<service-id>.jpg"` |
| Team photo, 600 x 600 | `public/images/team/<person-id>.jpg` | `photo: "/images/team/<person-id>.jpg"` |
| Favicon | `public/favicon.svg` | already linked in `index.html` |
| App icon, 180 x 180 | `public/apple-touch-icon.png` | already linked in `index.html` |

Make photos small before uploading (about 120 KB or less each) so the pages load fast. Until a picture exists, the site shows a neutral tile block (or a text name instead of the logo), so nothing looks broken.

---

## 4. Check before you publish

Run these in the project folder:

```bash
npm run lint       # should print nothing (no errors)
npm run build      # creates the "dist" folder; should end with "built in ..."
npm run preview    # opens the built site locally, the same files Netlify will serve
```

In the preview, click through every page, press the theme button (moon or sun) in the menu, make the browser window narrow like a phone, and refresh on `/services`, `/team` and `/contact` to make sure they still load.

---

## 5. Save your work to GitHub

```bash
git add .
git commit -m "Describe what you changed"
git push
```

The `node_modules` and `dist` folders are ignored on purpose; they are rebuilt from the code.

## 6. Publish on Netlify

1. Run `npm run build`.
2. In Netlify, drag the **contents of the `dist` folder** (not the whole project folder) onto the site's deploy area.
3. The file `public/_redirects` is already set up, so refreshing a page like `/services` works.
4. Connect the .ae domain in Netlify under Domain settings.

---

## 7. Before launch checklist

- [ ] Logo files added (3 SVG files) and favicon files added
- [ ] Opening hours, map and social links filled in, or left empty on purpose
- [ ] Each of the four leaders has approved their statement in `team.js`
- [ ] Company story written in `pages.js`, or left empty on purpose
- [ ] Real service and team photos added (optional but recommended)
- [ ] Real client testimonials added with permission, or left empty
- [ ] The text in vision and mission is true and approved by management
- [ ] Share image added and the final domain set (needed for link previews)
- [ ] `npm run lint` and `npm run build` both pass

---

## 8. How the folders fit together

```
public/            files copied to the site as they are (images, favicon, _redirects)
src/data/          ALL content (the only folder you normally edit)
src/hooks/         useTheme.js: light and dark theme logic
src/utils/         contactLinks.js: builds phone, WhatsApp and email links
src/components/    reusable pieces: ui, cards, sections, layout
src/pages/         one folder per page
src/index.css      colours (light and dark) and fonts
```

## 9. If something goes wrong

| Problem | What to try |
|---|---|
| `command not found: npm` | Install Node.js (the LTS version) from nodejs.org, then reopen the terminal. |
| Blank page or red error in the browser | You most likely broke a comma, quote or bracket in a data file. Undo your last edit. |
| An image does not show | Check the file is inside `public/images/...` and that the path in the data file starts with `/images/` and matches the file name exactly (capital letters matter). |
| Theme looks wrong after a change | Clear the saved choice: in the browser console run `localStorage.removeItem("kaf-theme")`, then refresh. |
| A page shows "not found" after refreshing on Netlify | Make sure `public/_redirects` exists and you uploaded the contents of `dist`. |
