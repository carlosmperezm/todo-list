import { TodoList } from "./TodosList";
import { Todo } from "./Todo";
import { createUITodo } from "./createUITodo";

import { ListStorageController } from "./ListStorageController";
import { DOMController } from "./DOMController";


export class DOMListManager {
  static #sidePanel = document.querySelector(".side-panel");
  static #mainPanel = document.querySelector(".main-panel");
  static #form = DOMListManager.#createForm();

  static getList(listName) {
    const list = document.querySelector(`.list-name-container[name="${listName}"]`);
    return list;
  }

  static get form() {
    return DOMListManager.#form;
  }

  static #createForm() {
    const form = document.createElement("form");
    form.classList.add("create-list-form");

    const listName = document.createElement("input")
    listName.placeholder = "List Name";
    listName.name = "listName";

    const submitButton = document.createElement("button");
    submitButton.textContent = "Create";

    form.appendChild(listName);
    form.appendChild(submitButton);

    return form;

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

  static setCounterOfTodos(listName, numberOfTodos) {
    DOMListManager.getCounterFromList(listName).textContent = numberOfTodos;
  }

  static loadAllTodosFromActiveList() {
    const activeListHTML = DOMListManager.getActiveList();
    const activeListObj = ListStorageController.getList(activeListHTML.name);
    const activeList = TodoList.fromJSON(activeListObj);

    DOMListManager.setCounterOfTodos(activeList.name, activeList.getAll().length);

    ListStorageController.getAllTodosFrom(activeList.name).forEach(todoJSON => {
      const todo = Todo.fromJSON(todoJSON);
      const todoHTML = DOMController.TodoManager.createTodo(todo);
      DOMListManager.#mainPanel.appendChild(todoHTML);

    })

  }

  static loadForm() {
    DOMListManager.#sidePanel.appendChild(DOMListManager.form);
  }

  static getFormData() {
    const listName = DOMListManager.form.querySelector("input").value;

    return listName;
  }

  static removeForm() {
    // DOMListManager.form.querySelector("input").value = "";
    DOMListManager.form.parentElement.removeChild(DOMListManager.form);
    DOMListManager.#form = DOMListManager.#createForm();
    // DOMListManager.#sidePanel.removeChild(DOMListManager.form);
  }

}
