// Paths that respect the GitHub Pages base (/carbon-valinor).
const base = import.meta.env.BASE_URL.replace(/\/$/, '');

export const asset = (path: string) => `${base}/${path.replace(/^\//, '')}`;
export const absolute = (path: string, site: URL | undefined) => new URL(asset(path), site).href;
