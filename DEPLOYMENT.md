# Deployment Guide for NKS Princeton Website

## Environment Variables Setup

### For Local Development

The API key is stored in `.dev.vars` which is automatically loaded by Wrangler during local development.

To run locally:
```bash
npm run dev:wrangler
```

### For Production (Cloudflare Pages)

You need to add the environment variable in your Cloudflare Pages dashboard:

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com)
2. Go to **Workers & Pages**
3. Select your **nks-princeton** project
4. Go to **Settings** → **Environment Variables**
5. Click **Add variable**
6. Add the following:
   - **Variable name:** `RESEND_API_KEY`
   - **Value:** `re_dNidV8wH_QHysJ1WsPo96qFvHziPCTdXw`
   - **Environment:** Production (and Preview if you want it to work on preview deployments)
7. Click **Save**
8. **Redeploy** your site for the changes to take effect

## Testing the Contact Form

### Local Testing
1. Run `npm run dev:wrangler`
2. Visit `http://localhost:8788`
3. Fill out the contact form
4. Email will be sent to `harpo16352@gmail.com`

### Production Testing
After deploying to Cloudflare Pages:
1. Visit your live site
2. Fill out the contact form
3. Check `harpo16352@gmail.com` for the submission email

## Security Notes

- **NEVER** commit `.dev.vars` or `.env` files to Git
- The `.gitignore` file is configured to exclude these files
- API keys are stored securely in Cloudflare's environment variables
- For production use, consider verifying your domain in Resend to send to any email address

## Future Improvements

To send emails to any address (not just the Resend account email):
1. Go to [Resend Dashboard](https://resend.com/domains)
2. Click **Add Domain**
3. Add your domain (e.g., `northernkarateprinceton.com`)
4. Add the DNS records Resend provides to your domain
5. Update the `from` address in `functions/api/contact.js` to use your verified domain
6. Update the `to` address to send to any email you want
