import Project from './project.js';
import Todo from './todo.js';
import Storage from './storage.js';

class ProjectManager {
  constructor() {
    this.projects = {};
    this.load();

    if (Object.keys(this.projects).length === 0) {
      this.createProject('Default');
      this.save();
    }
  }

  createProject(name) {
    if (!this.projects[name]) {
      this.projects[name] = new Project();
      this.save();
    }
  }

  getProject(name) {
    return this.projects[name];
  }

  deleteProject(name) {
    delete this.projects[name];
    this.save();
  }

  getAllProjects() {
    return Object.entries(this.projects).map(([name, project]) => ({
      name,
      project,
    }));
  }

  save() {
    Storage.save('projects', this.projects);
  }

  load() {
    const parsed = Storage.load('projects');
    if (parsed) {
      for (const [name, projectData] of Object.entries(parsed)) {
        const project = new Project();
        project.todos = projectData.todos.map(
          (todo) =>
            new Todo(
              todo.title,
              todo.description,
              todo.dueDate,
              todo.priority,
              todo.completed
            )
        );
        this.projects[name] = project;
      }
    }
  }
}

export default ProjectManager;
