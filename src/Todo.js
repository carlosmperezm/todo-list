
export class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #isDone;


  static fromJSON(jsonObject) {
    const title = jsonObject.title;
    const description = jsonObject.description;
    const dueDate = jsonObject.dueDate;
    const priority = jsonObject.piority;
    const isDone = jsonObject.isDone;

    return new Todo(title, description, dueDate, priority, isDone);
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

