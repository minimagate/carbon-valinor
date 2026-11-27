// Illustrative chart data, generated deterministically so every build is identical.
// Replace with real figures when available.
let seed = 7;
const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647) - 0.5;
const series = (n: number, f: (t: number) => number, jitter: number) =>
  Array.from({ length: n }, (_, i) => {
    const t = i / (n - 1);
    return Math.max(0, f(t) + (i && i < n - 1 ? rand() * jitter : 0));
  });

// Cumulative CO₂ under monitoring, monthly Jan 2024 – Nov 2026 (thousand tonnes)
export const monitored = series(35, (t) => 8 + 1232 * Math.pow(t, 1.55), 14);
export const verified = monitored.map((v, i) => Math.max(0, v - 20 - 50 * (i / 34)));

// Monitoring and verification cost per tonne, USD, 2024 – 2030
export const manualCost = series(28, (t) => 26 - 7.6 * t, 0.45);
export const ourCost = series(28, (t) => 22 - 17.8 * Math.pow(t, 0.8), 0.4);
