import './reset.css';
import './style.css';

import ProjectManager from './modules/projectManager';
import Todo from './modules/todo';
import { renderTodos } from './dom/todos.js';
import { seedDefaultData } from './modules/seedData.js';

import { renderProjects, setupProjectModal } from './dom/projects.js';

// Load SVG icons and insert them into the DOM
fetch('assets/icons.svg')
  .then((res) => res.text())
  .then((svg) => {
    document.body.insertAdjacentHTML('afterbegin', svg);
  });

// Init ProjectManager and seed data if necessary
const manager = new ProjectManager();
seedDefaultData(manager);

// ==================== PROJECT HANDLERS ====================
function handleDeleteProject(project) {
  const confirmed = confirm(
    `Are you sure you want to delete the project "${project.name}"? This action cannot be undone.`
  );

  if (confirmed) {
    const success = manager.deleteProjectById(project.id);
    if (success) {
      renderUI();
    }
  }
}

function handleEditProject(project) {
  const newName = prompt('Enter the new project name:', project.name);
  if (newName && newName.trim() !== '' && newName !== project.name) {
    if (manager.projects[newName]) {
      alert(
        'A project with this name already exists. Please choose a different name.'
      );
      return;
    }

    delete manager.projects[project.name];
    project.name = newName;
    manager.projects[newName] = project;
    manager.save();

    renderUI(project);
  }
}

function handleProjectSelect(project) {
  renderUI(project);
}

// ==================== TODO HANDLERS ====================
function handleCreateTodo(todoData) {
  const currentProject = manager.getCurrentProject();
  const todo = new Todo(
    todoData.title,
    todoData.description,
    todoData.dueDate,
    todoData.priority
  );

  currentProject.addTodo(todo);
  manager.save();
  renderUI();
}

function handleTogglePriority(todo) {
  todo.togglePriority();
  manager.save();
  renderUI();
}

function handleEditTodo(todo) {
  // Implementar modal o prompt para editar
  const newTitle = prompt('Enter new title:', todo.title);
  if (newTitle && newTitle.trim()) {
    todo.updateDetails({ title: newTitle.trim() });
    manager.save();
    renderUI();
  }
}

function handleDeleteTodo(todo) {
  const confirmed = confirm(`Delete "${todo.title}"?`);
  if (confirmed) {
    const currentProject = manager.getCurrentProject();
    currentProject.removeTodoById(todo.id);
    manager.save();
    renderUI();
  }
}

setupProjectModal((projectName) => {
  manager.createProject(projectName);
  manager.save();
  renderUI();
});

// ==================== UI RENDERING ====================
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
    onTogglePriority: handleTogglePriority,
    onEditTodo: handleEditTodo,
    onDeleteTodo: handleDeleteTodo,
  });
}

// ==================== SETUP ====================
function setupTodoForm() {
  const addTodoBtn = document.querySelector('.add-todo-btn');
  const addTodoInput = document.querySelector('.add-todo-input');

  addTodoBtn?.addEventListener('click', () => {
    const title = addTodoInput.value.trim();
    if (title) {
      handleCreateTodo({
        title,
        description: '',
        dueDate: '',
        priority: false,
      });
      addTodoInput.value = '';
    }
  });
}

setupTodoForm();

renderUI();
