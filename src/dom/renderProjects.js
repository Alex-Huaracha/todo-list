import createActionButton from './utils.js';

function projectActions(onEdit, onDelete) {
  const actions = document.createElement('span');
  actions.className = 'project-actions';

  const editBtn = createActionButton({
    className: 'edit-project-btn',
    iconId: 'icon-edit',
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

export function renderProjects(manager, options = {}) {
  const { onDeleteProject, onEditProject, currentProject, onProjectSelect } =
    options;
  const projectsNav = document.querySelector('.projects-nav');
  projectsNav.innerHTML = '';

  manager.getAllProjects().forEach(({ name, project }) => {
    const projectItem = document.createElement('div');
    projectItem.className = 'project-item';

    const btn = document.createElement('button');
    btn.className = `nav-btn ${
      currentProject?.id === project.id ? 'active' : ''
    }`;
    btn.innerHTML = `
      <svg class="icon"><use href="#icon-project"></use></svg>
      ${name}
    `;
    btn.addEventListener('click', () => {
      onProjectSelect?.(project);
    });

    projectItem.appendChild(btn);

    if (name !== 'Default') {
      const actions = projectActions(
        project,
        () => onEditProject?.(project),
        () => onDeleteProject?.(project)
      );
      projectItem.appendChild(actions);
    }

    projectsNav.appendChild(projectItem);
  });
}
