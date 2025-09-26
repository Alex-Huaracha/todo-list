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
    div.textContent = `${todo.title} - ${todo.dueDate}`;
    mainContent.appendChild(div);
  });
}
