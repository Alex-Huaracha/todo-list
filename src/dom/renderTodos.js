import createActionButton from './utils.js';
import { format, parseISO } from 'date-fns';

function createTodoItem(todo, onEdit, onDelete) {
  const div = document.createElement('div');
  div.className = 'todo-item';

  const info = document.createElement('span');
  info.className = 'todo-info';

  let formattedDate = '';
  if (todo.dueDate) {
    try {
      formattedDate = format(parseISO(todo.dueDate), 'dd/MM/yyyy');
    } catch {
      formattedDate = todo.dueDate;
    }
  }
  info.textContent = `${todo.title} - ${formattedDate}`;
  div.appendChild(info);

  // Actions
  const actions = document.createElement('span');
  actions.className = 'todo-actions';

  const priorityBtn = createActionButton({
    className: 'priority-btn',
    iconId: 'icon-star',
  });

  const editBtn = createActionButton({
    className: 'edit-todo-btn',
    iconId: 'icon-file-edit',
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
  div.appendChild(actions);

  return div;
}

export function renderTodos(project, { onEditTodo, onDeleteTodo } = {}) {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  project.getAllTodos().forEach((todo) => {
    const todoItem = createTodoItem(
      todo,
      () => onEditTodo && onEditTodo(todo),
      () => onDeleteTodo && onDeleteTodo(todo)
    );
    mainContent.appendChild(todoItem);
  });
}
