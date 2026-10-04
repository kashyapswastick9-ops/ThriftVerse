const MESSAGES = [
  '🔥 FREE SHIPPING ON ORDERS OVER ₹999',
  '⚡ NEW DROPS EVERY FRIDAY 7PM',
  '🎯 ALL ITEMS ARE 1-OF-1 — WHEN IT\'S GONE, IT\'S GONE',
  '💳 COD AVAILABLE ACROSS INDIA',
  '✦ SEASON 07 ISSUE #01 IS LIVE',
];

const track = [...MESSAGES, ...MESSAGES].join(' · ');

export default function AnnouncementBar() {
  return (
    <div
      role="marquee"
      aria-label="Announcements"
      className="relative overflow-hidden bg-crimson border-b-[3px] border-black py-1.5"
    >
      {/* Doubled track so the loop is seamless */}
      <div className="animate-marquee whitespace-nowrap inline-block font-mono text-[11px] font-bold text-stark uppercase tracking-widest">
        {track} &nbsp;·&nbsp; {track}
      </div>
    </div>
  );
}
