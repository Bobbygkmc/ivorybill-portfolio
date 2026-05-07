# Lead Radar — Local Backend Blueprint

This is the developer-facing companion to
`../docs/OPPORTUNITY_RADAR_BLUEPRINT.md`. The product blueprint
covers principles and scope. This document covers what the code
might look like once it is written.

> No code exists in this folder yet. This is a planning artifact.

---

## Suggested layout (when implementation begins)

```
backend/
└── lead_radar/
    ├── __init__.py
    ├── cli.py              # entry point: `python -m lead_radar ...`
    ├── db.py               # SQLite open / migrations
    ├── models.py           # business / signal / score
    ├── score.py            # scoring rules (pure function)
    ├── fetch.py            # polite, rate-limited HTTP (Phase 2 only)
    ├── outreach.py         # message draft generation (Phase 3 only)
    ├── reports.py          # CSV export
    └── tests/
        ├── test_score.py
        └── test_db.py
```

## Suggested commands

```text
lead-radar add                    # interactive add
lead-radar list                   # list with score column
lead-radar score <id>             # show a business score breakdown
lead-radar export                 # CSV to stdout
lead-radar audit-site <url>       # Phase 2: polite fetch a single page
lead-radar draft <id>             # Phase 3: write an outreach draft
```

## Database

- SQLite, file at `backend/.local/lead_radar.sqlite`.
- The `.local/` directory is git-ignored.
- Never committed; never synced to a third party.

## Dependencies (when added)

The only proposed third-party dependencies are:

- `httpx` for polite HTTP (Phase 2)
- `rich` for friendly CLI output
- `typer` for the CLI itself
- `pydantic` for typed records

Anything beyond this list requires a written reason and operator
approval before being added.

## Tests

- Unit tests for the scoring rules (deterministic, no I/O).
- Unit tests for DB migrations.
- Integration tests for the CLI using `pytest`'s tmp paths.
- No live network in tests. Phase 2 fetcher is mocked.

## Out of scope

- Any kind of bulk scraping.
- Anything that sends outbound email or SMS.
- Anything that posts to a third-party site on behalf of the operator.

These are explicitly excluded so that the design stays narrow and
trustworthy.
