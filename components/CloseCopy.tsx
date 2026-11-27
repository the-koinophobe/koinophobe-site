"use client";

import { usePathname } from "next/navigation";

/*
 * The closing band's heading and line. Trade owners get the Google-profile
 * promise; founders on /gtm get a line about their sales, not their map pin.
 */
export function CloseCopy() {
  const gtm = (usePathname() ?? "").startsWith("/gtm");
  return (
    <>
      <h2 id="close-h" className="mx-auto mt-5 max-w-[14ch]">
        {gtm ? "Tell me what you’re selling." : "Tell me about your business."}
      </h2>
      <p className="mx-auto mt-6 max-w-[40ch] text-[18px] font-medium leading-relaxed">
        {gtm
          ? "Send the stage, the deal size and who you sell to. I’ll come back with where I’d start."
          : "I’ll look at your Google profile before we talk, then tell you the two or three things I’d fix first."}
      </p>
    </>
  );
}
