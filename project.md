# 📄 Product Requirements Document (PRD)

## 1. Product Overview

### Vision
Create the most intuitive, visually engaging project management tool that bridges the gap between simple task boards and structured scheduling.

### Mission
Empower young project managers to plan, track, and deliver projects confidently—without needing enterprise-level complexity.

### Problem Statement
Current tools force a trade-off:
- Tools like Monday.com and Wrike are easy to use but lack strong scheduling logic.
- Tools like Microsoft Project are powerful but overwhelming and outdated in UX.

Young PMs struggle to:
- Understand timelines and dependencies
- Maintain structure without complexity
- Stay engaged with clunky interfaces

### Unique Value Proposition
A modern, lightweight PM tool that combines:
- Visual simplicity (like Monday/Wrike)
- Structured scheduling (lite MS Project)
- Built-in **RAID log tracking** (Risks, Assumptions, Issues, Dependencies)
- Designed specifically for young, modern project managers

---

## 2. Target Users & Personas

### Persona 1: Early-Career PM (Primary)
- Age: 24–30
- Role: Associate PM / Project Coordinator

**Goals**
- Stay organized and look professional
- Understand timelines and dependencies

**Frustrations**
- Overwhelmed by complex tools
- Manually tracking risks and issues in spreadsheets

---

### Persona 2: Startup Operator
- Age: 25–35
- Role: Ops / Product / Founder

**Goals**
- Move quickly
- Maintain visibility across projects

**Frustrations**
- Lacks lightweight structure for planning and risk tracking

---

### Persona 3: Accidental PM
- Age: 22–35
- Role: Marketing, Design, Tech lead

**Goals**
- Manage projects without formal PM training

**Frustrations**
- No clear way to track risks, issues, or dependencies

---

## 3. Core Features for MVP

### Must-Have (MVP)

1. Project & Task Management (Boards + Lists)
2. Timeline View (Simple Gantt)
3. Task Dependencies (basic)
4. Status Tracking
5. Collaboration (Comments & Mentions)
6. Notifications (basic)
7. Lightweight Dashboard
8. **RAID Log (Core Differentiator)**

---

### Nice-to-Have

- Drag-and-drop timeline editing
- Templates
- Workload view
- Dark mode

---

### Future (Not MVP)

- Resource management
- Budget tracking
- Advanced reporting
- External integrations

---

## 4. Feature Descriptions

### 4.1 Project & Task Management

**Description**  
Create and organize tasks within projects.

**User Story**  
As a PM, I want to organize tasks so I can manage work effectively.

**Acceptance Criteria**
- Create/edit/delete projects
- Tasks include name, assignee, due date, status
- Board and list views available

---

### 4.2 Timeline (Gantt View)

**Description**  
Visual timeline for scheduling tasks.

**User Story**  
As a PM, I want to see tasks over time so I understand project flow.

**Acceptance Criteria**
- Tasks displayed as timeline bars
- Editable start/end dates
- Auto-refresh on updates

---

### 4.3 Dependencies

**Description**  
Link tasks with dependencies.

**User Story**  
As a PM, I want to define dependencies so I can avoid conflicts.

**Acceptance Criteria**
- Link tasks
- Enforce sequence logic
- Visual indicators on timeline

---

### 4.4 Status Tracking

**Description**  
Track progress across tasks.

**Acceptance Criteria**
- Default statuses
- Updates reflected across views

---

### 4.5 Collaboration

**Description**  
Task-level communication.

**Acceptance Criteria**
- Comments
- Mentions
- Activity tracking

---

### 4.6 Notifications

**Description**  
Keep users informed.

**Acceptance Criteria**
- Notify on mentions, assignments, updates
- In-app notification center

---

### 4.7 Dashboard

**Description**  
High-level project overview.

**Acceptance Criteria**
- % completion
- Tasks by status
- Upcoming deadlines

---

### 4.8 RAID Log (Risks, Assumptions, Issues, Dependencies)

**Description**  
Centralized log to track project risks, assumptions, issues, and dependencies.

**User Story**  
As a PM, I want to track risks, assumptions, issues, and dependencies in one place so I can proactively manage project health.

**Acceptance Criteria**
- Create RAID entries categorized as:
  - Risk
  - Assumption
  - Issue
  - Dependency
- Each entry includes:
  - Title
  - Description
  - Owner
  - Status (Open, Mitigated, Closed)
  - Priority (Low, Medium, High)
  - Due date (optional)
- Filter by category and status
- Link RAID items to tasks (optional)
- Basic dashboard summary (e.g., # of open risks)

---

## 5. Key Functional Areas

### Task & Project Management
- Boards and lists

### Timeline / Gantt
- Visual scheduling

### Dependencies
- Task linking

### Collaboration
- Comments and mentions

### Notifications
- In-app alerts

### Reporting
- Lightweight dashboards

### RAID Management
- Central RAID log
- Filterable and linkable to tasks

---

## 6. UX / UI Principles

### Design Philosophy
- Clean, modern, minimal
- Fast and intuitive
- Low learning curve

### Style
- Inspired by Notion / Linear
- Soft color palette
- Clear visual hierarchy

### Key Screens
1. Dashboard
2. Project Board
3. Task Detail Panel
4. Timeline View
5. RAID Log View
6. Notifications Panel

### Differentiation
- Combines **visual planning + structured governance (RAID)** in a simple UI

---

## 7. Technical Considerations (MVP)

### Frontend
- React (Next.js)
- Tailwind CSS

### Backend
- Supabase (preferred) or Firebase

### Database
- PostgreSQL (Supabase)

### Hosting
- Vercel (frontend)
- Supabase (backend)

### Authentication
- Google login (OAuth)

### Scalability
- Modular architecture
- API-first design

---

## 8. Constraints & Assumptions

### Constraints
- Free or low-cost tools
- Small team or solo developer

### Assumptions
- Users value simplicity over feature depth
- Early adopters accept limited functionality

### Time-to-Market
- Target: 4–8 weeks

---

## 9. Success Metrics

### Engagement
- Daily/weekly active users
- Session frequency

### Retention
- 7-day and 30-day retention

### Feature Adoption
- Timeline usage rate
- RAID log usage rate

### Validation Signals
- Multiple projects created per user
- Repeated use of RAID log
- Positive feedback on usability

---

## 10. Future Roadmap

### Advanced Features
- Critical path calculation
- Resource management
- Workload balancing

### AI Enhancements
- Auto-generated project plans
- Risk prediction
- Smart scheduling

### Integrations
- Slack
- Google Calendar
- GitHub / Jira

---

## ⚠️ Product Strategy Note

The key differentiator is:
- Simplicity + Visual Planning + Built-in RAID discipline

Do NOT overbuild early.

Focus on:
- Clean UX
- Clear timeline
- Practical RAID tracking

That combination alone is enough to stand out in the MVP phase.