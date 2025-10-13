# Fighting Crime NC - Quick Start Guide

⚡ **SITE IS LIVE:** https://fightingcrimenc-three.vercel.app

---

## 🚀 5-Minute Setup

### 1. Buy Your Domain (2 min)
```
Domain: fightingcrimenc.com
Where: Namecheap or Google Domains
Cost: $12/year
```

### 2. Point Domain to Vercel (2 min)
1. Go to Vercel Dashboard
2. Select "fightingcrimenc" project
3. Settings → Domains
4. Add `fightingcrimenc.com`
5. Copy DNS records to your domain registrar

### 3. Add Analytics (1 min)
**Google Analytics:**
1. Create GA4 property at analytics.google.com
2. Get Measurement ID (looks like `G-XXXXXXXXXX`)
3. Edit `index.html` line 21: Replace `G-XXXXXXXXXX` with your ID

**Facebook Pixel:**
1. Create pixel at business.facebook.com/events_manager
2. Get Pixel ID (looks like `1234567890123456`)
3. Edit `index.html` line 38: Replace `YOUR_PIXEL_ID` with your ID

---

## 📝 How to Add Content (Choose One)

### Option A: I Build You an Admin Panel
**Time:** 2 hours (I do it)
**Cost:** Free
**Best for:** Non-technical users

### Option B: Paid RSS Service
**Time:** 30 minutes (I set it up)
**Cost:** $10-30/month
**Best for:** Immediate automation

### Option C: Manual Posting
**Time:** Daily effort
**Cost:** Free
**Best for:** Full control

---

## 🛠️ Common Commands

```bash
# Development
cd /Users/kevgtcity/Projects/fightingcrimenc
npm run dev                    # Start dev server

# Deployment
npm run build                  # Build for production
vercel --prod                  # Deploy to production

# Logs
vercel logs --follow           # View live logs
```

---

## 📊 Check if Everything is Working

### ✅ Checklist

1. **Site loads:** https://fightingcrimenc-three.vercel.app
2. **API works:** https://fightingcrimenc-three.vercel.app/api/news-scraper
3. **No errors:** Open browser console (F12)
4. **Mobile works:** Test on phone
5. **SEO visible:** View page source, check meta tags

---

## 🔥 Priority Actions (Week 1)

### Day 1 (Today)
- [x] Site launched
- [ ] Buy domain
- [ ] Set up analytics
- [ ] Choose content strategy

### Day 2
- [ ] Submit to Google Search Console
- [ ] Create Facebook page
- [ ] Post first 2-3 stories

### Day 3-7
- [ ] Post daily (1-2 stories)
- [ ] Build backlinks (contact police depts)
- [ ] Monitor analytics

---

## 💰 Costs Summary

**Current:** $0/month
**With Domain:** $1/month ($12/year)
**With RSS Service:** $10-30/month (optional)
**Competitor:** $500+/month

---

## 📞 Need Help?

**Read this first:** HANDOFF.md (full documentation)

**Common issues:**
- Site not loading? Check Vercel dashboard
- Scrapers not working? They need debugging (1-2 hours)
- Want to add content? Choose a strategy above

---

## 🎯 Next Steps

1. Read HANDOFF.md for full details
2. Choose content strategy
3. Start posting!

**You're already 90% done. Just need content now!** 🎉

