import Todo from './todo.js';

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

  completeTodo(index) {
    if (this.todos[index]) {
      this.todos[index].toggleCompletion();
    }
  }

  removeTodo(index) {
    this.todos.splice(index, 1);
  }

  getAllTodos() {
    return this.todos;
  }

  getCompletedTodos() {
    return this.todos.filter((todo) => todo.completed);
  }

  getIncompleteTodos() {
    return this.todos.filter((todo) => !todo.completed);
  }

  getTodosByPriority(priority) {
    return this.todos.filter((todo) => todo.priority === priority);
  }
}

export default Project;
