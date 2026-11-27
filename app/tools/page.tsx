import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AiCheck } from "@/components/AiCheck";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { NextSteps } from "@/components/NextSteps";
import { pageMeta } from "@/lib/meta";

export const metadata = pageMeta({
  title: { absolute: "Free tools for local service businesses · Koinophobe" },
  description:
    "Free tools for trade owners: check whether ChatGPT, Google and other crawlers can read your site, and work out what missed calls cost you each year.",
  path: "/tools",
});

/*
 * The free tools in one place, so an owner who isn't ready to talk can still
 * learn something about their own business. No sign-up on either tool.
 */
export default function ToolsPage() {
  return (
    <>
      <section className="container-pad pb-16 pt-10 sm:pt-14">
        <Breadcrumbs items={[{ name: "Free tools", href: "/tools" }]} className="mb-8" />
        <div className="max-w-[46rem]">
          <p className="kicker">Free tools</p>
          <h1 className="t-h1 mt-5">Check your own business in two minutes</h1>
          <p className="t-lead mt-6 max-w-[52ch]">No sign-up and no email needed. Use them, keep the answer, and book a call only if you want help with what they find.</p>
        </div>
      </section>

      <section id="check" className="section !pt-0 scroll-mt-20">
        <div className="container-pad">
          <div className="check6">
            <div>
              <p className="kicker">Tool 1 &middot; about 10 seconds</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,3vw,2.6rem)]">Can ChatGPT and Google read your site?</h2>
              <p className="t-lead mt-4 max-w-[46ch]">Checks which AI and search crawlers your robots.txt lets in, and whether your homepage has enough text for them to read without running JavaScript.</p>
            </div>
            <div className="check-box">
              <AiCheck />
            </div>
          </div>
        </div>
      </section>

      <section className="section !pt-0">
        <div className="container-pad">
          <div className="check6">
            <div>
              <p className="kicker">Tool 2 &middot; about a minute</p>
              <h2 className="t-h2 mt-4 !text-[clamp(1.8rem,3vw,2.6rem)]">What do missed calls cost you?</h2>
              <p className="t-lead mt-4 max-w-[46ch]">Put in your calls a week, how many go unanswered and what a job is worth. It works out what slips away in a year.</p>
            </div>
            <div>
              <Link href="/missed-call-calculator" className="btn btn-lg btn-primary">
                Open the calculator <ArrowRight size={17} aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <NextSteps from="tools_steps" />
    </>
  );
}
