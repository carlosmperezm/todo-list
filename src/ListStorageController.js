import { TodoList } from "./TodosList";
import { Todo } from "./Todo";

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

  static get activeList() {
    let activeList;
    ListStorageController.getAllLists().forEach(list => {
      if (list.active) {
        activeList = list;
      }
    })
    return activeList;
  }


  static removeTodo(listName, todoIndex) {
    const list = TodoList.from(ListStorageController.getList(listName));
    list.remove(todoIndex);
    ListStorageController.saveList(list.name, list);
  }

  static markDone(listName,todoIndex){
    // get the list and parse it into a TodoList object
    const list = TodoList.from(ListStorageController.getList(listName));

    // get the todo
    const todoObj = list.get(todoIndex) ;

    // delete the todo from the list since i cant be changed
    // instead we'll create a new one and add it to the end of the list
    list.remove(todoIndex);

    // create a new to-do object 
    const todo = Todo.from(todoObj);

    // swicht it to done or undone
    todo.toggleDone();

    // add to the current list were the other todo was deleted
    list.add(todo);

    // save the list
    ListStorageController.saveList(list.name,list);

  }


}
