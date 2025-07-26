# Sanskriti Website Utils

## How to Dynamically Update the Website

This guide explains how to update content and assets for the NU Sanskriti website without manual code changes.

### 1. Board Members
- Update the Google Sheet linked for board members.
- The website automatically fetches and displays the latest board data (name, position, photo, social links) from the sheet.
- No need to edit HTML or JS files for board changes.

### 2. FAQs
- Edit the markdown files in `assets/` (e.g., `generalfaq.md`, `faq-incoming-indian-students.md`).
- FAQ sections on the website will update automatically when these files are changed.

### 3. Images
- Add new images to the appropriate folder (e.g., `assets/img/events/`, `assets/img/team/`).
- Run the image compression script:
  ```sh
  bash assets/utils/compress-images.sh
  ```
- This will optimize all images for fast loading and best quality.

### 4. Social Links
- Update global links in the Google Sheet or `assets/global-links.js`.
- Social icons and links on all pages will update automatically.

### 5. Content Sections
- Most content (events, portfolios, team, FAQs) is loaded dynamically via JavaScript.
- For major layout changes, edit the relevant HTML file (e.g., `index.html`, `about.html`).

### 6. Adding New Features
- Add new scripts or styles to the `assets/js/` or `assets/css/` folders.
- Reference them in your HTML files as needed.

---

**Tip:** Always compress images after adding them for best performance. Most content updates do not require code changes—just update the source files or sheets!
