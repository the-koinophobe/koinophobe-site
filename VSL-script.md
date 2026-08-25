# VSL script — Google Business Profile, Nigerian businesses

**Target runtime:** 3:00 to 3:20. Aim for 480 to 520 spoken words.
**Format:** you on camera, or screen recording with your voice over. Either works. Camera is better for the first 20 seconds because trust is the whole problem in this market.
**Tone:** the way you would explain it to someone at their shop. Plain, unhurried, slightly blunt. No hype, no "in today's digital world".

Timings below match the chapter markers already in `lib/gbp.ts`. If you drift more than about 15 seconds off, update `vslChapters` to match the real video.

---

## 0:00 — Hook (about 20 seconds)

> Type your own business name into Google Maps right now. Go ahead, I'll wait.
>
> If nothing comes up, or what comes up is wrong, an old address, a number you stopped using, or somebody else's shop sitting where yours should be, then you are losing customers every single week to businesses that are worse than you. Not better. Just easier to find.

**On screen:** you talking. Optionally cut to a phone screen searching a category like "solar installer near me" and show three results, none of them the business.

---

## 0:20 — Cost of the problem (about 20 seconds)

> When somebody in your area searches for what you sell, Google shows three businesses on a map before anything else. Three. Most people never scroll past them.
>
> That is not an ad slot. You cannot buy it. It goes to whoever set their profile up properly, and in Nigeria that is a shockingly small number of businesses.

**On screen:** the map pack illustration from the page, or a real search for a category you are not competing in.

---

## 0:40 — The verification wall (about 50 seconds)

> Here is where almost everyone gets stuck, and I want to be specific because this is the actual reason.
>
> Creating the profile is easy. Google then has to confirm the business is real. In Nigeria that now usually means video verification. You have to record an unbroken video that shows your location, your signage, your equipment, and proof you can manage the place, in the order Google wants it, without stopping the recording.
>
> People fail this constantly. They film the wrong things. They stop and restart. There is no visible sign. And when it fails, Google does not really tell you why. So the profile sits there unverified, invisible, and the owner assumes Google Maps just does not work for small businesses here.
>
> It works. The gate is just badly explained.

**On screen:** you talking. This is the credibility section, the part that proves you have actually done this. Do not rush it.

---

## 1:30 — What a working profile looks like (about 40 seconds)

> A profile that actually brings you customers is not just verified. It has the right primary category, which is the single biggest thing that decides whether you show up at all, and the one almost everybody picks wrong.
>
> It has real photos, not one blurry shot. It has your hours, including the ones you actually keep. It has a call button and a WhatsApp link that reach you, not a number nobody answers. And it has reviews, because between two similar businesses, Google shows the one people talked about.
>
> Every one of those is a lever. Most profiles pull none of them.

**On screen:** screen recording of a well built profile. Use a client profile if you have permission, otherwise build a demo one and say plainly that it is a demo.

---

## 2:10 — The offer (about 40 seconds)

> So here is what I do.
>
> In seven days I claim your profile or create it, get it through verification with you, set the categories properly, write the description, load the photos, wire up your call and WhatsApp buttons, give you a review link with a script you can send to past customers, and then show you where to see your own numbers. Calls, direction requests, searches. So you can tell whether this is working instead of taking my word for it.
>
> It starts at [YOUR PRICE]. One payment. No retainer, no lock-in. The profile is created in your name and I am just a manager you can remove the moment we are done. I never need your password, and you should never give it to anybody who asks for it.

**On screen:** the seven-day timeline from the page. Say the price out loud. Do not make people hunt for it.

---

## 2:50 — Close (about 20 seconds)

> If you want to know where you stand before you spend anything, send me your business name on WhatsApp. I will look up what Google already has on you and tell you straight whether this is worth paying for in your case. That part is free and it takes me a few minutes.
>
> Button is right below this video.

**On screen:** you, then hold on the WhatsApp button. Keep the last frame simple.

---

## Recording notes

**Say the price.** VSLs that hide the number get watched by people who then leave to go find it. You already committed to "from" pricing on the page, so match it.

**Do not script yourself word for word on camera.** Learn the five beats and the specific details (video verification, primary category, no password), then talk. Reading kills it.

**Cut the first three seconds** of whatever you record. Everyone's first three seconds are dead.

**Length discipline.** If it runs past four minutes, cut from 1:30, not from the hook or the close. The middle is where padding hides.

**Captions.** Most of this will be watched with the sound off on a phone on mobile data. Burn in captions, do not rely on the player.

**Thumbnail.** Export a 1280x720 frame, drop it in `/public`, and point `VIDEO_POSTER` in `lib/gbp.ts` at it. Without one, the frame is a plain lime block.

**Where it goes.** Upload unlisted to YouTube, then put the *embed* URL in `VIDEO_EMBED_URL`, not the watch URL:
`https://www.youtube-nocookie.com/embed/VIDEO_ID`

The player is click to play, so nothing from YouTube loads until someone presses it, and a `gbp_vsl_play` event fires when they do. Watch that against `gbp_whatsapp_click` in GA4: if plenty of plays produce no messages, the problem is the video, not the traffic.
