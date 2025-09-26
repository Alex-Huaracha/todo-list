class Todo {
  constructor(
    title,
    description,
    dueDate,
    priority = false,
    completed = false
  ) {
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

export default Todo;
