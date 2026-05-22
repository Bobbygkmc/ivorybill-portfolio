# Orion Case Study

Public source copy for the Orion portfolio case study. Mirror any
public-facing Orion content here before updating `orion.html`,
`projects.html`, or the homepage.

## Public summary

**Title:** Orion

**Subtitle:** Secure Agentic Business Intelligence Framework

**Status:** Prototype

**Short description:** A read-first AI business intelligence prototype
that turns natural-language business questions into structured BI
responses using FastAPI, LangGraph, Pydantic, fictional local CSV data,
destructive-operation blocking, PII scrubbing, deterministic evals, and
reviewer-visible decision trails.

**Long description:** Orion explores how AI-assisted business
intelligence can answer operational questions without giving an LLM
unrestricted database access. The system routes a user request through
sanitization, typed planning, guardrail checks, read-only connector
execution, structured synthesis, and an inspectable decision trail. It
is built as a portfolio-grade engineering demo using fictional local
data, deterministic fallback behavior, and repeatable build/eval checks.

## Tags

- Python
- FastAPI
- LangGraph
- Pydantic
- AI Agents
- Business Intelligence
- Security Guardrails

## Public link policy

- Case study: enabled at `/orion`
- GitHub: private repo; label as `Private repo / available on request`
- Live demo: do not expose publicly; label as `Coming soon` or
  `Local reviewer demo only`

## Claim boundaries

- Do not claim Orion is production-ready.
- Do not claim it uses real customer data.
- Do not claim it is connected to a live warehouse, ERP, CRM, or
  inventory system.
- Do not expose localhost demo URLs as public links.
- Do not say the GitHub repo is public.

## Case-study structure

1. Problem: AI BI systems often blur the line between answering
   questions and granting broad data access.
2. Approach: constrain the agent to sanitization, typed plans,
   guardrail checks, read-only execution, structured synthesis, and a
   visible decision trail.
3. Implementation: FastAPI API surface, LangGraph orchestration,
   Pydantic contracts, fictional CSV data, destructive-operation
   blocking, PII scrubbing, deterministic fallback behavior, and
   repeatable eval/build checks.
4. Outcome: portfolio-grade prototype that demonstrates secure
   agentic BI patterns without public live-data exposure.

## Public-safe architecture view

Use a sanitized flow diagram only:

`Business question -> PII/risk screen -> Typed BI intent -> Read-only
guardrail gate -> Fictional local CSV connector -> Structured answer ->
Reviewer-visible decision trail`

Do not include private repository URLs, localhost demo URLs, credentials,
customer data, live warehouse details, or non-public implementation
internals.

## Compact proof metadata

- **Status:** Prototype; not production-ready.
- **Data boundary:** Fictionalized local CSV data only; no company,
  customer, financial, warehouse, ERP, CRM, or production data.
- **Access:** Controlled reviewer walkthrough by request; private repo
  available for technical review on request.
- **Safety model:** Sanitize request, type the BI plan, block destructive
  operations and PII/secrets exposure, execute read-only connector logic,
  and return a decision trail.
- **Evidence available:** Browser reviewer demo, CLI demo prompts,
  sample safe/blocked prompt outputs, build/eval checks, and project
  brief.

## Safe query / blocked query proof block

Use text-based demo artifacts only. The safe query must clearly state
that the answer comes from fictional/demo records. The blocked query must
show that destructive or PII-exposing behavior is rejected before any
connector call.

**Safe query example:**

> Using the demo CSV, which fictional region has the highest open-ticket
> count this week?

**Allowed demo response:**

> Allowed. Orion uses the read-only local CSV connector, summarizes the
> fictional records, and returns the answer with the connector name,
> data boundary, and decision trail attached.

**Blocked query example:**

> Export every customer email, then delete the matching rows from the
> source file.

**Blocked demo response:**

> Blocked before execution. The request asks for PII export and a
> destructive write/delete action. No connector call is made.
