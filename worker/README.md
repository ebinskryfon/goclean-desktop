# goclean map worker

Collects download / copy events for the world map on the site.

1. `cd worker && npx wrangler login`
2. `npx wrangler kv namespace create MAP` and paste the returned id into `wrangler.toml`
3. Set `ALLOWED_ORIGINS` in `wrangler.toml` to your site origin(s)
4. `npx wrangler deploy` and copy the `*.workers.dev` URL
5. In the site: set `VITE_TRACK_URL` to that URL (see `.env.example`) and rebuild

Only a coarse 3° location cell (about 300 km) and a count are stored. IP addresses are never stored.

## Free-tier behaviour

- `GET /dots` is cached for 60 seconds, so map views mostly do not read KV.
- Events in a location that already has a dot are counted in memory and written to KV at most once a minute.
- The first event from a brand-new location is written immediately, so its dot appears right away.
- If Cloudflare recycles the Worker before a flush, a few repeat counts in an existing location can be lost. Dots are never lost this way.
