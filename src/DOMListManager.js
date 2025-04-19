import { TodoList } from "./TodosList";
import { Todo } from "./Todo";
import { createUITodo } from "./createUITodo";

import { ListStorageController } from "./ListStorageController";


export class DOMListManager {
  static #sidePanel = document.querySelector(".side-panel");
  static #mainPanel = document.querySelector(".main-panel");

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
    const active = listHTML.dataset.active === "true";

    listHTML.dataset.active = active ? false : true;
  }


  static loadList(name) {
    const listObj = ListStorageController.getList(name);
    const list = TodoList.fromJSON(listObj);
    const listHTML = DOMListManager.createSideListElement(list);

    DOMListManager.#sidePanel.appendChild(listHTML);
  }


  static getCounterFromList(listName) {
    const listHTML = document.querySelector(`.list-name-container[name=${listName}`);
    const counterHTML = listHTML.querySelector(".counter-container span");
    return counterHTML;
  }


  static removeAllTodosfromMainPanel() {
    const allTodosHTML = document.querySelectorAll(".todo-container");
    allTodosHTML.forEach(todo => DOMListManager.#mainPanel.removeChild(todo));
  }


  static loadAllTodosFromActiveList() {
    const activeListHTML = DOMListManager.getActiveList();
    const activeListObj = ListStorageController.getList(activeListHTML.name);
    const activeList = TodoList.fromJSON(activeListObj);
    const counterHTML = DOMListManager.getCounterFromList(activeList.name);
    counterHTML.textContent = activeList.getAll().length;

    ListStorageController.getAllTodosFrom(activeList.name).forEach(todoJSON => {
      const todo = Todo.fromJSON(todoJSON);
      const todoHTML = createUITodo(todo);
      DOMListManager.#mainPanel.appendChild(todoHTML);
    })
  }


  static createSideListElement(todoList) {
    const listNameContainer = document.createElement("div");
    const listName = document.createElement("span");
    const counterContainer = document.createElement("span");
    const counter = document.createElement("span");

    listNameContainer.classList.add("list-name-container")
    listNameContainer.dataset.active = todoList.active;
    listNameContainer.name = todoList.name;
    listNameContainer.setAttribute("name", todoList.name);

    listName.textContent = todoList.name;

    counterContainer.classList.add("counter-container");
    counter.textContent = todoList.getAll().length;

    counterContainer.appendChild(counter);

    listNameContainer.appendChild(listName);
    listNameContainer.appendChild(counterContainer);

    return listNameContainer;
  }
}
