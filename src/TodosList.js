export class TodoList {
  #name;
  #active = false;
  #todos = [];

  static from(obj) {
    const name = obj.name;
    const active = obj.active;
    const todos = obj.todos;

    return new TodoList(name, active, todos);
  }

  constructor(name, active = false, todos = []) {
    this.#name = name;
    this.#active = active;
    this.#todos = todos;
  }

  get name() {
    return this.#name;
  }
  set name(newName) {
    this.#name = newName;
  }
  get active() {
    return this.#active;
  }
  set active(newActiveState) {
    if (typeof newActiveState === "boolean")
      this.#active = newActiveState;
  }
  add(newTodo) {
    this.#todos.push(newTodo);
  }
  insert(newTodo, index) {
    this.#todos.splice(index, 0, newTodo);
  }
  remove(todoIndex) {
    this.#todos.splice(todoIndex, 1);
  }
  get(index) {
    return this.#todos.at(index);
  }
  getAll() {
    return this.#todos;
  }

  toJSON() {
    return {
      name: this.#name,
      active: this.#active,
      todos: this.#todos
    };
  }

}
