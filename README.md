# Patte Ki Baat

Wisdom from strangers, delivered daily in 10 languages.

Live at: https://ashoktak.com/patte-ki-bat

## Features
- Morning wisdom (refreshes 4:00 AM local time)
- Evening reflection (refreshes 4:00 PM local time)
- Hourly affirmations for self-confidence
- 10 languages: English, Hindi, Spanish, French, German, Arabic, Portuguese, Japanese, Korean, Chinese
- Users sign up and submit their own wisdom
- Admin approves submissions via Supabase dashboard

## Stack
- Next.js 14 (static export, App Router)
- Supabase (auth + database + RLS)
- Tailwind CSS
- GitHub Pages (via GitHub Actions)

## Setup Guide

### 1. Create Supabase project
1. Go to https://supabase.com and create a free project
2. In the SQL Editor, paste and run the contents of `supabase-setup.sql`
   - This creates the tables, sets RLS policies, and seeds 50+ pieces of wisdom + affirmations
3. Go to Project Settings -> API and copy your **Project URL** and **anon/public key**

### 2. Add GitHub Secrets
In your repo: **Settings -> Secrets and variables -> Actions**, add:
- `NEXT_PUBLIC_SUPABASE_URL` = your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key

### 3. Create the deploy workflow
Go to your repo on GitHub -> **Add file -> Create new file**
Name it: `.github/workflows/deploy.yml`
Paste this content:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
  workflow_dispatch:
permissions:
  contents: write
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - name: Build
        env:
          NEXT_PUBLIC_SUPABASE_URL: ${{ secrets.NEXT_PUBLIC_SUPABASE_URL }}
          NEXT_PUBLIC_SUPABASE_ANON_KEY: ${{ secrets.NEXT_PUBLIC_SUPABASE_ANON_KEY }}
        run: npm run build
      - uses: peaceiris/actions-gh-pages@v4
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./out
          force_orphan: true
```

Committing this file will trigger the first deploy automatically.

### 4. Enable GitHub Pages
After the first workflow run completes (creates `gh-pages` branch):
1. Go to repo **Settings -> Pages**
2. Source: **Deploy from a branch**
3. Branch: **gh-pages** / `/ (root)`
4. Save

Your site will be live at **ashoktak.com/patte-ki-bat** within a few minutes.

### 5. Local development
```bash
npm install
cp .env.example .env.local
# fill in your Supabase credentials
npm run dev
# open http://localhost:3000/patte-ki-bat
```

## How advice rotation works
Advice is selected **deterministically by day of year**: `advice[dayOfYear % total]`.
Everyone sees the same wisdom on the same day in their language. No server-side cron needed.

## Approving user submissions
When a signed-in user submits wisdom, it is saved with `approved = false`.
Approve in **Supabase Dashboard -> Table Editor -> advice** by setting `approved = true`.
