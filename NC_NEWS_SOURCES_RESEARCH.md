# NC News Sources Research - RSS Feeds & Content Strategy

## Executive Summary

**Problem:** Police Facebook feeds contain 90% fluff (good morning posts, PR stunts) and only 10% actual crime news.

**Solution:** Scrape actual news outlets + AI rewriting + AI image generation

---

## RSS Feed Testing Results

### ✅ WORKING RSS FEEDS

#### **WRAL (Raleigh/Triangle)**
- **URL:** https://www.wral.com/news/rss/48
- **Content:** Top stories (includes crime, breaking news)
- **Quality:** ⭐⭐⭐⭐⭐ Professional journalism
- **Update frequency:** ~30 minutes
- **Status:** READY TO USE

**Sample content from WRAL RSS:**
- "Man charged in deadly Durham hit-and-run"
- "Family of Durham crash victim starts GoFundMe"
- Crime stories with images, mugshots, details

---

### ❌ FAILED/UNAVAILABLE RSS FEEDS

| Outlet | Status | Reason |
|--------|--------|--------|
| Charlotte Observer | ❌ Failed | No public RSS |
| News & Observer (Raleigh) | ❌ Failed | No public RSS |
| WECT (Wilmington) | ❌ Failed | RSS removed |
| Greensboro News & Record | ❌ Blocked | HTTP 429 (rate limited) |
| Winston-Salem Journal | ❌ Blocked | HTTP 429 (rate limited) |
| Fayetteville Observer | ❌ Failed | RSS removed |
| Asheville Citizen-Times | ❌ Failed | RSS removed |
| ABC11 | ❌ Failed | Redirects, no valid RSS |

---

## Reality Check: Most News Sites Killed RSS

**Why RSS feeds are dying:**
1. News sites want you on their website (ad revenue)
2. RSS bypasses paywalls
3. RSS bypasses tracking/analytics
4. Social media replaced RSS for most users

**What this means:**
- Can't rely on RSS feeds as primary source
- Need to scrape HTML directly from news sites
- Need to handle dynamic JavaScript-loaded content

---

## Recommended Strategy: AI-Powered News Aggregation

### The Plan:

```
1. SCRAPE news sites
   ↓
2. EXTRACT crime articles using AI
   ↓
3. REWRITE with AI (avoid plagiarism)
   ↓
4. GENERATE AI image for article
   ↓
5. POST to your site automatically
```

---

## Step 1: Target News Sources (Scraping)

### Tier 1: High-Value Targets (Start Here)

**WRAL.com** (Triangle - Raleigh/Durham)
- ✅ Has RSS feed (use it!)
- URL: https://www.wral.com/news/local/crime/
- Content: Arrests, trials, investigations, mugshots
- Coverage: Wake, Durham, Johnston counties

**Charlotte Observer** (Charlotte/Mecklenburg)
- Crime section: https://www.charlotteobserver.com/news/local/crime/
- Content: Charlotte-Mecklenburg crime, arrests, court cases
- Coverage: Mecklenburg, Gaston, Union, Cabarrus counties
- **Method:** HTML scraping

**News & Observer** (Raleigh/Triangle)
- Crime section: https://www.newsobserver.com/news/local/crime/
- Content: Wake County crime, trials, investigations
- Coverage: Wake, Durham, Orange counties
- **Method:** HTML scraping

**WECT** (Wilmington/Coastal)
- Crime section: https://www.wect.com/news/crime/
- Content: Coastal NC crime, New Hanover County
- Coverage: New Hanover, Brunswick, Pender counties
- **Method:** HTML scraping

---

### Tier 2: Regional Coverage

**Fayetteville Observer** (Cumberland County)
- Crime section: https://www.fayobserver.com/news/crime/
- Coverage: Cumberland, Hoke, Robeson counties

**Greensboro News & Record** (Piedmont Triad)
- Crime section: https://www.greensboro.com/news/crime/
- Coverage: Guilford, Alamance, Rockingham counties

**Winston-Salem Journal** (Forsyth County)
- Crime section: https://www.journalnow.com/news/crime/
- Coverage: Forsyth, Davie, Yadkin counties

**Asheville Citizen-Times** (Western NC)
- Crime section: https://www.citizen-times.com/news/crime/
- Coverage: Buncombe, Henderson, Madison counties

---

### Tier 3: Competitor's Counties (Must-Have)

**Rocky Mount Telegram** (Nash/Edgecombe)
- URL: https://www.rockymounttelegram.com/news/crime/
- Coverage: Nash, Edgecombe counties
- **This is your competitor's area!**

**Wilson Times** (Wilson County)
- URL: https://www.wilsontimes.com/news/crime/
- Coverage: Wilson County

**Halifax County Sources**
- Roanoke Rapids Herald
- Local news blogs
- Coverage: Halifax County

---

## Step 2: AI Rewriting Strategy

### Why Rewrite?

**Legal reasons:**
- ✅ Avoid copyright infringement
- ✅ Avoid plagiarism accusations
- ✅ Can't just copy/paste news articles

**SEO reasons:**
- ✅ Google penalizes duplicate content
- ✅ Your competitor has original content (manually written)
- ✅ Unique content ranks higher

**Quality reasons:**
- ✅ Consistent voice/tone across all articles
- ✅ Can add local context
- ✅ Can optimize for NC keywords

---

### How AI Rewriting Works

**Input:** Original news article
```
"RALEIGH — A 34-year-old man was arrested Tuesday after police
said he robbed a convenience store on Capital Boulevard. John Smith
was charged with armed robbery and possession of a firearm by a felon."
```

**AI Rewriting Prompt:**
```
Rewrite this crime news article:
- Keep all facts accurate (names, charges, locations, dates)
- Use a journalistic, objective tone
- Make it 200-300 words
- Optimize for NC crime news keywords
- Add NC context where relevant
```

**Output:** Rewritten article
```
"Raleigh police arrested a local man Tuesday on armed robbery charges
following an incident at a Capital Boulevard convenience store.
Authorities identified the suspect as John Smith, 34, who now faces
multiple felony charges including armed robbery and illegal firearm
possession.

According to Raleigh Police Department reports, the incident occurred
[rest of rewritten article...]"
```

---

## Step 3: AI Image Generation

### Why Generate Images?

**Problem:** Can't legally use news outlet images (copyright)
**Solution:** Generate AI images for each article

### Image Generation Options:

**1. DALL-E 3 (OpenAI)** - $$$
- Cost: $0.04 per image (1024x1024)
- Quality: ⭐⭐⭐⭐⭐ Excellent
- Style: Photorealistic or stylized

**2. Stable Diffusion (Free/Open Source)** - FREE
- Cost: $0 (run locally or cloud)
- Quality: ⭐⭐⭐⭐ Very good
- Style: Customizable

**3. Midjourney** - $$
- Cost: $10/month (200 images)
- Quality: ⭐⭐⭐⭐⭐ Artistic
- Style: Stylized/artistic

---

### Image Generation Prompts

**For arrest article:**
```
"Police cruiser with emergency lights at night,
crime scene tape, dramatic lighting, photorealistic,
North Carolina setting, editorial news photo style"
```

**For wanted person:**
```
"Police wanted poster background, law enforcement
badge, professional mugshot style, crime investigation
theme, editorial news photo"
```

**For missing person:**
```
"Search and rescue scene, flashlights in forest,
concerned community members, North Carolina landscape,
photojournalism style"
```

---

## Step 4: The Full Automated Pipeline

### Architecture:

```
┌─────────────────┐
│  CRON JOB       │ Runs every 30 minutes
│  (Vercel Cron)  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  NEWS SCRAPER   │ Scrapes 10 NC news sites
│  (Puppeteer)    │ Extracts crime articles
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI FILTER      │ Claude AI analyzes each article
│  (Claude API)   │ Filters for crime news only
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  AI REWRITER    │ Rewrites article (unique content)
│  (Claude API)   │ 300-500 words, SEO optimized
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  IMAGE GEN      │ Generates relevant image
│  (DALL-E 3)     │ Crime scene, police, etc.
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  DATABASE       │ Stores article + image
│  (Supabase)     │ Published to site
└─────────────────┘
```

---

## Cost Estimate

### AI-Powered Automation

**Monthly Costs:**

| Service | Cost | What For |
|---------|------|----------|
| **Claude API** (Anthropic) | ~$10-20/month | Article rewriting, filtering |
| **DALL-E 3** (OpenAI) | ~$5-10/month | Image generation (100-200 images) |
| **Supabase** (Database) | $0-25/month | Article storage (free tier OK) |
| **Vercel** (Hosting) | $0/month | Site hosting (free tier) |
| **Domain** | $1/month | fightingcrimenc.com |
| **Total** | **$16-56/month** | Fully automated |

**vs Competitor:** $500+/month + daily manual work

---

## Legal & Ethical Considerations

### ✅ LEGAL (Safe)

**Fact reporting:** Facts aren't copyrightable
- "John Smith arrested for robbery" = FACT
- Can report facts from any source

**AI rewriting:** Creates original expression
- Input: Original article
- Output: New, original wording
- Similar to human journalist rewriting

**Fair use:** News aggregation with commentary
- You're creating a news aggregation service
- Adding value through local focus
- Providing attribution/links to original

---

### ⚠️ GRAY AREA (Proceed Carefully)

**Image scraping:** Don't use original images
- ❌ Don't scrape images from news sites
- ✅ Generate your own AI images
- ✅ Or use public domain images

**Paywalled content:** Don't bypass paywalls
- ❌ Don't scrape subscriber-only content
- ✅ Only scrape publicly visible content

**Attribution:** Link back to original
- ✅ "According to [News Source]..."
- ✅ Link to original article
- ✅ Give credit where due

---

### ❌ ILLEGAL (Don't Do)

**Direct copying:** Plagiarism
- ❌ Copy/paste entire articles
- ❌ Minor word changes to original
- ❌ Using original images without permission

**Misrepresentation:** Fake news
- ❌ Making up facts
- ❌ Altering quotes
- ❌ Changing material facts

---

## Implementation Plan

### Phase 1: Proof of Concept (Week 1)

**Goal:** Get 1 news source working end-to-end

1. Build WRAL RSS scraper (use existing feed)
2. Test Claude API for rewriting
3. Test DALL-E for image generation
4. Store 1 article in database
5. Display on site

**Success metric:** 10 articles auto-posted from WRAL

---

### Phase 2: Expand Sources (Week 2)

**Goal:** Add 5 more news sources

1. Build HTML scrapers for:
   - Charlotte Observer
   - News & Observer
   - WECT Wilmington
   - Fayetteville Observer
   - Rocky Mount Telegram (competitor's area)

**Success metric:** 50+ articles/day from 6 sources

---

### Phase 3: Optimize & Scale (Week 3)

**Goal:** Cover all 100 NC counties

1. Add 10+ more news sources
2. Optimize AI prompts for quality
3. Add content moderation
4. Implement duplicate detection
5. Launch to public

**Success metric:** 100+ daily articles, all NC counties

---

## Alternative: Hybrid Approach

### Mix RSS + Scraping + Manual

**60% Automated (RSS/Scraping):**
- WRAL RSS feed (free, easy)
- Scrape 5-10 news sites (harder, but doable)
- AI rewrite everything

**30% Semi-Automated (Curated):**
- Monitor news sites daily
- Select best 5-10 crime stories
- AI rewrite + generate images
- Takes 30 min/day

**10% Original (High-Value):**
- Write 1-2 original pieces per week
- "Top 10 Most Wanted in NC"
- "This Week's Crime Roundup"
- Builds authority

---

## Recommendation

### **Option 1: Full Automation** 🤖
- **Pros:** Zero daily work, scales to 100 counties
- **Cons:** Higher upfront cost ($500-1000 dev work), ~$30/month
- **Best for:** If you want hands-off passive income

### **Option 2: Hybrid (70% Auto, 30% Manual)** ⚖️
- **Pros:** Lower cost, better quality control
- **Cons:** 30 min/day of work
- **Best for:** If you want to maintain editorial control

### **Option 3: Start Simple (WRAL RSS Only)** 📰
- **Pros:** Can launch THIS WEEK, minimal cost
- **Cons:** Only covers Triangle area (Raleigh/Durham)
- **Best for:** Testing the market before scaling

---

## Next Steps

**Tell me which option you prefer and I'll build it:**

1. **Full automation?** I'll build the complete scraping + AI pipeline
2. **Hybrid approach?** I'll set up WRAL RSS + AI rewriting for you to test
3. **Simple start?** I'll integrate just WRAL RSS feed right now (10 min)

---

**Bottom line:** RSS feeds are mostly dead, but we can scrape news sites + use AI to create original content that beats your competitor.

Which approach do you want?
