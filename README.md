# Remoteok - AI-Powered Freelance Marketplace

Find work that fits you, not jobs you must search for.

## Quick Start

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build

# Start production server
bun start
```

## Environment Variables

Copy `.env.example` to `.env` and fill in the required values:

```bash
cp .env.example .env
```

Required variables:
- `NEXT_PUBLIC_SUPABASE_URL` - Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Supabase anonymous key
- `SUPABASE_SERVICE_ROLE_KEY` - Supabase service role key
- `OPENAI_API_KEY` - OpenAI API key for AI features
- `STRIPE_SECRET_KEY` - Stripe secret key
- `DATABASE_URL` - PostgreSQL database connection string

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Database**: PostgreSQL with Prisma ORM
- **Auth**: Supabase Auth
- **AI**: OpenAI GPT-4o
- **Payments**: Stripe Connect
- **Hosting**: Vercel (recommended)

## Deployment to Vercel

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/YOUR_USERNAME/remoteok.git
   git push -u origin master
   ```

2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in Vercel dashboard
   - Click "Deploy"

3. **Configure Domain** (optional):
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain

## Features

- Tinder-style swipe job matching
- AI-powered resume parsing
- AI proposal & contract generation
- Smart bid pricing
- Real-time chat
- Kanban project management
- Stripe payment integration

## License

MIT

## Manual Deployment to Vercel (Already Connected)

Since you've already connected GitHub with Vercel, follow these steps:

1. **Trigger Deployment**:
   - Go to https://vercel.com/dashboard
   - Find your `remoteok` project
   - Click "Deployments"
   - Click "Create Deployment" or trigger from GitHub by pushing new code

2. **Set Environment Variables**:
   In Vercel dashboard → Project → Settings → Environment Variables, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = your_supabase_url
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your_supabase_anon_key
   - `SUPABASE_SERVICE_ROLE_KEY` = your_service_role_key
   - `OPENAI_API_KEY` = your_openai_api_key
   - `STRIPE_SECRET_KEY` = your_stripe_secret_key
   - `DATABASE_URL` = your_database_url

3. **Redeploy**:
   After setting environment variables, go to Deployments and click "..." → "Redeploy"

## Check Deployment Status

Visit: https://vercel.com/dashboard
