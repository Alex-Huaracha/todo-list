import './reset.css';
import './style.css';

import Todo from './modules/todo';
import Project from './modules/project';
import ProjectManager from './modules/projectManager';

// Load SVG icons and insert them into the DOM
fetch('assets/icons.svg')
  .then((res) => res.text())
  .then((svg) => {
    document.body.insertAdjacentHTML('afterbegin', svg);
  });

const manager = new ProjectManager();

const defaultProject = manager.getProject('Default');

const todo1 = new Todo(
  'Learn JavaScript',
  'Understand the basics of JavaScript',
  '2023-10-01',
  'high'
);
const todo2 = new Todo(
  'Build a Todo App',
  'Create a simple todo application using vanilla JS',
  '2024-10-05',
  'medium'
);
const todo3 = new Todo(
  'Review Code',
  'Go through the code and ensure it follows best practices',
  '2025-10-03',
  'low'
);

defaultProject.addTodo(todo1);
defaultProject.addTodo(todo2);
defaultProject.addTodo(todo3);

manager.save();

console.log('All Todos:', defaultProject.getAllTodos().length);

defaultProject.completeTodo(0);
console.log('After completing first todo:', defaultProject.getAllTodos());

defaultProject.removeTodo(1);
console.log('After removing second todo:', defaultProject.getAllTodos());

manager.save();

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

console.log('Work Project Todos:', workProject.getAllTodos());

// To verify persistence, create a new manager instance and load data
const newManagerInstance = new ProjectManager();
const loadedDefaultProject = newManagerInstance.getProject('Default');
console.log(
  'Loaded Default Project Todos:',
  loadedDefaultProject.getAllTodos()
);
const loadedWorkProject = newManagerInstance.getProject('Work');
console.log('Loaded Work Project Todos:', loadedWorkProject.getAllTodos());
