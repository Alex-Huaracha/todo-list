class Todo {
  constructor(title, description, dueDate, priority, completed = false) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.completed = completed;
  }

  updateDetails({ title, description, dueDate, priority }) {
    if (title !== undefined) this.title = title;
    if (description !== undefined) this.description = description;
    if (dueDate !== undefined) this.dueDate = dueDate;
    if (priority !== undefined) this.priority = priority;
  }

  toggleCompletion() {
    this.completed = !this.completed;
  }
}

class Project {
  constructor() {
    this.todos = [];
  }

  addTodo(todo) {
    this.todos.push(todo);
  }

  updateTodo(index, updates) {
    if (this.todos[index]) {
      this.todos[index].updateDetails(updates);
    }
  }

  // Mark a todo as completed
  completeTodo(index) {
    if (this.todos[index]) {
      this.todos[index].toggleCompletion();
    }
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  getAllTodos() {
    console.log('this is all todos:\n', JSON.stringify(this.todos, null, 2));
    return this.todos;
  }

  // Get complete Todos
  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  // Get incomplete Todos
  getIncompleteTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  // Get Todos by priority
  getTodosByPriority(priority) {
    return this.todos.filter((todo) => todo.priority === priority);
  }
}

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
  }

  listProjects() {
    return Object.keys(this.projects);
  }

  save() {
    localStorage.setItem('projects', JSON.stringify(this.projects));
  }

  load() {
    const data = localStorage.getItem('projects');
    if (data) {
      const parsed = JSON.parse(data);
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

export { Todo, Project, ProjectManager };
