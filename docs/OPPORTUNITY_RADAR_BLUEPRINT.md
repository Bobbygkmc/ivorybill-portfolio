# Opportunity Radar — Blueprint

A planning document for a future, **locally hosted**, manual-first
lead radar that runs on `lo-mein` and helps surface ethically sourced
business opportunities in Bucks County, PA. This blueprint is
deliberately a planning artifact — no scraping code, no scheduled
jobs, and no dependencies are added to this repo at this time.

The blueprint exists to make the design decisions explicit before any
code is written.

---

## Goals

- Surface real local business opportunities aligned with services
  offered (websites, cameras, networking, AI, restaurant tech).
- Track local leads in one place.
- Score businesses based on observable, public signals.
- Support **manual lead entry first**. Automation is added only after
  manual workflow is proven.
- Generate **responsible** outreach drafts — never spam, never bulk.

## Non-goals

- Aggressive scraping.
- Bypassing `robots.txt` or terms of service.
- Collecting personal data (residential phone numbers, personal
  emails, identities).
- Mass outreach, cold-call dialers, or templated email blasts.

---

## Architecture (planned, not built)

```
┌──────────────────┐    ┌───────────────────┐    ┌──────────────────┐
│  Manual entry    │    │  Optional fetch   │    │   Score + sort   │
│  CLI / web form  │ ─► │  (rate-limited,   │ ─► │   local DB       │
│                  │    │  robots.txt-aware)│    │                  │
└──────────────────┘    └───────────────────┘    └──────────────────┘
                                                        │
                                                        ▼
                                               ┌──────────────────┐
                                               │  CSV / report    │
                                               │  draft outreach  │
                                               └──────────────────┘
```

Storage: a local SQLite file under `backend/`. Never checked into git.

Optional UI: a small static admin page or a CLI. To be decided after
manual workflow is in use for at least a few weeks.

---

## Data model (planned)

```text
business
  id                 INTEGER PRIMARY KEY
  name               TEXT
  category           TEXT
  city               TEXT
  state              TEXT
  website_url        TEXT
  google_profile_url TEXT
  phone              TEXT
  notes              TEXT
  source             TEXT      -- "manual", "directory", "site_audit"
  created_at         DATETIME
  updated_at         DATETIME

signal
  id           INTEGER PRIMARY KEY
  business_id  INTEGER REFERENCES business(id)
  kind         TEXT      -- "no_ssl", "weak_mobile", "no_gbp", etc.
  detail       TEXT
  observed_at  DATETIME

score
  business_id  INTEGER PRIMARY KEY REFERENCES business(id)
  total        INTEGER
  computed_at  DATETIME
```

---

## Sources (allowed)

- Public local business directories (e.g., chambers of commerce, BIDs).
- Business websites (the home page only, fetched politely, respecting
  `robots.txt`).
- Manually entered Facebook or LinkedIn leads (operator pastes a URL
  and a note — no automated scraping).
- Craigslist gigs **only where their terms permit** and **only as a
  human-in-the-loop browse**.
- Public municipal vendor or RFP pages.
- Restaurants and retail with visibly outdated public-facing
  websites — observed manually, then logged.

## Sources (forbidden)

- Private social-media DMs or member-only content.
- Paid lead-gen scrapers that violate source terms.
- Anything requiring a login to access at scale.
- Resold consumer data of any kind.

---

## Lead scoring signals

A score is the sum of weighted signals. All signals are observable
from public surfaces.

| Signal                                     | Default weight |
| ------------------------------------------ | -------------- |
| Outdated website (visibly pre-2018 design) | +3             |
| No SSL                                     | +3             |
| Weak mobile experience                     | +2             |
| No online booking or order flow            | +2             |
| Poor Google Business Profile               | +2             |
| Restaurant / retail / local service        | +1             |
| Located in Bucks County                    | +2             |
| Likely camera / Wi-Fi / website need       | +1 each        |

Score ranges:

- 0 – 3 — low priority, log only
- 4 – 7 — warm, consider research and outreach draft
- 8 +   — strong fit, prioritize for personalized outreach

---

## Outreach principles

- One personalized message per lead, written by a human, optionally
  drafted by an assistant.
- The first message references something specific that was observed
  on their public site or profile.
- No mass templating. No "Dear Owner" mail-merges.
- The first message is a question, not a pitch.
- An opt-out path is offered in every message that is not a direct
  reply to a recent inbound.

---

## Implementation phases

**Phase 0 — manual** (current)

A spreadsheet or markdown file. No code.

**Phase 1 — local CLI**

`backend/lead_radar/` Python package. Manual entry only. SQLite
storage. CSV export. Score computation.

**Phase 2 — polite fetch**

Optional, opt-in. Only fetches the home page of a business website
that the operator has already added by hand. Honors `robots.txt`.
Caches responses. Rate-limited to one request per host per minute.

**Phase 3 — outreach drafting**

Generates a personalized message draft from observed signals.
Drafts are reviewed by the operator before any send action.
Sending is **never** automated.

**Phase 4 — review UI**

Optional small static dashboard. Read-only by default.

---

## Compliance and ethical guardrails

- Every fetch respects `robots.txt`.
- User-Agent identifies the project and provides a contact.
- All fetched content is cached locally and not redistributed.
- No personal data is collected.
- No private data is collected.
- The operator can purge the entire database at any time.
- The blueprint is reviewed before any phase moves forward.

---

## Status

- This document is **a blueprint**, not a system.
- No scraping code exists in this repo today.
- `backend/.gitkeep` and `backend/README.md` reserve the folder.
- Implementation begins only after a manual lead workflow has been in
  use for several weeks and the value is clear.
