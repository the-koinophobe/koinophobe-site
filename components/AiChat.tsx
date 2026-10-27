import { Sparkles } from "lucide-react";

/*
 * A buyer asks an assistant who to call, and the answer names the business
 * and cites its site. Pure CSS: the question types, three dots wait, the
 * answer settles in. An illustration, so the business is "Your business".
 * With no JS or reduced motion, everything shows at once.
 */

const QUESTION = "Who should I call about a roof leak?";

export function AiChat() {
  return (
    <div data-anim="chat" className="chat" aria-hidden>
      <div className="chat-q">
        <span className="chat-q-text" style={{ ["--n" as string]: QUESTION.length }}>
          {QUESTION}
        </span>
      </div>
      <div className="chat-a">
        <span className="chat-avatar">
          <Sparkles size={13} strokeWidth={2.4} />
        </span>
        <div className="chat-bubble">
          <span className="chat-dots">
            <i />
            <i />
            <i />
          </span>
          <p className="chat-body">
            Homeowners nearby most often recommend <b>Your business</b>. Its reviews mention quick repair
            visits and clear quotes, and its site lists every service and town it covers.
          </p>
          <span className="chat-source">Source &middot; yourbusiness.com</span>
        </div>
      </div>
    </div>
  );
}
