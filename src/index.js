import './reset.css';
import './style.css';

import ProjectManager from './modules/projectManager';
import { renderProjects } from './dom/renderProjects.js';
import { renderTodos } from './dom/renderTodos.js';
import { seedDefaultData } from './modules/seedData.js';
import { setupProjectModal } from './dom/projectForm.js';
import { setupProjectEvents } from './dom/projectEvents.js';

// Load SVG icons and insert them into the DOM
fetch('assets/icons.svg')
  .then((res) => res.text())
  .then((svg) => {
    document.body.insertAdjacentHTML('afterbegin', svg);
  });

// Init ProjectManager and seed data if necessary
const manager = new ProjectManager();
seedDefaultData(manager);

// Setup project events
const { handleDeleteProject, handleEditProject } = setupProjectEvents(
  manager,
  renderUI
);

// Centralized UI rendering function
function renderUI(currentProject = null) {
  if (currentProject) {
    manager.setCurrentProject(currentProject);
  }

  const current = manager.getCurrentProject();

  renderProjects(manager, {
    onDeleteProject: handleDeleteProject,
    onEditProject: handleEditProject,
    onProjectSelect: handleProjectSelect,
    currentProject: current,
  });

  renderTodos(current, {
    onDeleteTodo: handleDeleteTodo,
  });
}

function handleProjectSelect(project) {
  renderUI(project);
}

// TODO: Define handleDeleteTodo function
function handleDeleteTodo(todoId) {
  const currentProject = manager.getCurrentProject();
  currentProject.removeTodoById(todoId);
  manager.save();
  renderUI();
}

// Setup project modal
setupProjectModal((projectName) => {
  manager.createProject(projectName);
  manager.save();
  renderUI();
});

// Render initial UI
renderUI();
