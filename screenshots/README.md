# YouConnect Onboarding Screenshots

This folder contains automated screenshots of all pages in the YouConnect onboarding application.

## How to Generate Screenshots

1. **Make sure the dev server is running:**
   ```bash
   npm run dev
   ```

2. **In a new terminal, run the screenshot script:**
   ```bash
   npm run screenshots
   ```

3. **Wait for completion** - The script will capture all pages and generate a `manifest.json` file with details.

## Screenshot Organization

Screenshots are organized by module:

- `00-landing-page.png` - Landing page with role selection
- `01-hub.png` - Onboarding hub

### Module 1: Organization Setup (02-08)
- Organization intro, services, info, branding, participants, IT config, completion

### Module 2: Definitions (09-14)
- Definitions intro, overview, property categories, property record, request form, completion

### Module 3: Team & Groups (15-18)
- Users intro, team members, lending groups, completion

### Module 4: Routing (19-23)
- Routing intro, request type, logical, assigned area, completion

### Module 5: General Settings (24-26)
- Settings intro, workflow settings, completion

### Module 6: IT Checklist (27-29)
- IT intro, checklist, completion

### Other Pages (30+)
- Test order page

## Manifest File

The `manifest.json` file contains:
- Generation timestamp
- Success/failure counts
- Details for each screenshot including filename, description, and status

## Technical Details

- **Resolution:** 1920x1080
- **Format:** PNG
- **Capture Method:** Full page screenshots using Puppeteer
- **Browser:** Chromium (headless)

