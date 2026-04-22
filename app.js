const state = {
  view: 'board',
  selectedTaskId: null,
  tasks: [
    {
      id: crypto.randomUUID(),
      name: 'Kickoff & scope alignment',
      assignee: 'Ava',
      status: 'Done',
      startDate: '2026-04-15',
      dueDate: '2026-04-16',
      dependency: '',
      comments: ['@Liam Scope approved with stakeholders.'],
      activity: ['Task created', 'Status set to Done'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Design wireframes',
      assignee: 'Liam',
      status: 'In Progress',
      startDate: '2026-04-17',
      dueDate: '2026-04-23',
      dependency: '',
      comments: ['Please add mobile state by Friday.'],
      activity: ['Assigned to Liam'],
    },
    {
      id: crypto.randomUUID(),
      name: 'Build MVP screens',
      assignee: 'Noah',
      status: 'Todo',
      startDate: '2026-04-24',
      dueDate: '2026-04-30',
      dependency: '',
      comments: [],
      activity: ['Task created'],
    },
  ],
  raid: [
    {
      id: crypto.randomUUID(),
      category: 'Risk',
      title: 'Timeline slip due to design revisions',
      description: 'Design iterations may delay engineering start date.',
      owner: 'Ava',
      status: 'Open',
      priority: 'High',
      dueDate: '2026-04-25',
      taskId: '',
    },
    {
      id: crypto.randomUUID(),
      category: 'Issue',
      title: 'Test environment unavailable',
      description: 'Shared staging is unstable this week.',
      owner: 'Noah',
      status: 'Mitigated',
      priority: 'Medium',
      dueDate: '',
      taskId: '',
    },
  ],
  notifications: [
    'Ava mentioned @Liam in Kickoff & scope alignment',
    'Task assigned: Build MVP screens → Noah',
  ],
};

const taskContainer = document.getElementById('taskContainer');
const detailContent = document.getElementById('detailContent');
const metrics = document.getElementById('metrics');
const raidContainer = document.getElementById('raidContainer');
const notificationList = document.getElementById('notificationList');

const taskDialog = document.getElementById('taskDialog');
const taskForm = document.getElementById('taskForm');
const dependencySelect = document.getElementById('dependencySelect');
const raidTaskSelect = document.getElementById('raidTaskSelect');
const raidDialog = document.getElementById('raidDialog');
const raidForm = document.getElementById('raidForm');

const formatStatusClass = (status) => status.toLowerCase().replace(' ', '-');
const daysBetween = (start, end) => {
  const s = new Date(start);
  const e = new Date(end);
  return Math.max(1, Math.round((e - s) / (1000 * 60 * 60 * 24)) + 1);
};

function pushNotification(message) {
  state.notifications.unshift(`${new Date().toLocaleString()}: ${message}`);
  state.notifications = state.notifications.slice(0, 20);
}

function renderDashboard() {
  const total = state.tasks.length;
  const done = state.tasks.filter((t) => t.status === 'Done').length;
  const inProgress = state.tasks.filter((t) => t.status === 'In Progress').length;
  const openRisks = state.raid.filter((r) => r.category === 'Risk' && r.status === 'Open').length;
  const upcoming = state.tasks.filter((t) => new Date(t.dueDate) >= new Date()).length;

  metrics.innerHTML = `
    <div class="metric"><span>% Completion</span><strong>${total ? Math.round((done / total) * 100) : 0}%</strong></div>
    <div class="metric"><span>In Progress</span><strong>${inProgress}</strong></div>
    <div class="metric"><span>Upcoming Deadlines</span><strong>${upcoming}</strong></div>
    <div class="metric"><span>Open Risks</span><strong>${openRisks}</strong></div>
  `;
}

function renderNotifications() {
  notificationList.innerHTML = state.notifications.map((item) => `<li>${item}</li>`).join('');
}

function selectTask(taskId) {
  state.selectedTaskId = taskId;
  const task = state.tasks.find((t) => t.id === taskId);
  if (!task) {
    detailContent.textContent = 'Select a task to view details, comments, and activity.';
    return;
  }

  detailContent.innerHTML = `
    <h3>${task.name}</h3>
    <p><strong>Assignee:</strong> ${task.assignee}</p>
    <p><strong>Status:</strong> ${task.status}</p>
    <p><strong>Dates:</strong> ${task.startDate} → ${task.dueDate}</p>
    <p><strong>Dependency:</strong> ${task.dependency ? state.tasks.find((t) => t.id === task.dependency)?.name || 'N/A' : 'None'}</p>
    <h4>Comments</h4>
    <ul>${task.comments.map((c) => `<li>${c}</li>`).join('') || '<li>No comments yet</li>'}</ul>
    <h4>Activity</h4>
    <ul>${task.activity.map((a) => `<li>${a}</li>`).join('')}</ul>
  `;
}

function renderBoardView() {
  const buckets = ['Todo', 'In Progress', 'Done'];
  const columns = buckets
    .map(
      (status) => `
      <div class="column">
        <h3>${status}</h3>
        ${state.tasks
          .filter((t) => t.status === status)
          .map(
            (t) => `<article class="task ${formatStatusClass(t.status)}" data-id="${t.id}">
                  <strong>${t.name}</strong><br />
                  <small>${t.assignee} · due ${t.dueDate}</small>
                  ${t.dependency ? '<div><small>Blocked by dependency</small></div>' : ''}
                </article>`
          )
          .join('')}
      </div>`
    )
    .join('');

  taskContainer.innerHTML = `<div class="columns">${columns}</div>`;
}

function renderListView() {
  taskContainer.innerHTML = `
    <table class="list-table">
      <thead>
        <tr><th>Task</th><th>Assignee</th><th>Status</th><th>Start</th><th>Due</th><th>Dependency</th></tr>
      </thead>
      <tbody>
        ${state.tasks
          .map(
            (t) => `<tr data-id="${t.id}">
              <td>${t.name}</td><td>${t.assignee}</td><td>${t.status}</td><td>${t.startDate}</td><td>${t.dueDate}</td>
              <td>${t.dependency ? 'Linked' : '-'}</td>
            </tr>`
          )
          .join('')}
      </tbody>
    </table>
  `;
}

function renderTimelineView() {
  const minStart = new Date(Math.min(...state.tasks.map((t) => new Date(t.startDate).valueOf())));
  taskContainer.innerHTML = `<div class="timeline">${state.tasks
    .map((task) => {
      const offset = daysBetween(minStart.toISOString().slice(0, 10), task.startDate) * 3;
      const duration = daysBetween(task.startDate, task.dueDate) * 5;
      return `<div class="timeline-row" data-id="${task.id}">
          <strong>${task.name}</strong> <small>(${task.startDate} → ${task.dueDate})</small>
          <div class="bar" style="margin-left:${offset}px; width:${duration}px"></div>
          ${task.dependency ? '<small>⚑ Has dependency</small>' : ''}
        </div>`;
    })
    .join('')}</div>`;
}

function renderTasks() {
  if (state.view === 'board') renderBoardView();
  if (state.view === 'list') renderListView();
  if (state.view === 'timeline') renderTimelineView();

  taskContainer.querySelectorAll('[data-id]').forEach((el) => {
    el.addEventListener('click', () => selectTask(el.dataset.id));
  });
}

function renderRaid() {
  const categoryFilter = document.getElementById('raidCategoryFilter').value;
  const statusFilter = document.getElementById('raidStatusFilter').value;

  const filtered = state.raid.filter(
    (item) =>
      (categoryFilter === 'all' || item.category === categoryFilter) &&
      (statusFilter === 'all' || item.status === statusFilter)
  );

  raidContainer.innerHTML = filtered
    .map(
      (item) => `<article class="raid-item">
        <div>
          <span class="badge">${item.category}</span>
          <span class="badge">${item.status}</span>
          <span class="badge">${item.priority}</span>
        </div>
        <h4>${item.title}</h4>
        <p>${item.description}</p>
        <small>Owner: ${item.owner}${item.dueDate ? ` · Due: ${item.dueDate}` : ''}${
        item.taskId ? ` · Linked task: ${state.tasks.find((t) => t.id === item.taskId)?.name || 'N/A'}` : ''
      }</small>
      </article>`
    )
    .join('');
}

function syncTaskSelects() {
  const options = state.tasks.map((t) => `<option value="${t.id}">${t.name}</option>`).join('');
  dependencySelect.innerHTML = `<option value="">None</option>${options}`;
  raidTaskSelect.innerHTML = `<option value="">None</option>${options}`;
}

function renderAll() {
  renderDashboard();
  renderTasks();
  renderRaid();
  renderNotifications();
  syncTaskSelects();
  if (state.selectedTaskId) selectTask(state.selectedTaskId);
}

document.querySelectorAll('[data-view]').forEach((btn) => {
  btn.addEventListener('click', () => {
    state.view = btn.dataset.view;
    document.querySelectorAll('[data-view]').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    renderTasks();
  });
});

document.getElementById('addTaskBtn').addEventListener('click', () => {
  taskForm.reset();
  taskDialog.showModal();
});

taskForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(taskForm);
  const task = {
    id: crypto.randomUUID(),
    name: data.get('name').toString(),
    assignee: data.get('assignee').toString(),
    status: data.get('status').toString(),
    startDate: data.get('startDate').toString(),
    dueDate: data.get('dueDate').toString(),
    dependency: data.get('dependency').toString(),
    comments: [],
    activity: ['Task created'],
  };

  if (task.dependency) {
    task.activity.push('Dependency linked');
  }

  state.tasks.push(task);
  pushNotification(`New task created: ${task.name} assigned to ${task.assignee}`);
  taskDialog.close();
  renderAll();
});

document.getElementById('addRaidBtn').addEventListener('click', () => {
  raidForm.reset();
  raidDialog.showModal();
});

raidForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(raidForm);
  const item = {
    id: crypto.randomUUID(),
    category: data.get('category').toString(),
    title: data.get('title').toString(),
    description: data.get('description').toString(),
    owner: data.get('owner').toString(),
    status: data.get('status').toString(),
    priority: data.get('priority').toString(),
    dueDate: data.get('dueDate').toString(),
    taskId: data.get('taskId').toString(),
  };

  state.raid.push(item);
  pushNotification(`New ${item.category.toLowerCase()} added to RAID log: ${item.title}`);
  raidDialog.close();
  renderAll();
});

document.getElementById('raidCategoryFilter').addEventListener('change', renderRaid);
document.getElementById('raidStatusFilter').addEventListener('change', renderRaid);

renderAll();
