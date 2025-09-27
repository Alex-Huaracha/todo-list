import createActionButton from './utils.js';
import { format, parseISO } from 'date-fns';

function todoActions(todo, onPriority, onEdit, onDelete) {
  const actions = document.createElement('span');
  actions.className = 'todo-actions';

  const priorityBtn = createActionButton({
    className: `priority-btn ${todo.priority ? 'priority-active' : ''}`,
    iconId: 'icon-star',
    onClick: onPriority,
  });

  const editBtn = createActionButton({
    className: 'edit-todo-btn',
    iconId: 'icon-edit',
    onClick: onEdit,
  });

  const deleteBtn = createActionButton({
    className: 'delete-todo-btn',
    iconId: 'icon-trash',
    onClick: onDelete,
  });

  actions.appendChild(priorityBtn);
  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  return actions;
}

function createTodoItem(todo, options = {}) {
  const { onTogglePriority, onEditTodo, onDeleteTodo } = options;

  const div = document.createElement('div');
  div.className = `todo-item ${todo.completed ? 'completed' : ''} ${
    todo.priority ? 'priority' : ''
  }`;

  const info = document.createElement('div');
  info.className = 'todo-info';

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => {
    todo.toggleCompletion();
    div.classList.toggle('completed', todo.completed);
  });

  const content = document.createElement('div');
  content.className = 'todo-content';

  const title = document.createElement('h4');
  title.textContent = todo.title;

  const details = document.createElement('div');
  details.className = 'todo-details';

  if (todo.description) {
    const description = document.createElement('p');
    description.textContent = todo.description;
    details.appendChild(description);
  }

  if (todo.dueDate) {
    const date = document.createElement('span');
    date.className = 'todo-date';
    try {
      date.textContent = format(parseISO(todo.dueDate), 'dd/MM/yyyy');
    } catch {
      date.textContent = todo.dueDate;
    }
    details.appendChild(date);
  }

  content.appendChild(title);
  content.appendChild(details);

  info.appendChild(checkbox);
  info.appendChild(content);

  // Actions
  const actions = todoActions(
    todo,
    () => onTogglePriority?.(todo),
    () => onEditTodo?.(todo),
    () => onDeleteTodo?.(todo)
  );

  div.appendChild(info);
  div.appendChild(actions);

  return div;
}

export function renderTodos(project, options = {}) {
  const { onTogglePriority, onEditTodo, onDeleteTodo } = options;
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  if (!project || project.getAllTodos().length === 0) {
    mainContent.innerHTML =
      '<p class="no-todos">No todos yet. Add one above!</p>';
    return;
  }

  project.getAllTodos().forEach((todo) => {
    const todoItem = createTodoItem(todo, {
      onTogglePriority,
      onEditTodo,
      onDeleteTodo,
    });
    mainContent.appendChild(todoItem);
  });
}
