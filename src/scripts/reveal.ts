// The page comes into focus as one text: a single wave sweeps every word and the
// logo in reading order, on load. Charts wait until they scroll into view.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const WAVE = 1.6; // seconds for the wave to sweep the whole page
const main = document.querySelector('main')!;
if (!reduce) {
  const items = main.querySelectorAll<HTMLElement>('[data-words], .logo');
  let total = 0;
  items.forEach((el) => {
    if (el.matches('[data-words]')) total += (el.textContent?.match(/\S/g) || []).length;
  });
  const step = WAVE / Math.max(total, 1);
  let i = 0;
  const at = () => `${(0.15 + i * step).toFixed(3)}s`;
  const wrap = (node: Node, into: Node) => {
    (node.textContent || '').split(/(\s+)/).forEach((part) => {
      if (!part) return;
      if (/^\s+$/.test(part)) return into.appendChild(document.createTextNode(part));
      const w = document.createElement('span');
      w.className = 'word';
      w.textContent = part;
      w.style.animationDelay = at();
      i += part.length;
      into.appendChild(w);
    });
  };
  items.forEach((el) => {
    if (!el.matches('[data-words]')) return el.style.setProperty('--d', at());
    const nodes = [...el.childNodes];
    el.textContent = '';
    nodes.forEach((n) => {
      if (n.nodeType === Node.TEXT_NODE) return wrap(n, el);
      if ((n as Element).hasAttribute?.('data-keep')) {
        (n as HTMLElement).classList.add('word');
        (n as HTMLElement).style.animationDelay = at();
        i += 6;
        return el.appendChild(n);
      }
      const c = n.cloneNode(false);
      wrap(n, c);
      el.appendChild(c);
    });
  });
}
requestAnimationFrame(() => requestAnimationFrame(() => main.classList.add('in')));

// Tonnes under watch: grows steadily from a fixed point in time, so every visitor sees the same figure.
const counter = document.querySelector<HTMLElement>('.counter');
if (counter) {
  const BASE = 1_181_404, FROM = Date.UTC(2026, 10, 27), PER_TONNE_MS = 1400;
  const fmt = new Intl.NumberFormat('en-US');
  const tick = () => (counter.textContent = fmt.format(BASE + Math.floor((Date.now() - FROM) / PER_TONNE_MS)));
  tick();
  setInterval(tick, 350);
}

const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((e) => {
      if (!e.isIntersecting) return;
      e.target.classList.add('seen');
      io.unobserve(e.target);
    }),
  { threshold: 0.4 },
);
document.querySelectorAll('.chart').forEach((el) => io.observe(el));
document.documentElement.classList.add('ready');
