import { TodoManager } from "./TodoManager";

export class Todo {
  #title;
  #description;
  #dueDate;
  #priority;
  #isDone;

  constructor(title, description = "", dueDate, priority = "medium", isDone = false) {
    this.#title = title;
    this.#description = description;
    this.#dueDate = dueDate;
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
}

