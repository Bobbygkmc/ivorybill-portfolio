# Crenshaw + ntfy Workflow

How the Crenshaw agent should coordinate with the operator (Bob) using
ntfy push notifications during build, deploy, and audit work on
`dev.uyammadu.com`.

> **Topic placeholder**: `crenshaw-ops-bob-2026`
>
> Replace with the real topic at runtime. Do not hardcode private
> tokens. Do not commit secrets to this repo.

---

## When Crenshaw should notify

Crenshaw should send a short ntfy message at each of the following
checkpoints. Messages are intentionally short so they read well on a
phone lock screen.

| Event                              | Example title           | Example body                                |
| ---------------------------------- | ----------------------- | ------------------------------------------- |
| Build started                      | `dev.uyammadu`          | `Build started.`                            |
| Repo inspection complete           | `dev.uyammadu`          | `Repo inspection complete.`                 |
| Major edit about to begin          | `dev.uyammadu`          | `Editing services + pricing pages.`         |
| Major edit complete                | `dev.uyammadu`          | `Services and pricing updates complete.`    |
| Build / lint / type-check running  | `dev.uyammadu`          | `Running build checks.`                     |
| Build / lint / type-check complete | `dev.uyammadu`          | `Checks completed.`                         |
| Build failed                       | `dev.uyammadu — FAIL`   | `Build failed: see terminal output.`        |
| Final summary                      | `dev.uyammadu — done`   | `Ready for review.`                         |

Priorities (ntfy headers):

- `default` for routine progress
- `high` for completion of a major milestone
- `urgent` for failures that block progress

---

## Reference shell snippets

These are reference snippets for documentation. They are **not**
wired into the build today. They are meant to be copied into a local
script that already has access to the topic via an environment
variable.

```bash
# The topic is read from an environment variable to avoid committing
# secrets. Set it once in your shell or in a private .envrc file.
: "${NTFY_TOPIC:?NTFY_TOPIC is not set}"
NTFY_URL="https://ntfy.sh/${NTFY_TOPIC}"

notify() {
  local title="$1"
  local body="$2"
  local priority="${3:-default}"

  curl --silent --show-error \
    --header "Title: ${title}" \
    --header "Priority: ${priority}" \
    --data "${body}" \
    "${NTFY_URL}" > /dev/null
}

# Examples
notify "dev.uyammadu" "Build started."
notify "dev.uyammadu" "Repo inspection complete."
notify "dev.uyammadu" "Editing services + pricing pages."
notify "dev.uyammadu" "Services and pricing updates complete."
notify "dev.uyammadu" "Running build checks."
notify "dev.uyammadu" "Checks completed." high
notify "dev.uyammadu — FAIL" "Build failed: see terminal output." urgent
notify "dev.uyammadu — done" "Ready for review." high
```

---

## What Crenshaw should never do

- Hardcode the ntfy topic into source files.
- Send raw command output (large logs) into ntfy. Send a one-line
  summary plus a path to the local log file.
- Send notifications for every small file edit. The list above is the
  full set of allowed event types.
- Trigger external integrations (Slack, email, SMS) without an
  explicit follow-up decision from the operator.

---

## Operator-side setup (manual, not in repo)

1. Pick a private topic name. Avoid words that are easy to guess.
2. Set `NTFY_TOPIC` in a private shell init file (e.g.
   `~/.config/notify-secrets`, sourced from `~/.bashrc`).
3. Subscribe to the topic on a phone using the ntfy app.
4. Test the snippet above by running `notify "test" "hello"` once.
5. Hand the topic name and a one-line description to Crenshaw at the
   start of an operator-approved session.

---

## Why this lives in docs

The notification flow is part of how the team (operator + agent)
coordinates work. Documenting it here keeps the contract explicit
and prevents quiet drift in what gets pinged. It is also the place
to deprecate or rename channels later without hunting through code.
