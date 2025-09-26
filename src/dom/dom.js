import { format, parseISO } from 'date-fns';

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

export function renderTodos(project) {
  const mainContent = document.querySelector('.main-content');
  mainContent.innerHTML = '';

  project.getAllTodos().forEach((todo) => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    let formattedDate = '';
    if (todo.dueDate) {
      try {
        formattedDate = format(parseISO(todo.dueDate), 'dd/MM/yyyy');
      } catch (error) {
        formattedDate = todo.dueDate;
      }
    }

    div.textContent = `${todo.title} - ${formattedDate}`;

    const actions = document.createElement('span');
    actions.className = 'todo-actions';

    const editBtn = document.createElement('button');
    editBtn.className = 'edit-todo-btn';
    editBtn.innerHTML = `
      <svg class="icon">
        <use href="#icon-file-edit"></use>
      </svg>
    `;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-todo-btn';
    deleteBtn.innerHTML = `
      <svg class="icon">
        <use href="#icon-trash"></use>
      </svg>
    `;

    actions.appendChild(editBtn);
    actions.appendChild(deleteBtn);
    div.appendChild(actions);

    mainContent.appendChild(div);
  });
}
