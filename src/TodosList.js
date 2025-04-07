export class TodoList {
  #name;
  #todos = [];

  constructor(name, todos = []) {
    this.#name = name;
    this.#todos = todos;
  }

  get name() {
    return this.#name;
  }
  set name(newName) {
    this.#name = newName;
  }

  add(newTodo) {
    this.#todos.push(newTodo);
  }
  remove(todoIndex) {
    this.#todos.splice(todoIndex, 1);
  }
  get(index) {
    this.#todos.at(index);
  }
  getAll() {
    return this.#todos;
  }




}
