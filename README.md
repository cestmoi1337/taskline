# Taskline MVP

A lightweight project management MVP built from the PRD in `project.md`.

## What is included

- Project & task management with create flow
- Board, list, and simple timeline (Gantt-like) views
- Basic task dependencies
- Status tracking (Todo, In Progress, Done)
- Task details with comments and activity
- In-app notifications feed
- Lightweight dashboard metrics
- RAID log with categories, status/priority, filters, and optional task linking

## Run locally

Because this is a static MVP, no build step is required.

```bash
python3 -m http.server 8000
```

Then open `http://localhost:8000`.

## Notes

- Data is in-memory only (refresh clears changes).
- This implementation focuses on validating UX and MVP scope before backend/auth integration.
