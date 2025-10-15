# RSS.app Integration Setup Guide

## Quick Start: Get Your Site Auto-Updating in 15 Minutes

Your site is **ready to go** - just add your RSS.app feed URLs and it will start pulling crime news automatically!

---

## Step 1: Subscribe to RSS.app (5 minutes)

1. Go to https://rss.app
2. Click "Sign Up" or "Start Free Trial"
3. Choose **Pro Plan** ($19/month)
   - Needed for: 30+ feeds, faster updates, no branding
4. Complete payment

---

## Step 2: Create Feeds for NC Police Departments (5 minutes)

### Quick Creation Method:

For each department in `NC_POLICE_FACEBOOK_LIST.md`:

1. Click "**Create New Feed**" in RSS.app dashboard
2. Select "**Facebook Page**"
3. Paste the Facebook URL (e.g., `https://www.facebook.com/CMPD`)
4. Click "**Create Feed**"
5. Copy the RSS feed URL (looks like: `https://rss.app/feeds/abcdef123456.xml`)
6. Save it somewhere (text file, notes app)

### Start with These 8 (Top Priority):

1. Charlotte-Mecklenburg Police: `https://www.facebook.com/CMPD`
2. Raleigh Police: `https://www.facebook.com/RaleighPolice`
3. Wake County Sheriff: `https://www.facebook.com/WakeSheriff`
4. Durham Police: `https://www.facebook.com/DurhamPolice`
5. Greensboro Police: `https://www.facebook.com/GreensboroPolice`
6. Winston-Salem Police: `https://www.facebook.com/cityofwspd`
7. Fayetteville Police: `https://www.facebook.com/FayettevillePD`
8. Asheville Police: `https://www.facebook.com/AshevillePolice`

---

## Step 3: Add Feed URLs to Configuration (3 minutes)

### Option A: Send Me Your Feed URLs (Easiest)

Just paste all your RSS.app feed URLs here and I'll integrate them for you:

```
Charlotte PD: https://rss.app/feeds/YOUR_ID_HERE.xml
Raleigh PD: https://rss.app/feeds/YOUR_ID_HERE.xml
Wake Sheriff: https://rss.app/feeds/YOUR_ID_HERE.xml
...
```

### Option B: Edit the Config File Yourself

Open: `api/rss-aggregator.ts`

Scroll to the `RSS_FEED_SOURCES` configuration (around line 18) and find this section:
```typescript
{
  id: 'charlotte-pd',
  name: 'Charlotte-Mecklenburg Police',
  location: 'Charlotte, Mecklenburg County',
  feedUrl: 'https://rss.app/feeds/YOUR_FEED_ID_HERE.xml', // ← REPLACE THIS
  priority: 'high',
  enabled: false, // ← CHANGE TO true
},
```

**Replace** `YOUR_FEED_ID_HERE.xml` with your actual RSS.app feed URL

**Change** `enabled: false` to `enabled: true`

Repeat for each department.

---

## Step 4: Deploy to Production (2 minutes)

### If I'm Integrating (Recommended):

Just send me the feed URLs and I'll:
1. Update `api/rss-aggregator.ts`
2. Deploy to Vercel
3. Verify it's working
4. Send you the live link

### If You're Deploying:

```bash
cd /Users/kevgtcity/Projects/fightingcrimenc

# Build
npm run build

# Deploy
vercel --prod
```

---

## Step 5: Verify It's Working (1 minute)

Visit your production site:
- https://fightingcrimenc-three.vercel.app

You should see:
- ✅ Crime stories loading automatically
- ✅ Multiple NC police departments
- ✅ Stories sorted by date (newest first)
- ✅ Clean formatting with categories

Test the API directly:
```bash
curl https://fightingcrimenc-three.vercel.app/api/rss-aggregator | jq '.'
```

Should return:
```json
{
  "success": true,
  "feeds": [...],
  "totalItems": 45,
  "timestamp": "2025-01-XX..."
}
```

---

## What Happens Next?

### Automatic Updates:
- RSS.app checks Facebook pages every **15-60 minutes**
- Your site caches results for **5 minutes**
- Users always see fresh content
- **Zero manual work required**

### Adding More Departments:

Just repeat Step 2-3 with new Facebook pages from `NC_POLICE_FACEBOOK_LIST.md`

---

## Troubleshooting

### "No feeds configured" message

**Problem:** No feeds are enabled in `api/rss-aggregator.ts`

**Fix:**
1. Edit `api/rss-aggregator.ts`
2. Add RSS.app feed URLs to the `RSS_FEED_SOURCES` array
3. Set `enabled: true` for each feed
4. Redeploy

### RSS.app feed returns empty

**Problem:** Facebook page may not be public or RSS.app couldn't parse it

**Fix:**
1. Verify Facebook page is public (not private group)
2. Wait 15 minutes for RSS.app to process
3. Check RSS.app dashboard for errors
4. Try a different Facebook page

### API returns 0 items

**Problem:** RSS.app feed URL may be incorrect or expired

**Fix:**
1. Check RSS.app dashboard
2. Verify feed URL is still active
3. Regenerate feed if needed
4. Update `api/rss-aggregator.ts` with new URL

### Deployment fails

**Problem:** TypeScript errors or build issues

**Fix:**
```bash
npm run build  # Check for errors locally
npm run dev    # Test locally first
```

---

## Cost Summary

**RSS.app Pro:** $19/month
- 100+ feeds allowed
- Updates every 15 minutes
- No RSS.app branding
- Priority support

**Vercel Hosting:** $0/month
- Free tier includes:
  - 100GB bandwidth
  - Unlimited requests
  - Global CDN

**Domain:** $12/year (~$1/month)

**Total:** ~$20/month (vs competitor's $500+/month)

---

## Next Steps After Integration

1. ✅ RSS feeds working
2. ⏳ Buy domain: `fightingcrimenc.com`
3. ⏳ Point domain to Vercel
4. ⏳ Add Google Analytics tracking ID
5. ⏳ Add Facebook Pixel ID
6. ⏳ Submit to Google Search Console
7. ⏳ Start promoting on social media

---

## Questions?

- Check `HANDOFF.md` for full documentation
- Check `QUICK-START.md` for common tasks
- Test locally: `npm run dev`
- Check logs: `vercel logs --follow`

---

**You're 95% done! Just add those RSS.app URLs and you're live!** 🚀
