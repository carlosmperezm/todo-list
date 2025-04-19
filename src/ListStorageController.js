import { TodoList } from "./TodosList";

export class ListStorageController {

  static saveList(name, list) {
    console.log("Saving list:", name.toLowerCase());
    localStorage.setItem(name.toLowerCase(), JSON.stringify(list));
  }

  static getList(name) {
    console.log("Getting list:", name.toLowerCase());
    return JSON.parse(localStorage.getItem(name.toLowerCase()));
  }

  static getAllTodosFrom(name) {
    const listJSON = JSON.parse(localStorage.getItem(name.toLowerCase()));
    return TodoList.fromJSON(listJSON).getAll();
  }

  static toggleActive(listName) {
    const listObj = ListStorageController.getList(listName);
    const list = TodoList.fromJSON(listObj);
    list.active = list.active ? false : true;
    ListStorageController.saveList(list.name, list);
  }

  static setActiveList(listName) {
    const listObj = ListStorageController.getList(listName);
    const list = TodoList.fromJSON(listObj);
    list.active = true;
    ListStorageController.saveList(list.name, list);
  }

  static setInactiveList(listName) {
    const listObj = ListStorageController.getList(listName);
    const list = TodoList.fromJSON(listObj);
    list.active = false;
    ListStorageController.saveList(list.name, list);
  }

  static setInactiveAllListBut(listNameToKeepActive) {
    for (let i = 0; i < localStorage.length; i++) {
      const listName = localStorage.key(i);
      const list = TodoList.fromJSON(ListStorageController.getList(listName));

      if (list.name !== listNameToKeepActive) {
        list.active = false;
        ListStorageController.saveList(list.name, list);
      }
    }
  }

}
