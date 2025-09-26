import './reset.css';
import './style.css';

import Todo from './modules/todo';
import Project from './modules/project';
import ProjectManager from './modules/projectManager';
import { renderProjects, renderTodos } from './dom/dom.js';

// Load SVG icons and insert them into the DOM
fetch('assets/icons.svg')
  .then((res) => res.text())
  .then((svg) => {
    document.body.insertAdjacentHTML('afterbegin', svg);
  });

const manager = new ProjectManager();
const defaultProject = manager.getProject('Default');

if (defaultProject.getAllTodos().length === 0) {
  const todo1 = new Todo(
    'Learn JavaScript',
    'Understand the basics of JavaScript',
    '2023-10-01',
    true
  );
  const todo2 = new Todo(
    'Build a Todo App',
    'Create a simple todo application using vanilla JS',
    '2024-10-05',
    false
  );
  const todo3 = new Todo(
    'Review Code',
    'Go through the code and ensure it follows best practices',
    '2025-10-03',
    false
  );

  defaultProject.addTodo(todo1);
  defaultProject.addTodo(todo2);
  defaultProject.addTodo(todo3);

  manager.save();
}

const newProject = 'Work';
manager.createProject(newProject);
const workProject = manager.getProject(newProject);

const workTodo = new Todo(
  'Prepare Presentation',
  'Create slides for the upcoming meeting',
  '2024-11-01',
  'high'
);
workProject.addTodo(workTodo);
manager.save();

// To verify persistence, create a new manager instance and load data
const newManagerInstance = new ProjectManager();
const loadedDefaultProject = newManagerInstance.getProject('Default');

const loadedWorkProject = newManagerInstance.getProject('Work');

renderProjects(manager);
renderTodos(manager.getProject('Default'));
