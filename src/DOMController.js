import { createSideUIListName } from "./createSideUIListName";
import { createUITodo } from "./createUITodo";
import { ListStorageController } from "./ListStorageController";
import { Todo } from "./Todo";
import { TodoList } from "./TodosList";

export class DOMController {
  static mainPanel = document.querySelector(".main-panel");
  static sidePanel = document.querySelector(".side-panel");


  static removeAllTodosfromMainPanel() {
    const allTodosHTML = document.querySelectorAll(".todo-container");
    allTodosHTML.forEach(todo => DOMController.mainPanel.removeChild(todo));
  }


  static removeButton(buttonId) {
    const button = document.querySelector(`#${buttonId}`);
    button.parentNode.removeChild(button);
  }

  static getList(listName) {
    const list = document.querySelector(`.list-name-container[name="${listName}"]`);
    return list;
  }

  static getActiveList() {
    const activeListHTML = document.querySelector(".list-name-container[data-active=true]");
    return activeListHTML;
  }

  static setActiveList(listHTML) {
    listHTML.dataset.active = true;
  }


  static toggleActive(listHTML) {
    //TODO: fix

    const active = listHTML.dataset.active === "true";

    listHTML.dataset.active = active ? false : true;
  }


  static loadList(name) {
    const listObj = ListStorageController.getList(name);
    const list = TodoList.fromJSON(listObj);
    const listHTML = createSideUIListName(list);

    DOMController.sidePanel.appendChild(listHTML);
  }


  static loadAllTodosFromActiveList() {
    const activeListHTML = DOMController.getActiveList();
    const activeListObj = ListStorageController.getList(activeListHTML.name);
    const activeList = TodoList.fromJSON(activeListObj);
    const counterHTML = DOMController.getCounterFromList(activeList.name);
    counterHTML.textContent = activeList.getAll().length;

    ListStorageController.getAllTodosFrom(activeList.name).forEach(todoJSON => {
      const todo = Todo.fromJSON(todoJSON);
      const todoHTML = createUITodo(todo);
      DOMController.mainPanel.appendChild(todoHTML);
    })

  }

  static getCounterFromList(listName) {
    const listHTML = document.querySelector(`.list-name-container[name=${listName}`);
    const counterHTML = listHTML.querySelector(".counter-container span");
    return counterHTML;
  }

}
