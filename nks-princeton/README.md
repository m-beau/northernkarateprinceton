# NKS Princeton Website

Static website for Northern Karate Schools Princeton, built with [Astro](https://astro.build).

## Project Structure

```
nks-princeton/
├── public/
│   ├── images/          # Static images (logo, hero, etc.)
│   └── favicon.svg
├── src/
│   ├── components/      # Reusable Astro components
│   │   ├── Hero.astro
│   │   ├── Programs.astro
│   │   ├── About.astro
│   │   ├── Schedule.astro
│   │   ├── Testimonials.astro
│   │   └── Contact.astro
│   ├── layouts/
│   │   └── Layout.astro # Base layout with header/footer
│   ├── pages/
│   │   └── index.astro  # Homepage
│   └── styles/
│       └── global.css   # Global styles
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Local Development

### Prerequisites
- Node.js 18+ 
- npm or pnpm

### Setup

```bash
# Clone or download the project
cd nks-princeton

# Install dependencies
npm install

# Start dev server (usually http://localhost:4321)
npm run dev
```

The dev server supports hot module replacement — changes to `.astro` files update instantly.

### Build for Production

```bash
npm run build
```

Output goes to `./dist/` — these are static files ready for deployment.

### Preview Production Build

```bash
npm run preview
```

## Deployment to Cloudflare Pages

### Option 1: GitHub Integration (Recommended)

1. **Push to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/nks-princeton.git
   git push -u origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/) → Pages
   - Click "Create a project" → "Connect to Git"
   - Select your repository
   - Configure build settings:
     - **Framework preset:** Astro
     - **Build command:** `npm run build`
     - **Build output directory:** `dist`
   - Click "Save and Deploy"

3. **Custom Domain**
   - In your Cloudflare Pages project → Custom domains
   - Add `northernkarateprinceton.com`
   - Update DNS records as instructed (if domain is on Cloudflare, this is automatic)

### Option 2: Direct Upload

```bash
# Build the site
npm run build

# Install Wrangler CLI
npm install -g wrangler

# Login to Cloudflare
wrangler login

# Deploy
wrangler pages deploy dist --project-name=nks-princeton
```

## Configuration Checklist

Before going live, update these items:

### Content
- [ ] Replace placeholder logo: `public/images/nks-logo.png`
- [ ] Add hero background image
- [ ] Update dojo address in `Contact.astro` and `Layout.astro`
- [ ] Update phone number
- [ ] Update email address
- [ ] Adjust class schedule in `Schedule.astro`
- [ ] Add real testimonials in `Testimonials.astro`

### Form Integration
The contact form needs a backend. Options:

1. **Formspree** (easiest)
   - Create account at [formspree.io](https://formspree.io)
   - Create new form, get form ID
   - Update `action` in `Contact.astro`: `action="https://formspree.io/f/YOUR_ID"`

2. **Cloudflare Functions** (more control)
   - Create `functions/api/contact.js` for form handling
   - Connect to email service (SendGrid, Mailgun, etc.)

### Domain (Cloudflare Registrar)
1. Purchase domain at Cloudflare Registrar (~$10/year for .com)
2. DNS is automatically configured for Cloudflare Pages
3. SSL certificate is automatic

## Adding Stripe Payments

For membership payments, add Stripe Payment Links:

1. Create products in Stripe Dashboard (e.g., "Monthly Membership - $80/month")
2. Generate Payment Links for each product
3. Add a "Join" or "Membership" page with links to Stripe Checkout

Example addition to navigation:
```astro
<li><a href="/membership">Membership</a></li>
```

## Tech Stack

- **Framework:** Astro 5.x (static site generator)
- **Styling:** Vanilla CSS with CSS variables
- **Fonts:** Google Fonts (Bebas Neue, Open Sans)
- **Hosting:** Cloudflare Pages
- **Domain:** Cloudflare Registrar

## Support

For NKS branding and content questions, contact the main NKS organization.
For technical issues with this template, check [Astro docs](https://docs.astro.build).
