import { TodoList } from "./TodosList";

export class ListStorageController {

  static saveList(name, list) {
    localStorage.setItem(name.toLowerCase(), JSON.stringify(list));
  }

  static getList(name) {
    return JSON.parse(localStorage.getItem(name.toLowerCase()));
  }

  static getAllLists() {
    const lists = [];
    for (let index = 0; index < localStorage.length; index++) {
      const key = localStorage.key(index);
      const listObj = JSON.parse(localStorage.getItem(key));
      const list = TodoList.from(listObj)
      lists.push(list);
    }
    return lists;
  }

  static getAllTodosFrom(name) {
    const listJSON = JSON.parse(localStorage.getItem(name.toLowerCase()));
    return TodoList.from(listJSON).getAll();
  }

  static toggleActive(listName) {
    const listObj = ListStorageController.getList(listName);
    const list = TodoList.from(listObj);
    list.active = list.active ? false : true;
    ListStorageController.saveList(list.name, list);
  }

  static setActiveList(listName) {
    const listObj = ListStorageController.getList(listName);
    const list = TodoList.from(listObj);
    list.active = true;
    ListStorageController.saveList(list.name, list);
  }

  static setInactiveList(listName) {
    const listObj = ListStorageController.getList(listName);
    const list = TodoList.from(listObj);
    list.active = false;
    ListStorageController.saveList(list.name, list);
  }

  static setInactiveAllListBut(listNameToKeepActive) {
    for (let i = 0; i < localStorage.length; i++) {
      const listName = localStorage.key(i);
      const list = TodoList.from(ListStorageController.getList(listName));

      if (list.name !== listNameToKeepActive) {
        list.active = false;
        ListStorageController.saveList(list.name, list);
      }
    }
  }


  static removeTodo(listName, todoIndex) {
    const list = TodoList.from(ListStorageController.getList(listName));
    list.remove(todoIndex);
    ListStorageController.saveList(list.name, list);
  }



}
