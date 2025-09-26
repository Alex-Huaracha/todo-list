import { renderTodos } from './renderTodos.js';
import createActionButton from './utils.js';

function projectActions(project, onEdit, onDelete) {
  const actions = document.createElement('span');
  actions.className = 'project-actions';

  const editBtn = createActionButton({
    className: 'edit-project-btn',
    iconId: 'icon-file-edit',
    onClick: onEdit,
  });

  const deleteBtn = createActionButton({
    className: 'delete-project-btn',
    iconId: 'icon-trash',
    onClick: onDelete,
  });

  actions.appendChild(editBtn);
  actions.appendChild(deleteBtn);

  return actions;
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
