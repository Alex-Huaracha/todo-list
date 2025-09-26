import { format, parseISO } from 'date-fns';

function createTodoItem(todo, onEdit, onDelete) {
  const div = document.createElement('div');
  div.className = 'todo-item';
  // add class to div call .glass-card

  let formattedDate = '';
  if (todo.dueDate) {
    try {
      formattedDate = format(parseISO(todo.dueDate), 'dd/MM/yyyy');
    } catch {
      formattedDate = todo.dueDate;
    }
  }

  div.textContent = `${todo.title} - ${formattedDate}`;

  const actions = document.createElement('span');
  actions.className = 'todo-actions';

  const priorityBtn = document.createElement('button');
  priorityBtn.className = 'priority-btn';
  priorityBtn.innerHTML = `
    <svg class="icon">
      <use href="#icon-star"></use>
    </svg>
  `;

  const editBtn = document.createElement('button');
  editBtn.className = 'edit-todo-btn';
  editBtn.innerHTML = `
    <svg class="icon">
      <use href="#icon-file-edit"></use>
    </svg>
  `;
  editBtn.addEventListener('click', onEdit);

  const deleteBtn = document.createElement('button');
  deleteBtn.className = 'delete-todo-btn';
  deleteBtn.innerHTML = `
    <svg class="icon">
      <use href="#icon-trash"></use>
    </svg>
  `;
  deleteBtn.addEventListener('click', onDelete);

  actions.appendChild(priorityBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);
  div.appendChild(actions);

  return div;
}

export function renderProjects(manager) {
  const projectsNav = document.querySelector('.projects-nav');
  projectsNav.innerHTML = '';

  manager.getAllProjects().forEach(({ name, project }) => {
    const btn = document.createElement('button');
    btn.className = 'nav-btn';
    btn.innerHTML = `
      <svg class="icon"><use href="#icon-project"></use></svg>
      ${name}
    `;
    btn.addEventListener('click', () => {
      renderTodos(project);
    });
    projectsNav.appendChild(btn);
  });
}

export function renderTodos(project, { onEditTodo, onDeleteTodo } = {}) {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  project.getAllTodos().forEach((todo, idx) => {
    const todoItem = createTodoItem(
      todo,
      () => onEditTodo && onEditTodo(todo, idx),
      () => onDeleteTodo && onDeleteTodo(todo, idx)
    );
    mainContent.appendChild(todoItem);
  });
}
