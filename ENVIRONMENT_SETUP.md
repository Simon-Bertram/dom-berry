# Environment Setup Guide

## Required Environment Variables

Create a `.env.local` file in the `apps/web/` directory with the following variables:

```bash
# Email Configuration
# Get your API key from https://resend.com
RESEND_API_KEY=re_your_api_key_here

# Email addresses for contact form
EMAIL_FROM=Leads <onboarding@yourdomain.com>
EMAIL_TO=your-professional-email@example.com

# Environment
NODE_ENV=production
```

## Setup Instructions

### 1. Get Resend API Key

1. Sign up at [resend.com](https://resend.com)
2. Verify your domain (or use their sandbox domain for testing)
3. Generate an API key
4. Add the key to your `.env.local` file

### 2. Configure Email Addresses

- `EMAIL_FROM`: The sender address (must be from your verified domain)
- `EMAIL_TO`: Your email address where contact form submissions will be sent

### 3. For Production Deployment

Add these environment variables to your Vercel project:

1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add each variable with the appropriate values

## Optional Variables

```bash
# Base URL for development
NEXT_PUBLIC_BASE_URL=http://localhost:3001

# Video hosting (if using Cloudinary)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Security Notes

- Never commit `.env.local` to version control
- Use different API keys for development and production
- Rotate API keys regularly
- Monitor usage in Resend dashboard
