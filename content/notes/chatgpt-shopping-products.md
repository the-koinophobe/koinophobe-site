---
title: "How to get your products into ChatGPT shopping results"
slug: chatgpt-shopping-products
date: 2026-09-30
draft: false
topic: ai
seo_title: "How to get products into ChatGPT shopping"
seo_description: "How ChatGPT picks products for its shopping results, according to OpenAI, and the steps an online store should take on Shopify and other platforms."
excerpt: "ChatGPT now shows product carousels when people shop. OpenAI says they aren't ads and explains how products get picked. What that means for an online store, and the steps to take on Shopify and other platforms."
cover: /notes/photos/chatgpt-shopping-products-cover.webp
cover_alt: "A shop owner using a tablet in her clothing store"
cover_credit: "Photo: Vitaly Gariev on Unsplash"
faq:
  - q: "How does ChatGPT choose products to show?"
    a: "OpenAI says ChatGPT selects products it judges relevant to the shopper's intent, using the query and context such as memory or custom instructions, along with structured metadata from providers and its own safety standards. Once a product is shown, merchants offering it are ranked by factors like availability, price and quality."
  - q: "Are ChatGPT shopping results ads?"
    a: "No. OpenAI says product results are selected independently, are not ads, and aren't influenced by OpenAI partnerships. Ads, where they exist, are handled separately."
  - q: "How do I get my Shopify products into ChatGPT?"
    a: "OpenAI says Shopify merchants' product data is integrated through Shopify Catalog and that no additional work is required. Make sure your product titles, descriptions, prices and stock levels are accurate, because that data is what gets used."
---

![A row of product cards in a carousel, with lines from a product feed and a store page feeding into one card](/notes/illustrations/chatgpt-shopping-products.webp)

People now shop inside ChatGPT. Ask for "a waterproof hiking backpack under $150" and you may get a carousel of products with prices and links to stores. If you run an online store, the question is how your products get into that carousel.

OpenAI has published more about this than about most of ChatGPT. Here's what it says, and what I'd do.

## What OpenAI says about product results

From OpenAI's help center article on shopping in ChatGPT:

- **Selection is about intent.** ChatGPT picks products it judges relevant to what the shopper wants, using the question and context such as memory or custom instructions. Price matters more when the shopper states a budget.
- **Structured data from providers is an input,** along with earlier model responses and OpenAI's safety standards and product policies.
- **Results aren't ads.** "Product results are selected independently by ChatGPT and are not ads, nor influenced by any OpenAI partnerships."
- **Merchants are ranked once a product is shown,** by factors like availability, price and quality.
- **Shopify stores are integrated through Shopify Catalog,** with no extra work required from individual merchants.
- **Other merchants can apply** to provide a product feed directly; the help article links the application.

So the levers are clear: accurate structured product data, a good price, stock, and a store people trust.

![A person shopping online with a laptop and a card](/notes/photos/chatgpt-shopping-products-1.webp "Photo: SumUp on Unsplash")

## What I'd do for an online store

### 1. Get your product data into the pipeline

- **On Shopify:** OpenAI says your data flows through Shopify Catalog. Check your products are published to the channels Shopify offers and that nothing is hidden or draft by mistake.
- **On WooCommerce, BigCommerce or a custom store:** apply for direct feed access through OpenAI's help article, and keep a clean product feed you already maintain for Google Merchant Center as your source of truth.

### 2. Write product data for intent

ChatGPT matches products to what someone asked for. Shoppers ask in plain language with constraints: "for small apartments," "for kids under 5," "vegan," "fits a 15-inch laptop," "under $150." Put those facts in your titles, descriptions and attributes:

- **Titles:** brand, product type, the main distinguishing feature, size or variant. "Trailpeak 28L Waterproof Hiking Backpack with Laptop Sleeve."
- **Descriptions:** who it's for, what it fits, materials, dimensions, care. Facts beat adjectives.
- **Attributes:** fill every structured field your platform offers: size, color, material, age range, compatibility.

### 3. Keep price and stock accurate

OpenAI names availability and price as merchant ranking factors. A feed showing an item in stock that isn't, or a price that changed, costs you the sale and trust. Sync inventory and price automatically if you can.

### 4. Earn the quality signal

OpenAI also names quality. It doesn't define it, but reviews, return policies, shipping times and a store that looks legitimate are reasonable guesses at what that includes. Show reviews on product pages, and keep shipping and return policies clear and easy to find.

### 5. Let OpenAI's crawler read your store

Product carousels draw on structured data, but ChatGPT's regular web answers draw on pages its crawler can read. Make sure OAI-SearchBot isn't blocked in robots.txt or by your CDN. The [free crawler check](/saas-seo#check) tests it.

### 6. Publish buying guides

When someone asks "what should I look for in a hiking backpack," ChatGPT cites articles. In [my citation study](/notes/ai-cited-vs-ranked-page), article-shaped pages got cited and product pages mostly didn't. A good buying guide on your site, linking to your products, covers the questions before the purchase. [Content that AI cites](/notes/content-ai-cites) has the template.

## How to check where you stand

Ask ChatGPT for products in your category the way a shopper would, with a budget and a use case. Run each request three times in fresh chats. Note whether your products appear and which stores win. Then compare your titles, prices and reviews with theirs.

Also set up [ChatGPT tracking in GA4](/notes/track-chatgpt-traffic-ga4); shopping clicks from ChatGPT carry `utm_source=chatgpt.com`.

## Next steps

Audit your ten best-selling products today: title, description, attributes, price accuracy, stock accuracy, reviews. Fix what's thin. Then write one buying guide for your main category.

My [AI search optimization](/ai-search-optimization) service handles the crawler access, buying guides and comparison pages, and monthly tracking of whether ChatGPT and the other assistants name your store. $1,000 a month, no contract.
