export type Review = {
  quote: string;
  name: string;
  role: string;
  /** Where it was left. Upwork feedback is verifiable; direct clients aren't. */
  source: "Upwork" | "Direct";
};

export const reviews: Review[] = [
  {
    quote:
      "Michael did a wonderful job. Everything went smoothly, communication was fluent, on time and as expected. I highly recommend working with Michael.",
    name: "Mehdi D.",
    role: "Iteration X",
    source: "Upwork",
  },
  {
    quote:
      "Michael handles the build and technical side for my agency's clients, and he's the one I trust to just get it done. Fast, reliable, and he keeps the quality tight across a lot of sites. We've come a long way working together.",
    name: "Brian Reid",
    role: "Founder, Palm Bay Marketing SEO",
    source: "Direct",
  },
  {
    quote:
      "He's been on top of things, not only what I asked, but also outside the scope.",
    name: "Daniel Folks",
    role: "Owner, Over The Table Top",
    source: "Direct",
  },
  {
    quote:
      "Best to work with, will hire all the time. Straight forward, doesn't waste time. If he can't do something he'll tell you.",
    name: "Johnny Urena",
    role: "Free estimate page build",
    source: "Upwork",
  },
  {
    quote:
      "This was not an easy job. It required a lot of research and hard work, and I really appreciate the end result. He was good in communication and skilled.",
    name: "Elmer Blackburn",
    role: "SEO content project",
    source: "Upwork",
  },
  {
    quote: "Good guy to work with. Attention to detail.",
    name: "Tint Lordz Auto Spa",
    role: "Website rebuild",
    source: "Upwork",
  },
];

export type Project = {
  /** Real name. Only rendered when `named` is true. */
  name: string;
  /** What the business is, safe to show either way. */
  sector: string;
  /** Where it trades, safe to show either way. */
  market: string;
  url: string;
  image: string; // poster, e.g. /work/<slug>.webp
  video?: string; // looping preview, plays on hover
  /**
   * Whether the client can be identified publicly.
   *
   * true only for clients Michael has a direct relationship with. Everything
   * that came through an agency is false and stays that way.
   *
   * false withholds the attribution, not the picture: the screenshot and the
   * hover video still play, but the tile carries no client name, no host in the
   * address bar, and no link out. Sector and market caption it instead.
   */
  named: boolean;
};

// Sites built and managed. Posters and screen-record previews live in public/work/.
export const projects: Project[] = [
  {
    name: "Over The Table Top",
    sector: "Board game and hobby retail",
    market: "Charles County, MD",
    url: "https://overthetabletop.shop/",
    image: "/work/overthetabletop.webp",
    video: "/work/overthetabletop.mp4",
    named: true,
  },
  {
    name: "Tint Lordz Auto Spa",
    sector: "Window tint and detailing",
    market: "Lawrence, MA",
    url: "https://tintlordzautospa.com/",
    image: "/work/tintlordz.webp",
    video: "/work/tintlordz.mp4",
    named: true,
  },
  {
    name: "Palm Bay Marketing SEO",
    sector: "Marketing agency",
    market: "Palm Bay, FL",
    url: "https://palmbaymarketingseo.com/",
    image: "/work/pbseo.webp",
    video: "/work/pbseo.mp4",
    named: true,
  },
  {
    name: "Lumagrid Solar",
    sector: "Solar installation",
    market: "Website build",
    url: "https://www.lumagridsolar.com/",
    image: "/work/lumagrid.webp",
    video: "/work/lumagrid.mp4",
    named: false,
  },
  {
    name: "HH Roofing & Repairs",
    sector: "Roofing contractor",
    market: "Brevard County, FL",
    url: "https://hhroofingandrepairs.com/",
    image: "/work/hhroofing.webp",
    video: "/work/hhroofing.mp4",
    named: false,
  },
  {
    name: "Myofascial Pain Brevard",
    sector: "Myofascial pain clinic",
    market: "Brevard County, FL",
    url: "https://myofascialpainbrevard.com/",
    image: "/work/myofascial.webp",
    video: "/work/myofascial.mp4",
    named: false,
  },
  {
    name: "Cocoa Beach Myofascial Release",
    sector: "Myofascial release clinic",
    market: "Cocoa Beach, FL",
    url: "https://cocoabeachmyofascialrelease.com/",
    image: "/work/cocoa.webp",
    video: "/work/cocoa.mp4",
    named: false,
  },
  {
    name: "Brevard Pool Deck Repair",
    sector: "Pool deck repair",
    market: "Brevard County, FL",
    url: "https://brevardpooldeckrepair.com/",
    image: "/work/krupption.webp",
    video: "/work/krupption.mp4",
    named: false,
  },
  {
    name: "Atlanta Mobile Detail",
    sector: "Mobile auto detailing",
    market: "Atlanta, GA",
    url: "https://atlantamobiledetail.co/",
    image: "/work/atlantamobiledetail.webp",
    video: "/work/atlantamobiledetail.mp4",
    named: false,
  },
  {
    name: "Titusville Homes For Sale",
    sector: "Residential real estate",
    market: "Titusville, FL",
    url: "https://titusvillehomesforsale.com/",
    image: "/work/titusville.webp",
    video: "/work/titusville.mp4",
    named: false,
  },
  {
    name: "Pro Star Lawn Service",
    sector: "Lawn and landscaping",
    market: "Brevard County, FL",
    url: "https://prostarlawnservice.com/",
    image: "/work/prostar.webp",
    video: "/work/prostar.mp4",
    named: false,
  },
  {
    name: "Roof It Brevard",
    sector: "Roofing contractor",
    market: "Brevard County, FL",
    url: "https://roofitbrevard.com/",
    image: "/work/roofit.webp",
    named: false,
  },
  {
    name: "Brevard Hurricane Protection",
    sector: "Hurricane shutters and protection",
    market: "Brevard County, FL",
    url: "https://brevardhurricaneprotection.com/",
    image: "/work/bhp.webp",
    video: "/work/bhp.mp4",
    named: false,
  },
  {
    name: "The Dream Property",
    sector: "Residential real estate",
    market: "Florida",
    url: "https://thedreamproperty.com/",
    image: "/work/dreamproperty.webp",
    video: "/work/dreamproperty.mp4",
    named: false,
  },
  {
    name: "Melbourne Roof Repair",
    sector: "Roofing contractor",
    market: "Melbourne, FL",
    url: "https://melbourneroofrepairs.com/",
    image: "/work/melbourne-roof.webp",
    video: "/work/melbourne-roof.mp4",
    named: false,
  },
];
