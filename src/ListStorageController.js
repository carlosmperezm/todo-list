import { TodoList } from "./TodosList";

export class ListStorageController {
  static saveList(name, list) {
    console.log(name.toLowerCase());
    localStorage.setItem(name.toLowerCase(), JSON.stringify(list));
  }
  static getList(name) {
    return JSON.parse(localStorage.getItem(name.toLowerCase()));
  }
  static getAllTodosFrom(name) {
    const listJSON = JSON.parse(localStorage.getItem(name.toLowerCase()));
    return TodoList.fromJSON(listJSON).getAll();
  }
}
