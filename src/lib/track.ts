// Reports "download" / "copy" events to the goclean map worker (see /worker).
// Disabled unless VITE_TRACK_URL is set. No IP or personal data is sent from the browser;
// the worker only keeps a coarse (3°) location cell.
export const TRACK_URL: string = (import.meta.env.VITE_TRACK_URL ?? '').replace(/\/$/, '')
export const TRACK_EVENT = 'goclean:tracked'

export type TrackType = 'download' | 'copy'

export function track(type: TrackType) {
  if (!TRACK_URL) return
  try {
    // once per type per browser session, to keep the map honest
    const key = `goclean-tracked-${type}`
    if (sessionStorage.getItem(key)) return
    sessionStorage.setItem(key, '1')
  } catch { /* storage unavailable: still send */ }
  fetch(`${TRACK_URL}/track`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ type }),
    keepalive: true,
  })
    .then(() => window.dispatchEvent(new Event(TRACK_EVENT)))
    .catch(() => { /* ignore */ })
}
