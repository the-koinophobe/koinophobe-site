---
title: "How to track AI search visibility without fooling yourself"
slug: track-ai-search-visibility
date: 2026-10-07
draft: false
topic: ai
seo_title: "How to track AI search visibility in ChatGPT and Claude"
excerpt: "Asked the same question three times, ChatGPT kept 4.5% of its cited pages. One screenshot tells you almost nothing. A tracking setup a founder can run in a spreadsheet, using the method from my citation study."
cover: /notes/illustrations/track-ai-search-visibility.webp
cover_alt: "Field survey plate: four rows of three runs each, dots that hold their position in one row and scatter in another"
faq:
  - q: "How often do ChatGPT's cited sources change?"
    a: "A lot. In my September 2026 study, asking ChatGPT the same question three times in fresh sessions kept 4.5% of cited URLs in all three runs. Google AI Overviews kept 62.7%."
  - q: "What should I measure for AI search visibility?"
    a: "Two shares across a frozen set of buyer questions: how often answers name your company, and how often they cite one of your pages. Track companies and pages separately, because assistants agree on companies far more than on pages."
  - q: "How many times should I run each question?"
    a: "At least three times for the questions that matter most. One run per question mostly measures the assistant's run-to-run variation, especially on ChatGPT."
---

A founder screenshots ChatGPT naming their product and posts it as a win. The next morning the same question names three competitors and not them. Both screenshots are real, and neither tells you much.

In my [citation study](/notes/ai-cited-vs-ranked-page) I measured how much the sources behind an answer move when you ask the same question again. The short answer is: a lot, and by very different amounts depending on the assistant. That changes how you have to track AI search visibility if you want numbers you can act on.

## How much answers move

I asked four of the twelve questions three times on each assistant, each time in a fresh session with memory off. The figure is the share of cited URLs that appeared in every run.

| Assistant | Kept in all three runs | Per question |
| --- | --- | --- |
| Google AI Overviews | 62.7% | 100.0%, 66.7%, 21.4% |
| Perplexity | 33.5% | 66.7%, 42.9%, 14.3%, 10.0% |
| Claude | 18.8% | 38.5%, 22.2%, 14.3%, 0.0% |
| ChatGPT | 4.5% | 18.2%, 0.0%, 0.0%, 0.0% |

On three of the four questions, ChatGPT's second and third answers shared no URLs at all with its first. On one question it named sixteen distinct URLs across three runs and not one appeared in all three.

Google AI Overviews has three figures because one of its runs produced no AI Overview at all, which is its own lesson: sometimes the answer you're tracking doesn't show up.

So a single ChatGPT answer is closer to a dice roll than a ranking. A tool that asks each question once a month and charts the result is mostly charting that roll.

## Track companies and pages separately

The same study found that assistants agree with Google, and with each other, far more about which companies to name than about which pages to cite:

| | Same URL | Same company |
| --- | --- | --- |
| Assistant cites vs Google's top ten | 2% to 12% | 34% to 54% |
| Chat assistants vs each other | 9.5% to 13.7% | 34.3% to 40.0% |

That gives you two different numbers worth tracking:

- **Mention share:** the share of answers that name your company at all. Steadier, and closer to what a buyer remembers.
- **Citation share:** the share of answers that link to one of your pages. Noisier, and the one your content work moves directly.

Report both. If mentions rise while citations stay flat, assistants know who you are and are quoting someone else's page about you, often a roundup or a forum thread. That points you at what to write next.

## A setup a founder can run

You need a spreadsheet and about two hours a month.

**Freeze 10 to 20 buyer questions.** Write them down before the first run and don't edit them afterwards. Mix three kinds: open-ended ("best help desk for small teams"), head to head ("YourApp vs Acme"), and constraint-led ("help desk with a free tier and Slack integration"). In my study the three kinds drew on very different numbers of sources, so a list of only one kind gives you a skewed picture. If you want to add questions later, start a second list rather than editing the first.

**Pick your assistants.** ChatGPT, Claude, Perplexity and Google AI Overviews behaved like three chat assistants plus one search engine with a summary on top. Cover at least one of each kind.

**Control the session.** Signed in, memory and custom instructions off, a fresh chat for every run. Google in a fresh incognito window. Note where you're running from, because results can vary by location; mine were collected from one place outside the US, and the study says so.

**Repeat the important ones.** Run your five most important questions three times on every assistant. Run the rest once. That's the split that made my study fit in one evening.

**Log every source.** One row per citation:

```
date, question_id, question, assistant, run, position, url, company, yours
2026-10-01, Q03, YourApp vs Acme, chatgpt, 1, 1, https://acme.com/compare, acme.com, no
2026-10-01, Q03, YourApp vs Acme, chatgpt, 1, 2, https://yourapp.com/vs/acme, yourapp.com, yes
```

Record refusals too. If an assistant gives no sources, or Google shows no AI Overview, that's a row with an empty URL, not a skipped run.

**Compute two numbers per assistant per month:** mention share and citation share, each over the same frozen questions. Compare month to month on the same list, and only then look at which pages got cited.

## Reading the numbers honestly

- **Small samples move.** Twenty questions times four assistants is eighty answers. A swing of a few answers is a few percentage points. Don't celebrate or panic over one month.
- **Look for agreement across assistants.** If your citation share rises on Claude, Perplexity and AI Overviews together, something you did probably worked. If it rises on ChatGPT alone, wait a month.
- **Write down your limits.** Which location, which accounts, which dates. When you compare with last quarter, you'll want to know what changed besides your site.

My study set its threshold before I looked at any data: a difference only counted if the confidence intervals didn't overlap. You don't need the statistics for an internal sheet, but the habit of deciding what counts as a result before you look is the part worth copying.

## Next steps

Before tracking, make sure the assistants can read you: the [AI crawler guide](/notes/ai-crawlers-robots-txt) covers which crawlers matter, and the [free crawler check](/saas-seo#check) tests your site in ten seconds. Then give them something worth citing; head-to-head questions draw on the smallest pool of sources, which is why I start with [comparison pages](/notes/saas-comparison-pages).

This tracking setup, run with three runs per question across four assistants, is the measurement half of my [AI search optimization](/ai-search-optimization) service. To see the clicks as well, [track ChatGPT traffic in GA4](/notes/track-chatgpt-traffic-ga4). Each month ends with the citation report, so you can see what the work did.
