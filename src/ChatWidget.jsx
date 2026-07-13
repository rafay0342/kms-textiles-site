import { useState, useRef, useEffect } from 'react';

const WHATSAPP_URL =
  'https://wa.me/923370000990?text=Hi%20KMS%20Textiles%2C%20I%27d%20like%20to%20talk%20about%20a%20production%20enquiry.';

const QUICK_REPLIES = ['Products', 'Facilities', 'Get a quote', 'Contact'];

// Lightweight client-side assistant — replies instantly in the site, no backend.
function botReply(text) {
  const t = text.toLowerCase();
  if (/quote|price|cost|rate|order|moq|bulk/.test(t))
    return "Happy to help with a quote. Share your product type, quantity (MOQ), and target timeline — or tap “Open WhatsApp” below to send your tech-pack directly.";
  if (/product|knit|denim|activewear|fabric|garment/.test(t))
    return 'We produce knitwear, denim, activewear and home textiles — export quality. Which category are you sourcing?';
  if (/facilit|capacit|machine|quality|production|manufactur/.test(t))
    return 'Our facility runs lockstitch, overlock, flatlock, two-needle, bartack & steam-press lines with 125,000+ garments/month capacity and full QA checkpoints.';
  if (/contact|email|call|reach|talk|human|agent|sales/.test(t))
    return 'You can reach our team at sales@kmstextiles.com, or tap “Open WhatsApp” below to chat with us live.';
  if (/hi|hello|salam|assalam|hey/.test(t))
    return 'Hello! Welcome to KMS Textiles. Ask me about products, facilities, or getting a quote — or open WhatsApp to talk to our team.';
  return "Thanks! For anything specific our team can help fastest on WhatsApp — tap “Open WhatsApp” below, or ask me about Products, Facilities, or a Quote.";
}

export function ChatWidget() {
  const [open, setOpen] = useState(
    () => typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('chat') === 'open'
  );
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { from: 'bot', text: "Hi! I'm the KMS Textiles assistant 👋 How can I help today?" },
  ]);
  const bodyRef = useRef(null);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [messages, open]);

  function send(text) {
    const msg = (text ?? input).trim();
    if (!msg) return;
    setMessages((m) => [...m, { from: 'user', text: msg }]);
    setInput('');
    setTimeout(() => {
      setMessages((m) => [...m, { from: 'bot', text: botReply(msg) }]);
    }, 450);
  }

  return (
    <div className="kms-chat">
      {open && (
        <div className="kms-chat-panel" role="dialog" aria-label="KMS Textiles chat assistant">
          <div className="kms-chat-head">
            <div className="kms-chat-head-info">
              <span className="kms-chat-avatar" aria-hidden="true">KMS</span>
              <div>
                <strong>KMS Assistant</strong>
                <span className="kms-chat-status">Online · replies instantly</span>
              </div>
            </div>
            <button className="kms-chat-close" onClick={() => setOpen(false)} aria-label="Close chat">
              &times;
            </button>
          </div>

          <div className="kms-chat-body" ref={bodyRef}>
            {messages.map((m, i) => (
              <div key={i} className={'kms-msg kms-msg--' + m.from}>
                {m.text}
              </div>
            ))}
            <div className="kms-chat-quick">
              {QUICK_REPLIES.map((q) => (
                <button key={q} className="kms-chip" onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          </div>

          <a className="kms-chat-wa" href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
            <svg viewBox="0 0 32 32" width="18" height="18" aria-hidden="true">
              <path
                fill="currentColor"
                d="M16 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.26.59 4.46 1.71 6.4L3.1 28.9l6.66-1.75A12.7 12.7 0 0 0 16 28.8C23.06 28.8 28.8 23.06 28.8 16S23.06 3.2 16 3.2zm0 23.06c-1.99 0-3.94-.53-5.64-1.55l-.4-.24-3.95 1.04 1.05-3.85-.26-.4A10.5 10.5 0 0 1 5.47 16C5.47 10.2 10.19 5.47 16 5.47S26.53 10.2 26.53 16 21.81 26.26 16 26.26zm5.78-7.88c-.32-.16-1.87-.93-2.16-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.19-.31-.02-.48.14-.64.14-.14.32-.37.48-.56.16-.18.21-.31.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.31-1.11 1.08-1.11 2.64s1.14 3.06 1.29 3.28c.16.21 2.24 3.41 5.42 4.78.76.33 1.35.52 1.81.67.76.24 1.45.21 2-.13.61-.09 1.87-.76 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.6-.37z"
              />
            </svg>
            Open WhatsApp
          </a>

          <form
            className="kms-chat-input"
            onSubmit={(e) => {
              e.preventDefault();
              send();
            }}
          >
            <input
              type="text"
              placeholder="Type a message…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              aria-label="Type a message"
            />
            <button type="submit" aria-label="Send">↑</button>
          </form>
        </div>
      )}

      <button
        className={'kms-chat-fab' + (open ? ' is-open' : '')}
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? 'Close chat' : 'Open chat assistant'}
      >
        {open ? (
          <span aria-hidden="true" style={{ fontSize: 26, lineHeight: 1 }}>&times;</span>
        ) : (
          <span className="kms-wa-anim" aria-hidden="true">
            <svg className="kms-wa-glyph" viewBox="0 0 32 32" width="24" height="24">
              <path
                fill="currentColor"
                d="M16 3.2C8.94 3.2 3.2 8.94 3.2 16c0 2.26.59 4.46 1.71 6.4L3.1 28.9l6.66-1.75A12.7 12.7 0 0 0 16 28.8C23.06 28.8 28.8 23.06 28.8 16S23.06 3.2 16 3.2zm0 23.06c-1.99 0-3.94-.53-5.64-1.55l-.4-.24-3.95 1.04 1.05-3.85-.26-.4A10.5 10.5 0 0 1 5.47 16C5.47 10.2 10.19 5.47 16 5.47S26.53 10.2 26.53 16 21.81 26.26 16 26.26zm5.78-7.88c-.32-.16-1.87-.93-2.16-1.03-.29-.11-.5-.16-.71.16-.21.31-.82 1.03-1 1.24-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.88-1.76-2.2-.19-.31-.02-.48.14-.64.14-.14.32-.37.48-.56.16-.18.21-.31.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.72-.98-2.35-.26-.62-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.31-1.11 1.08-1.11 2.64s1.14 3.06 1.29 3.28c.16.21 2.24 3.41 5.42 4.78.76.33 1.35.52 1.81.67.76.24 1.45.21 2-.13.61-.09 1.87-.76 2.14-1.5.26-.74.26-1.37.18-1.5-.08-.13-.29-.21-.6-.37z"
              />
            </svg>
            <span className="kms-wa-type">whatsapp</span>
          </span>
        )}
      </button>
    </div>
  );
}
