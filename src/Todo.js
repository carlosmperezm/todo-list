
export class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #isDone;


  static from(obj) {
    const title = obj.title;
    const description = obj.description;
    const dueDate = obj.dueDate;
    const priority = obj.piority;
    const isDone = obj.isDone;

    return new Todo(title, dueDate, description, priority, isDone);
  }
  constructor(title, dueDate, description = "", priority = "medium", isDone = false) {
    this.#title = title;
    this.#dueDate = dueDate;
    this.#description = description;
    this.#priority = priority;
    this.#isDone = isDone;
  }
  get title() {
    return this.#title;
  }
  set title(newTitle) {
    this.#title = newTitle;
  }
  get description() {
    return this.#description;
  }
  set description(newDescription) {
    this.#description = newDescription;
  }
  get dueDate() {
    return this.#dueDate;
  }
  set dueDate(newDueDate) {
    this.#dueDate = newDueDate;
  }
  get priority() {
    return this.#priority;
  }
  set priority(newPriority) {
    this.#priority = newPriority;
  }
  get isDone() {
    return this.#isDone;
  }

  toggleDone() {
    this.#isDone ? this.#isDone = false : this.#isDone = true;
  }
  toJSON() {
    return {
      title: this.#title,
      description: this.#description,
      dueDate: this.#dueDate,
      priority: this.#priority,
      isDone: this.#isDone
    };
  }
}

