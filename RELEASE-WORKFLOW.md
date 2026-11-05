# Release workflow: how the website updates itself

When you publish a new goclean release on GitHub, this setup prepares the website update for you. You only review it and click **Merge**.

## The big picture

```
goclean repo                         goclean-desktop repo (this website)
------------                         -----------------------------------
You publish a release  ──────────►   1. Workflow wakes up
(e.g. v1.3.0)          "new release   2. Script updates version + changelog
                        + notes"      3. Site is built to check nothing broke
                                      4. A pull request is opened
                                                  │
                                      You review and click Merge
                                                  │
                                      Existing pages.yml deploys the site
```

## The three pieces

| Piece | Where | What it does |
|---|---|---|
| `notify-website` job in `release.yml` | **goclean** repo, `.github/workflows/release.yml` | Runs after GoReleaser publishes a release. Sends the tag, date and release notes to this repo. |
| `.github/workflows/release-update.yml` | this repo | Receives that message, runs the script, builds the site and opens a pull request. |
| `scripts/bump-release.mjs` | this repo | Does the actual edits to two files (see below). |

## What the script changes

1. `src/lib/site.ts`: sets `VERSION` to the new tag. The navbar, hero, download section, footer and About page all read this value, so they update together.
2. `src/pages/Changelog.tsx`: adds a new entry at the top of the list.
   - Release note lines starting with `feat:` become **New** items.
   - Lines starting with `fix:` become **Fix** items.
   - Other lines (`chore:`, `docs:` and so on) are ignored.
   - The summary is set to `TODO: write a one-line summary.`
   - If the tag is already in the changelog, only `VERSION` is updated.

## One-time setup

1. **Create a token.** GitHub → Settings → Developer settings → Personal access tokens → Fine-grained tokens.
   - Repository access: only `goclean-desktop`.
   - Permission: **Contents: Read and write**.
2. **Store it in the goclean repo.** goclean repo → Settings → Secrets and variables → Actions → New repository secret. Name it `WEBSITE_DISPATCH_TOKEN` and paste the token.
3. **Allow pull requests from Actions.** `goclean-desktop` repo → Settings → Actions → General → turn on **Allow GitHub Actions to create and approve pull requests**.
4. **Add the sender job.** It is the `notify-website` job at the bottom of the goclean repo's `.github/workflows/release.yml`. It runs after GoReleaser, because releases created by GoReleaser don't trigger a separate "release published" workflow.

## Every release after that

1. Publish the release on GitHub as usual. Keep using `feat:` and `fix:` in commit messages, because the changelog is built from them.
2. A pull request titled **Update site for vX.Y.Z** appears in `goclean-desktop` within a minute or two.
3. Open it and go through its checklist:
   - Replace the `TODO` summary in `src/pages/Changelog.tsx`.
   - Ask whether the release changes behavior the docs or FAQ describe. This part can't be automated. For example, v1.2.0 added a Dockerfile, which made several docs pages wrong.
4. Click **Merge**. The existing `pages.yml` workflow deploys the site.

## Testing without a real release

In the `goclean-desktop` repo go to Actions → **Update site for new release** → **Run workflow**, and enter an existing tag such as `v1.2.0`. It fetches that release from GitHub and opens a pull request. Because `v1.2.0` is already in the changelog, only the version line would change, so this is a safe check that the plumbing works.

You can also run the script locally:

```bash
TAG=v1.3.0 DATE=2026-11-10 BODY="$(cat notes.txt)" node scripts/bump-release.mjs
```

## Troubleshooting

| Symptom | Likely cause |
|---|---|
| No pull request after a release | The secret is missing or expired, or the `notify-website` job didn't run in the goclean repo. Check the **Actions** tab in the goclean repo. |
| Workflow runs but fails at "create pull request" | The "Allow GitHub Actions to create and approve pull requests" setting is off. |
| Changelog entry has no items | The release notes had no `feat:` or `fix:` lines. Add items by hand in the pull request. |
| Build step fails | The script produced something the site can't compile. Check the log, fix the file on the pull request branch, and push. |
| Token expired | Create a new one and replace the `WEBSITE_DISPATCH_TOKEN` secret. |

## Limits

- It needs a person to review each pull request. That is deliberate, because of the docs point above.
- Pull requests opened by Actions don't trigger other workflows. That is fine here, because the deploy runs when you merge into `main`.
